import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin paneline erişim kontrolü
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasına erişime izin ver
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Ana admin sayfasına erişime izin ver (key olmadan)
    if (request.nextUrl.pathname === '/admin') {
      return NextResponse.next();
    }
    
    // Diğer admin sayfaları için anahtar kontrolü
    const adminKey = request.nextUrl.searchParams.get('key');
    
    // Admin anahtarı kontrolü
    if (adminKey !== 'kartap2025') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 