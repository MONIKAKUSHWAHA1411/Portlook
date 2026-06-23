"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowRight, ArrowUpRight, MapPin, TrendingUp } from "lucide-react";
import type { TemplateProps } from "../types";

const BLUE = "#2f6bff";
const NAVY = "#0b1437";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function DeckTemplate({ data }: TemplateProps) {
  const initials = (data.name ?? "").split(" ").slice(0, 2).map((w) => w[0] ?? "").join("");
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const stats = [
    { v: `${data.experience?.length ?? 0}`, l: "Roles" },
    { v: `${data.projects?.length ?? 0}`, l: "Projects" },
    { v: `${skillCount}`, l: "Tech" },
    { v: `${data.certifications?.length ?? 0}`, l: "Certs" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-[#0b1437] font-jakarta selection:bg-blue-200/60">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <span className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid size-8 place-items-center rounded-xl text-white text-xs font-black" style={{ background: BLUE }}>{initials}</span>
            {data.name}
          </span>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            {["About", "Work", "Skills", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-[#0b1437] transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity" style={{ background: BLUE }}>
              Get in touch <ArrowRight size={14} />
            </a>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial="hidden" animate="show" variants={reveal}>
            {data.statusBadge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" /> {data.statusBadge}
              </span>
            )}
            <h1 className="mt-6 text-[clamp(40px,6vw,66px)] font-extrabold leading-[1.04] tracking-tight">
              {data.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{data.summary || data.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.email && (
                <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity" style={{ background: BLUE }}>
                  <Mail size={15} /> Contact me
                </a>
              )}
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors">
                  <Github size={15} /> GitHub
                </a>
              )}
            </div>
            {data.location && <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-400"><MapPin size={14} /> {data.location}</p>}
          </motion.div>

          {/* Dashboard card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold">{data.name}</p>
                <p className="text-sm font-medium" style={{ color: BLUE }}>{data.title}</p>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl text-white" style={{ background: NAVY }}><TrendingUp size={18} /></span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.l} className="rounded-2xl bg-[#f6f8fc] p-4">
                  <p className="text-2xl font-extrabold">{s.v}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{s.l}</p>
                </div>
              ))}
            </div>
            {data.topSkills?.length > 0 && (
              <div className="mt-4 rounded-2xl bg-[#f6f8fc] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Top skill</p>
                <div className="flex items-baseline justify-between"><span className="font-semibold">{data.topSkills[0].name}</span><span className="text-sm font-bold" style={{ color: BLUE }}>{data.topSkills[0].pct}%</span></div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.topSkills[0].pct}%` }} transition={{ duration: 0.9, delay: 0.4 }} className="h-full rounded-full" style={{ background: BLUE }} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      {data.philosophyCards?.length > 0 && (
        <Section id="values" label="How I work" title="What I bring to every team.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.philosophyCards.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-shadow">
                <span className="text-2xl">{c.emoji}</span>
                <h3 className="mt-3 font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
        <Section id="skills" label="Skills" title="The toolkit." tint>
          {data.topSkills?.length > 0 && (
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-sm font-bold" style={{ color: BLUE }}>{s.pct}%</span>
                  </div>
                  {s.subtitle && <p className="mt-0.5 text-sm text-slate-400">{s.subtitle}</p>}
                  <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full rounded-full" style={{ background: BLUE }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skillCategories?.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700">{sk}</span>
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
        <Section id="work" label="Experience" title="Where I've delivered.">
          <div className="space-y-4">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[180px_1fr]">
                <div>
                  <p className="text-sm font-bold text-slate-400">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-sm text-slate-400">{e.location}</p>}
                </div>
                <div className="border-l-2 pl-5" style={{ borderColor: BLUE }}>
                  <h3 className="text-lg font-bold">{e.role}</h3>
                  <p className="font-semibold" style={{ color: BLUE }}>{e.company}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-600">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: BLUE }} /> {d}
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
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  {(p.live || p.github) && (
                    <a href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-300 group-hover:text-blue-600 transition-colors"><ArrowUpRight size={18} /></a>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.techStack?.map((t) => (
                    <span key={t} className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">{t}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <Section label="Impact" title="The numbers.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-4xl font-extrabold" style={{ color: BLUE }}>{n.value}</p>
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
                  <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-bold">{ed.degree}</h3>
                    <p className="font-semibold" style={{ color: BLUE }}>{ed.institution}</p>
                    <p className="mt-1 text-sm text-slate-400">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:border-blue-300 transition-colors">
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
          <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight">Let&apos;s build together.</h2>
          <p className="mt-4 text-slate-300">Open to new opportunities and collaborations.</p>
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
    <section id={id} className={tint ? "bg-white py-20 px-6" : "py-20 px-6"}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: BLUE }}>{label}</p>
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
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
      {icon} {label}
    </a>
  );
}
