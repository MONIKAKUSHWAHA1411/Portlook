import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Edge middleware uses ONLY the edge-safe config (no Credentials provider).
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Gate everything except Next internals, auth API routes, and static assets.
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
