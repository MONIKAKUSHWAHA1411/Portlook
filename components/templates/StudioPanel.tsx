"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Share2, Copy, Check, ExternalLink, Loader2, FilePlus2, LogOut, ChevronRight, X } from "lucide-react";
import { TemplateGrid } from "./TemplateGrid";
import type { TemplateId } from "@/lib/templates";
import type { PortfolioData } from "@/lib/types";

export function StudioPanel({
  current,
  onChange,
  data,
}: {
  current: TemplateId;
  onChange: (id: TemplateId) => void;
  data: PortfolioData;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
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

  const Body = (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      {/* Share */}
      <div className="border-b border-white/8 pb-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Share</p>
        {sharedUrl ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-2">
              <span className="flex-1 truncate text-[12px] text-zinc-300">{sharedUrl.replace(/^https?:\/\//, "")}</span>
              <button onClick={() => copy(sharedUrl)} title="Copy" className="shrink-0 text-zinc-400 hover:text-white transition-colors">
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <a href={sharedUrl} target="_blank" rel="noopener noreferrer" title="Open" className="shrink-0 text-zinc-400 hover:text-white transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>
            <p className="text-[10px] text-zinc-500">{copied ? "Link copied — public, no login needed." : "Public link — anyone can view it."}</p>
          </div>
        ) : (
          <button
            onClick={publish}
            disabled={publishing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-3 py-2.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {publishing ? <Loader2 size={15} className="animate-spin" /> : <Share2 size={15} />}
            {publishing ? "Publishing…" : "Publish & copy link"}
          </button>
        )}
        {error && <p className="mt-2 text-[11px] text-red-400">{error}</p>}
      </div>

      {/* Templates */}
      <div className="flex-1">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Style</p>
        <TemplateGrid current={current} onChange={onChange} columns={2} showShuffle />
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 border-t border-white/8 pt-3">
        <button onClick={() => router.push("/create")} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
          <FilePlus2 size={13} /> New CV
        </button>
        <button onClick={() => signOut({ redirectTo: "/" })} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: persistent collapsible sidebar */}
      <aside className={`relative hidden shrink-0 border-l border-white/10 bg-[#0d0d16] text-white transition-[width] duration-300 lg:block ${collapsed ? "w-0" : "w-[320px]"}`}>
        <button
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? "Show templates" : "Hide panel"}
          className="absolute -left-9 top-4 z-10 grid size-9 place-items-center rounded-l-lg border border-r-0 border-white/10 bg-[#0d0d16] text-zinc-300 hover:text-white transition-colors"
        >
          {collapsed ? <Palette size={16} className="text-purple-400" /> : <ChevronRight size={16} />}
        </button>
        <div className={`h-screen ${collapsed ? "hidden" : "block"}`}>{Body}</div>
      </aside>

      {/* Mobile: FAB + bottom-anchored drawer */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d16]/90 px-4 py-3 text-sm font-medium text-white shadow-2xl shadow-black/40 backdrop-blur-xl print:hidden"
        >
          <Palette size={16} className="text-purple-400" /> Style
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm print:hidden" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 z-[80] w-[88vw] max-w-[340px] border-l border-white/10 bg-[#0d0d16] text-white print:hidden">
                <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 z-10 text-zinc-400 hover:text-white"><X size={18} /></button>
                {Body}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
