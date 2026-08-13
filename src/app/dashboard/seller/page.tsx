import { getPropertyBySellerId } from '@/lib/api/property';
import { getPaymentDataBySellerId } from '@/lib/api/propertyPayment';
import SellerDashboardClient from './SellerDashboardClient';
import { getSessionOnServer } from '@/lib/auth-server';
import type { AuthUser, SoldProperty, AllProperty } from '@/types/property';



const SellerDashboard = async () => {
    const session = await getSessionOnServer();
    if (!session) {
        return null;
    }
 

    const seller   = session?.user as AuthUser | undefined;
    const sellerId = seller?.id as string;

    // Fetch sold bookings and all listed properties in parallel
    const [soldData, allPropertiesData] = await Promise.all([
        getPaymentDataBySellerId(sellerId).catch((err) => {
            console.error("[seller/page.tsx] Failed to fetch sold properties:", err);
            return [];
        }),
        getPropertyBySellerId({ sellerId }).catch((err) => {
            console.error("[seller/page.tsx] Failed to fetch all properties:", err);
            return [];
        }),
    ]);

    // Map Booking records to SoldProperty shape for SellerDashboardClient
    const formattedSold: SoldProperty[] = soldData.map((s) => ({
        id:         s.id,
        title:      s.title,
        price:      Number(s.price || 0),
        type:       s.type || 'apartment',
        location:   s.location || '',
        image:      s.image || null,
        buyerName:  s.buyerName || 'Client',
        buyerEmail: s.buyerEmail || '',
        createdAt:  s.createdAt || '',
    }));

    // Map Property records to AllProperty shape for SellerDashboardClient
    const formattedAll: AllProperty[] = allPropertiesData.map((p) => ({
        id:       p.id,
        title:    p.title || '',
        type:     p.type || 'apartment',
        price:    Number(p.price || 0),
        location: p.location || '',
        status:   p.status || 'available',
        image:    p.image || null,
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