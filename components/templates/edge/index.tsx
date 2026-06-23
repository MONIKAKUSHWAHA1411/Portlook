"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowUpRight, MapPin, ExternalLink } from "lucide-react";
import type { TemplateProps } from "../types";

const CONIC = "conic-gradient(from 90deg at 50% 50%, #00DFD8, #007CF0, #7928CA, #FF0080, #FF4D4D, #F9CB28, #00DFD8)";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Triangle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 L22 20 L2 20 Z" />
    </svg>
  );
}

export function EdgeTemplate({ data }: TemplateProps) {
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const stats = [
    { v: `${data.experience?.length ?? 0}`, l: "roles" },
    { v: `${data.projects?.length ?? 0}`, l: "projects" },
    { v: `${skillCount}`, l: "tech" },
    { v: `${data.certifications?.length ?? 0}`, l: "certs" },
  ];
  const gradients = [
    "linear-gradient(135deg,#007CF0,#00DFD8)",
    "linear-gradient(135deg,#7928CA,#FF0080)",
    "linear-gradient(135deg,#FF4D4D,#F9CB28)",
    "linear-gradient(135deg,#00DFD8,#7928CA)",
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-16">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <Triangle /> {data.name}
          </span>
          <ul className="hidden md:flex items-center gap-7 text-sm text-white/60">
            {["About", "Work", "Projects", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-white transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition-colors">
              Contact
            </a>
          )}
        </nav>
      </header>

      {/* Hero with conic glow */}
      <section id="about" className="relative overflow-hidden px-6 pt-28 pb-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[-200px] -z-0 h-[600px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full opacity-25"
          style={{ background: CONIC, filter: "blur(130px)" }} />
        <motion.div initial="hidden" animate="show" variants={reveal} className="relative mx-auto max-w-3xl">
          {data.statusBadge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              <span className="size-1.5 rounded-full bg-emerald-400" /> {data.statusBadge}
            </span>
          )}
          <h1 className="mt-7 text-balance text-[clamp(46px,8vw,88px)] font-bold leading-[0.98] tracking-[-0.03em]">{data.heroHeadline}</h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/55">{data.summary || data.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {data.email && (
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors">
                <Mail size={15} /> Get in touch
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:border-white/50 transition-colors">
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
          {data.location && <p className="mt-7 inline-flex items-center gap-1.5 text-sm text-white/40"><MapPin size={13} /> {data.location}</p>}
        </motion.div>

        {/* stat strip */}
        <div className="relative mx-auto mt-16 grid max-w-xl grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
          {stats.map((s) => (
            <div key={s.l} className="bg-black px-3 py-5">
              <p className="text-2xl font-bold tabular-nums">{s.v}</p>
              <p className="font-plex-mono text-[10px] uppercase tracking-wide text-white/40">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects — deployment cards (focal point) */}
      {data.projects?.length > 0 && (
        <Section id="projects" label="Projects" title="Shipped & deployed.">
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-xl border border-white/12 bg-[#0a0a0a] transition-colors hover:border-white/30">
                {/* faux deployment preview */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden" style={{ background: gradients[i % gradients.length] }}>
                  <span className="px-4 text-center text-xl font-bold text-white/95 drop-shadow">{p.name}</span>
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.techStack?.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 px-1.5 py-0.5 font-plex-mono text-[11px] text-white/50">{t}</span>
                    ))}
                  </div>
                  {(p.live || p.github) && (
                    <div className="mt-4 flex gap-2">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors">
                          <ExternalLink size={13} /> Visit
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white hover:border-white/50 transition-colors">
                          <Github size={13} /> Repo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
        <Section id="skills" label="Skills" title="The stack.">
          {data.topSkills?.length > 0 && (
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-plex-mono text-sm text-white/50">{s.pct}%</span>
                  </div>
                  {s.subtitle && <p className="mt-0.5 text-sm text-white/40">{s.subtitle}</p>}
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="h-full rounded-full bg-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skillCategories?.length > 0 && (
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="bg-black p-5">
                  <p className="font-plex-mono text-[11px] uppercase tracking-wide text-white/40">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-md border border-white/10 px-2.5 py-1 text-[13px] text-white/70">{sk}</span>
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
          <div className="flex flex-col">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-plex-mono text-[13px] text-white/40">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 font-plex-mono text-[12px] text-white/30">{e.location}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{e.role} <span className="text-white/40">·</span> <span className="text-white/70">{e.company}</span></h3>
                  <ul className="mt-3 space-y-1.5">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-[14.5px] leading-relaxed text-white/55">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-white/40" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <Section label="Impact" title="By the numbers.">
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="bg-black p-7">
                <p className="text-4xl font-bold tabular-nums">{n.value}</p>
                <p className="mt-2 font-semibold text-white/90">{n.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/45">{n.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education + certs */}
      {(data.education?.length > 0 || data.certifications?.length > 0) && (
        <Section id="education" label="Background" title="Education & credentials.">
          <div className="grid gap-8 lg:grid-cols-2">
            {data.education?.length > 0 && (
              <div className="space-y-4">
                {data.education.map((ed, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
                    <h3 className="font-semibold">{ed.degree}</h3>
                    <p className="text-white/60">{ed.institution}</p>
                    <p className="mt-1 font-plex-mono text-[12px] text-white/40">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0a0a] px-5 py-4 hover:border-white/30 transition-colors">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="font-plex-mono text-[12px] text-white/40">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={16} className="text-white/40" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer id="contact" className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 bottom-[-300px] h-[500px] w-[800px] max-w-[140vw] -translate-x-1/2 rounded-full opacity-20" style={{ background: CONIC, filter: "blur(130px)" }} />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-[clamp(36px,6vw,60px)] font-bold tracking-[-0.03em]">Let&apos;s ship something.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {data.email && <FootLink href={`mailto:${data.email}`} icon={<Mail size={15} />} label="Email" />}
            {data.linkedin && <FootLink href={data.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />}
            {data.github && <FootLink href={data.github} icon={<Github size={15} />} label="GitHub" />}
            {data.website && <FootLink href={data.website} icon={<Globe size={15} />} label="Website" />}
          </div>
          <p className="mt-14 inline-flex items-center gap-2 font-plex-mono text-[12px] text-white/30"><Triangle size={11} /> © {new Date().getFullYear()} {data.name}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, label, title, children }: { id?: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-9">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.15em] text-white/40">{label}</p>
        <h2 className="mt-2 text-[clamp(26px,3.5vw,40px)] font-bold tracking-[-0.02em]">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function FootLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:border-white/40 transition-colors">
      {icon} {label}
    </a>
  );
}
