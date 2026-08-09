import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "../auth-client"; // আপনার authClient ইম্পোর্ট করুন

interface SessionUser {
  id: string;
  name?: string;
  email: string;
  role: "admin" | "seller" | "buyer";
}

export const getUserSession = async (): Promise<SessionUser | null> => {
  // Server-side এ headers পাস করেgetSession নিতে হয়
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (session?.user as SessionUser) || null;
};

export const verifyRole = async (
  role: "admin" | "seller" | "buyer"
): Promise<void> => {
  const user = await getUserSession();
  console.log(user, "from verifyRole");

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }
};