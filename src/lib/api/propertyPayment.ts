import { protectedServerFetch, serverFetch } from "../core/server-api";
import type { Booking } from "@/types/property";

export const getPaymentDataByBuyerId = async (buyerId: string): Promise<Booking[]> => {
    return protectedServerFetch<Booking[]>(`/api/payment/buyerId?buyerId=${buyerId}`);
};

export const getPaymentDataBySellerId = async (sellerId: string): Promise<Booking[]> => {
    return protectedServerFetch<Booking[]>(`/api/payment/sellerId?sellerId=${sellerId}`);
};