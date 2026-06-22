"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PortfolioData } from "@/lib/types";

const GRAD: Record<string, string> = {
  purple:  "from-purple-600 to-purple-400",
  cyan:    "from-cyan-600 to-cyan-300",
  emerald: "from-emerald-600 to-emerald-400",
  yellow:  "from-yellow-600 to-yellow-300",
  blue:    "from-blue-600 to-blue-400",
  pink:    "from-pink-600 to-pink-400",
};
const FALLBACK_COLORS = ["purple", "cyan", "emerald", "yellow", "blue", "pink"] as const;

function Bar({ name, pct, subtitle, color, delay, inView }: {
  name: string; pct: number; subtitle?: string; color: string; delay: number; inView: boolean;
}) {
  return (
    <div className="py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-xs font-black text-white select-none`}>
          {name[0]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-white text-sm font-semibold">{name}</span>
            <span className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{pct}%</span>
          </div>
          {subtitle && <p className="text-zinc-600 text-xs italic">{subtitle}</p>}
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden ml-10">
        <motion.div className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.9, ease: "easeOut" }} />
      </div>
    </div>
  );
}

export function Skills({ data }: { data: PortfolioData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const topSkills = data.topSkills ?? [];
  const cats = (data.skillCategories ?? []).map((c, i) => ({
    ...c,
    color: GRAD[c.color] ?? GRAD[FALLBACK_COLORS[i % FALLBACK_COLORS.length]],
  }));

  const heroHeadline = data.heroHeadline ?? "What I Engineer";
  const heroSubtitle = data.heroSubtitle ?? "";

  return (
    <section id="skills" ref={ref} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="section-label">Technical Depth</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">What I Engineer</h2>
          <p className="text-zinc-400 max-w-lg mb-12">{heroSubtitle || heroHeadline}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {topSkills.length > 0 && (
            <motion.div className="glass rounded-2xl p-6" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
              {topSkills.map((s, i) => (
                <Bar key={s.name} name={s.name} pct={s.pct} subtitle={s.subtitle ?? undefined}
                  color={GRAD[FALLBACK_COLORS[i % FALLBACK_COLORS.length]]} delay={i * 0.1} inView={inView} />
              ))}
            </motion.div>
          )}
          <div className="flex flex-col gap-4">
            {cats.slice(0, 2).map((c, i) => (
              <motion.div key={c.label} className="glass rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}>
                <p className={`text-sm font-bold bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-3`}>{c.label}</p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s: string) => <span key={s} className="tag-neutral tag text-xs">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {cats.length > 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cats.slice(2).map((c, i) => (
              <motion.div key={c.label} className="glass rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 + i * 0.08 }}>
                <p className={`text-sm font-bold bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-3`}>{c.label}</p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s: string) => <span key={s} className="tag-neutral tag text-xs">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
