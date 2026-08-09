import React from 'react';
import { getAllProperties } from '@/lib/api/property';
import { getUsers } from '@/lib/api/users';
import AnalyticsClient from './AnalyticsClient';


interface PropertyData {
    _id: string;
    price: number;
    status: "available" | "sold";
    type: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
}

interface UserData {
    role: "buyer" | "seller" | "admin";
}

const Analytics = async () => {
    // ডাটা নিয়ে আসা হচ্ছে
    const [allProperties, allUsers] = await Promise.all([
        getAllProperties() || [],
        getUsers() || []
    ]);

    // ডাটা ফরম্যাটিং
    const formattedProperties: PropertyData[] = allProperties.map((p: any) => ({
        _id: typeof p._id === 'object' && p._id && '$oid' in p._id ? p._id.$oid : String(p._id || ''),
        price: Number(p.price || 0),
        status: (p.status as "available" | "sold") || 'available',
        type: p.type || 'apartment',
        area: Number(p.area || 0),
        bedrooms: Number(p.bedrooms || 0),
        bathrooms: Number(p.bathrooms || 0)
    }));

    const formattedUsers: UserData[] = allUsers.map((u: any) => ({
        role: (u.role as "buyer" | "seller" | "admin") || 'buyer'
    }));

    return (
        <AnalyticsClient 
            properties={formattedProperties} 
            users={formattedUsers} 
        />
    );
};

export default Analytics;