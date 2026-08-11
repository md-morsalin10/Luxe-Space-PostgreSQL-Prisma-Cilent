import DashboardClient from './DashboardClient';
import { getSessionOnServer } from '@/lib/auth-server';
import { getPaymentDataByBuyerId } from '@/lib/api/propertyPayment';
import type { AuthUser, PaymentProperty } from '@/types/property';

const UserDashboard = async () => {
    const session = await getSessionOnServer();
    const user = session?.user as AuthUser | undefined;

    let bookedProperties: PaymentProperty[] = [];

    if (user?.id) {
        try {
            const data = await getPaymentDataByBuyerId(user.id);
            bookedProperties = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("[buyer/page.tsx] Failed to fetch booked properties:", error);
            // Graceful degradation: render dashboard with empty state
        }
    }

    return (
        <DashboardClient
            user={user}
            properties={bookedProperties}
        />
    );
};

export default UserDashboard;