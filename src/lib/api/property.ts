import { protectedServerFetch, serverFetch } from "../core/server-api";
import type { Property } from "@/types/property";

export const getPropertyBySellerId = async ({ sellerId }: { sellerId: string }): Promise<Property[]> => {
    return protectedServerFetch<Property[]>(`/api/property/sellerId?sellerId=${sellerId}`);
};

export const getAllProperties = async (): Promise<Property[]> => {
    return protectedServerFetch<Property[]>(`/api/property`);
};

export const getPropertyById = async ({ propertyId }: { propertyId: string }): Promise<Property | null> => {
    return protectedServerFetch<Property>(`/api/property/${propertyId}`).catch(() => null);
};

export const getFeaturesProperty = async (): Promise<Property[]> => {
    return protectedServerFetch<Property[]>(`/api/features/properties`);
};