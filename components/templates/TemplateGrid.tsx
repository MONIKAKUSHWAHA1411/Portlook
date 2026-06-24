"use client";

import { Check, Shuffle } from "lucide-react";
import { TEMPLATES, type TemplateId } from "@/lib/templates";
import { TemplateThumbnail } from "./TemplateThumbnail";

/**
 * Reusable theme-grouped grid of all templates with thumbnails. Used by the
 * upload-page picker (4 cols) and the portfolio studio panel (2 cols).
 */
export function TemplateGrid({
  current,
  onChange,
  columns = 4,
  showDesc = false,
  showShuffle = false,
}: {
  current: TemplateId;
  onChange: (id: TemplateId) => void;
  columns?: 2 | 3 | 4;
  showDesc?: boolean;
  showShuffle?: boolean;
}) {
  const cols =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
      : columns === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-2";

  return (
    <div className="flex flex-col gap-3">
      {showShuffle && (
        <div className="flex justify-end">
          <button
            onClick={() => onChange(TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)].id)}
            className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <Shuffle size={11} /> Surprise me
          </button>
        </div>
      )}
      {(["dark", "light"] as const).map((grp) => (
        <div key={grp}>
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-600">{grp}</p>
          <div className={`grid ${cols} gap-2`}>
            {TEMPLATES.filter((t) => t.theme === grp).map((t) => {
              const active = t.id === current;
              return (
                <button
                  key={t.id}
                  onClick={() => onChange(t.id)}
                  title={t.blurb}
                  className={`group relative min-h-[48px] rounded-lg border p-1.5 text-left transition-all ${
                    active
                      ? "border-purple-500/70 bg-purple-500/10 ring-1 ring-purple-500/40"
                      : "border-white/8 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  {active && (
                    <span className="absolute right-1.5 top-1.5 z-10 grid size-4 place-items-center rounded-full bg-purple-500">
                      <Check size={10} className="text-white" />
                    </span>
                  )}
                  <TemplateThumbnail id={t.id} />
                  <p className="mt-1 truncate text-[11px] font-semibold text-white">{t.name}</p>
                  {showDesc && <p className="truncate text-[9px] leading-tight text-zinc-500">{t.blurb}</p>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
