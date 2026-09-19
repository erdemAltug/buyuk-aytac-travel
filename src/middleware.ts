import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);

/** Aynı host üzerinde redirect — localhost kaçışını engeller */
function redirectSameHost(
  req: NextRequest,
  pathname: string,
  search?: Record<string, string>
) {
  const url = req.nextUrl.clone();
  const host =
    req.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    req.headers.get('host') ||
    url.host;
  const protoHeader = req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const proto = protoHeader || url.protocol.replace(':', '') || 'https';

  url.protocol = `${proto}:`;
  url.host = host;
  url.pathname = pathname;
  url.search = '';
  url.hash = '';

  if (search) {
    for (const [key, value] of Object.entries(search)) {
      url.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(url);
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isLoggedIn) {
      return redirectSameHost(req, '/admin/login', { callbackUrl: pathname });
    }
    if (role !== 'admin') {
      return redirectSameHost(req, '/');
    }
  }

  if (pathname === '/admin/login' && isLoggedIn && role === 'admin') {
    return redirectSameHost(req, '/admin');
  }

  if (pathname.startsWith('/hesabim') && !isLoggedIn) {
    return redirectSameHost(req, '/giris', { callbackUrl: pathname });
  }

  if ((pathname === '/giris' || pathname === '/kayit') && isLoggedIn) {
    return redirectSameHost(req, '/hesabim');
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/hesabim/:path*', '/giris', '/kayit'],
};
