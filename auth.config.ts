import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-safe auth config. This is the slice that runs inside `middleware.ts`
 * (Edge runtime), so it must NOT pull in Node-only providers like Credentials.
 * Google is OAuth-only and edge-safe, so it lives here.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  providers: [
    // Google only loads when both env vars are present, so the app still runs
    // (via the dev-login fallback in auth.ts) before you configure OAuth.
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [Google]
      : []),
  ],
  callbacks: {
    // Gate every matched route. Returning false sends the visitor to /login.
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/login")) return true; // never gate the gate
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
