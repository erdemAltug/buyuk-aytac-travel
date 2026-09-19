import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);

const PROD_ORIGIN = 'https://www.buyukaytactravel.com';

function isLocalHost(host: string) {
  const h = host.split(':')[0]?.toLowerCase() || '';
  return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '';
}

function originFromEnv(): string | null {
  for (const raw of [
    process.env.AUTH_URL,
    process.env.NEXTAUTH_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]) {
    if (!raw) continue;
    try {
      const u = new URL(raw);
      if (!isLocalHost(u.hostname)) return u.origin;
    } catch {
      /* ignore */
    }
  }

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '').split('/')[0];
    if (host && !isLocalHost(host)) return `https://${host}`;
  }

  return null;
}

/** Public site origin — asla prod'da localhost dönmesin */
function publicOrigin(req: NextRequest): string {
  const xfHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const hostHdr = req.headers.get('host')?.split(',')[0]?.trim();
  const xfProto = req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const candidate = xfHost || hostHdr || '';

  if (candidate && !isLocalHost(candidate)) {
    const proto = xfProto || 'https';
    try {
      const u = new URL(`${proto}://${candidate}`);
      if (u.port === '3000') u.port = '';
      return u.origin;
    } catch {
      /* fall through */
    }
  }

  const fromEnv = originFromEnv();
  if (fromEnv) return fromEnv;

  // Vercel/edge bazen nextUrl'i localhost verir — production'da sabit origin
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    return PROD_ORIGIN;
  }

  return req.nextUrl.origin;
}

function redirectTo(
  req: NextRequest,
  pathname: string,
  search?: Record<string, string>
) {
  const url = new URL(pathname, publicOrigin(req));
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
      return redirectTo(req, '/admin/login', { callbackUrl: pathname });
    }
    if (role !== 'admin') {
      return redirectTo(req, '/');
    }
  }

  if (pathname === '/admin/login' && isLoggedIn && role === 'admin') {
    return redirectTo(req, '/admin');
  }

  if (pathname.startsWith('/hesabim') && !isLoggedIn) {
    return redirectTo(req, '/giris', { callbackUrl: pathname });
  }

  if ((pathname === '/giris' || pathname === '/kayit') && isLoggedIn) {
    return redirectTo(req, '/hesabim');
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/hesabim/:path*', '/giris', '/kayit'],
};
