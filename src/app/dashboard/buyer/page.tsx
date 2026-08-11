import DashboardClient from './DashboardClient';
import { getSessionOnServer } from '@/lib/auth-server';



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
    image?: string;
    seller: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
}

const UserDashboard = async () => {
    const session = await getSessionOnServer()
    const user = session?.user as AuthUser | undefined;

    // const bookedProperties = await getPaymentDataById(user?.id as string) || [];
    const bookedProperties =  [];

    return (
        <DashboardClient 
            user={user} 
            properties={bookedProperties as unknown as PaymentProperty[]} 
        />
    );
};

export default UserDashboard;