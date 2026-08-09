
import { verifyRole } from "@/lib/core/seassion";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
 
  await verifyRole('admin');

  return <>{children}</>;
};

export default AdminLayout;