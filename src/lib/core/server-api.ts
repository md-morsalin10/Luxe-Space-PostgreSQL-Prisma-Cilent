export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description?: string | null;
  image?: string | null;
  status: string;
  dateUploaded: string; // backend theke ISO Date string asbe
  ownerId: string;
  owner?: PropertyOwner; 
  buyerId?: string | null;
  createdAt: string;
  updatedAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const serverFetch = async <T = Property[]>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${path}`);
  }

  return res.json() as Promise<T>;
};