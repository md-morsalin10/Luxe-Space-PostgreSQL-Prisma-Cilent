import { getUsers } from '@/lib/api/users';
import type { AppUser } from '@/lib/api/users';
import React from 'react';
import ManageUsersClient from './ManageUsersClient';

const ManageAllUsers = async () => {
    const allUsers: AppUser[] = await getUsers().catch((): AppUser[] => []);

    // The Prisma API returns `id` (UUID string), not `_id`.
    // Map to the shape expected by ManageUsersClient.
    const formattedUsers = allUsers.map((user) => ({
        id:            user.id,
        name:          user.name  || '',
        email:         user.email || '',
        emailVerified: user.emailVerified ?? false,
        image:         user.image || '',
        createdAt:     user.createdAt || '',
        role:          user.role as "buyer" | "seller" | "admin",
    }));

    return <ManageUsersClient initialUsers={formattedUsers as never} />;
};

export default ManageAllUsers;