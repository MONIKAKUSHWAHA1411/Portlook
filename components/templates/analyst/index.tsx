"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowUpRight, MapPin } from "lucide-react";
import type { TemplateProps } from "../types";

const BLUE = "#2563eb";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function AnalystTemplate({ data }: TemplateProps) {
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const metrics = [
    { v: `${data.experience?.length ?? 0}`, l: "roles" },
    { v: `${data.projects?.length ?? 0}`, l: "projects" },
    { v: `${skillCount}`, l: "technologies" },
    { v: `${data.certifications?.length ?? 0}`, l: "certifications" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-14">
          <span className="font-bold tracking-tight">{data.name}</span>
          <ul className="hidden md:flex items-center gap-7 font-plex-mono text-[13px] text-slate-500">
            {["Skills", "Work", "Projects", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-slate-900 transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center rounded-md px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: BLUE }}>
              Contact
            </a>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="mx-auto max-w-5xl px-6 pt-14 pb-10">
        <motion.div initial="hidden" animate="show" variants={reveal}>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-slate-400">Profile analysis</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(34px,5vw,54px)] font-bold leading-[1.08] tracking-tight">{data.heroHeadline}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{data.summary || data.heroSubtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {data.statusBadge && (
              <span className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 font-plex-mono text-[12px] font-medium text-blue-700">
                <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" /> {data.statusBadge}
              </span>
            )}
            {data.location && <span className="inline-flex items-center gap-1.5 font-plex-mono text-[12px] text-slate-400"><MapPin size={12} /> {data.location}</span>}
          </div>
        </motion.div>

        {/* Metrics readout */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.l} className="bg-white px-5 py-5">
              <p className="font-plex-mono text-3xl font-semibold tabular-nums">{m.v}</p>
              <p className="font-plex-mono text-[11px] uppercase tracking-wide text-slate-400">{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skill benchmark (bar chart) */}
      {data.topSkills?.length > 0 && (
        <Section id="skills" label="Skill benchmark" title="Proficiency by capability." tint>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="space-y-4">
              {data.topSkills.map((s, i) => (
                <div key={i} className="grid grid-cols-[120px_1fr_44px] items-center gap-4 sm:grid-cols-[180px_1fr_44px]">
                  <span className="truncate font-plex-mono text-[13px] text-slate-700">{s.name}</span>
                  <div className="relative h-7 overflow-hidden rounded bg-slate-100">
                    {/* gridlines */}
                    {[25, 50, 75].map((g) => (
                      <span key={g} className="absolute inset-y-0 w-px bg-slate-200" style={{ left: `${g}%` }} />
                    ))}
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }}
                      className="relative h-full rounded" style={{ background: BLUE }} />
                  </div>
                  <span className="text-right font-plex-mono text-[13px] font-semibold tabular-nums">{s.pct}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[120px_1fr_44px] gap-4 border-t border-slate-100 pt-2 sm:grid-cols-[180px_1fr_44px]">
              <span />
              <div className="flex justify-between font-plex-mono text-[10px] text-slate-300">
                <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
              </div>
              <span />
            </div>
          </div>

          {data.skillCategories?.length > 0 && (
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="bg-white p-5">
                  <p className="font-plex-mono text-[11px] uppercase tracking-wide text-slate-400">{cat.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{cat.skills.join(", ")}</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Experience table */}
      {data.experience?.length > 0 && (
        <Section id="work" label="Experience" title="Roles & impact.">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className={`grid gap-4 p-6 md:grid-cols-[200px_1fr] ${i > 0 ? "border-t border-slate-200" : ""}`}>
                <div>
                  <p className="font-plex-mono text-[12px] text-slate-400">{e.startDate} → {e.endDate}</p>
                  {e.location && <p className="mt-1 font-plex-mono text-[11px] text-slate-300">{e.location}</p>}
                </div>
                <div>
                  <h3 className="font-bold">{e.role} <span className="font-normal text-slate-400">·</span> <span style={{ color: BLUE }}>{e.company}</span></h3>
                  <ul className="mt-2 space-y-1">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2 text-[14.5px] leading-relaxed text-slate-600">
                        <span className="font-plex-mono text-slate-300">—</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <Section id="projects" label="Projects" title="Selected work." tint>
          <div className="grid gap-4 md:grid-cols-2">
            {data.projects.map((p, i) => (
              <motion.a key={i} href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer"
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold">{p.name}</h3>
                  {(p.live || p.github) && <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />}
                </div>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techStack?.map((t) => (
                    <span key={t} className="rounded border border-slate-200 px-1.5 py-0.5 font-plex-mono text-[11px] text-slate-500">{t}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </Section>
      )}

      {/* Numbers / impact table */}
      {data.numbers?.length > 0 && (
        <Section label="Impact" title="Quantified outcomes.">
          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="bg-white p-6">
                <p className="font-plex-mono text-4xl font-semibold tabular-nums" style={{ color: BLUE }}>{n.value}</p>
                <p className="mt-2 font-semibold">{n.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{n.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education + certs */}
      {(data.education?.length > 0 || data.certifications?.length > 0) && (
        <Section id="education" label="Background" title="Education & credentials." tint>
          <div className="grid gap-8 lg:grid-cols-2">
            {data.education?.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {data.education.map((ed, i) => (
                  <div key={i} className={`bg-white p-5 ${i > 0 ? "border-t border-slate-200" : ""}`}>
                    <h3 className="font-bold">{ed.degree}</h3>
                    <p className="text-sm" style={{ color: BLUE }}>{ed.institution}</p>
                    <p className="mt-1 font-plex-mono text-[12px] text-slate-400">{ed.startDate} → {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between bg-white p-5 hover:bg-slate-50 transition-colors ${i > 0 ? "border-t border-slate-200" : ""}`}>
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="font-plex-mono text-[12px] text-slate-400">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={15} className="text-slate-300" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-slate-400">Contact</p>
          <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-tight">Open to new roles.</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {data.email && <FootLink href={`mailto:${data.email}`} icon={<Mail size={14} />} label="Email" />}
            {data.linkedin && <FootLink href={data.linkedin} icon={<Linkedin size={14} />} label="LinkedIn" />}
            {data.github && <FootLink href={data.github} icon={<Github size={14} />} label="GitHub" />}
            {data.website && <FootLink href={data.website} icon={<Globe size={14} />} label="Website" />}
          </div>
          <p className="mt-12 font-plex-mono text-[12px] text-slate-400">© {new Date().getFullYear()} {data.name}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, label, title, children, tint }: { id?: string; label: string; title: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={tint ? "bg-slate-50 py-16 px-6" : "py-16 px-6"}>
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-slate-400">{label}</p>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,38px)] font-bold tracking-tight">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FootLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors">
      {icon} {label}
    </a>
  );
}
