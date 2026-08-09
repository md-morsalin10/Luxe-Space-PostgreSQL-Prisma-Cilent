import { getPaymentDataById } from '@/lib/api/propertyPayment';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import BookingListClient from './BookingListClient';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

// টাইপ ফিক্স করার জন্য প্রপ্স ইন্টারফেস যা ক্লায়েন্ট কম্পোনেন্টের সাথে মিলবে
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

const MyBookings = async () => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList
    });
    const user = session?.user as AuthUser | undefined;
    
    // ডাটা নিয়ে আসা হচ্ছে
    const bookedProperties = await getPaymentDataById(user?.id as string) || [];

    // 'as unknown as PaymentProperty[]' দিয়ে টাইপ ফিক্স করা হলো
    return <BookingListClient properties={bookedProperties as unknown as PaymentProperty[]} />;
};

export default MyBookings;