"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { TemplateProps } from "../types";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BLUE = "#2563eb";

export function EditorialTemplate({ data }: TemplateProps) {
  const year = new Date().getFullYear();
  const skillCount = Object.values(data.skills ?? {}).flat().length;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100">
      {/* Masthead nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/10 bg-white/85 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-14">
          <span className="text-sm font-bold uppercase tracking-[0.2em]">{data.name}</span>
          <ul className="hidden md:flex items-center gap-7 text-[13px] text-zinc-500">
            {["Work", "Skills", "Projects", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-zinc-900 transition-colors">{x}</a></li>
            ))}
          </ul>
          <span className="hidden sm:block text-[13px] text-zinc-400">{data.location ?? year}</span>
        </nav>
      </header>

      {/* Editorial masthead / hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 md:pt-24">
        <motion.div initial="hidden" animate="show" variants={reveal}>
          {data.statusBadge && (
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.25em]" style={{ color: BLUE }}>
              {data.statusBadge}
            </p>
          )}
          <h1 className="text-[clamp(48px,10vw,120px)] font-bold leading-[0.92] tracking-[-0.03em]">
            {data.name}
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-light leading-snug text-zinc-500">{data.heroHeadline}</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
          className="mt-12 grid gap-8 border-t border-zinc-900/10 pt-8 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Profile</p>
            <p className="mt-2 text-lg font-medium">{data.title}</p>
          </div>
          <p className="text-lg leading-relaxed text-zinc-700">{data.summary || data.heroSubtitle}</p>
        </motion.div>

        {/* Stat ledger */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-zinc-900/10 sm:grid-cols-4">
          {[
            { v: data.experience?.length ?? 0, l: "Roles" },
            { v: data.projects?.length ?? 0, l: "Projects" },
            { v: skillCount, l: "Technologies" },
            { v: data.certifications?.length ?? 0, l: "Certifications" },
          ].map((s) => (
            <div key={s.l} className="bg-white px-6 py-7 outline outline-1 outline-zinc-900/10">
              <p className="text-4xl font-bold tracking-tight">{s.v}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-400">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      {data.experience?.length > 0 && (
        <EditorialSection id="work" num="01" label="Experience">
          <div className="divide-y divide-zinc-900/10">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 py-10 md:grid-cols-[0.5fr_1.5fr]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-sm text-zinc-400">{e.location}</p>}
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{e.role}</h3>
                  <p className="text-lg" style={{ color: BLUE }}>{e.company}</p>
                  <ul className="mt-4 grid gap-2 text-[15px] leading-relaxed text-zinc-600 md:grid-cols-2">
                    {e.description?.map((d, j) => (
                      <li key={j} className="border-l-2 border-zinc-200 pl-3">{d}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </EditorialSection>
      )}

      {/* Skills */}
      {(data.skillCategories?.length > 0 || data.topSkills?.length > 0) && (
        <EditorialSection id="skills" num="02" label="Capabilities">
          {data.topSkills?.length > 0 && (
            <div className="mb-12 grid gap-x-12 gap-y-5 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i} className="flex items-baseline justify-between border-b border-zinc-900/10 pb-3">
                  <span className="text-lg font-medium">{s.name}</span>
                  <span className="font-bold tabular-nums" style={{ color: BLUE }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {data.skillCategories.map((cat, i) => (
              <div key={i}>
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-900">{cat.label}</p>
                <ul className="mt-3 space-y-1.5 text-zinc-600">
                  {cat.skills.map((sk) => (
                    <li key={sk} className="text-[15px]">{sk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </EditorialSection>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <EditorialSection id="projects" num="03" label="Selected Projects">
          <div className="divide-y divide-zinc-900/10 border-y border-zinc-900/10">
            {data.projects.map((p, i) => (
              <motion.a key={i} href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer"
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="group grid gap-3 py-8 md:grid-cols-[0.4fr_1.6fr] md:items-baseline">
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">
                    {p.name}
                    {(p.live || p.github) && <ArrowUpRight size={20} className="text-zinc-300 group-hover:text-blue-600 transition-colors" />}
                  </h3>
                  <p className="mt-1 max-w-2xl text-zinc-600">{p.description}</p>
                  <p className="mt-2 text-sm text-zinc-400">{p.techStack?.join(" · ")}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </EditorialSection>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <EditorialSection num="04" label="Impact">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="border-t-2 border-zinc-900 pt-4">
                <p className="text-5xl font-bold tracking-tight">{n.value}</p>
                <p className="mt-2 text-lg font-medium">{n.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{n.description}</p>
              </div>
            ))}
          </div>
        </EditorialSection>
      )}

      {/* Education + certs */}
      {(data.education?.length > 0 || data.certifications?.length > 0) && (
        <EditorialSection num="05" label="Background">
          <div className="grid gap-12 lg:grid-cols-2">
            {data.education?.length > 0 && (
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">Education</p>
                <div className="space-y-5">
                  {data.education.map((ed, i) => (
                    <div key={i} className="border-b border-zinc-900/10 pb-5">
                      <h3 className="text-lg font-bold">{ed.degree}</h3>
                      <p style={{ color: BLUE }}>{ed.institution}</p>
                      <p className="mt-1 text-sm text-zinc-400">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">Certifications</p>
                <div className="space-y-4">
                  {data.certifications.map((c, i) => (
                    <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer" className="block border-b border-zinc-900/10 pb-4 hover:text-blue-600 transition-colors">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-zinc-400">{c.issuer} · {c.date}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </EditorialSection>
      )}

      {/* Footer */}
      <footer id="contact" className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Contact</p>
        <h2 className="mt-3 text-[clamp(36px,7vw,80px)] font-bold leading-[0.95] tracking-[-0.03em]">
          Available for work.
        </h2>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-lg">
          {data.email && <a href={`mailto:${data.email}`} className="underline decoration-2 underline-offset-4 hover:text-blue-600 transition-colors">{data.email}</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:text-blue-600 transition-colors">LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:text-blue-600 transition-colors">GitHub</a>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:text-blue-600 transition-colors">Website</a>}
        </div>
        <p className="mt-16 border-t border-zinc-900/10 pt-6 text-sm text-zinc-400">© {year} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

function EditorialSection({ id, num, label, children }: { id?: string; num: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
        className="mb-10 flex items-baseline gap-4 border-t-2 border-zinc-900 pt-4">
        <span className="text-sm font-bold tabular-nums text-zinc-400">{num}</span>
        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{label}</h2>
      </motion.div>
      {children}
    </section>
  );
}
