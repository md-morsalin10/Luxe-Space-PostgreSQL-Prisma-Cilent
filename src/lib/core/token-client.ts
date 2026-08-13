import { authClient } from "../auth-client";

export const getTokenFromClient = async (): Promise<string | null> => {
    // Hook-এর বদলে সরাসরি getSession() Method ব্যবহার
    const session = await authClient.getSession();
    
    return session?.data?.session?.token || null;
};