"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, getProviders } from "next-auth/react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Upload, Palette, Share2, Bot, Link2, LayoutGrid, ShieldCheck, Smartphone, Loader2 } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";

type Providers = Record<string, { id: string; name: string }> | null;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<Providers>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<"google" | "guest" | null>(null);

  useEffect(() => {
    getProviders().then((p) => setProviders((p as Providers) ?? {}));
  }, []);

  const authed = status === "authenticated";
  const hasGoogle = !!providers?.google;
  const hasGuest = !!providers?.guest;

  const google = () => { setLoading("google"); signIn("google", { callbackUrl: "/create" }); };
  const guest = (e: React.FormEvent) => { e.preventDefault(); setLoading("guest"); signIn("guest", { name, callbackUrl: "/create" }); };

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0a0a1a]/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <span className="flex items-center gap-2 font-black tracking-tight">
            <Sparkles size={18} className="text-purple-400" /> Portlook
          </span>
          <div className="flex items-center gap-3 text-sm">
            <a href="#templates" className="hidden sm:block text-zinc-400 hover:text-white transition-colors">Templates</a>
            <a href="#how" className="hidden sm:block text-zinc-400 hover:text-white transition-colors">How it works</a>
            {authed ? (
              <Link href="/create" className="rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-5 py-2 font-semibold hover:opacity-90 transition-opacity">Create</Link>
            ) : (
              <a href="#start" className="rounded-full border border-white/15 px-5 py-2 font-medium text-zinc-200 hover:border-white/40 transition-colors">Sign in</a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.14)_0%,transparent_70%)]" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <motion.div initial="hidden" animate="show" variants={reveal} className="relative mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-6">
            <Sparkles size={12} /> Powered by Claude AI
          </div>
          <h1 className="text-6xl md:text-7xl font-black leading-[1.02] tracking-tight">
            <span className="text-white">Your CV,</span> <span className="gradient-text">Reimagined.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Turn your résumé into a stunning portfolio website in seconds. Pick from <strong className="text-white">12 designer styles</strong>, then share a link — no coding, completely free.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {authed ? (
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-7 py-3.5 text-base font-bold shadow-xl shadow-purple-500/25 hover:opacity-90 transition-opacity">
                Create your portfolio <ArrowRight size={18} />
              </Link>
            ) : hasGoogle ? (
              <button onClick={google} disabled={loading !== null}
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-base font-bold text-zinc-900 shadow-xl shadow-white/10 hover:bg-zinc-100 transition-colors disabled:opacity-60">
                {loading === "google" ? <Loader2 size={18} className="animate-spin" /> : <GoogleIcon />} Continue with Google
              </button>
            ) : (
              <a href="#start" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-7 py-3.5 text-base font-bold shadow-xl shadow-purple-500/25 hover:opacity-90 transition-opacity">
                Create yours free <ArrowRight size={18} />
              </a>
            )}
            <a href="#templates" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-base font-medium text-zinc-200 hover:border-white/40 transition-colors">
              See the 12 styles
            </a>
          </div>
          <p className="mt-5 text-xs text-zinc-600">Free forever · No credit card · Your data stays private</p>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead label="How it works" title="From résumé to shareable portfolio in 3 steps." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <Upload size={20} />, title: "Upload your CV", desc: "Drop a PDF or DOCX. Claude reads it and extracts your roles, skills, projects, and metrics." },
              { icon: <Palette size={20} />, title: "Pick a style", desc: "Choose from 12 designer templates — dark, light, editorial, brutalist, data-viz, and more." },
              { icon: <Share2 size={20} />, title: "Publish & share", desc: "Get a permanent public link to send to recruiters. Edit the style anytime." },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="glass rounded-2xl p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">{s.icon}</div>
                <p className="mt-4 text-xs font-bold text-zinc-600">STEP {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template gallery */}
      <section id="templates" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHead label="12 designer styles" title="One CV. Twelve ways to stand out." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {TEMPLATES.map((t) => (
              <motion.div key={t.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
                <TemplateThumbnail id={t.id} />
                <p className="mt-2 text-sm font-semibold">{t.name}</p>
                <p className="text-[11px] text-zinc-500">{t.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead label="Why Portlook" title="Everything you need, nothing you don't." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Bot size={18} />, title: "AI-powered", desc: "Claude writes role-specific copy and pulls real metrics from your CV." },
              { icon: <LayoutGrid size={18} />, title: "12 templates", desc: "Switch styles live without re-uploading — the same data, twelve looks." },
              { icon: <Link2 size={18} />, title: "Shareable links", desc: "Publish to a clean public URL with social link previews." },
              { icon: <ShieldCheck size={18} />, title: "Private by default", desc: "Your CV is parsed on the server and never shown to anyone but you." },
              { icon: <Smartphone size={18} />, title: "Mobile-ready", desc: "Every template is responsive and looks great on any device." },
              { icon: <Sparkles size={18} />, title: "Free", desc: "Every template and feature. No paywall, no credit card." },
            ].map((b, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-purple-300">{b.icon}</div>
                <h3 className="mt-3 font-bold">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + sign-in */}
      <section id="start" className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.16)_0%,transparent_70%)]" />
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="relative mx-auto max-w-md text-center">
          <h2 className="text-4xl font-black tracking-tight">Build yours in 60 seconds.</h2>
          <p className="mt-3 text-zinc-400">Sign in to create and publish your portfolio.</p>

          <div className="glass mt-8 rounded-2xl p-6 text-left">
            {providers === null ? (
              <div className="flex justify-center py-6"><Loader2 size={20} className="animate-spin text-zinc-500" /></div>
            ) : authed ? (
              <Link href="/create" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 font-bold hover:opacity-90 transition-opacity">
                Create your portfolio <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="flex flex-col gap-4">
                {hasGoogle && (
                  <button onClick={google} disabled={loading !== null}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors disabled:opacity-60">
                    {loading === "google" ? <Loader2 size={18} className="animate-spin" /> : <GoogleIcon />} Continue with Google
                  </button>
                )}
                {hasGoogle && hasGuest && (
                  <div className="flex items-center gap-3 text-zinc-600 text-xs"><div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" /></div>
                )}
                {hasGuest && (
                  <form onSubmit={guest} className="flex flex-col gap-3">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-purple-500/50 focus:outline-none" />
                    <button type="submit" disabled={loading !== null}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3 font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                      {loading === "guest" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />} Continue
                    </button>
                  </form>
                )}
                {!hasGoogle && !hasGuest && <p className="py-3 text-center text-sm text-red-400">No sign-in method configured.</p>}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="flex items-center gap-2 text-sm font-bold"><Sparkles size={14} className="text-purple-400" /> Portlook</span>
          <p className="text-xs text-zinc-600">Built with Claude · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-10 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-purple-400">{label}</p>
      <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-black tracking-tight">{title}</h2>
    </motion.div>
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
