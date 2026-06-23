import type { TemplateId } from "@/lib/templates";

const CONIC = "conic-gradient(from 90deg at 50% 50%, #00DFD8, #007CF0, #7928CA, #FF0080, #FF4D4D, #F9CB28, #00DFD8)";

/** Tiny, hand-built mock of each template so styles can be compared at a glance. */
const SCENES: Record<TemplateId, React.ReactNode> = {
  spectrum: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#0a0a1a" }}>
      <div className="flex items-center gap-1"><span className="size-1.5 rounded-full" style={{ background: "#8b5cf6" }} /><span className="h-1 w-5 rounded bg-white/15" /></div>
      <div className="mt-3 h-2.5 w-3/4 rounded" style={{ background: "linear-gradient(90deg,#8b5cf6,#22d3ee)" }} />
      <div className="mt-1.5 h-1.5 w-1/2 rounded bg-white/15" />
      <div className="mt-2.5 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-6 flex-1 rounded bg-white/[0.06]" />)}</div>
    </div>
  ),
  halo: (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#080810" }}>
      <div className="absolute left-1/2 -top-3 size-12 -translate-x-1/2 rounded-full blur-xl" style={{ background: "rgba(99,77,255,0.55)" }} />
      <div className="relative flex flex-col items-center p-2.5 text-center">
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[6px] text-white/70 ring-1 ring-white/10">●</span>
        <div className="mt-2 h-2.5 w-2/3 rounded bg-white/85" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-white/25" />
      </div>
    </div>
  ),
  ember: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#fff" }}>
      <div className="flex justify-between"><span className="size-2 rounded" style={{ background: "#E8420A" }} /><span className="h-2 w-6 rounded-full" style={{ background: "#E8420A" }} /></div>
      <div className="mt-2.5 h-2.5 w-2/3 rounded bg-[#0A0A0A]" />
      <div className="mt-1.5 h-1.5 w-1/2 rounded bg-slate-200" />
      <div className="mt-2.5 flex gap-1"><span className="h-3 w-10 rounded-full" style={{ background: "#0A0A0A" }} /><span className="h-3 w-8 rounded-full border border-slate-200" /></div>
    </div>
  ),
  editorial: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#fff" }}>
      <div className="h-1 w-1/3 bg-slate-300" />
      <div className="mt-1.5 text-xl font-bold leading-none tracking-tight text-slate-900">Aa</div>
      <div className="mt-2 flex items-center gap-1.5 border-t-2 border-slate-900 pt-1.5"><span className="text-[8px] font-bold text-slate-400">01</span><span className="h-1 flex-1 rounded bg-slate-200" /></div>
      <span className="mt-2 inline-block h-1 w-1/4 rounded" style={{ background: "#2563eb" }} />
    </div>
  ),
  dev: (
    <div className="absolute inset-0 flex" style={{ background: "#0c0c0e" }}>
      <div className="w-1/4 border-r border-white/10 p-1.5"><span className="block size-1.5 rounded-full" style={{ background: "#f55036" }} /><div className="mt-2 space-y-1">{[0, 1, 2].map((i) => <span key={i} className="block h-1 w-full rounded bg-white/15" />)}</div></div>
      <div className="flex-1 p-2 font-plex-mono"><span className="text-[7px]" style={{ color: "#f55036" }}>$ whoami</span><div className="mt-1 h-1.5 w-2/3 rounded bg-white/70" /><div className="mt-1 h-1 w-1/2 rounded bg-white/20" /></div>
    </div>
  ),
  ink: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#0a0a0a" }}>
      <div className="flex justify-between"><span className="size-1.5 rounded-full" style={{ background: "#ff3d1f" }} /><span className="h-1.5 w-4 rounded bg-white/15" /></div>
      <div className="mt-1.5 font-bebas text-2xl leading-none tracking-wide text-white">CV<span style={{ color: "#ff3d1f" }}>.</span></div>
      <div className="mt-2 grid grid-cols-3 border-t border-white/15">{[0, 1, 2].map((i) => <div key={i} className="border-r border-white/15 py-1 last:border-r-0"><span className="font-bebas text-xs text-white">9</span></div>)}</div>
    </div>
  ),
  deck: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#f6f8fc" }}>
      <div className="flex justify-between"><span className="size-2 rounded-md" style={{ background: "#2f6bff" }} /><span className="h-2 w-6 rounded-full" style={{ background: "#2f6bff" }} /></div>
      <div className="mt-2 h-2 w-1/2 rounded bg-[#0b1437]" />
      <div className="mt-2 rounded-lg bg-white p-1.5 shadow-sm"><div className="grid grid-cols-2 gap-1">{[0, 1].map((i) => <span key={i} className="h-3.5 rounded bg-slate-100" />)}</div></div>
    </div>
  ),
  comet: (
    <div className="absolute inset-0" style={{ background: "#fff" }}>
      <div className="p-2" style={{ background: "#0b1e3b" }}>
        <div className="h-2 w-1/2 rounded bg-white/80" />
        <div className="mt-1 h-1.5 w-1/3 rounded" style={{ background: "#0ea5a4" }} />
      </div>
      <div className="grid grid-cols-3 gap-1 p-2">{[0, 1, 2].map((i) => <span key={i} className="h-4 rounded bg-slate-100" />)}</div>
    </div>
  ),
  quill: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#fdfcfa" }}>
      <div className="font-serif text-[10px] text-[#1a1a1a]">Aa</div>
      <div className="mt-1.5 font-serif text-xl leading-none text-[#1a1a1a]">CV <em className="italic" style={{ color: "#7c3aed" }}>style</em></div>
      <div className="mt-2.5 h-1 w-2/3 rounded bg-[#e9e4dc]" />
      <div className="mt-1 h-1 w-1/2 rounded bg-[#e9e4dc]" />
    </div>
  ),
  analyst: (
    <div className="absolute inset-0 p-2.5" style={{ background: "#fff" }}>
      <div className="h-1.5 w-1/2 rounded bg-slate-800" />
      <div className="mt-2.5 space-y-1.5">{[70, 92, 55, 80].map((w, i) => <div key={i} className="flex items-center gap-1"><span className="h-1.5 w-3 rounded bg-slate-200" /><span className="h-1.5 rounded" style={{ width: `${w}%`, background: "#2563eb" }} /></div>)}</div>
    </div>
  ),
  pulse: (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0c0a0d" }}>
      <div className="absolute -left-2 -top-2 size-10 rounded-full blur-xl" style={{ background: "rgba(240,56,107,0.55)" }} />
      <div className="absolute right-0 top-1 size-8 rounded-full blur-xl" style={{ background: "rgba(139,92,246,0.5)" }} />
      <div className="relative p-2.5"><span className="inline-block size-1.5 rounded-full" style={{ background: "#f0386b" }} /><div className="mt-3 h-2.5 w-2/3 rounded bg-white/85" /><div className="mt-1.5 h-1.5 w-1/2 rounded bg-white/25" /></div>
    </div>
  ),
  edge: (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#000" }}>
      <div className="absolute left-1/2 -top-4 size-12 -translate-x-1/2 rounded-full opacity-50 blur-lg" style={{ background: CONIC }} />
      <div className="relative flex flex-col items-center p-2.5 text-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2 L22 20 L2 20 Z" /></svg>
        <div className="mt-2 h-2.5 w-2/3 rounded bg-white" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-white/30" />
      </div>
    </div>
  ),
};

export function TemplateThumbnail({ id, className = "" }: { id: TemplateId; className?: string }) {
  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-white/10 ${className}`}>
      {SCENES[id]}
    </div>
  );
}
