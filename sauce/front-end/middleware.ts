import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value
  const isLoginPage = request.nextUrl.pathname === '/loginPage'
  const is3DPage = request.nextUrl.pathname.startsWith('/3Dpage')

  // If no token and not on login page, redirect to login
  if (!token && isLoginPage) {
    return NextResponse.redirect(new URL('/3Dpage', request.url))
  }

  // If has token and on login page, redirect to 3D page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/3Dpage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
