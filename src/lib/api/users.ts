import { serverFetch } from "../core/server-api";

export interface AppUser {
    id: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string | null;
    role: "buyer" | "seller" | "admin";
    createdAt: string;
    updatedAt?: string;
}

export const getUsers = async (): Promise<AppUser[]> => {
    return serverFetch<AppUser[]>(`/api/users`);
};