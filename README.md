# Drop - Storage Management App

![Drop Hero](https://ik.imagekit.io/uc8ejfj1j/drop-folder/readme-hero_zCOqLXkV61.png)

Drop is a full-stack file storage and management app built with Next.js and Appwrite. It supports OTP authentication, file uploads with progress UI, search, sharing, public links, and storage analytics by file type.

## Features

- OTP-based authentication (email token + verification flow)
- Protected app routes for authenticated users
- Upload files with drag-and-drop and per-file progress UI
- Auto-rename duplicate file names per user (e.g. `img01-a3end.png`)
- Browse files by category: Documents, Images, Video, Audio, Others
- Sort files by created date, name, and size
- Global file search with debounced results
- File actions: rename, details, share, make public, download, delete
- Public link generation for files via tokenized endpoint
- Storage summary and charts (used vs total, by type)
- Responsive UI for desktop and mobile navigation
- Generated user avatars with DiceBear

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Radix UI
- Appwrite (Auth, Database, Storage, Tokens)
- Recharts / Chart.js
- react-dropzone

## Project Structure

- `app/(auth)` - sign-in / sign-up routes and auth layout
- `app/(root)` - authenticated app routes (dashboard + type pages)
- `app/api/files/*` - secure file view/download/public APIs
- `components` - UI and feature components (uploader, search, dropdown actions, charts)
- `lib/actions` - server actions for users and files
- `lib/appwrite` - Appwrite clients and config
- `lib/utils.ts` - utility functions and file-type helpers

## Getting Started

1. Clone the project

```bash
git clone https://github.com/Gazi2050/Drop.git
cd Drop
```

2. Install dependencies

```bash
pnpm install
```

3. Create `.env.local` and set your Appwrite variables:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_APPWRITE_KEY=
```

4. Run development server

```bash
pnpm dev
```

5. Build for production

```bash
pnpm build
pnpm start
```

## Notes

- Max upload size is `50MB` per file.
- File access is permission-checked for owner/shared users.
- Public file links are token-based.

## License

This project is for educational and personal development use unless otherwise specified.