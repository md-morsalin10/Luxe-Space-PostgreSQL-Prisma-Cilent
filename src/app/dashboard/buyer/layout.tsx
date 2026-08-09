
import { verifyRole } from "@/lib/core/seassion";
import React from "react";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

const BuyerLayout = async ({ children }: BuyerLayoutProps) => {
 
  await verifyRole('buyer');

  return <>{children}</>;
};

export default BuyerLayout;