"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { getFileDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createPublicFileLink,
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "@/components/ActionsModalContent";

const ActionDropdown = ({ file }: { file: FileDocument }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [publicLink, setPublicLink] = useState<string | null>(null);
  const [publicLinkError, setPublicLinkError] = useState<string | null>(null);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    setPublicLink(null);
    setPublicLinkError(null);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="rounded-[26px] w-[90%] max-w-[400px] px-6 py-8 text-[14px] leading-[20px] font-medium">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="text-center text-light-100">
              Are you sure you want to delete{` `}
              <span className="font-medium text-brand-100">{file.name}</span>?
            </p>
          )}
          {value === "makePublic" && (
            <div className="flex flex-col gap-3">
              <p className="text-[14px] leading-[20px] font-normal text-light-100">
                Anyone with this link can view the file without logging in.
              </p>
              {publicLinkError && (
                <p className="text-[14px] leading-[20px] font-normal text-error">
                  {publicLinkError}
                </p>
              )}
              {publicLink && (
                <div className="flex flex-col gap-2">
                  <Input
                    readOnly
                    value={publicLink}
                    className="h-[52px] w-full rounded-full border px-4 text-[14px] font-normal leading-[20px] shadow-[var(--shadow-drop-1)] outline-none focus:ring-0"
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(publicLink);
                    }}
                    className="h-[52px] w-full flex-1 rounded-full border-0 bg-brand text-[14px] font-medium leading-[20px] text-white transition-all hover:bg-brand-100"
                  >
                    Copy Link
                  </Button>
                </div>
              )}
              {!publicLink && !publicLinkError && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="Loading"
                    width={24}
                    height={24}
                    className="animate-spin"
                  />
                  <span className="text-[14px] leading-[20px] font-normal text-light-200">
                    Generating link...
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogHeader>
        {(value === "makePublic" && (publicLink || publicLinkError)) && (
          <DialogFooter>
            <Button
              onClick={closeAllModals}
              className="h-[52px] flex-1 rounded-full bg-white text-light-100 hover:bg-transparent border border-light-300"
            >
              Close
            </Button>
          </DialogFooter>
        )}
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button
              onClick={closeAllModals}
              className="h-[52px] flex-1 rounded-full bg-white text-light-100 hover:bg-transparent border border-light-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className="h-[52px] w-full flex-1 rounded-full border-0 bg-brand text-[14px] font-medium leading-[20px] text-white transition-all hover:bg-brand-100"
            >
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="cursor-pointer"
              onClick={() => {
                setAction(actionItem);

                if (
                  ["rename", "share", "delete", "details", "makePublic"].includes(
                    actionItem.value,
                  )
                ) {
                  setIsModalOpen(true);
                  if (actionItem.value === "makePublic") {
                    setPublicLink(null);
                    setPublicLinkError(null);
                    createPublicFileLink({
                      fileId: file.$id,
                      bucketFileId: file.bucketFileId,
                      extension: file.extension,
                    }).then((result) => {
                      if ("url" in result) setPublicLink(result.url);
                      else setPublicLinkError(result.error);
                    });
                  }
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={getFileDownloadUrl(file.bucketFileId, file.extension, file.name)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <actionItem.icon
                    className="size-4 text-light-100"
                    aria-hidden="true"
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <actionItem.icon
                    className="size-4 text-light-100"
                    aria-hidden="true"
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;
