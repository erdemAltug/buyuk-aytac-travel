import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import type { UserRole } from '@/models/User';
import { authConfig } from '@/auth.config';

const googleConfigured =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === 'string'
            ? credentials.email.trim().toLowerCase()
            : '';
        const password =
          typeof credentials?.password === 'string' ? credentials.password : '';

        if (!email || !password) {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user || !user.passwordHash) {
          return null;
        }

        if (user.isActive === false) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          role: user.role as UserRole,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async redirect({ url, baseUrl }) {
      const resolveOrigin = () => {
        try {
          const base = new URL(baseUrl);
          const local =
            base.hostname === 'localhost' ||
            base.hostname === '127.0.0.1' ||
            base.hostname === '::1';
          if (!local) {
            if (base.port === '3000') base.port = '';
            return base.origin;
          }
        } catch {
          /* ignore */
        }
        for (const raw of [
          process.env.AUTH_URL,
          process.env.NEXTAUTH_URL,
          process.env.NEXT_PUBLIC_SITE_URL,
        ]) {
          if (!raw) continue;
          try {
            const u = new URL(raw);
            if (
              u.hostname !== 'localhost' &&
              u.hostname !== '127.0.0.1'
            ) {
              return u.origin;
            }
          } catch {
            /* ignore */
          }
        }
        if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
          return 'https://www.buyukaytactravel.com';
        }
        return baseUrl;
      };

      const origin = resolveOrigin();

      if (url.startsWith('/')) {
        return `${origin}${url}`;
      }

      try {
        const target = new URL(url);
        return `${origin}${target.pathname}${target.search}`;
      } catch {
        return origin;
      }
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const email = user.email?.toLowerCase();
        if (!email) return false;
        await dbConnect();
        const existing = await User.findOne({ email }).select('isActive');
        if (existing && existing.isActive === false) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === 'update' && session) {
        if (typeof session.firstName === 'string') {
          token.firstName = session.firstName;
        }
        if (typeof session.lastName === 'string') {
          token.lastName = session.lastName;
        }
        return token;
      }

      if (account?.provider === 'google' && (user?.email || profile?.email)) {
        const email = (user?.email || profile?.email || '').toLowerCase();
        await dbConnect();

        let dbUser = await User.findOne({ email });
        if (!dbUser) {
          const fullName =
            user?.name ||
            (typeof profile?.name === 'string' ? profile.name : '') ||
            '';
          const parts = fullName.trim().split(/\s+/).filter(Boolean);
          const firstName = parts[0] || 'Misafir';
          const lastName = parts.slice(1).join(' ') || 'Kullanıcı';

          dbUser = await User.create({
            email,
            firstName,
            lastName,
            role: 'user',
            emailVerified: true,
            isActive: true,
          });
        }

        if (dbUser.isActive === false) {
          return token;
        }

        token.id = dbUser._id.toString();
        token.role = dbUser.role as UserRole;
        token.firstName = dbUser.firstName;
        token.lastName = dbUser.lastName;
        token.email = dbUser.email;
        return token;
      }

      if (user) {
        token.id = user.id ?? '';
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
