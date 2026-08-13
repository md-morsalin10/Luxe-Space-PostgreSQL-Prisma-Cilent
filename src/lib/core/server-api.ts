import { getTokenFromServer } from "./seassion";


export type { Property, Seller } from "@/types/property";

const baseUrl = process.env.NEXT_PUBLIC_URL;


const ServerAuthHeader = async () => {
  const token = await getTokenFromServer()
  const headers = {
    authorization: `Bearer ${token}`
  }
  return token ? headers : {}
}

export const serverFetch = async <T = unknown>(path: string): Promise<T> => {
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_URL environment variable is not set. Cannot fetch from the API server."
    );
  }

  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch from ${path} — HTTP ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
};