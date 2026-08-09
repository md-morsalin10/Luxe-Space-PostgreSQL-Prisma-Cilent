import { getAllProperties } from '@/lib/api/property';
import React from 'react';
import ManagePropertiesClient from './ManagePropertiesClient';

interface Property {
    _id: string;
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
    const allProperties = await getAllProperties() || [];

    // টাইপ সেফটি এবং ক্লিয়ার অবজেক্ট ফরম্যাটিং
    const formattedProperties: Property[] = allProperties.map((property: any) => ({
        _id: typeof property._id === 'object' && property._id && '$oid' in property._id 
            ? property._id.$oid 
            : String(property._id || ''),
        title: property.title || '',
        type: property.type || '',
        price: Number(property.price || 0),
        location: property.location || '',
        bedrooms: Number(property.bedrooms || 0),
        bathrooms: Number(property.bathrooms || 0),
        area: Number(property.area || 0),
        description: property.description || '',
        image: property.image || '',
        status: (property.status as "available" | "sold") || 'available',
        dateUploaded: typeof property.dateUploaded === 'object' && property.dateUploaded && '$date' in property.dateUploaded 
            ? property.dateUploaded.$date 
            : String(property.dateUploaded || ''),
        sellerId: property.sellerId || '',
        sellerName: property.sellerName || '',
        sellerEmail: property.sellerEmail || '',
        buyerEmail: property.buyerEmail || undefined,
        buyerId: property.buyerId || undefined,
        buyerName: property.buyerName || undefined,
    }));

    return <ManagePropertiesClient initialProperties={formattedProperties} />;
};

export default ManageAllProperties;