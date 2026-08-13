import { redirect } from "next/navigation";
import { getSessionOnServer } from "../auth-server";

interface SessionUser {
  id: string;
  name?: string;
  email: string;
  role: "admin" | "seller" | "buyer";
  isSuspended?: boolean;
}

export const getUserSession = async (): Promise<SessionUser | null> => {
  const session = await getSessionOnServer()
  return (session?.user as SessionUser) || null;
};

export const getTokenFromServer = async (): Promise<SessionUser | null> => {
  const session = await getSessionOnServer()
  return (session?.session?.token as any) || null;
};

export const verifyRole = async (
  role: "admin" | "seller" | "buyer"
): Promise<void> => {
  const user = await getUserSession();
  console.log(user, "from verifyRole");

  if (!user) {
    redirect("/login");
  }

  // Block suspended users from accessing dashboards
  if ((user as any).isSuspended === true) {
    redirect("/suspended");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }
};