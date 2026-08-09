import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');

        // ১. এটি আপনার অথ সেশন (নাম অপরিবর্তিত থাকল)
        const session = await auth.api.getSession({
            headers: headersList
        });
        const user = session?.user as AuthUser | undefined;

        console.log("=== CHECKING USER SESSION DETAILS ===", user);

        const formData = await request.formData();

        const propertyId = formData.get("propertyId") as string | null;
        const title = formData.get("title") as string | null;
        const price = formData.get("price") as string | null;
        const type = formData.get("type") as string | null;
        const location = formData.get("location") as string | null;
        const image = formData.get("image") as string | null;

        const sellerId = formData.get("sellerId") as string | null;
        const sellerEmail = formData.get("sellerEmail") as string | null;
        const sellerName = formData.get("sellerName") as string | null;

        const buyerId = user?.id || (formData.get("buyerId") as string | null);
        const buyerEmail = user?.email || (formData.get("buyerEmail") as string | null);
        const buyerName = user?.name || (formData.get("buyerName") as string | null);

        console.log("=== CHECKING FORM DATA ===", Object.fromEntries(formData.entries()));

        if (!title || !price) {
            return NextResponse.json({ error: "Missing required fields: title or price" }, { status: 400 });
        }

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
            customer_email: buyerEmail || undefined,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(Number(price) * 100),
                        product_data: {
                            name: title,
                            images: image ? [image] : undefined,
                            description: type ? `Property Type: ${type}` : undefined,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                propertyId: propertyId || "",
                title: title,
                price: price,
                type: type || "",
                location: location || "",
                image: image || "",
                sellerId: sellerId || "",
                sellerEmail: sellerEmail || "",
                sellerName: sellerName || "",
                buyerId: buyerId || "",
                buyerEmail: buyerEmail || "",
                buyerName: buyerName || "",
            },
            mode: 'payment',
            success_url: `${origin || ""}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin || ""}/properties/${propertyId || ""}`,
        };

        // ২. এখানে নাম পরিবর্তন করে checkoutSession করা হয়েছে যেন সংঘর্ষ না হয়
        const checkoutSession = await stripe.checkout.sessions.create(sessionParams);

        if (!checkoutSession.url) {
            throw new Error("Failed to retrieve Stripe session URL.");
        }

        return NextResponse.redirect(checkoutSession.url, 303);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: err.statusCode || 500 }
        );
    }
}
