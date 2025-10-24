import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // If accessing from explorer subdomain, rewrite to /explorer
  if (hostname.includes('explorer.xgrain402.xyz') || hostname.includes('explorer.')) {
    const url = request.nextUrl.clone();
    
    // If already on /explorer path, allow it
    if (url.pathname.startsWith('/explorer')) {
      return NextResponse.next();
    }
    
    // If on root path, rewrite to /explorer (not redirect)
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/explorer';
      return NextResponse.rewrite(url);
    }
    
    // For any other path on explorer subdomain, also rewrite to /explorer
    url.pathname = '/explorer';
    return NextResponse.rewrite(url);
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp|.*\\.mp4).*)',
  ],
};

