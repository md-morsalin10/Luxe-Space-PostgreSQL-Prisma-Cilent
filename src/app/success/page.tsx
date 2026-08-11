import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSessionOnServer } from '@/lib/auth-server';
import type { AuthUser } from '@/types/property';

interface SearchParams {
  session_id?: string;
}

interface BookingPayload {
  sessionId: string;
  propertyId: string;
  title: string;
  price: number;
  type: string;
  location: string;
  image: string;
  sellerId: string;
  sellerEmail: string;
  sellerName: string;
  buyerId: string;
  buyerEmail: string;
  buyerName: string;
}

async function createBookPayment(paymentData: BookingPayload): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  if (!baseUrl) {
    console.error("[success/page.tsx] NEXT_PUBLIC_URL is not configured.");
    return;
  }

  try {
    console.log("[success/page.tsx] Sending booking payload:", paymentData);
    const response = await fetch(`${baseUrl}/api/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[success/page.tsx] Backend returned error:", data);
    } else {
      console.log("[success/page.tsx] Booking recorded successfully:", data);
    }
  } catch (error) {
    console.error("[success/page.tsx] Network error calling booking API:", error);
  }
}

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  const session = await getSessionOnServer();
  const user    = session?.user as AuthUser | undefined;

  const checkoutSession  = await stripe.checkout.sessions.retrieve(session_id);
  const status           = checkoutSession.status;
  const metadata         = checkoutSession.metadata;
  const customerEmail    = checkoutSession.customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete' && metadata) {
    // Resolve buyerId: prefer what was stored in Stripe metadata (set at checkout
    // time from the session), fall back to the current session user.
    const resolvedBuyerId    = metadata.buyerId    || user?.id    || '';
    const resolvedBuyerEmail = metadata.buyerEmail || customerEmail || user?.email || '';
    const resolvedBuyerName  = metadata.buyerName  || user?.name  || '';

    if (!resolvedBuyerId) {
      // This should never happen in a normal flow, but log clearly if it does.
      console.error(
        "[success/page.tsx] Cannot create booking — buyerId is empty. " +
        "The user may not have been logged in when they initiated checkout. " +
        "Stripe session ID:", session_id
      );
    } else {
      await createBookPayment({
        sessionId:   session_id,
        propertyId:  metadata.propertyId  || '',
        title:       metadata.title       || '',
        price:       metadata.price ? Number(metadata.price) : 0,
        type:        metadata.type        || '',
        location:    metadata.location    || '',
        image:       metadata.image       || '',
        sellerId:    metadata.sellerId    || '',
        sellerEmail: metadata.sellerEmail || '',
        sellerName:  metadata.sellerName  || '',
        buyerId:     resolvedBuyerId,
        buyerEmail:  resolvedBuyerEmail,
        buyerName:   resolvedBuyerName,
      });
    }
  }

  const userRole = user?.role || 'buyer';

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#030712] px-4 py-16 text-center">
      <div className="bg-[#0B0F17]/70 border border-gray-800 rounded-3xl p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-emerald-400 mb-4">Payment Successful!</h1>
        <p className="text-gray-400 text-sm mb-6">
          Your payment has been processed. Confirmation sent to{' '}
          <span className="text-[#E5BA73]">{customerEmail || user?.email}</span>.
        </p>
        <Link
          href={`/dashboard/${userRole}`}
          className="block w-full bg-gradient-to-r from-[#E5BA73] to-[#C29B53] text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}