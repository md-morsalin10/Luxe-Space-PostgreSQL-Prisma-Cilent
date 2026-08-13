import { authClient } from "../auth-client";

export const getTokenFromClient = async (): Promise<string | null> => {
    const session = await authClient.getSession();
    
    return session?.data?.session?.token || null;
};