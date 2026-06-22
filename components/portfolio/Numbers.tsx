"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckSquare, Zap, Layers, ShieldCheck, Bot, DollarSign,
  BarChart2, Target, Users, Rocket, Code2, Award,
} from "lucide-react";
import { PortfolioMetric } from "@/lib/types";

const ICON_MAP = {
  check: CheckSquare, zap: Zap, layers: Layers, shield: ShieldCheck,
  bot: Bot, dollar: DollarSign, bar: BarChart2, target: Target,
  users: Users, rocket: Rocket, code: Code2, award: Award,
} as const;

const COLOR_MAP = {
  purple:  { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  cyan:    { text: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20" },
  emerald: { text: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/20" },
} as const;

function MetricCard({ m, i, inView }: { m: PortfolioMetric; i: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[m.iconType] ?? Zap;
  const col = COLOR_MAP[m.color] ?? COLOR_MAP.purple;
  return (
    <motion.div className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/15 transition-colors"
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
      <div className={`w-10 h-10 rounded-xl ${col.bg} ${col.border} border flex items-center justify-center`}>
        <Icon size={18} className={col.text} />
      </div>
      <div>
        <p className={`text-4xl font-black ${col.text} leading-none`}>{m.value}</p>
        <p className="text-white font-semibold mt-1.5">{m.title}</p>
        <p className="text-zinc-500 text-sm leading-relaxed mt-1">{m.description}</p>
      </div>
      <button onClick={() => setOpen(o => !o)}
        className={`mt-auto flex items-center gap-2.5 px-3 py-2 rounded-xl border ${col.border} ${col.bg} w-full text-left hover:opacity-90 transition-opacity`}>
        <span className="text-lg">🤖</span>
        <p className={`text-xs ${open ? col.text : "text-zinc-500"} font-medium`}>{open ? m.bubble : "Tap to ask me! ↗"}</p>
      </button>
    </motion.div>
  );
}

export function Numbers({ numbers }: { numbers: PortfolioMetric[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  if (!numbers?.length) return null;

  return (
    <section id="numbers" ref={ref} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="section-label">Proof of Work</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">By The Numbers</h2>
          <p className="text-zinc-400 max-w-lg mb-12">Every number is extracted from real experience — not placeholders.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {numbers.map((m, i) => <MetricCard key={i} m={m} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
