interface Property {
  _id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  status: string;
  description: string;
  dateUploaded: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL 

export const serverFetch = async <T = Property[]>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${path}`);
    }

    return res.json() as Promise<T>;
};