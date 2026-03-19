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
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
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
    const name = request.nextUrl.searchParams.get("name") ?? "download";

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

    const arrayBuffer = await storage.getFileDownload({
      bucketId: appwriteConfig.bucketId,
      fileId: bucketFileId,
    });

    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
    const filename = decodeURIComponent(name || "download");

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("File download error:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
