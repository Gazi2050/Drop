<p align="center">
  <img src="https://ik.imagekit.io/uc8ejfj1j/drop-folder/readme-hero_7EtL3-Al5q.png" alt="Drop Hero" width="900" />
</p>

> ### Welcome to **Drop** — a modern file storage and management platform. Upload, organize, search, share, and manage files with a clean responsive interface and secure access control.

## 🔑 Key Features

- 🔐 **OTP Authentication**  
  Secure email OTP sign-up/sign-in with protected routes.

- 📤 **Upload with Smooth Progress UI**  
  Drag-and-drop uploads with per-file progress bars and mobile-friendly upload tray.

- 🧠 **Smart Duplicate Filename Handling**  
  Automatically renames duplicate filenames (example: `img01-xy4z.png`).

- 📂 **File Type Organization**  
  Dedicated sections for **Documents**, **Images**, **Video**, **Audio**, and **Others**.

- 🔎 **Debounced Global Search**  
  Real-time search suggestions with quick navigation to matching results.

- 🛠️ **Advanced File Actions**  
  Rename, view details, share, create public links, download, and delete files.

- 🔗 **Public Link Sharing**  
  Generate token-based public links for secure external access.

- 📊 **Storage Analytics**  
  Track total usage and category-wise usage with charts.

- 📱 **Responsive Experience**  
  Optimized for desktop and mobile with adaptive navigation.

- 👤 **Generated User Avatars**  
  Auto-generated profile avatars based on user name/email.

## 🧾 Supported File Types

- **Documents:** `PDF`, `DOC`, `DOCX`, `CSV`, `TXT`, `XLS`, `XLSX`, and more
- **Images:** `JPG`, `JPEG`, `PNG`, `GIF`, `BMP`, `SVG`, `WEBP`
- **Video:** `MP4`, `MOV`, `MKV`, `WEBM`, `AVI`
- **Audio:** `MP3`, `WAV`, `OGG`, `FLAC`, `AAC`, and more
- **Others:** Any unsupported extension fallback

## 🛠️ Installation Guide

1. **Clone the repository**

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

4. **Run the development server**

```bash
pnpm dev
```

5. **Build and start for production**

```bash
pnpm build
pnpm start
```

## ℹ️ Notes

- Max upload size is **50MB** per file.
- File access is permission-checked for owner/shared users.
- Public links are tokenized and validated through API routes.
