import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getSessionOnServer } from '@/lib/auth-server';
import type { AuthUser } from '@/types/property';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const headersList = await headers();
        const origin      = headersList.get('origin');

        const session = await getSessionOnServer();
        const user    = session?.user as AuthUser | undefined;

        console.log("[/api/payment POST] Session user:", user?.id ?? "not authenticated");

        const formData = await request.formData();

        const propertyId  = formData.get("propertyId")  as string | null;
        const title       = formData.get("title")        as string | null;
        const price       = formData.get("price")        as string | null;
        const type        = formData.get("type")         as string | null;
        const location    = formData.get("location")     as string | null;
        const image       = formData.get("image")        as string | null;
        const sellerId    = formData.get("sellerId")     as string | null;
        const sellerEmail = formData.get("sellerEmail")  as string | null;
        const sellerName  = formData.get("sellerName")   as string | null;

        // buyerId is resolved from the server session — never trust client-provided value
        const buyerId    = user?.id    ?? null;
        const buyerEmail = user?.email ?? null;
        const buyerName  = user?.name  ?? null;

        console.log("[/api/payment POST] Form data:", Object.fromEntries(formData.entries()));

        // ── Validation ─────────────────────────────────────────────────────────
        if (!title || !price) {
            console.error("[/api/payment POST] Missing title or price");
            return NextResponse.json(
                { error: "Missing required fields: title or price" },
                { status: 400 }
            );
        }

        if (!propertyId) {
            console.error("[/api/payment POST] Missing propertyId");
            return NextResponse.json(
                { error: "Missing required field: propertyId" },
                { status: 400 }
            );
        }

        if (!sellerId) {
            console.error("[/api/payment POST] Missing sellerId");
            return NextResponse.json(
                { error: "Missing required field: sellerId" },
                { status: 400 }
            );
        }

        if (!buyerId) {
            console.error("[/api/payment POST] No authenticated user — cannot determine buyerId");
            return NextResponse.json(
                { error: "You must be logged in to book a property." },
                { status: 401 }
            );
        }

        const parsedPrice = Number(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            console.error("[/api/payment POST] Invalid price:", price);
            return NextResponse.json(
                { error: "Invalid price value." },
                { status: 400 }
            );
        }

        // ── Create Stripe Checkout Session ─────────────────────────────────────
        const sessionParams: Stripe.Checkout.SessionCreateParams = {
            customer_email: buyerEmail ?? undefined,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(parsedPrice * 100),
                        product_data: {
                            name:        title,
                            images:      image ? [image] : undefined,
                            description: type ? `Property Type: ${type}` : undefined,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                propertyId,
                title,
                price:       String(parsedPrice),
                type:        type        ?? '',
                location:    location    ?? '',
                image:       image       ?? '',
                sellerId,
                sellerEmail: sellerEmail ?? '',
                sellerName:  sellerName  ?? '',
                // Store buyerId in metadata so the /success page can reliably
                // retrieve it even if the session cookie is not forwarded.
                buyerId,
                buyerEmail:  buyerEmail  ?? '',
                buyerName:   buyerName   ?? '',
            },
            mode:        'payment',
            success_url: `${origin ?? ''}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:  `${origin ?? ''}/properties/${propertyId}`,
        };

        const checkoutSession = await stripe.checkout.sessions.create(sessionParams);

        if (!checkoutSession.url) {
            throw new Error("Failed to retrieve Stripe session URL.");
        }

        return NextResponse.redirect(checkoutSession.url, 303);
    } catch (err: unknown) {
        const error = err as Error & { statusCode?: number };
        console.error("[/api/payment POST] Unhandled error:", error.message);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: error.statusCode ?? 500 }
        );
    }
}
