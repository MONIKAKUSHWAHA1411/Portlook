"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowUpRight } from "lucide-react";
import type { TemplateProps } from "../types";

const COLORS = ["#ff3d1f", "#00e5c3", "#b57bff", "#f5d231", "#c8f135"];
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function InkTemplate({ data }: TemplateProps) {
  const tickerItems = Array.from(
    new Set([
      ...(data.topSkills ?? []).map((s) => s.name),
      ...Object.values(data.skills ?? {}).flat(),
    ])
  ).slice(0, 14);
  const nameWords = (data.name ?? "").split(" ");

  return (
    <div className="relative min-h-screen bg-ink-black font-dm-sans text-[#f5f2ee] selection:bg-ink-red/40">
      {/* grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-[55] opacity-[0.03] print:hidden" style={{ backgroundImage: GRAIN }} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-ink-black/85 px-6 py-4 backdrop-blur-md md:px-10 print:hidden">
        <div className="flex items-center gap-2 font-bebas text-xl tracking-[2px]">
          <span className="size-2 rounded-full bg-ink-red animate-pulse" />
          {data.name}
        </div>
        <ul className="hidden gap-8 font-dm-mono text-[11px] uppercase tracking-[0.1em] text-white/40 md:flex">
          {["Work", "Skills", "Projects", "Contact"].map((x) => (
            <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-white transition-colors">{x}</a></li>
          ))}
        </ul>
        {data.email && (
          <a href={`mailto:${data.email}`} className="rounded-sm bg-[#f5f2ee] px-5 py-2 font-dm-mono text-[11px] uppercase tracking-[0.08em] text-ink-black hover:bg-ink-red hover:text-white transition-colors">
            Hire me
          </a>
        )}
      </nav>

      {/* Hero */}
      <section className="border-b border-white/10 px-6 pt-16 pb-0 md:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_380px]">
          <motion.div initial="hidden" animate="show" variants={reveal}>
            <p className="mb-5 flex items-center gap-3 font-dm-mono text-[11px] uppercase tracking-[0.2em] text-ink-red">
              <span className="h-px w-8 bg-ink-red" /> {data.statusBadge || data.title}
            </p>
            <h1 className="font-bebas leading-[0.9] tracking-[2px] text-[clamp(72px,11vw,150px)]">
              {nameWords[0]}
              <span className="block text-ink-red">{nameWords.slice(1).join(" ") || data.title}</span>
              <span className="block text-[clamp(28px,4vw,52px)]" style={{ WebkitTextStroke: "1.5px #f5f2ee", color: "transparent" }}>
                {data.title}
              </span>
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-[1.7] text-white/45">{data.summary || data.heroSubtitle}</p>
          </motion.div>

          {/* poster card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="relative mb-10 flex aspect-[3/4] flex-col justify-end overflow-hidden rounded border border-white/15 p-6"
            style={{ background: "linear-gradient(160deg,#1a0505 0%,#3d0a0a 100%)" }}>
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: GRAIN }} />
            <span className="absolute left-4 top-4 rounded-full border border-ink-red px-2.5 py-1 font-dm-mono text-[9px] uppercase tracking-[0.2em] text-ink-red">
              Portfolio / {new Date().getFullYear()}
            </span>
            <p className="font-bebas text-[64px] leading-[0.85] text-[#f5f2ee]">{nameWords.map((w) => w[0]).join("")}</p>
            <p className="mt-2 font-dm-mono text-[11px] uppercase tracking-wider text-white/50">{data.location || data.role}</p>
          </motion.div>
        </div>

        {/* ticker */}
        {tickerItems.length > 0 && (
          <div className="mt-12 overflow-hidden border-t border-white/10 bg-ink-surface py-3.5">
            <div className="flex w-max animate-ticker whitespace-nowrap">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className="flex items-center gap-10 px-10 font-bebas text-sm tracking-[3px] text-white/40">
                  {t} <span className="text-[10px] text-ink-red">✦</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
        {[
          { v: `${data.experience?.length ?? 0}`, l: "Roles" },
          { v: `${data.projects?.length ?? 0}`, l: "Projects" },
          { v: `${Object.values(data.skills ?? {}).flat().length}`, l: "Technologies" },
          { v: `${data.certifications?.length ?? 0}`, l: "Certifications" },
        ].map((s, i) => (
          <div key={s.l} className={`border-white/10 px-7 py-8 ${i < 3 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
            <p className="font-bebas text-5xl leading-none">{s.v}<span className="text-ink-red">.</span></p>
            <p className="mt-1.5 font-dm-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{s.l}</p>
          </div>
        ))}
      </section>

      {/* Skills grid (brutalist tiles) */}
      {data.skillCategories?.length > 0 && (
        <InkSection id="skills" label="Skills / Stack">
          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {data.skillCategories.map((cat, i) => {
              const c = COLORS[i % COLORS.length];
              return (
                <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                  className="border-b border-r border-white/10 p-7">
                  <p className="font-dm-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: c }}>
                    {String(i + 1).padStart(2, "0")} — {cat.label}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="border border-white/15 px-2.5 py-1 font-dm-mono text-[12px] text-white/70">{sk}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </InkSection>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <InkSection id="work" label="Experience / Log">
          <div className="border-t border-white/10">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 border-b border-white/10 py-9 md:grid-cols-[240px_1fr]">
                <div>
                  <p className="font-bebas text-3xl tracking-wide" style={{ color: COLORS[i % COLORS.length] }}>{e.startDate}</p>
                  <p className="font-dm-mono text-[11px] uppercase tracking-wider text-white/40">→ {e.endDate}</p>
                </div>
                <div>
                  <h3 className="font-bebas text-3xl tracking-wide">{e.role}</h3>
                  <p className="font-dm-mono text-[12px] uppercase tracking-wider text-white/50">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  <ul className="mt-4 space-y-2">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-3 text-[14.5px] leading-[1.6] text-white/55">
                        <span className="text-ink-red">—</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </InkSection>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <InkSection id="projects" label="Selected Work">
          <div className="grid border-t border-white/10 md:grid-cols-2">
            {data.projects.map((p, i) => (
              <motion.a key={i} href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer"
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="group flex flex-col border-b border-r border-white/10 p-8 transition-colors hover:bg-ink-surface">
                <div className="flex items-start justify-between">
                  <span className="font-bebas text-2xl" style={{ color: COLORS[i % COLORS.length] }}>{String(i + 1).padStart(2, "0")}</span>
                  {(p.live || p.github) && <ArrowUpRight size={20} className="text-white/30 group-hover:text-white transition-colors" />}
                </div>
                <h3 className="mt-4 font-bebas text-3xl tracking-wide">{p.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-white/50">{p.description}</p>
                <p className="mt-4 font-dm-mono text-[11px] uppercase tracking-wider text-white/40">{p.techStack?.join(" / ")}</p>
              </motion.a>
            ))}
          </div>
        </InkSection>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <InkSection label="By The Numbers">
          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="border-b border-r border-white/10 p-8">
                <p className="font-bebas text-6xl leading-none" style={{ color: COLORS[i % COLORS.length] }}>{n.value}</p>
                <p className="mt-3 font-bebas text-2xl tracking-wide">{n.title}</p>
                <p className="mt-1 text-[13px] leading-[1.6] text-white/45">{n.description}</p>
              </div>
            ))}
          </div>
        </InkSection>
      )}

      {/* Education + certs */}
      {(data.education?.length > 0 || data.certifications?.length > 0) && (
        <InkSection label="Background">
          <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-2">
            {data.education?.length > 0 && (
              <div>
                <p className="mb-4 font-dm-mono text-[10px] uppercase tracking-[0.2em] text-ink-red">Education</p>
                {data.education.map((ed, i) => (
                  <div key={i} className="border-b border-white/10 py-4">
                    <h3 className="font-bebas text-2xl tracking-wide">{ed.degree}</h3>
                    <p className="font-dm-mono text-[12px] uppercase tracking-wider text-white/50">{ed.institution} · {ed.startDate}—{ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div>
                <p className="mb-4 font-dm-mono text-[10px] uppercase tracking-[0.2em] text-ink-teal">Certifications</p>
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer" className="block border-b border-white/10 py-4 hover:text-ink-teal transition-colors">
                    <h3 className="font-bebas text-2xl tracking-wide">{c.name}</h3>
                    <p className="font-dm-mono text-[12px] uppercase tracking-wider text-white/50">{c.issuer} · {c.date}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </InkSection>
      )}

      {/* Footer */}
      <footer id="contact" className="px-6 pt-20 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div>
            <p className="font-dm-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Get in touch</p>
            <h2 className="mt-3 font-bebas text-[clamp(48px,8vw,90px)] leading-[0.9] tracking-[2px]">
              Let&apos;s <span className="text-ink-red">talk.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 font-dm-mono text-[11px] uppercase tracking-[0.08em]">
            {data.email && <InkLink href={`mailto:${data.email}`} icon={<Mail size={13} />} label="Email" />}
            {data.linkedin && <InkLink href={data.linkedin} icon={<Linkedin size={13} />} label="LinkedIn" />}
            {data.github && <InkLink href={data.github} icon={<Github size={13} />} label="GitHub" />}
            {data.website && <InkLink href={data.website} icon={<Globe size={13} />} label="Web" />}
          </div>
        </div>
        <div className="overflow-hidden py-6">
          <p className="font-bebas leading-[0.85] tracking-[4px] text-[clamp(60px,16vw,220px)] text-white/[0.04]">
            {(data.name ?? "").toUpperCase()}
          </p>
        </div>
      </footer>
    </div>
  );
}

function InkSection({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-6 py-16 md:px-10">
      <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
        className="flex items-center gap-4 font-dm-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        {label} <span className="h-px flex-1 bg-white/10" />
      </motion.p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function InkLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-white/70 hover:border-white hover:text-white transition-colors">
      {icon} {label}
    </a>
  );
}
