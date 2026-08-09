import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import BuyerProfileClient from './BuyerProfileClient';


interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

const MyProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user as AuthUser | undefined;

    return <BuyerProfileClient user={user} />;
};

export default MyProfile;