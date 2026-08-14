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
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`serverFetch failed: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};

export const protectedServerFetch = async <T = unknown>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: await ServerAuthHeader()
  });

  if (!res.ok) {
    throw new Error(`protectedServerFetch failed: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};