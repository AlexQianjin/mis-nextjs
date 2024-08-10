import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(10, isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/samples');
      if (isOnDashboard) {
        if (isLoggedIn) {
          Response.redirect(new URL('/samples', nextUrl));
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/samples', nextUrl));
      }
      return true;
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
