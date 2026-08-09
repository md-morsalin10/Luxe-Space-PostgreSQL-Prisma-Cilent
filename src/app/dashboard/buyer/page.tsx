import { getPaymentDataById } from '@/lib/api/propertyPayment';

import { headers } from 'next/headers';
import React from 'react';
import DashboardClient from './DashboardClient';
import { useSession } from '@/lib/auth-client';


interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

interface PaymentProperty {
    _id: string;
    sessionId: string;
    propertyId: string;
    title: string;
    price: number;
    type: string;
    location: string;
    image: string;
    seller: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
}

const UserDashboard = async () => {
    const headersList = await headers();
    const session = await useSession();
    const user = session?.user as AuthUser | undefined;

    // ডাটা সার্ভার সাইড থেকে ফেচ করা হচ্ছে
    const bookedProperties = await getPaymentDataById(user?.id as string) || [];

    return (
        <DashboardClient 
            user={user} 
            properties={bookedProperties as unknown as PaymentProperty[]} 
        />
    );
};

export default UserDashboard;