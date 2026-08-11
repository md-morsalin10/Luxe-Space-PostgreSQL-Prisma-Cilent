// Core server fetch utility.
// Type definitions have been moved to @/types/property — import from there.
// This file keeps the `serverFetch` helper and re-exports the Property type
// so existing imports of `Property` from this path keep working.

export type { Property, Seller } from "@/types/property";

const baseUrl = process.env.NEXT_PUBLIC_URL;

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