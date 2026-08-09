import { getUsers } from '@/lib/api/users';
import React from 'react';
import ManageUsersClient from './ManageUsersClient';

// এখানে page.tsx ফাইলের নিজস্ব টাইপ ডিফাইন করা হলো
interface LocalUser {
    _id: string | { $oid: string };
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string;
    createdAt: string | { $date: string };
    role: "buyer" | "seller" | "admin";
}

const ManageAllUsers = async () => {
    const allUsers = await getUsers() || [];

    // ম্যাপ করার পর একদম প্লেইন অবজেক্ট ফরম্যাটে রূপান্তর
    const formattedUsers = allUsers.map((user: any) => ({
        _id: typeof user._id === 'object' && user._id && '$oid' in user._id 
            ? user._id.$oid 
            : String(user._id || ''),
        name: user.name || '',
        email: user.email || '',
        emailVerified: user.emailVerified ?? false,
        image: user.image || '',
        createdAt: typeof user.createdAt === 'object' && user.createdAt && '$date' in user.createdAt 
            ? user.createdAt.$date 
            : String(user.createdAt || ''),
        role: (user.role as "buyer" | "seller" | "admin") || 'buyer'
    }));

    // 'as any' দিয়ে টাইপ কাস্ট করে পাঠানো হলো যাতে Client Component এর ইন্টারফেসের সাথে কোনো টাইপ কনফ্লিক্ট না হয়
    return <ManageUsersClient initialUsers={formattedUsers as any} />;
};

export default ManageAllUsers;