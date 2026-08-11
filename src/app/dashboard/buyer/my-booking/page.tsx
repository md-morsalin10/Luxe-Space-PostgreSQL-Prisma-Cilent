import { headers } from 'next/headers';
import BookingListClient from './BookingListClient';
import { getSessionOnServer } from '@/lib/auth-server';
import { getPaymentDataByBuyerId } from '@/lib/api/propertyPayment';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

export interface PaymentProperty {
    id: string;
    _id?: string;
    sessionId: string;
    propertyId: string;
    title: string;
    price: number;
    type: string;
    location: string;
    image: string;
    sellerId?: string;
    sellerEmail?: string;
    sellerName?: string;
    createdAt: string;
}

const MyBookings = async () => {
    const session = await getSessionOnServer();
    const user = session?.user as AuthUser | undefined;

    if (!user?.id) {
        return <BookingListClient properties={[]} />;
    }

    const bookedProperties = (await getPaymentDataByBuyerId(user.id)) || [];

    return (
        <BookingListClient
            properties={bookedProperties as unknown as PaymentProperty[]}
        />
    );
};

export default MyBookings;