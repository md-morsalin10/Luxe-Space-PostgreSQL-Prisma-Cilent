import { NextRequest, NextResponse } from 'next/server'
import { getUserSession } from './lib/core/seassion'

export async function proxy(request: NextRequest) { 
    const { pathname } = request.nextUrl
    const isDashboardRoute = pathname.startsWith('/dashboard')

    // সেশন গেট করা
    const session = await getUserSession()

    // ১. লগইন না থাকলে /login-এ রিডাইরেক্ট
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // ২. TypeScript Type Fix: session থেকেই সরাসরি role বা user বের করা
    // session-এর স্ট্রাকচার অনুযায়ী session.user?.role অথবা session.role ব্যবহার করতে পারেন
    const userRole = (session as any)?.user?.role || (session as any)?.role;

    // ৩. ড্যাশবোর্ড রোল-ভিত্তিক প্রোটেকশন
    if (isDashboardRoute) {

        // Buyer প্রোটেকশন
        if (userRole === "buyer" && !pathname.startsWith('/dashboard/buyer')) {
            return NextResponse.redirect(new URL('/dashboard/buyer', request.url))
        }

        // Seller প্রোটেকশন
        if (userRole === "seller" && !pathname.startsWith('/dashboard/seller')) {
            return NextResponse.redirect(new URL('/dashboard/seller', request.url))
        }

        // Admin প্রোটেকশন
        if (userRole === "admin" && !pathname.startsWith('/dashboard/admin')) {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/properties/:id*', 
        '/dashboard/:path*' 
    ],
}