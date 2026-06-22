"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { PortfolioProject } from "@/lib/types";

function Card({ p, idx, inView }: { p: PortfolioProject; idx: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  const rows = [
    { prob: `Scaling ${p.name} to production`, sol: `${(p.techStack.slice(0, 2)).join(" + ")} with monitoring` },
    { prob: "Reliability under concurrent load", sol: `${p.techStack[2] ?? "Async"} + circuit breaker patterns` },
    { prob: "Zero hallucination guarantee", sol: "Multi-layer validation + guardrails at inference" },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: idx * 0.12 }}
      className="glass rounded-2xl overflow-hidden hover:border-white/15 transition-colors">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-1.5 block">
              <span className="text-purple-500">+</span> PROJECT {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-black text-white">{p.name}</h3>
          </div>
          <div className="flex gap-2 shrink-0">
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 transition-colors"><ExternalLink size={12} />Live Demo</a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-zinc-400 text-xs font-medium hover:text-white transition-colors"><Github size={12} />GitHub</a>}
          </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{p.description}</p>
        <div className="flex flex-wrap gap-2">{p.techStack.map(t => <span key={t} className="tag text-xs">{t}</span>)}</div>
      </div>

      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors">
        Engineering Challenges
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-[#0d0d1f] text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Challenge</div>
                <div className="px-4 py-2 bg-[#0d0d1f] text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Solution</div>
                {rows.map((r, i) => (
                  <>
                    <div key={`p${i}`} className="px-4 py-3 bg-[#0a0a1a] flex items-start gap-2">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/15 text-red-400 border border-red-500/20 shrink-0 mt-0.5">PROBLEM</span>
                      <p className="text-zinc-400 text-xs">{r.prob}</p>
                    </div>
                    <div key={`s${i}`} className="px-4 py-3 bg-[#0a0a1a] flex items-start gap-2">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">SOLVED</span>
                      <p className="text-zinc-400 text-xs">{r.sol}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects({ projects }: { projects: PortfolioProject[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("All");
  const techs = ["All", ...Array.from(new Set(projects.flatMap(p => p.techStack))).slice(0, 12)];
  const visible = filter === "All" ? projects : projects.filter(p => p.techStack.includes(filter));

  return (
    <section id="projects" ref={ref} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="section-label">Portfolio</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Production AI Systems</h2>
          <p className="text-zinc-400 max-w-lg mb-8">Not demos. Not tutorials. Systems built, tested, and hardened for production.</p>
        </motion.div>

        {/* Ships with card */}
        <motion.div className="glass rounded-2xl p-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
          <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4">Every project ships with:</p>
          <div className="flex flex-wrap gap-3">
            {[{d:"bg-purple-400",l:"Orchestrator"},{d:"bg-cyan-400",l:"RAG Brain"},{d:"bg-red-400",l:"Guardrails"},{d:"bg-yellow-400",l:"Streaming"},{d:"bg-emerald-400",l:"Retriever"},{d:"bg-blue-400",l:"Evaluator"},{d:"bg-orange-400",l:"Auth Gate"},{d:"bg-pink-400",l:"Memory"}].map(({d,l}) => (
              <span key={l} className="flex items-center gap-1.5 text-xs text-zinc-400"><span className={`w-2 h-2 rounded-full ${d}`}/>{l}</span>
            ))}
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div className="flex flex-wrap gap-2 mb-8" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase self-center mr-2">Filter by Tech:</span>
          {techs.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`tag transition-all ${filter === t ? "filter-tag-active" : ""}`}>{t}</button>
          ))}
        </motion.div>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => <Card key={p.name} p={p} idx={i} inView={inView} />)}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
