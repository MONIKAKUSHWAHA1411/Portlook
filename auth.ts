import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    // Dev-only login: lets you (and friends) use the app before Google OAuth
    // is configured. Stripped out of production builds entirely.
    ...(process.env.NODE_ENV !== "production"
      ? [
          Credentials({
            id: "dev",
            name: "Dev login",
            credentials: {
              name: { label: "Name", type: "text" },
              email: { label: "Email", type: "email" },
            },
            authorize: (creds) => ({
              id: "dev-user",
              name: (creds?.name as string) || "Dev User",
              email: (creds?.email as string) || "dev@local.test",
            }),
          }),
        ]
      : []),
  ],
});
