import { NextRequest, NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite";

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
  md: "text/markdown",
  html: "text/html",
  htm: "text/html",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bucketFileId: string }> }
) {
  try {
    const { bucketFileId } = await params;
    const token = request.nextUrl.searchParams.get("token");
    const ext = request.nextUrl.searchParams.get("ext")?.toLowerCase() ?? "";

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const { storage } = await createAdminClient();

    const arrayBuffer = await storage.getFileView({
      bucketId: appwriteConfig.bucketId,
      fileId: bucketFileId,
      token,
    });

    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    const viewableExtensions = new Set([
      "pdf", "txt", "jpg", "jpeg", "png", "gif", "bmp", "svg", "webp",
      "mp4", "avi", "mov", "mkv", "webm", "m4v", "3gp", "flv",
      "mp3", "mpeg", "wav", "ogg", "flac", "m4a", "aac", "wma", "aiff", "alac",
      "md", "html", "htm",
    ]);
    const disposition = viewableExtensions.has(ext)
      ? "inline"
      : "attachment";

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": disposition,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Public file view error:", error);
    return NextResponse.json(
      { error: "Invalid or expired link" },
      { status: 403 }
    );
  }
}
