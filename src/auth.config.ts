import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/db';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token?.id as string || '';
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/samples');
      if (isOnDashboard) {
        if (isLoggedIn) {
          Response.redirect(new URL('/samples', nextUrl));
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
