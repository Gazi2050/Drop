# 🚀 Drop — Modern File Storage & Management Platform

<p align="center">
  <img src="https://ik.imagekit.io/uc8ejfj1j/drop-folder/readme-hero_zCOqLXkV61.png" alt="Drop Hero" width="900" />
</p>

Welcome to **Drop** 🚀 — a modern full-stack file storage and management app built with **Next.js + Appwrite**.  
Upload, organize, search, share, and manage files with a clean responsive UI and secure access control.

## 🔑 Key Features

- 🔐 **OTP Authentication**  
  Email OTP sign-up/sign-in flow with protected routes.

- 📤 **Upload with Smooth Progress UI**  
  Drag-and-drop uploads with per-file progress bars and mobile-friendly upload tray.

- 🧠 **Smart Duplicate Filename Handling**  
  If a user uploads the same file name again, Drop auto-renames it (example: `img01-a3end.png`).

- 📂 **File Type Organization**  
  Separate pages for **Documents, Images, Video, Audio, Others**.

- 🔎 **Debounced Global Search**  
  Real-time search suggestions with quick navigation to matching files.

- 🛠️ **Advanced File Actions**  
  Rename, Details, Share, Make Public, Download, Delete.

- 🔗 **Public Link Sharing**  
  Generate token-based public links for secure external access.

- 📊 **Storage Analytics**  
  View total usage and category-wise usage with charts.

- 📱 **Responsive Experience**  
  Desktop sidebar + mobile navigation and optimized components.

- 👤 **Generated User Avatars**  
  DiceBear avatar generation based on user name/email.

## 🧾 Supported File Types

- **Documents:** PDF, DOC, DOCX, CSV, TXT, XLS/XLSX, and more
- **Images:** JPG, JPEG, PNG, GIF, BMP, SVG, WEBP
- **Video:** MP4, MOV, MKV, WEBM, AVI
- **Audio:** MP3, WAV, OGG, FLAC, AAC, and more
- **Others:** Any unsupported extension fallback

## 🚀 Installation Guide

1. **Clone repository**

```bash
git clone https://github.com/Gazi2050/Drop.git
cd Drop
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Create `.env.local`**

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_APPWRITE_KEY=
```

4. **Run development server**

```bash
pnpm dev
```

5. **Build & start production**

```bash
pnpm build
pnpm start
```

## ℹ️ Notes

- Max upload size is **50MB** per file.
- File access is permission-checked for owner/shared users.
- Public links are tokenized and validated through API routes.
