import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

const googleConfigured = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    // Guest login (sign in with just a name) is offered whenever Google OAuth
    // is NOT configured — so the app is usable immediately, including on a fresh
    // deploy — and always in development. As soon as you set AUTH_GOOGLE_ID /
    // AUTH_GOOGLE_SECRET, this disappears and sign-in becomes Google-only.
    ...(!googleConfigured || process.env.NODE_ENV !== "production"
      ? [
          Credentials({
            id: "guest",
            name: "Guest",
            credentials: {
              name: { label: "Name", type: "text" },
              email: { label: "Email", type: "email" },
            },
            authorize: (creds) => ({
              id: "guest-user",
              name: (creds?.name as string) || "Guest",
              email: (creds?.email as string) || "guest@portlook.app",
            }),
          }),
        ]
      : []),
  ],
  events: {
    async signIn({ user, account }) {
      if (!user.email || !isSupabaseConfigured()) return;
      try {
        await getSupabase().rpc("upsert_user", {
          p_email: user.email,
          p_name: user.name ?? user.email,
          p_provider: account?.provider ?? "guest",
        });
      } catch {
        // Non-fatal — don't block sign-in if tracking fails
      }
    },
  },
});
