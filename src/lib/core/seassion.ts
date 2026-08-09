import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";


interface SessionUser {
  id: string;
  name?: string;
  email: string;
  role: "admin" | "seller" | "buyer";
}


export const getUserSession = async (): Promise<SessionUser | null> => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (session?.user as SessionUser) || null;
}


export const verifyRole = async (role: "admin" | "seller" | "buyer"): Promise<void> => {
  const user = await getUserSession();
  console.log(user, "from verifyRole");


  if (!user) {
    redirect("/login");
  }


  if (user.role !== role) {
    redirect("/unauthorized");
  }
}