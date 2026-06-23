"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check, FilePlus2, LogOut, X, Share2, Copy, ExternalLink, Loader2, Shuffle } from "lucide-react";
import { TEMPLATES, type TemplateId } from "@/lib/templates";
import { TemplateThumbnail } from "./TemplateThumbnail";
import type { PortfolioData } from "@/lib/types";

/**
 * Theme-neutral floating control (dark glass) that sits above any template.
 * Flip templates live, publish a shareable link, start over, or sign out.
 */
export function TemplateSwitcher({
  current,
  onChange,
  data,
}: {
  current: TemplateId;
  onChange: (id: TemplateId) => void;
  data: PortfolioData;
}) {
  const [open, setOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const active = TEMPLATES.find((t) => t.id === current);

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — link is still shown for manual copy */
    }
  };

  const publish = async () => {
    setPublishing(true);
    setError("");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, template: current }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Publish failed");
      const url = `${window.location.origin}/p/${json.slug}`;
      setSharedUrl(url);
      copy(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-16 right-0 w-72 rounded-2xl border border-white/10 bg-[#0d0d16]/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-3"
          >
            {/* Share */}
            <div className="px-1 pb-3 border-b border-white/8">
              <span className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">Share</span>
              {sharedUrl ? (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-2">
                    <span className="flex-1 truncate text-[12px] text-zinc-300">{sharedUrl.replace(/^https?:\/\//, "")}</span>
                    <button onClick={() => copy(sharedUrl)} title="Copy" className="shrink-0 text-zinc-400 hover:text-white transition-colors">
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <a href={sharedUrl} target="_blank" rel="noopener noreferrer" title="Open" className="shrink-0 text-zinc-400 hover:text-white transition-colors">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <p className="text-[10px] text-zinc-500">{copied ? "Link copied — anyone can view it, no login needed." : "Public link — anyone can view it, no login needed."}</p>
                </div>
              ) : (
                <button
                  onClick={publish}
                  disabled={publishing}
                  className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-3 py-2.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
                >
                  {publishing ? <Loader2 size={15} className="animate-spin" /> : <Share2 size={15} />}
                  {publishing ? "Publishing…" : "Publish & copy link"}
                </button>
              )}
              {error && <p className="mt-2 text-[11px] text-red-400">{error}</p>}
            </div>

            {/* Templates */}
            <div className="flex items-center justify-between px-1 pt-3 pb-2">
              <span className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">Template</span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onChange(TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)].id)}
                  title="Surprise me"
                  className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  <Shuffle size={12} /> Shuffle
                </button>
                <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="max-h-[46vh] overflow-y-auto pr-0.5">
              {(["dark", "light"] as const).map((grp) => (
                <div key={grp} className="mb-1">
                  <p className="px-1 pb-1 pt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-600">{grp}</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {TEMPLATES.filter((t) => t.theme === grp).map((t) => {
                      const sel = t.id === current;
                      return (
                        <button
                          key={t.id}
                          onClick={() => onChange(t.id)}
                          className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                            sel ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          <TemplateThumbnail id={t.id} className="w-14 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white leading-tight">{t.name}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{t.inspiredBy}</p>
                          </div>
                          {sel && <Check size={15} className="text-purple-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-white/8 flex gap-1.5">
              <button
                onClick={() => router.push("/")}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <FilePlus2 size={13} /> New CV
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LogOut size={13} /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d16]/90 backdrop-blur-xl pl-4 pr-4 py-3 text-sm font-medium text-white shadow-2xl shadow-black/40 hover:border-white/25 transition-colors"
      >
        <Palette size={16} className="text-purple-400" />
        <span className="hidden sm:inline text-zinc-400">Style:</span>
        <span>{active?.name ?? "Template"}</span>
      </button>
    </div>
  );
}
