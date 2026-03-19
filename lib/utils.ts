import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes";
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits ?? 1) + " KB";
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits ?? 1) + " MB";
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits ?? 2) + " GB";
  }
};

export const BYTES_PER_GB = 1024 * 1024 * 1024;

const BYTES_PER_MB = 1024 * 1024;

/**
 * Storage UI formatter: max 2 digits after the decimal.
 * KB/MB use rounding; GB uses truncation so ~1.999 GB shows as "1.99 GB" (not "2.00 GB").
 */
export const formatStorageDisplay = (bytes: number) => {
  if (bytes < 1024) return bytes + " Bytes";
  if (bytes < BYTES_PER_MB) {
    const kb = bytes / 1024;
    return kb.toFixed(2) + " KB";
  }
  if (bytes < BYTES_PER_GB) {
    const mb = bytes / BYTES_PER_MB;
    return mb.toFixed(2) + " MB";
  }
  const gb = bytes / BYTES_PER_GB;
  return (Math.floor(gb * 100) / 100).toFixed(2) + " GB";
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string,
) => {
  switch (extension) {
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    case "svg":
      return "/assets/icons/file-image.svg";
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
};

export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

/** File types that open in browser (view). Rest trigger download. */
const VIEWABLE_EXTENSIONS = new Set([
  "pdf", "txt",
  "jpg", "jpeg", "png", "gif", "bmp", "svg", "webp",
  "mp4", "avi", "mov", "mkv", "webm", "m4v", "3gp", "flv",
  "mp3", "mpeg", "wav", "aac", "flac", "ogg", "wma", "m4a", "aiff", "alac",
]);

export const getFileOpenUrl = (
  bucketFileId: string,
  type: string,
  extension: string,
  name?: string
) => {
  const ext = extension?.toLowerCase() ?? "";
  const isViewable =
    VIEWABLE_EXTENSIONS.has(ext) || ["image", "video", "audio"].includes(type);
  if (isViewable) {
    return `/api/files/${bucketFileId}/view?ext=${ext}`;
  }
  const fileName = name ?? "file";
  return `/api/files/${bucketFileId}/download?ext=${ext}&name=${encodeURIComponent(fileName)}`;
};

/** Returns an absolute URL for the file open path (for Appwrite URL attribute). */
export const getFileOpenUrlAbsolute = (
  baseUrl: string,
  bucketFileId: string,
  type: string,
  extension: string,
  name?: string
) => {
  const path = getFileOpenUrl(bucketFileId, type, extension, name);
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getFileDownloadUrl = (
  bucketFileId: string,
  extension: string,
  name: string
) => {
  const ext = extension?.toLowerCase() ?? "";
  return `/api/files/${bucketFileId}/download?ext=${ext}&name=${encodeURIComponent(name)}`;
};

export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Video",
      size: totalSpace.video.size,
      latestDate: totalSpace.video.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/video",
    },
    {
      title: "Audio",
      size: totalSpace.audio.size,
      latestDate: totalSpace.audio.latestDate,
      icon: "/assets/icons/file-audio-light.svg",
      url: "/audio",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "video":
      return ["video"];
    case "audio":
      return ["audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};
