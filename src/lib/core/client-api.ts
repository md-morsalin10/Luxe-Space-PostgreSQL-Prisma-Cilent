"use client";

import { getTokenFromClient } from "./token-client";

export interface PropertySeller {
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
    sellerId: string;
    seller?: PropertySeller;
    buyerId?: string | null;
    createdAt: string;
    updatedAt: string;
}



const baseUrl = process.env.NEXT_PUBLIC_URL || "";


export const ClientAuthHeader = async () => {
    const token = await getTokenFromClient()
    const headers = {
        authorization: `Bearer ${token}`
    }
    return token ? headers : {}
}


export const clientMutation = async (path: string, data: any) => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ... await ClientAuthHeader()
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {

        const errorData = await response.json().catch(() => null);
        console.error("Backend Response Error:", errorData);
        throw new Error(errorData?.message || `Mutation failed on ${path}`);
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