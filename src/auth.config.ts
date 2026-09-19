import type { NextAuthConfig } from 'next-auth';

/** Edge-safe config (middleware). DB / OAuth callbacks live in auth.ts */
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/giris',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        return isLoggedIn && role === 'admin';
      }
      if (pathname.startsWith('/hesabim')) {
        return isLoggedIn;
      }
      return true;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
