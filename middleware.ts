import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the actual hostname - Vercel uses x-forwarded-host
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = request.headers.get('host');
  const hostname = forwardedHost || host || '';
  
  console.log('=== MIDDLEWARE DEBUG ===');
  console.log('x-forwarded-host:', forwardedHost);
  console.log('host:', host);
  console.log('Final hostname:', hostname);
  console.log('Pathname:', request.nextUrl.pathname);
  console.log('Full URL:', request.url);
  
  // Check if we're on the explorer subdomain
  const isExplorerSubdomain = hostname.startsWith('explorer.') || hostname === 'explorer.xgrain402.xyz';
  
  console.log('Is explorer subdomain?', isExplorerSubdomain);
  
  if (isExplorerSubdomain) {
    console.log('✅ Explorer subdomain detected!');
    
    // If already on /explorer path, allow it
    if (request.nextUrl.pathname.startsWith('/explorer')) {
      console.log('Already on /explorer path, allowing...');
      return NextResponse.next();
    }
    
    // Rewrite root to /explorer, preserving search params
    console.log('Rewriting to /explorer');
    const url = new URL('/explorer', request.url);
    // Preserve query parameters if any
    url.search = request.nextUrl.search;
    return NextResponse.rewrite(url);
  }
  
  console.log('Not explorer subdomain, passing through normally');
  console.log('========================');
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

