import { NextRequest, NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { Query } from "node-appwrite";

const MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  txt: "text/plain",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp",
  mp4: "video/mp4",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  mkv: "video/x-matroska",
  webm: "video/webm",
  m4v: "video/x-m4v",
  "3gp": "video/3gpp",
  flv: "video/x-flv",
  mp3: "audio/mpeg",
  mpeg: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  flac: "audio/flac",
  m4a: "audio/mp4",
  aac: "audio/aac",
  wma: "audio/x-ms-wma",
  aiff: "audio/aiff",
  alac: "audio/alac",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  rtf: "application/rtf",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  ppt: "application/vnd.ms-powerpoint",
  odp: "application/vnd.oasis.opendocument.presentation",
  md: "text/markdown",
  html: "text/html",
  htm: "text/html",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bucketFileId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bucketFileId } = await params;
    const ext = request.nextUrl.searchParams.get("ext")?.toLowerCase() ?? "";

    const { databases, storage } = await createAdminClient();

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("bucketFileId", [bucketFileId])]
    );

    if (files.total === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = files.documents[0];
    const ownerId = file.owner as string;
    const users = (file.users as string[]) ?? [];
    const hasAccess =
      ownerId === currentUser.$id || users.includes(currentUser.email);

    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const arrayBuffer = await storage.getFileView({
      bucketId: appwriteConfig.bucketId,
      fileId: bucketFileId,
    });

    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("File view error:", error);
    return NextResponse.json(
      { error: "Failed to load file" },
      { status: 500 }
    );
  }
}
