
import { verifyRole } from "@/lib/core/seassion";
import React from "react";

interface SellerLayoutProps {
  children: React.ReactNode;
}

const SellerLayout = async ({ children }: SellerLayoutProps) => {
 
  await verifyRole('seller');

  return <>{children}</>;
};

export default SellerLayout;