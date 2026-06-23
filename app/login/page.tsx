"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

type Providers = Record<string, { id: string; name: string }> | null;

export default function LoginPage() {
  const [providers, setProviders] = useState<Providers>(null);
  const [loading, setLoading] = useState<"google" | "guest" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getProviders().then((p) => setProviders((p as Providers) ?? {}));
  }, []);

  const hasGoogle = !!providers?.google;
  const hasGuest = !!providers?.guest;

  const google = () => {
    setLoading("google");
    signIn("google", { callbackUrl: "/" });
  };

  const guest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("guest");
    signIn("guest", { name, email, callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.10)_0%,transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-5">
            <Sparkles size={12} /> CV → Portfolio
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Welcome</h1>
          <p className="text-zinc-400 text-sm">Sign in to build your portfolio.</p>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
          {providers === null ? (
            <div className="flex justify-center py-6">
              <Loader2 size={20} className="animate-spin text-zinc-500" />
            </div>
          ) : (
            <>
              {hasGoogle && (
                <button
                  onClick={google}
                  disabled={loading !== null}
                  className="w-full py-3 rounded-xl bg-white text-zinc-900 font-semibold flex items-center justify-center gap-3 hover:bg-zinc-100 active:scale-[0.99] transition-all disabled:opacity-60"
                >
                  {loading === "google" ? <Loader2 size={18} className="animate-spin" /> : <GoogleIcon />}
                  Continue with Google
                </button>
              )}

              {hasGoogle && hasGuest && (
                <div className="flex items-center gap-3 text-zinc-600 text-xs">
                  <div className="h-px flex-1 bg-white/10" />
                  or
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              )}

              {hasGuest && (
                <form onSubmit={guest} className="flex flex-col gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (optional)"
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading !== null}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
                  >
                    {loading === "guest" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                    Continue
                  </button>
                </form>
              )}

              {!hasGoogle && !hasGuest && (
                <p className="text-center text-sm text-red-400 py-4">
                  No sign-in method configured. Set Google OAuth env vars to enable login.
                </p>
              )}
            </>
          )}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Your CV data stays in your browser session.
        </p>
      </motion.div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
