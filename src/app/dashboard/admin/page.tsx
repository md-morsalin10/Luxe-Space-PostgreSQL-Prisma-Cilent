import { getAllProperties } from "@/lib/api/property";
import AdminDashboardClient from "./AdminDashboardClient";
import { getUsers } from "@/lib/api/users";

const AdminPage = async () => {
    // ডাটাবেজ থেকে ডেটা নিয়ে আসা
    const [allProperties, allUsers] = await Promise.all([
        getAllProperties() || [],
        getUsers() || []
    ]);

    const formattedProperties = allProperties.map((p: any) => ({
        price: Number(p.price || 0),
        status: p.status || 'available',
        type: p.type || 'apartment'
    }));

    // ফিক্স: মঙ্গোডিবির নেস্টেড $oid থেকে আইডি এক্সট্র্যাক্ট করা হচ্ছে
    const formattedUsers = allUsers.map((p: any) => {
        let userId = "";
        if (p._id) {
            userId = typeof p._id === 'object' && p._id.$oid ? p._id.$oid : p._id.toString();
        } else if (p.id) {
            userId = p.id.toString();
        }

        return {
            _id: userId, 
            name: p.name || "",
            email: p.email || "",
            role: p.role || "buyer"
        };
    });

    return (
        <AdminDashboardClient 
            properties={formattedProperties} 
            users={formattedUsers} 
        />
    );
};

export default AdminPage;