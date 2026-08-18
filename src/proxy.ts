import { NextRequest, NextResponse } from 'next/server'
import { getUserSession } from './lib/core/seassion'

export async function proxy(request: NextRequest) { 
    const { pathname } = request.nextUrl
    const isDashboardRoute = pathname.startsWith('/dashboard')

    // Allow access to the explore properties page without login
    if (pathname === '/properties') {
        return NextResponse.next()
    }

    const session = await getUserSession()


    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const userRole = (session as any)?.user?.role || (session as any)?.role;


    if (isDashboardRoute) {

    
        if (userRole === "buyer" && !pathname.startsWith('/dashboard/buyer')) {
            return NextResponse.redirect(new URL('/dashboard/buyer', request.url))
        }

        if (userRole === "seller" && !pathname.startsWith('/dashboard/seller')) {
            return NextResponse.redirect(new URL('/dashboard/seller', request.url))
        }
  
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