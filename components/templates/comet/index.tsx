"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { TemplateProps } from "../types";

const TEAL = "#0ea5a4";
const NAVY = "#0b1e3b";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] ${onDark ? "text-teal-300" : ""}`} style={onDark ? undefined : { color: TEAL }}>
      <span className="size-1.5 rounded-full" style={{ background: TEAL }} /> {children}
    </p>
  );
}

export function CometTemplate({ data }: TemplateProps) {
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const stats = [
    { v: `${data.experience?.length ?? 0}`, l: "Roles held" },
    { v: `${data.projects?.length ?? 0}`, l: "Projects shipped" },
    { v: `${skillCount}`, l: "Technologies" },
    { v: `${data.certifications?.length ?? 0}`, l: "Certifications" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0b1e3b] font-sans selection:bg-teal-200/50">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <span className="font-extrabold tracking-tight text-lg">{data.name}</span>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            {["About", "Work", "Skills", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-[#0b1e3b] transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: TEAL }}>
              Contact <ArrowRight size={14} />
            </a>
          )}
        </nav>
      </header>

      {/* Hero — navy band */}
      <section id="about" className="px-6 py-20 text-white" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl">
          <motion.div initial="hidden" animate="show" variants={reveal} className="max-w-3xl">
            {data.statusBadge && <Eyebrow onDark>{data.statusBadge}</Eyebrow>}
            <h1 className="mt-5 text-[clamp(38px,6vw,64px)] font-extrabold leading-[1.05] tracking-tight">{data.heroHeadline}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{data.summary || data.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.email && (
                <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-[#0b1e3b]" style={{ background: TEAL }}>
                  <Mail size={15} /> Get in touch
                </a>
              )}
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  <Github size={15} /> GitHub
                </a>
              )}
            </div>
            {data.location && <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-400"><MapPin size={14} /> {data.location}</p>}
          </motion.div>

          {/* Stats strip */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="px-6 py-7" style={{ background: NAVY }}>
                <p className="text-4xl font-extrabold" style={{ color: TEAL }}>{s.v}</p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      {data.philosophyCards?.length > 0 && (
        <Section id="values" label="Capabilities" title="Built for outcomes.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.philosophyCards.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="rounded-xl border border-slate-200 p-6 hover:border-teal-300 hover:shadow-lg hover:shadow-slate-100 transition-all">
                <span className="grid size-11 place-items-center rounded-xl text-xl" style={{ background: "rgba(14,165,164,0.1)" }}>{c.emoji}</span>
                <h3 className="mt-4 font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
        <Section id="skills" label="Skills" title="Technical depth." tint>
          {data.topSkills?.length > 0 && (
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-sm font-bold" style={{ color: TEAL }}>{s.pct}%</span>
                  </div>
                  {s.subtitle && <p className="mt-0.5 text-sm text-slate-400">{s.subtitle}</p>}
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full rounded-full" style={{ background: TEAL }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skillCategories?.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-md border border-slate-200 px-2.5 py-1 text-sm text-slate-700">{sk}</span>
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
        <Section id="work" label="Experience" title="Track record.">
          <div className="divide-y divide-slate-200">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 py-8 md:grid-cols-[200px_1fr]">
                <div>
                  <p className="text-sm font-bold text-slate-400">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-sm text-slate-400">{e.location}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{e.role}</h3>
                  <p className="font-semibold" style={{ color: TEAL }}>{e.company}</p>
                  <ul className="mt-3 grid gap-1.5 md:grid-cols-2">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-600">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: TEAL }} /> {d}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((p, i) => (
              <motion.article key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 hover:border-teal-300 hover:shadow-lg hover:shadow-slate-100 transition-all">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  {(p.live || p.github) && (
                    <a href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-300 group-hover:text-teal-600 transition-colors"><ArrowUpRight size={18} /></a>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.techStack?.map((t) => (
                    <span key={t} className="rounded-md px-2 py-0.5 text-xs font-semibold" style={{ background: "rgba(14,165,164,0.1)", color: "#0f766e" }}>{t}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <Section label="Impact" title="By the numbers.">
          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="bg-white p-7">
                <p className="text-4xl font-extrabold" style={{ color: TEAL }}>{n.value}</p>
                <p className="mt-2 font-bold">{n.title}</p>
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
              <div className="space-y-4">
                {data.education.map((ed, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                    <h3 className="font-bold">{ed.degree}</h3>
                    <p className="font-semibold" style={{ color: TEAL }}>{ed.institution}</p>
                    <p className="mt-1 text-sm text-slate-400">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-teal-300 transition-colors">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-slate-400">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={16} className="text-slate-300" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer id="contact" className="px-6 py-20 text-white" style={{ background: NAVY }}>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow onDark>Contact</Eyebrow>
          <h2 className="mt-4 text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight">Let&apos;s work together.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {data.email && <FootLink href={`mailto:${data.email}`} icon={<Mail size={15} />} label="Email" />}
            {data.linkedin && <FootLink href={data.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />}
            {data.github && <FootLink href={data.github} icon={<Github size={15} />} label="GitHub" />}
            {data.website && <FootLink href={data.website} icon={<Globe size={15} />} label="Website" />}
          </div>
          <p className="mt-14 text-sm text-slate-500">© {new Date().getFullYear()} {data.name}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, label, title, children, tint }: { id?: string; label: string; title: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={tint ? "bg-slate-50 py-20 px-6" : "py-20 px-6"}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-10">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FootLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
      {icon} {label}
    </a>
  );
}
