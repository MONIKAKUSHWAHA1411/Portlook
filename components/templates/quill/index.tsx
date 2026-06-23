"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowUpRight, MapPin } from "lucide-react";
import type { TemplateProps } from "../types";

const VIOLET = "#7c3aed";
const BORDER = "#e9e4dc";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function QuillTemplate({ data }: TemplateProps) {
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const words = (data.heroHeadline ?? "").trim().split(" ");
  const lastWord = words.length > 1 ? words.pop() : "";
  const stats = [
    { v: `${data.experience?.length ?? 0}`, l: "Roles" },
    { v: `${data.projects?.length ?? 0}`, l: "Projects" },
    { v: `${skillCount}`, l: "Technologies" },
    { v: `${data.certifications?.length ?? 0}`, l: "Certifications" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfcfa] text-[#1a1a1a] font-jakarta selection:bg-violet-200/50">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-[#fdfcfa]/85 backdrop-blur-md print:hidden" style={{ borderColor: BORDER }}>
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-16">
          <span className="font-serif text-2xl tracking-tight">{data.name}</span>
          <ul className="hidden md:flex items-center gap-8 text-sm text-[#6b6660]">
            {["About", "Work", "Skills", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-[#1a1a1a] transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="hidden sm:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: VIOLET }}>
              Get in touch
            </a>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-28">
        <motion.div initial="hidden" animate="show" variants={reveal}>
          {data.statusBadge && (
            <p className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: VIOLET }}>
              <span className="size-1.5 rounded-full" style={{ background: VIOLET }} /> {data.statusBadge}
            </p>
          )}
          <h1 className="font-serif text-[clamp(44px,8vw,86px)] leading-[1.04] tracking-[-0.01em]">
            {words.join(" ")}{" "}
            {lastWord && <em className="italic" style={{ color: VIOLET }}>{lastWord}</em>}
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#6b6660]">{data.summary || data.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {data.email && (
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: VIOLET }}>
                <Mail size={15} /> Contact me
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-white px-7 py-3 text-sm font-semibold text-[#1a1a1a] hover:border-[#1a1a1a]/30 transition-colors" style={{ borderColor: BORDER }}>
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
          {data.location && <p className="mt-7 inline-flex items-center gap-1.5 text-sm text-[#9a948c]"><MapPin size={13} /> {data.location}</p>}
        </motion.div>

        {/* Stat ledger */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4" style={{ borderColor: BORDER, background: BORDER }}>
          {stats.map((s) => (
            <div key={s.l} className="bg-[#fdfcfa] px-5 py-6">
              <p className="font-serif text-4xl">{s.v}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#9a948c]">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      {data.philosophyCards?.length > 0 && (
        <Section id="values" label="Approach" title="A few things I believe.">
          <div className="grid gap-6 md:grid-cols-2">
            {data.philosophyCards.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="rounded-2xl border bg-white p-7" style={{ borderColor: BORDER }}>
                <span className="text-2xl">{c.emoji}</span>
                <h3 className="mt-4 font-serif text-2xl">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-[#6b6660]">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
        <Section id="skills" label="Skills" title="Where I'm strongest." tint>
          {data.topSkills?.length > 0 && (
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-serif text-lg" style={{ color: VIOLET }}>{s.pct}%</span>
                  </div>
                  {s.subtitle && <p className="mt-0.5 text-sm text-[#9a948c]">{s.subtitle}</p>}
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: BORDER }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full rounded-full" style={{ background: VIOLET }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skillCategories?.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i}>
                  <p className="font-serif text-xl">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-full border bg-white px-3 py-1 text-sm text-[#4a443d]" style={{ borderColor: BORDER }}>{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <Section id="work" label="Experience" title="The work so far.">
          <div className="divide-y" style={{ borderColor: BORDER }}>
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 py-9 md:grid-cols-[190px_1fr]" style={{ borderColor: BORDER }}>
                <div>
                  <p className="text-sm font-semibold text-[#9a948c]">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-sm text-[#9a948c]">{e.location}</p>}
                </div>
                <div>
                  <h3 className="font-serif text-2xl">{e.role}</h3>
                  <p className="text-[15px]" style={{ color: VIOLET }}>{e.company}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 leading-relaxed text-[#6b6660]">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full" style={{ background: VIOLET }} /> {d}
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
        <Section id="projects" label="Projects" title="Things I've made." tint>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((p, i) => (
              <motion.a key={i} href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer"
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="group flex flex-col rounded-2xl border bg-white p-7 hover:shadow-lg hover:shadow-[#e9e4dc]/60 transition-shadow" style={{ borderColor: BORDER }}>
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-2xl">{p.name}</h3>
                  {(p.live || p.github) && <ArrowUpRight size={18} className="text-[#c9c2b8] group-hover:text-[#7c3aed] transition-colors" />}
                </div>
                <p className="mt-2 flex-1 leading-relaxed text-[#6b6660]">{p.description}</p>
                <p className="mt-4 text-sm text-[#9a948c]">{p.techStack?.join(" · ")}</p>
              </motion.a>
            ))}
          </div>
        </Section>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <Section label="Impact" title="By the numbers.">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="border-t-2 pt-4" style={{ borderColor: VIOLET }}>
                <p className="font-serif text-5xl" style={{ color: VIOLET }}>{n.value}</p>
                <p className="mt-2 font-serif text-xl">{n.title}</p>
                <p className="mt-1 leading-relaxed text-[#6b6660]">{n.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education + certs */}
      {(data.education?.length > 0 || data.certifications?.length > 0) && (
        <Section id="education" label="Background" title="Education & credentials." tint>
          <div className="grid gap-10 lg:grid-cols-2">
            {data.education?.length > 0 && (
              <div className="space-y-5">
                {data.education.map((ed, i) => (
                  <div key={i} className="rounded-2xl border bg-white p-6" style={{ borderColor: BORDER }}>
                    <h3 className="font-serif text-xl">{ed.degree}</h3>
                    <p className="text-[15px]" style={{ color: VIOLET }}>{ed.institution}</p>
                    <p className="mt-1 text-sm text-[#9a948c]">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border bg-white px-5 py-4 hover:border-[#7c3aed]/40 transition-colors" style={{ borderColor: BORDER }}>
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-[#9a948c]">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={16} className="text-[#c9c2b8]" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer id="contact" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: VIOLET }}>Contact</p>
        <h2 className="mt-4 font-serif text-[clamp(40px,7vw,72px)] leading-[1.05]">
          Let&apos;s <em className="italic" style={{ color: VIOLET }}>talk.</em>
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg">
          {data.email && <a href={`mailto:${data.email}`} className="underline decoration-[#d8d2c8] decoration-2 underline-offset-4 hover:decoration-[#7c3aed] transition-colors">{data.email}</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-[#d8d2c8] decoration-2 underline-offset-4 hover:decoration-[#7c3aed] transition-colors">LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="underline decoration-[#d8d2c8] decoration-2 underline-offset-4 hover:decoration-[#7c3aed] transition-colors">GitHub</a>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" className="underline decoration-[#d8d2c8] decoration-2 underline-offset-4 hover:decoration-[#7c3aed] transition-colors">Website</a>}
        </div>
        <p className="mt-16 text-sm text-[#9a948c]">© {new Date().getFullYear()} {data.name}</p>
      </footer>
    </div>
  );
}

function Section({ id, label, title, children, tint }: { id?: string; label: string; title: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={tint ? "bg-[#f7f4ee] py-20 px-6" : "py-20 px-6"}>
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: VIOLET }}>{label}</p>
          <h2 className="mt-2 font-serif text-[clamp(30px,4.5vw,48px)] leading-tight">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
