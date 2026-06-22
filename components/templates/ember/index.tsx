"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { TemplateProps } from "../types";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function EmberTemplate({ data }: TemplateProps) {
  const initials = (data.name ?? "").split(" ").slice(0, 2).map((w) => w[0] ?? "").join("");
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const stats = [
    { v: `${data.experience?.length ?? 0}`, l: "Roles held" },
    { v: `${data.projects?.length ?? 0}`, l: "Projects" },
    { v: `${skillCount}`, l: "Technologies" },
    { v: `${data.certifications?.length ?? 0}`, l: "Certifications" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-ember/20">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <span className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid size-7 place-items-center rounded-md bg-ember text-white text-xs font-black">{initials}</span>
            {data.name}
          </span>
          <ul className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
            {["About", "Work", "Skills", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-[#0A0A0A] transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-ember px-5 py-2 text-sm font-semibold text-white hover:bg-[#cc3a08] transition-colors">
              Contact <ArrowRight size={14} />
            </a>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="mx-auto max-w-6xl px-6 pt-20 pb-16 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div initial="hidden" animate="show" variants={reveal}>
            {data.statusBadge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-ember/10 px-4 py-1.5 text-xs font-semibold text-ember">
                <span className="size-1.5 rounded-full bg-ember animate-pulse" /> {data.statusBadge}
              </span>
            )}
            <h1 className="mt-6 text-[clamp(40px,6vw,68px)] font-extrabold leading-[1.05] tracking-tight">
              {data.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{data.summary || data.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.email && (
                <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">
                  <Mail size={15} /> Get in touch
                </a>
              )}
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 hover:border-zinc-400 transition-colors">
                  <Github size={15} /> GitHub
                </a>
              )}
            </div>
            {data.location && (
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-400"><MapPin size={14} /> {data.location}</p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
            className="relative rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 shadow-xl shadow-zinc-200/50">
            <div className="grid size-20 place-items-center rounded-2xl bg-ember text-2xl font-black text-white">{initials || "?"}</div>
            <p className="mt-5 text-xl font-bold">{data.name}</p>
            <p className="text-ember font-medium">{data.title}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-6">
              {stats.slice(0, 4).map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-extrabold">{s.v}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
        <Section id="skills" label="Skills" title="What I bring to the table." tint>
          {data.topSkills?.length > 0 && (
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-sm font-bold text-ember">{s.pct}%</span>
                  </div>
                  {s.subtitle && <p className="mt-0.5 text-sm text-zinc-500">{s.subtitle}</p>}
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }} className="h-full rounded-full bg-ember" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skillCategories?.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-lg bg-zinc-100 px-2.5 py-1 text-sm text-zinc-700">{sk}</span>
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
        <Section id="work" label="Experience" title="Where I've worked.">
          <div className="space-y-4">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 rounded-2xl border border-zinc-200 p-7 md:grid-cols-[180px_1fr] hover:border-ember/40 hover:shadow-lg hover:shadow-zinc-100 transition-all">
                <div>
                  <p className="text-sm font-bold text-zinc-400">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-sm text-zinc-400">{e.location}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{e.role}</h3>
                  <p className="font-medium text-ember">{e.company}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-600">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" /> {d}
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
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 hover:border-ember/40 hover:shadow-xl hover:shadow-zinc-100 transition-all">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  {(p.live || p.github) && (
                    <a href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer" className="text-zinc-300 group-hover:text-ember transition-colors"><ArrowUpRight size={18} /></a>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.techStack?.map((t) => (
                    <span key={t} className="rounded-md bg-ember/10 px-2 py-0.5 text-xs font-medium text-ember">{t}</span>
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="rounded-2xl border border-zinc-200 p-7">
                <p className="text-4xl font-extrabold text-ember">{n.value}</p>
                <p className="mt-2 font-bold">{n.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{n.description}</p>
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
                  <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <h3 className="font-bold">{ed.degree}</h3>
                    <p className="font-medium text-ember">{ed.institution}</p>
                    <p className="mt-1 text-sm text-zinc-400">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-4 hover:border-ember/40 transition-colors">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-zinc-400">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={16} className="text-zinc-300" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer id="contact" className="border-t border-zinc-100 bg-[#0A0A0A] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight">Let&apos;s work together.</h2>
          <p className="mt-4 text-zinc-400">Open to new opportunities and collaborations.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {data.email && <FootLink href={`mailto:${data.email}`} icon={<Mail size={15} />} label="Email" />}
            {data.linkedin && <FootLink href={data.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />}
            {data.github && <FootLink href={data.github} icon={<Github size={15} />} label="GitHub" />}
            {data.website && <FootLink href={data.website} icon={<Globe size={15} />} label="Website" />}
          </div>
          <p className="mt-14 text-sm text-zinc-600">© {new Date().getFullYear()} {data.name}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, label, title, children, tint }: { id?: string; label: string; title: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={tint ? "bg-zinc-50 py-20 px-6" : "py-20 px-6"}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-ember">{label}</p>
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
