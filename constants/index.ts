import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FolderOpen,
  ImageIcon,
  Video,
  Music,
  PieChart,
  Pencil,
  Info,
  Share2,
  Link,
  Download,
  Trash2,
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
    icon: Pencil,
    value: "rename",
  },
  {
    label: "Details",
    icon: Info,
    value: "details",
  },
  {
    label: "Share",
    icon: Share2,
    value: "share",
  },
  {
    label: "Make Public",
    icon: Link,
    value: "makePublic",
  },
  {
    label: "Download",
    icon: Download,
    value: "download",
  },
  {
    label: "Delete",
    icon: Trash2,
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
