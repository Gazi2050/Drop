"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { generateAvatarFromName, parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { avatarPlaceholderUrl } from "@/constants";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])],
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }): Promise<string | void> => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send an OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: generateAvatarFromName(fullName || email),
        accountId,
      },
    );
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}): Promise<{ sessionId: string } | void> => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  try {
    const client = await createSessionClient();
    if (!client) return null;

    const { databases, account } = client;
    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)],
    );

    if (user.total <= 0) return null;

    const currentUser = user.documents[0] as {
      $id: string;
      fullName?: string;
      email?: string;
      avatar?: string;
    };

    const needsGeneratedAvatar =
      !currentUser.avatar || currentUser.avatar === avatarPlaceholderUrl;
    const hasLegacyDicebearSvg =
      typeof currentUser.avatar === "string" &&
      currentUser.avatar.includes("api.dicebear.com") &&
      currentUser.avatar.includes("/svg?");

    if (needsGeneratedAvatar || hasLegacyDicebearSvg) {
      const generatedAvatar = generateAvatarFromName(
        currentUser.fullName || currentUser.email || result.email,
      );

      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        currentUser.$id,
        {
          avatar: generatedAvatar,
        },
      );

      return parseStringify(updatedUser);
    }

    return parseStringify(currentUser);
  } catch {
    return null;
  }
};

export const signOutUser = async (_formData?: FormData) => {
  try {
    const client = await createSessionClient();
    if (client) {
      await client.account.deleteSession("current");
    }
  } catch {
    // Ignore if session already invalid
  } finally {
    (await cookies()).delete("appwrite-session");
    redirect("/sign-in");
  }
};

export const signInUser = async ({ email }: { email: string }): Promise<{ accountId: string | null; error?: string } | void> => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
