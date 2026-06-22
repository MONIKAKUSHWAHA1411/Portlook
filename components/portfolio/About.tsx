"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { PortfolioData } from "@/lib/types";

export function About({ data }: { data: PortfolioData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const headline = data.heroHeadline ?? "Building Things That Matter";
  const words = headline.split(" ");
  const breakAt = Math.ceil(words.length / 2);
  const line1 = words.slice(0, breakAt).join(" ");
  const line2 = words.slice(breakAt).join(" ");

  return (
    <section id="about" ref={ref} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55 }}>
          <div className="section-label">My Story</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {line1} <span className="gradient-text">{line2}</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">{data.summary}</p>
          <div className="flex flex-col gap-3">
            {data.location && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin size={14} className="text-purple-400" />{data.location}
              </div>
            )}
            {data.email && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail size={14} className="text-cyan-400" />
                <a href={`mailto:${data.email}`} className="hover:text-white transition-colors">{data.email}</a>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data.philosophyCards ?? []).map((c, i) => (
            <motion.div key={i} className="glass rounded-2xl p-5 hover:border-white/15 transition-colors"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}>
              <span className="text-2xl mb-3 block">{c.emoji}</span>
              <h4 className="text-white font-bold text-sm mb-1.5">{c.title}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
