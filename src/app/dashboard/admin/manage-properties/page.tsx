import { getAllProperties } from "@/lib/api/property";
import React from "react";
import ManagePropertiesClient from "./ManagePropertiesClient";

export interface Property {
    id: string;
    title: string;
    type: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    description: string;
    image: string;
    status: "available" | "sold";
    dateUploaded: string;
    sellerId: string;
    sellerName: string;
    sellerEmail: string;
    buyerEmail?: string;
    buyerId?: string;
    buyerName?: string;
}

const ManageAllProperties = async () => {
  
    const rawData = await getAllProperties().catch(() => []);
    const properties = Array.isArray(rawData) ? rawData : [];

    const formattedProperties: Property[] = properties.map((p: any) => ({
        id: String(p._id?.$oid || p._id || p.id || ""),
        title: p.title || "",
        type: p.type || "",
        price: Number(p.price) || 0,
        location: p.location || "",
        bedrooms: Number(p.bedrooms) || 0,
        bathrooms: Number(p.bathrooms) || 0,
        area: Number(p.area) || 0,
        description: p.description || "",
        image: p.image || "",
        status: p.status?.toLowerCase() === "sold" ? "sold" : "available",
        dateUploaded: String(p.dateUploaded?.$date || p.dateUploaded || ""),
        sellerId: p.sellerId || "",
        sellerName: p.sellerName || "",
        sellerEmail: p.sellerEmail || "",
        buyerEmail: p.buyerEmail || undefined,
        buyerId: p.buyerId || undefined,
        buyerName: p.buyerName || undefined,
    }));

    return <ManagePropertiesClient initialProperties={formattedProperties} />;
};

export default ManageAllProperties;