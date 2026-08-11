import React from 'react';
import { getAllProperties } from '@/lib/api/property';
import { getUsers } from '@/lib/api/users';
import AnalyticsClient from './AnalyticsClient';
import type { Property } from '@/types/property';
import type { AppUser } from '@/lib/api/users';

interface PropertyData {
    id: string;
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
    const [allProperties, allUsers] = await Promise.all([
        getAllProperties().catch((): Property[] => []),
        getUsers().catch((): AppUser[] => []),
    ]);

    const formattedProperties: PropertyData[] = allProperties.map((p) => ({
        id:        p.id,
        price:     Number(p.price || 0),
        status:    (p.status as "available" | "sold") || 'available',
        type:      p.type || 'apartment',
        area:      Number(p.area || 0),
        bedrooms:  Number(p.bedrooms || 0),
        bathrooms: Number(p.bathrooms || 0),
    }));

    const formattedUsers: UserData[] = allUsers.map((u) => ({
        role: (u.role as "buyer" | "seller" | "admin") || 'buyer',
    }));

    return (
        <AnalyticsClient
            properties={formattedProperties}
            users={formattedUsers}
        />
    );
};

export default Analytics;