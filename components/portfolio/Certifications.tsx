"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { PortfolioCertification } from "@/lib/types";

const GRADS = ["from-purple-600 to-purple-400","from-cyan-600 to-cyan-400","from-emerald-600 to-emerald-400","from-yellow-600 to-yellow-400","from-blue-600 to-blue-400","from-pink-600 to-pink-400"];

export function Certifications({ certifications }: { certifications: PortfolioCertification[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  if (!certifications.length) return null;

  return (
    <section id="certifications" ref={ref} className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="section-label">Credentials</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10">Certifications</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <motion.div key={i} className="glass rounded-2xl p-5 hover:border-white/15 transition-colors group"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${GRADS[i % GRADS.length]} flex items-center justify-center shrink-0`}>
                  <Award size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm leading-tight">{c.name}</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">{c.issuer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono text-zinc-600">{c.date}</span>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-purple-400 hover:text-purple-300 transition-colors opacity-0 group-hover:opacity-100">
                        Verify <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
