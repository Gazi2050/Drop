"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Databases, ID, Models, Query } from "node-appwrite";
import { getFileOpenUrlAbsolute, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { headers } from "next/headers";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const addNameSuffix = (fileName: string, suffix: string) => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex <= 0) return `${fileName}-${suffix}`;

  const base = fileName.slice(0, dotIndex);
  const ext = fileName.slice(dotIndex);
  return `${base}-${suffix}${ext}`;
};

const getUniqueFileName = async (
  databases: Databases,
  ownerId: string,
  desiredName: string,
) => {
  let candidate = desiredName;

  while (true) {
    const existing = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner", [ownerId]), Query.equal("name", [candidate]), Query.limit(1)],
    );

    if (existing.total === 0) return candidate;
    candidate = addNameSuffix(desiredName, Math.random().toString(36).slice(2, 7));
  }
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    // Import InputFile dynamically to avoid build issues
    const { InputFile } = await import("node-appwrite/file");
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile,
    );

    const uniqueName = await getUniqueFileName(databases, ownerId, bucketFile.name);
    const { type, extension } = getFileType(uniqueName);
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol =
      headersList.get("x-forwarded-proto") ??
      (host.includes("localhost") ? "http" : "https");
    const baseUrl = `${protocol}://${host}`;

    const fileDocument = {
      type,
      name: uniqueName,
      url: getFileOpenUrlAbsolute(
        baseUrl,
        bucketFile.$id,
        type,
        extension,
        uniqueName
      ),
      extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument,
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create file document");
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

export const getUploadJwt = async () => {
  try {
    const sessionClient = await createSessionClient();
    const currentUser = await getCurrentUser();
    if (!sessionClient || !currentUser) return parseStringify({ jwt: null });

    const jwt = await sessionClient.account.createJWT();
    return parseStringify({ jwt: jwt.jwt });
  } catch (error) {
    handleError(error, "Failed to create upload JWT");
  }
};

export const createFileDocumentFromBucketFile = async ({
  bucketFileId,
  fileName,
  size,
  ownerId,
  accountId,
  path,
}: {
  bucketFileId: string;
  fileName: string;
  size: number;
  ownerId: string;
  accountId: string;
  path: string;
}) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.$id !== ownerId) {
      throw new Error("Unauthorized file metadata creation attempt");
    }

    const uniqueName = await getUniqueFileName(databases, ownerId, fileName);
    const { type, extension } = getFileType(uniqueName);
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol =
      headersList.get("x-forwarded-proto") ??
      (host.includes("localhost") ? "http" : "https");
    const baseUrl = `${protocol}://${host}`;

    const fileDocument = {
      type,
      name: uniqueName,
      url: getFileOpenUrlAbsolute(
        baseUrl,
        bucketFileId,
        type,
        extension,
        uniqueName,
      ),
      extension,
      size,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId,
    };

    const newFile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      ID.unique(),
      fileDocument,
    );

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to create file metadata");
  }
};

const createQueries = (
  currentUser: Models.Document & { email: string },
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return parseStringify({ documents: [], total: 0 });

    const { databases } = await createAdminClient();
    const queries = createQueries(currentUser, types, searchText, sort, limit);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries,
    );

    const ownerIds = Array.from(
      new Set(
        files.documents
          .map((file) => file.owner)
          .filter((owner): owner is string => typeof owner === "string"),
      ),
    );

    let ownerNameById: Record<string, string> = {};
    if (ownerIds.length > 0) {
      const users = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("$id", ownerIds)],
      );

      ownerNameById = users.documents.reduce<Record<string, string>>((acc, user) => {
        acc[user.$id] = (user.fullName as string) || "—";
        return acc;
      }, {});
    }

    const hydratedFiles = {
      ...files,
      documents: files.documents.map((file) => {
        if (typeof file.owner === "string") {
          return {
            ...file,
            owner: {
              fullName: ownerNameById[file.owner] ?? "—",
            },
          };
        }
        return file;
      }),
    };

    return parseStringify(hydratedFiles);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to update file users");
  }
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
    );

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }

    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Failed to delete file");
  }
};

const DEFAULT_TOTAL_SPACE = {
  image: { size: 0, latestDate: "" },
  document: { size: 0, latestDate: "" },
  video: { size: 0, latestDate: "" },
  audio: { size: 0, latestDate: "" },
  other: { size: 0, latestDate: "" },
  used: 0,
  all: 2 * 1024 * 1024 * 1024,
};

export async function getTotalSpaceUsed() {
  try {
    const sessionClient = await createSessionClient();
    const currentUser = await getCurrentUser();
    if (!sessionClient || !currentUser) return parseStringify(DEFAULT_TOTAL_SPACE);

    const files = await sessionClient.databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner", [currentUser.$id])],
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024,
    };

    files.documents.forEach((file) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (error) {
    handleError(error, "Error calculating total space used");
  }
}

export const createPublicFileLink = async ({
  fileId,
  bucketFileId,
  extension,
}: {
  fileId: string;
  bucketFileId: string;
  extension?: string;
}): Promise<{ url: string } | { error: string }> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    const { databases, tokens } = await createAdminClient();

    const fileDoc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
    );

    const ownerId = fileDoc.owner as string;
    const users = (fileDoc.users as string[]) ?? [];
    const hasAccess =
      ownerId === currentUser.$id || users.includes(currentUser.email);

    if (!hasAccess) {
      return { error: "You don't have access to this file" };
    }

    const token = await tokens.createFileToken({
      bucketId: appwriteConfig.bucketId,
      fileId: bucketFileId,
    });

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol =
      headersList.get("x-forwarded-proto") ??
      (host.includes("localhost") ? "http" : "https");
    const baseUrl = `${protocol}://${host}`;

    const ext =
      extension ||
      (fileDoc.name as string)?.split(".").pop()?.toLowerCase() ||
      "";
    const params = new URLSearchParams({
      token: token.secret,
      ...(ext && { ext }),
    });
    const publicUrl = `${baseUrl}/api/files/${bucketFileId}/public?${params}`;
    return { url: publicUrl };
  } catch (error) {
    console.error("Create public link error:", error);
    return { error: "Failed to create public link" };
  }
};
