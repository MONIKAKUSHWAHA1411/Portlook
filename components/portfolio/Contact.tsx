"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Globe, MapPin, ArrowUpRight } from "lucide-react";
import { PortfolioData } from "@/lib/types";

export function Contact({ data }: { data: PortfolioData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const links = [
    data.email && { href: `mailto:${data.email}`, icon: Mail, label: "Send Email", value: data.email, color: "purple" },
    data.github && { href: data.github, icon: Github, label: "GitHub", value: data.github.replace("https://github.com/", "@"), color: "cyan" },
    data.linkedin && { href: data.linkedin, icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", color: "blue" },
    data.website && { href: data.website, icon: Globe, label: "Website", value: data.website.replace(/^https?:\/\//, ""), color: "emerald" },
  ].filter(Boolean) as { href: string; icon: typeof Mail; label: string; value: string; color: string }[];

  const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", dot: "bg-purple-500" },
    cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   text: "text-cyan-400",   dot: "bg-cyan-500" },
    blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   text: "text-blue-400",   dot: "bg-blue-500" },
    emerald:{ bg: "bg-emerald-500/10",border: "border-emerald-500/20",text: "text-emerald-400",dot: "bg-emerald-500" },
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="section-label">Get In Touch</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Let's Build Together</h2>
          <p className="text-zinc-400 max-w-lg mb-12">
            Open to senior AI engineering roles, consulting, and collaboration on production AI systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {links.map((l, i) => {
            const col = colorMap[l.color] ?? colorMap.purple;
            return (
              <motion.a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className={`glass rounded-2xl p-5 flex items-center gap-4 hover:border-white/15 transition-all group`}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <div className={`w-11 h-11 rounded-xl ${col.bg} ${col.border} border flex items-center justify-center shrink-0`}>
                  <l.icon size={20} className={col.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">{l.label}</p>
                  <p className="text-white text-sm font-medium truncate mt-0.5">{l.value}</p>
                </div>
                <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors shrink-0" />
              </motion.a>
            );
          })}
        </div>

        {data.location && (
          <motion.div className="flex items-center gap-2 text-zinc-600 text-sm mb-12"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            <MapPin size={14} />
            <span>{data.location}</span>
          </motion.div>
        )}

        <motion.div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <p className="text-zinc-600 text-sm">
            Built with <span className="text-purple-400">Next.js</span> · <span className="text-cyan-400">Framer Motion</span> · <span className="text-emerald-400">Claude AI</span>
          </p>
          <p className="text-zinc-700 text-xs font-mono">{data.name} · {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </section>
  );
}
