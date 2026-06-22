"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowUpRight, MapPin } from "lucide-react";
import type { TemplateProps } from "../types";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-plex-mono text-[12px] font-medium uppercase tracking-[0.04em] text-white/70">
      <span className="block size-2 rounded-full bg-halo-indigo" />
      <span>{children}</span>
    </div>
  );
}

export function HaloTemplate({ data }: TemplateProps) {
  const initials = (data.name ?? "").split(" ").slice(0, 2).map((w) => w[0] ?? "").join("");
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const stats = [
    { v: `${data.projects?.length ?? 0}`, l: "Projects" },
    { v: `${data.experience?.length ?? 0}`, l: "Roles" },
    { v: `${skillCount}`, l: "Technologies" },
    { v: `${data.certifications?.length ?? 0}`, l: "Certifications" },
  ];

  return (
    <div className="min-h-screen bg-halo-black text-white font-sans selection:bg-halo-indigo/30 overflow-x-hidden">
      {/* Floating glass nav */}
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-5 md:px-6 print:hidden">
        <nav className="flex w-full max-w-[1100px] items-center justify-between rounded-full backdrop-blur-md bg-black/40 ring-1 ring-white/[0.06] pl-5 pr-2 lg:pl-8 lg:pr-3 h-[58px] lg:h-[64px]">
          <span className="font-medium tracking-tight">{data.name}</span>
          <ul className="hidden lg:flex items-center gap-8 text-[13px] text-white/70">
            {["About", "Work", "Skills", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-white transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex h-[38px] items-center rounded-full bg-white px-5 text-[13px] font-medium text-halo-black hover:bg-halo-surface hover:text-white transition-colors">
              Get in touch
            </a>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="relative overflow-hidden pt-[200px] pb-[120px] text-center px-6" style={{ backgroundColor: "#080810" }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px]" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(99,77,255,0.28) 0%, rgba(8,8,16,0) 70%)" }} />
        <motion.div initial="hidden" animate="show" variants={reveal} className="relative mx-auto max-w-[900px] flex flex-col items-center">
          {data.statusBadge && <Eyebrow>{data.statusBadge}</Eyebrow>}
          <h1 className="mt-7 text-balance font-medium tracking-[-0.04em] leading-[1.04] text-[clamp(44px,7vw,84px)]">
            {data.heroHeadline}
          </h1>
          <p className="mt-7 max-w-[520px] text-[17px] leading-[28px] text-white/65">{data.summary || data.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {data.email && (
              <a href={`mailto:${data.email}`} className="inline-flex h-[50px] items-center justify-center rounded-full bg-white px-7 text-[14.5px] font-medium text-halo-black hover:bg-halo-surface hover:text-white transition-colors">
                Contact me
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-[14.5px] font-medium text-white backdrop-blur-md hover:bg-white/10 transition-colors">
                <Github size={16} /> GitHub
              </a>
            )}
          </div>
          {data.location && (
            <p className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-white/45">
              <MapPin size={13} /> {data.location}
            </p>
          )}
        </motion.div>

        {/* Stat strip */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
          className="relative mx-auto mt-20 grid max-w-[900px] grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/[0.04]">
          {stats.map((s) => (
            <div key={s.l} className="bg-halo-black/60 px-6 py-8">
              <p className="text-[40px] font-medium leading-none tracking-[-0.03em]">{s.v}</p>
              <p className="mt-2 font-plex-mono text-[11px] uppercase tracking-wider text-white/45">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy / capabilities */}
      {data.philosophyCards?.length > 0 && (
        <Section id="approach" eyebrow="How I work" title="Principles that shape every project.">
          <div className="grid gap-6 lg:grid-cols-2">
            {data.philosophyCards.map((c, i) => (
              <motion.article key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="rounded-[18px] border border-white/10 bg-white/[0.02] p-7 hover:border-halo-indigo/40 transition-colors">
                <span className="text-2xl">{c.emoji}</span>
                <h3 className="mt-4 text-[20px] font-medium tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-white/60">{c.description}</p>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Top skills with bars */}
      {data.topSkills?.length > 0 && (
        <Section id="skills" eyebrow="Capabilities" title="Where I'm strongest." surface>
          <div className="grid gap-x-12 gap-y-7 lg:grid-cols-2">
            {data.topSkills.map((s, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] font-medium">{s.name}</span>
                  <span className="font-plex-mono text-[13px] text-halo-indigo">{s.pct}%</span>
                </div>
                {s.subtitle && <p className="mt-1 text-[13px] text-white/45">{s.subtitle}</p>}
                <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-white/8">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-halo-indigo to-[#a99bff]" />
                </div>
              </div>
            ))}
          </div>

          {data.skillCategories?.length > 0 && (
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="rounded-[18px] border border-white/10 bg-white/[0.02] p-5">
                  <p className="font-plex-mono text-[11px] uppercase tracking-wider text-white/45">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12.5px] text-white/75">{sk}</span>
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
        <Section id="work" eyebrow="Experience" title="Roles & impact.">
          <div className="flex flex-col">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-plex-mono text-[12px] text-white/40">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-[12px] text-white/35">{e.location}</p>}
                </div>
                <div>
                  <h3 className="text-[20px] font-medium tracking-[-0.02em]">{e.role}</h3>
                  <p className="text-[15px] text-halo-indigo">{e.company}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-[14.5px] leading-[1.6] text-white/60">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-halo-indigo" /> {d}
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
        <Section id="projects" eyebrow="Selected work" title="Things I've built." surface>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((p, i) => (
              <motion.article key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="group flex flex-col rounded-[18px] border border-white/10 bg-white/[0.02] p-7 hover:border-halo-indigo/40 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[19px] font-medium tracking-[-0.02em]">{p.name}</h3>
                  {(p.live || p.github) && (
                    <a href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer"
                      className="text-white/40 group-hover:text-halo-indigo transition-colors"><ArrowUpRight size={18} /></a>
                  )}
                </div>
                <p className="mt-2 flex-1 text-[14.5px] leading-[1.6] text-white/60">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack?.map((t) => (
                    <span key={t} className="rounded-full bg-halo-indigo/10 px-2.5 py-0.5 text-[11.5px] text-[#b4a9ff]">{t}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Numbers */}
      {data.numbers?.length > 0 && (
        <Section id="numbers" eyebrow="By the numbers" title="Measurable outcomes.">
          <div className="grid gap-px overflow-hidden rounded-2xl ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="bg-white/[0.02] p-7">
                <p className="text-[44px] font-medium leading-none tracking-[-0.03em] text-halo-indigo">{n.value}</p>
                <p className="mt-3 text-[15px] font-medium">{n.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-white/50">{n.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education + Certifications */}
      {(data.education?.length > 0 || data.certifications?.length > 0) && (
        <Section id="education" eyebrow="Background" title="Education & credentials." surface>
          <div className="grid gap-10 lg:grid-cols-2">
            {data.education?.length > 0 && (
              <div className="space-y-5">
                {data.education.map((ed, i) => (
                  <div key={i} className="rounded-[18px] border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="text-[17px] font-medium">{ed.degree}</h3>
                    <p className="text-[14px] text-halo-indigo">{ed.institution}</p>
                    <p className="mt-1 font-plex-mono text-[12px] text-white/40">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-[14px] border border-white/10 bg-white/[0.02] px-5 py-4 hover:border-halo-indigo/40 transition-colors">
                    <div>
                      <p className="text-[15px] font-medium">{c.name}</p>
                      <p className="text-[13px] text-white/45">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={16} className="text-white/40" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Contact / footer */}
      <footer id="contact" className="relative overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[400px]" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(99,77,255,0.22) 0%, rgba(8,8,16,0) 70%)" }} />
        <div className="relative mx-auto max-w-[700px]">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-6 text-[clamp(36px,5vw,56px)] font-medium tracking-[-0.04em] leading-[1.05]">Let&apos;s build something.</h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {data.email && <FooterLink href={`mailto:${data.email}`} icon={<Mail size={15} />} label="Email" />}
            {data.linkedin && <FooterLink href={data.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />}
            {data.github && <FooterLink href={data.github} icon={<Github size={15} />} label="GitHub" />}
            {data.website && <FooterLink href={data.website} icon={<Globe size={15} />} label="Website" />}
          </div>
          <p className="mt-16 font-plex-mono text-[12px] uppercase tracking-wider text-white/30">{data.name} · {initials}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, eyebrow, title, children, surface }: { id?: string; eyebrow: string; title: string; children: React.ReactNode; surface?: boolean }) {
  return (
    <section id={id} className={surface ? "bg-halo-surface/30 py-24 px-6" : "py-24 px-6"}>
      <div className="mx-auto max-w-[1100px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-12 flex flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="max-w-[820px] text-balance text-[clamp(30px,4.5vw,48px)] font-medium leading-[1.08] tracking-[-0.04em]">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FooterLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-[14px] font-medium text-white backdrop-blur-md hover:bg-white/10 transition-colors">
      {icon} {label}
    </a>
  );
}
