import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isLoggedIn) {
      const url = new URL('/admin/login', req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (pathname === '/admin/login' && isLoggedIn && role === 'admin') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (pathname.startsWith('/hesabim') && !isLoggedIn) {
    const url = new URL('/giris', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if ((pathname === '/giris' || pathname === '/kayit') && isLoggedIn) {
    return NextResponse.redirect(new URL('/hesabim', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/hesabim/:path*', '/giris', '/kayit'],
};
