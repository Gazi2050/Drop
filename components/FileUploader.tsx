"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import {
  createFileDocumentFromBucketFile,
  getUploadJwt,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "done" | "error";
  startedAt: number;
}

const MIN_UPLOAD_VISIBLE_MS = 1200;
const COMPLETE_REMOVE_DELAY_MS = 400;
const PROGRESS_TICK_MS = 12;

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const progressIntervalsRef = useRef<
    Record<string, ReturnType<typeof setInterval>>
  >({});
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const clearProgressInterval = (uploadId: string) => {
    const interval = progressIntervalsRef.current[uploadId];
    if (!interval) return;
    clearInterval(interval);
    delete progressIntervalsRef.current[uploadId];
  };

  const animateProgressTo = (uploadId: string, target: number) => {
    const safeTarget = Math.max(1, Math.min(target, 100));
    clearProgressInterval(uploadId);

    return new Promise<void>((resolve) => {
      let hasResolved = false;

      const resolveOnce = () => {
        if (hasResolved) return;
        hasResolved = true;
        resolve();
      };

      progressIntervalsRef.current[uploadId] = setInterval(() => {
        let shouldStop = false;

        setUploadItems((prev) => {
          let found = false;
          const next = prev.map((uploadItem) => {
            if (uploadItem.id !== uploadId) return uploadItem;
            found = true;

            const nextProgress = Math.min(uploadItem.progress + 1, safeTarget);
            if (nextProgress >= safeTarget) shouldStop = true;
            return { ...uploadItem, progress: nextProgress };
          });

          if (!found) shouldStop = true;
          return next;
        });

        if (shouldStop) {
          clearProgressInterval(uploadId);
          resolveOnce();
        }
      }, PROGRESS_TICK_MS);
    });
  };

  useEffect(() => {
    return () => {
      Object.keys(progressIntervalsRef.current).forEach((uploadId) => {
        clearProgressInterval(uploadId);
      });
    };
  }, []);

  const uploadToAppwrite = (
    file: File,
    jwt: string,
    onProgress: (progress: number) => void,
  ): Promise<{ $id: string; name: string; sizeOriginal: number }> => {
    return new Promise((resolve, reject) => {
      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET;

      if (!endpoint || !projectId || !bucketId) {
        reject(new Error("Missing Appwrite client configuration"));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${endpoint}/storage/buckets/${bucketId}/files`, true);
      xhr.setRequestHeader("X-Appwrite-Project", projectId);
      xhr.setRequestHeader("X-Appwrite-JWT", jwt);

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(Math.min(progress, 100));
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText) as {
              $id: string;
              name: string;
              sizeOriginal: number;
            };
            resolve(response);
          } catch {
            reject(new Error("Invalid upload response"));
          }
          return;
        }

        reject(new Error(`Upload failed with status ${xhr.status}`));
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));

      const formData = new FormData();
      formData.append("fileId", "unique()");
      formData.append("file", file);
      xhr.send(formData);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const { jwt } = (await getUploadJwt()) ?? { jwt: null };
      if (!jwt) {
        toast({
          description: "Unable to authenticate upload. Please sign in again.",
          className: "bg-red rounded-[10px]",
        });
        return;
      }

      const items = acceptedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        progress: 5,
        status: "uploading" as const,
        startedAt: Date.now(),
      }));

      setUploadItems((prev) => [...prev, ...items]);

      const uploadPromises = items.map(async (item) => {
        const { file } = item;
        if (file.size > MAX_FILE_SIZE) {
          setUploadItems((prev) =>
            prev.filter((uploadItem) => uploadItem.id !== item.id),
          );

          toast({
            description: (
              <p className="text-[14px] leading-[20px] font-normal text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "bg-red rounded-[10px]",
          });
          return;
        }

        try {
          const bucketFile = await uploadToAppwrite(file, jwt, (progress) => {
            void animateProgressTo(item.id, Math.min(progress, 95));
          });

          await createFileDocumentFromBucketFile({
            bucketFileId: bucketFile.$id,
            fileName: bucketFile.name,
            size: bucketFile.sizeOriginal,
            ownerId,
            accountId,
            path,
          });

          const elapsed = Date.now() - item.startedAt;
          const remaining = Math.max(MIN_UPLOAD_VISIBLE_MS - elapsed, 0);
          if (remaining > 0) await wait(remaining);
          await animateProgressTo(item.id, 100);

          setUploadItems((prev) =>
            prev.map((uploadItem) =>
              uploadItem.id === item.id
                ? { ...uploadItem, progress: 100, status: "done" }
                : uploadItem,
            ),
          );

          setTimeout(() => {
            setUploadItems((prev) =>
              prev.filter((uploadItem) => uploadItem.id !== item.id),
            );
          }, COMPLETE_REMOVE_DELAY_MS);
        } catch {
          clearProgressInterval(item.id);
          setUploadItems((prev) =>
            prev.map((uploadItem) =>
              uploadItem.id === item.id ? { ...uploadItem, status: "error" } : uploadItem,
            ),
          );
        }

        return;
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path, toast],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    uploadId: string,
  ) => {
    e.stopPropagation();
    setUploadItems((prev) => prev.filter((uploadItem) => uploadItem.id !== uploadId));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn(
          "h-[52px] gap-2 rounded-full border-0 bg-brand px-10 text-[14px] font-medium leading-[20px] text-white shadow-[var(--shadow-drop-1)] transition-all hover:bg-brand-100",
          className,
        )}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />{" "}
        <p>Upload</p>
      </Button>
      {uploadItems.length > 0 && (
        <ul className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-h-[70vh] w-auto max-w-[480px] flex-col gap-3 overflow-y-auto rounded-[20px] bg-white p-4 shadow-[var(--shadow-drop-3)] sm:inset-x-auto sm:bottom-10 sm:right-10 sm:w-full sm:p-7">
          <h4 className="text-[18px] leading-[20px] font-medium text-light-100">
            Uploading
          </h4>

          {uploadItems.map((uploadItem) => {
            const { file, progress, status } = uploadItem;
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={uploadItem.id}
                className="flex items-center justify-between gap-2 rounded-xl p-3 shadow-[var(--shadow-drop-3)] sm:gap-3"
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="mb-2 min-w-0 max-w-[220px] sm:max-w-[300px]">
                    <p className="line-clamp-1 text-[14px] font-semibold leading-[20px]">
                      {file.name}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-light-200/40 sm:w-[140px]">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-200",
                            status === "error" ? "bg-red" : "bg-brand",
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[12px] font-normal leading-[16px] text-light-200">
                        {status === "error" ? "Failed" : `${progress}%`}
                      </p>
                    </div>
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  className="shrink-0"
                  onClick={(e) => handleRemoveFile(e, uploadItem.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
