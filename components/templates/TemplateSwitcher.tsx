"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check, FilePlus2, LogOut, X } from "lucide-react";
import { TEMPLATES, type TemplateId } from "@/lib/templates";

/**
 * Theme-neutral floating control (dark glass) that sits above any template.
 * Lets the viewer flip between all templates live and offers New CV / Sign out.
 */
export function TemplateSwitcher({
  current,
  onChange,
}: {
  current: TemplateId;
  onChange: (id: TemplateId) => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const active = TEMPLATES.find((t) => t.id === current);

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
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">Template</span>
              <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {TEMPLATES.map((t) => {
                const sel = t.id === current;
                return (
                  <button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                      sel ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex gap-1 shrink-0">
                      {t.swatches.map((c, i) => (
                        <span key={i} className="w-3.5 h-3.5 rounded-full border border-white/15" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white leading-tight">{t.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{t.inspiredBy}</p>
                    </div>
                    {sel && <Check size={15} className="text-purple-400 shrink-0" />}
                  </button>
                );
              })}
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
