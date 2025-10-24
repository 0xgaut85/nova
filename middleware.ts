import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  console.log('Middleware triggered - hostname:', hostname);
  console.log('Pathname:', request.nextUrl.pathname);
  
  // If accessing from explorer subdomain, rewrite to /explorer
  if (hostname === 'explorer.xgrain402.xyz') {
    const url = request.nextUrl.clone();
    
    console.log('Explorer subdomain detected!');
    
    // If already on /explorer path, allow it
    if (url.pathname.startsWith('/explorer')) {
      console.log('Already on /explorer, allowing...');
      return NextResponse.next();
    }
    
    // If on root path, rewrite to /explorer (not redirect)
    if (url.pathname === '/' || url.pathname === '') {
      console.log('Root path, rewriting to /explorer');
      url.pathname = '/explorer';
      return NextResponse.rewrite(url);
    }
    
    // For any other path on explorer subdomain, also rewrite to /explorer
    console.log('Other path, rewriting to /explorer');
    url.pathname = '/explorer';
    return NextResponse.rewrite(url);
  }
  
  console.log('Not explorer subdomain, passing through');
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

