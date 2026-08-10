import { headers } from "next/headers";

export async function getSessionOnServer() {
    const reqHeaders = await headers();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/get-session`, {
        headers: {
            cookie: reqHeaders.get("cookie") || "",
        },
        cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
}