import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) { 
    const { pathname } = request.nextUrl
    const isDashboardRoute = pathname.startsWith('/dashboard')

   
    const session = await auth.api.getSession({
        headers: await headers(),
        query: isDashboardRoute ? { disableCookieCache: true } : {}
    })

   
    
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // ড্যাশবোর্ড রাউটের জন্য রোল-ভিত্তিক প্রোটেকশন লজিক
    if (isDashboardRoute) {
        const role = session?.user?.role;

        // Buyer / Reader রোল প্রোটেকশন
        if ((role === "buyer") && !pathname.startsWith('/dashboard/buyer')) {
            return NextResponse.redirect(new URL('/dashboard/buyer', request.url))
        }

        // Seller / Writer রোল প্রোটেকশন
        if ((role === "seller") && !pathname.startsWith('/dashboard/seller')) {
            return NextResponse.redirect(new URL('/dashboard/seller', request.url))
        }

    
        if (role === "admin" && !pathname.startsWith('/dashboard/admin')) {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
    }

    return NextResponse.next()
}



export const config = {
    matcher: [
        '/properties/:id', 
        '/properties/:id/:slug', 
        '/dashboard/:path*' 
    ],
}