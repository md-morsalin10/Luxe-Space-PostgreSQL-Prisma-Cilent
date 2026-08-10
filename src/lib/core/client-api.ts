"use client";

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
    dateUploaded: string;
    ownerId: string;
    owner?: PropertyOwner;
    buyerId?: string | null;
    createdAt: string;
    updatedAt: string;
}



const baseUrl = process.env.NEXT_PUBLIC_URL || "";


export const clientMutation = async (path: string, data: any) => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Mutation failed on ${path}`);
    }

    return await response.json();
};


export const clientFetch = async <T = Property[]>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${path}`);
    }

    return res.json() as Promise<T>;
};