"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Globe, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import type { TemplateProps } from "../types";

const ROSE = "#f0386b";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full blur-[120px]" style={{ background: "rgba(240,56,107,0.32)" }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }} />
      <motion.div className="absolute top-10 right-1/4 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: "rgba(139,92,246,0.28)" }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1.1, 1, 1.1] }} transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: "rgba(245,158,11,0.2)" }}
        animate={{ x: [0, 50, 0], scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }} />
    </div>
  );
}

export function PulseTemplate({ data }: TemplateProps) {
  const skillCount = Object.values(data.skills ?? {}).flat().length;
  const stats = [
    { v: data.experience?.length ?? 0, l: "Roles" },
    { v: data.projects?.length ?? 0, l: "Projects" },
    { v: skillCount, l: "Technologies" },
    { v: data.certifications?.length ?? 0, l: "Certifications" },
  ];
  const marquee = Array.from(new Set([...(data.topSkills ?? []).map((s) => s.name), ...Object.values(data.skills ?? {}).flat()])).slice(0, 14);

  return (
    <div className="min-h-screen bg-[#0c0a0d] text-white font-sans selection:bg-[#f0386b]/30 overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0c0a0d]/70 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <span className="flex items-center gap-2 font-bold tracking-tight">
            <span className="size-2 rounded-full" style={{ background: ROSE }} /> {data.name}
          </span>
          <ul className="hidden md:flex items-center gap-8 text-sm text-white/60">
            {["About", "Work", "Skills", "Contact"].map((x) => (
              <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-white transition-colors">{x}</a></li>
            ))}
          </ul>
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105" style={{ background: ROSE }}>
              Get in touch
            </a>
          )}
        </nav>
      </header>

      {/* Hero with aurora */}
      <section id="about" className="relative px-6 pt-24 pb-20 text-center">
        <Aurora />
        <motion.div initial="hidden" animate="show" variants={reveal} className="relative mx-auto max-w-3xl">
          {data.statusBadge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
              <Sparkles size={12} style={{ color: ROSE }} /> {data.statusBadge}
            </span>
          )}
          <h1 className="mt-7 text-balance text-[clamp(44px,7vw,82px)] font-extrabold leading-[1.03] tracking-tight">{data.heroHeadline}</h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/60">{data.summary || data.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {data.email && (
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: ROSE, boxShadow: "0 10px 40px rgba(240,56,107,0.4)" }}>
                <Mail size={15} /> Contact me
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors">
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
          {data.location && <p className="mt-7 inline-flex items-center gap-1.5 text-sm text-white/40"><MapPin size={13} /> {data.location}</p>}
        </motion.div>

        {/* Count-up stats */}
        <div className="relative mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.l} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 backdrop-blur">
              <p className="text-4xl font-extrabold" style={{ color: ROSE }}><CountUp to={s.v} /></p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/40">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      {marquee.length > 0 && (
        <div className="border-y border-white/8 bg-white/[0.02] py-4 overflow-hidden">
          <div className="flex w-max animate-ticker whitespace-nowrap">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="flex items-center gap-8 px-8 text-sm font-medium text-white/40">
                {t} <span style={{ color: ROSE }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Philosophy */}
      {data.philosophyCards?.length > 0 && (
        <Section id="values" label="Approach" title="How I work.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.philosophyCards.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#f0386b]/40">
                <span className="text-2xl">{c.emoji}</span>
                <h3 className="mt-3 font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
        <Section id="skills" label="Skills" title="The toolkit.">
          {data.topSkills?.length > 0 && (
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {data.topSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-sm font-bold" style={{ color: ROSE }}>{s.pct}%</span>
                  </div>
                  {s.subtitle && <p className="mt-0.5 text-sm text-white/40">{s.subtitle}</p>}
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/8">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${ROSE}, #8b5cf6)` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skillCategories?.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/40">{cat.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <span key={sk} className="rounded-full border border-white/10 px-3 py-1 text-[12.5px] text-white/75">{sk}</span>
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
        <Section id="work" label="Experience" title="Roles & impact.">
          <div className="flex flex-col">
            {data.experience.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-[200px_1fr]">
                <div>
                  <p className="text-sm text-white/40">{e.startDate} — {e.endDate}</p>
                  {e.location && <p className="mt-1 text-sm text-white/30">{e.location}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{e.role}</h3>
                  <p style={{ color: ROSE }}>{e.company}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.description?.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-[14.5px] leading-relaxed text-white/60">
                        <span className="mt-2 size-1 shrink-0 rounded-full" style={{ background: ROSE }} /> {d}
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
        <Section id="projects" label="Projects" title="Selected work.">
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((p, i) => (
              <motion.article key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} whileHover={{ y: -6 }}
                className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-[#f0386b]/40">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  {(p.live || p.github) && (
                    <a href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors group-hover:text-[#f0386b]"><ArrowUpRight size={18} /></a>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack?.map((t) => (
                    <span key={t} className="rounded-full px-2.5 py-0.5 text-[11.5px]" style={{ background: "rgba(240,56,107,0.12)", color: "#ff8aa8" }}>{t}</span>
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
          <div className="grid gap-px overflow-hidden rounded-3xl ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((n, i) => (
              <div key={i} className="bg-white/[0.03] p-7">
                <p className="text-4xl font-extrabold" style={{ color: ROSE }}>{n.value}</p>
                <p className="mt-2 font-bold">{n.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/50">{n.description}</p>
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
                  <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="font-bold">{ed.degree}</h3>
                    <p style={{ color: ROSE }}>{ed.institution}</p>
                    <p className="mt-1 text-sm text-white/40">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="space-y-3">
                {data.certifications.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-[#f0386b]/40 transition-colors">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-white/40">{c.issuer} · {c.date}</p>
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
      <footer id="contact" className="relative overflow-hidden px-6 py-24 text-center">
        <Aurora />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-[clamp(36px,6vw,60px)] font-extrabold tracking-tight">Let&apos;s create something.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {data.email && <FootLink href={`mailto:${data.email}`} icon={<Mail size={15} />} label="Email" />}
            {data.linkedin && <FootLink href={data.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />}
            {data.github && <FootLink href={data.github} icon={<Github size={15} />} label="GitHub" />}
            {data.website && <FootLink href={data.website} icon={<Globe size={15} />} label="Website" />}
          </div>
          <p className="mt-14 text-sm text-white/30">© {new Date().getFullYear()} {data.name}</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, label, title, children }: { id?: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: ROSE }}>{label}</p>
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
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-white/10 transition-colors">
      {icon} {label}
    </a>
  );
}
