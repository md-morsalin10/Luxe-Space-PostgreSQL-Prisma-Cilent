import { serverFetch } from "../core/server-api";

export const getPaymentDataById = async (userId: string) => {
    return serverFetch(`/api/payment?userId=${userId}`);
}

export const getPaymentDataSellerId = async (sellerId: string) => {
    return serverFetch(`/api/payment?sellerId=${sellerId}`);
}