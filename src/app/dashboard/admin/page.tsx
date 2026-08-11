import { getAllProperties } from "@/lib/api/property";
import AdminDashboardClient from "./AdminDashboardClient";
import { getUsers } from "@/lib/api/users";
import type { Property } from "@/types/property";
import type { AppUser } from "@/lib/api/users";

const AdminPage = async () => {
    const [allProperties, allUsers] = await Promise.all([
        getAllProperties().catch((): Property[] => []),
        getUsers().catch((): AppUser[] => [])
    ]);

    const formattedProperties = allProperties.map((p) => ({
        price:  Number(p.price || 0),
        status: String(p.status || 'available').toLowerCase(),
        type:   p.type || 'apartment',
    }));

    const formattedUsers = allUsers.map((u) => ({
        id:    u.id   || '',
        name:  u.name || 'Anonymous User',
        email: u.email || '',
        role:  u.role  || 'buyer',
    }));

    return (
        <AdminDashboardClient
            properties={formattedProperties}
            users={formattedUsers}
        />
    );
};

export default AdminPage;