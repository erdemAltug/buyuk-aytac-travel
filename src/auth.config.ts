import type { NextAuthConfig } from 'next-auth';
import type { UserRole } from '@/models/User';

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
    // Redirect'leri middleware.ts yönetsin
    authorized() {
      return true;
    },
    // Edge'de req.auth.user.role için şart — yoksa admin → / atılıyordu
    session({ session, token }) {
      if (session.user) {
        if (typeof token.id === 'string') session.user.id = token.id;
        if (token.role === 'admin' || token.role === 'user') {
          session.user.role = token.role as UserRole;
        }
        if (typeof token.firstName === 'string') {
          session.user.firstName = token.firstName;
        }
        if (typeof token.lastName === 'string') {
          session.user.lastName = token.lastName;
        }
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
