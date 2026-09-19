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
    // Redirect'leri middleware.ts yönetsin — authorized:false Auth.js'in
    // yanlış host (localhost) ile redirect üretmesine yol açıyordu.
    authorized() {
      return true;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
