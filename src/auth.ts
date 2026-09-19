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
      const base = new URL(baseUrl);
      if (url.startsWith('/')) {
        return `${base.origin}${url}`;
      }
      try {
        const target = new URL(url);
        if (target.origin === base.origin) return url;
        // Yanlış host (örn. localhost) → path'i gerçek base'e taşı
        return `${base.origin}${target.pathname}${target.search}`;
      } catch {
        return base.origin;
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
    async jwt({ token, user, account, profile }) {
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
