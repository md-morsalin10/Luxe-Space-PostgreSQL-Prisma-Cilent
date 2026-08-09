import { getPropertyBySellerId } from '@/lib/api/property';
import { getPaymentDataSellerId } from '@/lib/api/propertyPayment';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import SellerDashboardClient from './SellerDashboardClient';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

const SellerDashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const seller = session?.user as AuthUser | undefined;
    const sellerId = seller?.id as string;

    // অবজেক্ট আকারে { sellerId } পাস করে প্যারালালি ডেটা ফেচিং করা হলো
    const [soldPropertiesData, allPropertiesData] = await Promise.all([
        getPaymentDataSellerId(sellerId) || [],
        getPropertyBySellerId({ sellerId }) || []
    ]);
    // সোল্ড প্রোপার্টি বা পেমেন্ট ডাটা ফরম্যাটিং
    const formattedSold = soldPropertiesData.map((s: any) => ({
        _id: typeof s._id === 'object' && s._id && '$oid' in s._id ? s._id.$oid : String(s._id || ''),
        title: s.title || '',
        price: Number(s.price || 0),
        type: s.type || 'apartment',
        location: s.location || '',
        image: s.image || '',
        buyerName: s.buyer?.name || 'Client',
        buyerEmail: s.buyer?.email || '',
        createdAt: typeof s.createdAt === 'object' && s.createdAt && '$date' in s.createdAt ? s.createdAt.$date : String(s.createdAt || '')
    }));

    // সেলারের সব প্রোপার্টি ডাটা ফরম্যাটিং
    const formattedAll = allPropertiesData.map((p: any) => ({
        _id: typeof p._id === 'object' && p._id && '$oid' in p._id ? p._id.$oid : String(p._id || ''),
        title: p.title || '',
        type: p.type || 'apartment',
        price: Number(p.price || 0),
        location: p.location || '',
        status: p.status || 'available',
        image: p.image || ''
    }));

    return (
        <SellerDashboardClient
            sellerName={seller?.name || 'Seller'}
            soldProperties={formattedSold}
            allProperties={formattedAll}
        />
    );
};

export default SellerDashboard;