import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // If accessing from explorer subdomain, redirect to /explorer
  if (hostname.startsWith('explorer.')) {
    const url = request.nextUrl.clone();
    
    // If already on /explorer path, allow it
    if (url.pathname.startsWith('/explorer')) {
      return NextResponse.next();
    }
    
    // If on root path, redirect to /explorer
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/explorer';
      return NextResponse.redirect(url);
    }
    
    // For any other path, prepend /explorer
    url.pathname = `/explorer${url.pathname}`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp).*)',
  ],
};

