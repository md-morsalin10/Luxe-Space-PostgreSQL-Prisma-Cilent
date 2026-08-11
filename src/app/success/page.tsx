import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { headers } from 'next/headers';
import { getSessionOnServer } from '@/lib/auth-server';

interface SearchParams {
  session_id?: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role?: "buyer" | "seller" | "admin";
}


async function createBookPayment(paymentData: any) {
  try {
   console.log("Sending Payment Data:", paymentData);
    const baseUrl = process.env.NEXT_PUBLIC_URL

    const response = await fetch(`${baseUrl}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    console.log("Backend Response:", data);
    return data;
  } catch (error) {
    console.error("Error calling backend payment API:", error);
    return null;
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

  const headersList = await headers();
  const session = await getSessionOnServer()
  const user = session?.user as AuthUser | undefined;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  const status = checkoutSession.status;
  const metadata = checkoutSession.metadata;
  const customerEmail = checkoutSession.customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete' && metadata) {
    await createBookPayment({
      sessionId: session_id,
      propertyId: metadata.propertyId || "",
      title: metadata.title || "",
      price: metadata.price ? Number(metadata.price) : 0,
      type: metadata.type || "",
      location: metadata.location || "",
      image: metadata.image || "",
      sellerId: metadata.sellerId || "",
      sellerEmail: metadata.sellerEmail || "",
      sellerName: metadata.sellerName || "",
      buyerId: metadata.buyerId || user?.id || "",
      buyerEmail: metadata.buyerEmail || customerEmail || user?.email || "",
      buyerName: metadata.buyerName || user?.name || "",
    });
  }

  const userRole = user?.role || 'buyer';

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#030712] px-4 py-16 text-center">
      <div className="bg-[#0B0F17]/70 border border-gray-800 rounded-3xl p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-emerald-400 mb-4">Payment Successful!</h1>
        <p className="text-gray-400 text-sm mb-6">
          Your payment has been processed. Confirmation sent to <span className="text-[#E5BA73]">{customerEmail || user?.email}</span>.
        </p>
        <Link href={`/dashboard/${userRole}`} className="block w-full bg-gradient-to-r from-[#E5BA73] to-[#C29B53] text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}