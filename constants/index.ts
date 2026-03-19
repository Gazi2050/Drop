import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FolderOpen,
  ImageIcon,
  Video,
  Music,
  PieChart,
} from "lucide-react";

export const navItems: { name: string; icon: LucideIcon; url: string }[] = [
  { name: "Dashboard", icon: LayoutDashboard, url: "/" },
  { name: "Documents", icon: FolderOpen, url: "/documents" },
  { name: "Images", icon: ImageIcon, url: "/images" },
  { name: "Video", icon: Video, url: "/video" },
  { name: "Audio", icon: Music, url: "/audio" },
  { name: "Others", icon: PieChart, url: "/others" },
];

/** Same Lucide icons as sidebar file-type nav (excludes Dashboard). */
export const categoryIconsByName = Object.fromEntries(
  navItems.filter((item) => item.url !== "/").map((item) => [item.name, item.icon]),
) as Record<string, LucideIcon>;

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Make Public",
    icon: "/assets/icons/link.svg",
    value: "makePublic",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
