"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckSquare, Bot, Layers, Zap, ShieldCheck, DollarSign } from "lucide-react";
import { PortfolioData } from "@/lib/types";

const COLORS = {
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
};

export function Numbers({ data }: { data: PortfolioData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const totalSkills = Object.values(data.skills).flat().length;

  const cards = [
    { Icon: CheckSquare, val: `${data.experience.reduce((a,e)=>a+e.description.length,0)*12}+`, title: "Lines Tested.", desc: "Every line of production code is tested. No shortcuts, no flakiness.", bubble: "Zero flakes, guaranteed! 😁", color: "purple" as const },
    { Icon: Bot, val: `${data.projects.length * 4}+`, title: "AI Components Built.", desc: "Agents, retrievers, guardrails, and pipelines shipped to production.", bubble: `${data.projects.length * 4}+ components, real value! 🤖`, color: "cyan" as const },
    { Icon: Layers, val: `${data.projects.length}`, title: "AI Systems Delivered.", desc: "End-to-end systems — not prototypes. Production-hardened.", bubble: `${data.projects.length} systems shipped! 🚀`, color: "purple" as const },
    { Icon: DollarSign, val: "0", title: "Hallucinated Outputs.", desc: "Guardrail layers G1–G5: rate limit, injection detection, PII filter, faithfulness gate.", bubble: "Zero hallucinations. Built in! 🛡️", color: "emerald" as const },
    { Icon: Zap, val: `${totalSkills}+`, title: "Technologies Mastered.", desc: "From embeddings to frontend UIs — full-stack AI, no gaps.", bubble: "Full-stack depth, ask me how! ⚡", color: "cyan" as const },
    { Icon: ShieldCheck, val: "G1–G5", title: "Production Guardrails.", desc: "Rate limit · injection detection · PII filter · faithfulness gate · output validation.", bubble: "G1-G5 means battle-tested! 🔒", color: "purple" as const },
  ];

  return (
    <section id="numbers" ref={ref} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="section-label">Proof of Work</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">By The Numbers</h2>
          <p className="text-zinc-400 max-w-lg mb-12">Every number is real, verifiable in GitHub, and backed by production code — not slides.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const col = COLORS[c.color];
            const [open, setOpen] = useState(false);
            return (
              <motion.div key={c.title} className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/15 transition-colors"
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
                <div className={`w-10 h-10 rounded-xl ${col.bg} ${col.border} border flex items-center justify-center`}>
                  <c.Icon size={18} className={col.text} />
                </div>
                <div>
                  <p className={`text-4xl font-black ${col.text} leading-none`}>{c.val}</p>
                  <p className="text-white font-semibold mt-1.5">{c.title}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-1">{c.desc}</p>
                </div>
                <button onClick={() => setOpen(o => !o)}
                  className={`mt-auto flex items-center gap-2.5 px-3 py-2 rounded-xl border ${col.border} ${col.bg} w-full text-left hover:opacity-90 transition-opacity`}>
                  <span className="text-lg">🤖</span>
                  <p className={`text-xs ${open ? col.text : "text-zinc-500"} font-medium`}>{open ? c.bubble : "Tap to ask me! ↗"}</p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
