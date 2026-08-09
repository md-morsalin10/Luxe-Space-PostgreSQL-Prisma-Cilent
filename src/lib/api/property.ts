import { serverFetch } from "../core/server-api";

export const getPropertyBySellerId = async ({ sellerId }: { sellerId: string }) => {
    return await serverFetch(`/api/property?sellerId=${sellerId}`);
};

export const getAllProperties = async () => {
    return await serverFetch(`/api/property`);
};

export const getPropertyById = async ({ propertyId }: { propertyId: string }) => {
    return await serverFetch(`/api/property/${propertyId}`);
}

export const getFeaturesProperty = async () => {
    return await serverFetch(`/api/features/properties`);
}