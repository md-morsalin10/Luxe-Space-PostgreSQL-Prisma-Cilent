import { headers } from "next/headers";

export async function getSessionOnServer() {
    const reqHeaders = await headers();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL || "http://localhost:5000"}/api/auth/get-session`, {
            headers: {
                cookie: reqHeaders.get("cookie") || "",
            },
            cache: "no-store",
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch session on server:", error);
        return null;
    }
}