"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Copy, Check, ExternalLink, Trash2, FilePlus2, LogOut, Eye, Loader2, FolderOpen, ShieldCheck } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

const ADMIN_EMAIL = "monikakushwaha1411@gmail.com";

export type DashRow = {
  slug: string;
  template: string;
  views: number;
  created: string; // pre-formatted on the server to avoid locale hydration mismatch
  name: string;
  title: string;
};

export function DashboardList({ rows, email, configured }: { rows: DashRow[]; email: string; configured: boolean }) {
  const [items, setItems] = useState(rows);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const linkFor = (slug: string) =>
    typeof window !== "undefined" ? `${window.location.origin}/p/${slug}` : `/p/${slug}`;

  const copy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(linkFor(slug));
      setCopied(slug);
      setTimeout(() => setCopied((s) => (s === slug ? null : s)), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  const remove = async (slug: string) => {
    setDeleting(slug);
    try {
      const res = await fetch(`/api/portfolio/${slug}`, { method: "DELETE" });
      if (res.ok) setItems((prev) => prev.filter((r) => r.slug !== slug));
    } finally {
      setDeleting(null);
      setConfirming(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black">My Portfolios</h1>
            <p className="text-sm text-zinc-500 mt-0.5">{email}</p>
          </div>
          <div className="flex items-center gap-2">
            {email === ADMIN_EMAIL && (
              <Link href="/admin" className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 hover:text-purple-100 hover:border-purple-500/50 transition-colors">
                <ShieldCheck size={14} /> Users
              </Link>
            )}
            <Link href="/create" className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-colors">
              <FilePlus2 size={14} /> New CV
            </Link>
            <button onClick={() => signOut({ redirectTo: "/" })} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-colors">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        {!configured ? (
          <Empty icon={<FolderOpen size={28} />} title="Sharing isn't configured" sub="Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY to enable published portfolios." />
        ) : items.length === 0 ? (
          <Empty
            icon={<FolderOpen size={28} />}
            title="No published portfolios yet"
            sub="Generate a portfolio, then hit “Publish & copy link” to get a shareable URL."
            action={
              <Link href="/create" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                <FilePlus2 size={15} /> Create one
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((r) => {
              const tpl = TEMPLATES.find((t) => t.id === r.template);
              const isConfirming = confirming === r.slug;
              return (
                <div key={r.slug} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4 hover:border-white/15 transition-colors">
                  {/* swatch */}
                  <div className="flex gap-1 shrink-0">
                    {(tpl?.swatches ?? ["#8b5cf6", "#22d3ee", "#0a0a1a"]).map((c, i) => (
                      <span key={i} className="w-4 h-4 rounded-full border border-white/15" style={{ background: c }} />
                    ))}
                  </div>

                  {/* info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{r.name}</p>
                    <p className="text-xs text-zinc-500 truncate">
                      {r.title ? `${r.title} · ` : ""}{tpl?.name ?? r.template} · <span className="inline-flex items-center gap-1"><Eye size={11} />{r.views}</span> · {r.created}
                    </p>
                    <p className="text-[11px] text-zinc-600 truncate mt-0.5">/p/{r.slug}</p>
                  </div>

                  {/* actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => copy(r.slug)} title="Copy link" className="grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 transition-colors">
                      {copied === r.slug ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                    </button>
                    <a href={`/p/${r.slug}`} target="_blank" rel="noopener noreferrer" title="Open" className="grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 transition-colors">
                      <ExternalLink size={15} />
                    </a>
                    {isConfirming ? (
                      <button onClick={() => remove(r.slug)} disabled={deleting === r.slug} className="flex items-center gap-1.5 h-9 rounded-lg bg-red-500/90 px-3 text-xs font-semibold text-white hover:bg-red-500 transition-colors">
                        {deleting === r.slug ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />} Confirm
                      </button>
                    ) : (
                      <button onClick={() => setConfirming(r.slug)} title="Delete" className="grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/40 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function Empty({ icon, title, sub, action }: { icon: React.ReactNode; title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 px-6">
      <div className="grid place-items-center size-14 rounded-2xl bg-white/5 text-zinc-400">{icon}</div>
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-zinc-500 max-w-sm">{sub}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
