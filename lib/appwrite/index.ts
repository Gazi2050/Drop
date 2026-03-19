"use server";

import { Account, Databases, Client, Storage, Tokens } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export type SessionClient = {
  get account(): Account;
  get databases(): Databases;
};

export const createSessionClient = async (): Promise<SessionClient | null> => {
  const session = (await cookies()).get("appwrite-session");
  if (!session?.value) return null;

  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get tokens() {
      return new Tokens(client);
    },
  };
};
