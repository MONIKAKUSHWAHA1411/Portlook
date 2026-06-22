"use client";

import { motion } from "framer-motion";
import { Terminal, Mail, Github, Linkedin, Globe, ArrowUpRight, MapPin, Circle } from "lucide-react";
import type { TemplateProps } from "../types";

const ORANGE = "#f55036";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

function WindowDots() {
  return (
    <div className="flex gap-1.5">
      <span className="size-3 rounded-full bg-[#ff5f57]" />
      <span className="size-3 rounded-full bg-[#febc2e]" />
      <span className="size-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

export function DevTemplate({ data }: TemplateProps) {
  const skillCount = Object.values(data.skills ?? {}).flat().length;

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-300 font-sans selection:bg-[#f55036]/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/8 bg-[#0a0a0b] px-6 py-8 lg:flex print:hidden">
        <div className="flex items-center gap-2 font-dm-mono text-sm">
          <Terminal size={16} style={{ color: ORANGE }} />
          <span className="text-white">{data.name}</span>
        </div>
        <p className="mt-1 font-dm-mono text-xs text-zinc-600">{data.title}</p>

        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}
              className="group flex items-center gap-2 rounded-md px-2 py-1.5 font-dm-mono text-[13px] text-zinc-500 hover:bg-white/5 hover:text-white transition-colors">
              <Circle size={6} className="text-zinc-700 group-hover:text-[#f55036] transition-colors" fill="currentColor" />
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 font-dm-mono text-xs text-zinc-600">
          {data.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {data.location}</span>}
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> {data.statusBadge || "Available"}</span>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-60">
        <div className="mx-auto max-w-3xl px-6 py-14">
          {/* Hero terminal */}
          <motion.section id="overview" initial="hidden" animate="show" variants={reveal} className="scroll-mt-20">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
              <div className="flex items-center gap-3 border-b border-white/8 px-4 py-2.5">
                <WindowDots />
                <span className="font-dm-mono text-xs text-zinc-500">~/{(data.name || "user").toLowerCase().replace(/\s+/g, "-")} — zsh</span>
              </div>
              <div className="p-5 font-dm-mono text-[13.5px] leading-relaxed">
                <p><span style={{ color: ORANGE }}>➜</span> <span className="text-emerald-400">~</span> whoami</p>
                <p className="mt-1 text-white">{data.heroHeadline}</p>
                <p className="mt-4"><span style={{ color: ORANGE }}>➜</span> <span className="text-emerald-400">~</span> cat summary.txt</p>
                <p className="mt-1 text-zinc-400">{data.summary || data.heroSubtitle}</p>
                <p className="mt-4"><span style={{ color: ORANGE }}>➜</span> <span className="text-emerald-400">~</span> <span className="inline-block w-2 h-4 align-middle animate-pulse" style={{ background: ORANGE }} /></p>
              </div>
            </div>

            {/* stat row */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { v: data.experience?.length ?? 0, l: "roles" },
                { v: data.projects?.length ?? 0, l: "projects" },
                { v: skillCount, l: "tech" },
                { v: data.certifications?.length ?? 0, l: "certs" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-white/8 bg-[#111113] px-4 py-3">
                  <p className="text-2xl font-bold text-white tabular-nums">{s.v}</p>
                  <p className="font-dm-mono text-[11px] text-zinc-500">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          {(data.topSkills?.length > 0 || data.skillCategories?.length > 0) && (
            <DevSection id="skills" cmd="skills --list">
              {data.topSkills?.length > 0 && (
                <div className="mb-6 space-y-3 font-dm-mono text-[13px]">
                  {data.topSkills.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 truncate text-zinc-300">{s.name}</span>
                      <span className="flex-1 overflow-hidden rounded bg-white/5">
                        <motion.span initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.8 }} className="block h-2 rounded" style={{ background: ORANGE }} />
                      </span>
                      <span className="w-10 text-right text-zinc-500 tabular-nums">{s.pct}%</span>
                    </div>
                  ))}
                </div>
              )}
              {data.skillCategories?.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-[#111113] p-5 font-dm-mono text-[13px]">
                  {data.skillCategories.map((cat, i) => (
                    <div key={i} className="py-1.5">
                      <span className="text-zinc-600">{cat.label}:</span>{" "}
                      <span className="text-zinc-300">{cat.skills.join(", ")}</span>
                    </div>
                  ))}
                </div>
              )}
            </DevSection>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <DevSection id="experience" cmd="git log --experience">
              <div className="space-y-5">
                {data.experience.map((e, i) => (
                  <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                    className="rounded-xl border border-white/10 bg-[#111113] p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-white">{e.role} <span className="text-zinc-600">@</span> <span style={{ color: ORANGE }}>{e.company}</span></h3>
                      <span className="font-dm-mono text-xs text-zinc-500">{e.startDate} — {e.endDate}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {e.description?.map((d, j) => (
                        <li key={j} className="flex gap-2 text-[14px] leading-relaxed text-zinc-400">
                          <span className="text-zinc-700">+</span> {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </DevSection>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <DevSection id="projects" cmd="ls ./projects">
              <div className="grid gap-3 sm:grid-cols-2">
                {data.projects.map((p, i) => (
                  <motion.a key={i} href={p.live || p.github || "#"} target="_blank" rel="noopener noreferrer"
                    initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                    className="group flex flex-col rounded-xl border border-white/10 bg-[#111113] p-5 hover:border-[#f55036]/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-dm-mono text-sm font-semibold text-white">{p.name}</h3>
                      <ArrowUpRight size={15} className="text-zinc-600 group-hover:text-[#f55036] transition-colors" />
                    </div>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-zinc-400">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.techStack?.map((t) => (
                        <span key={t} className="font-dm-mono text-[11px] text-zinc-500">#{t}</span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </DevSection>
          )}

          {/* Numbers */}
          {data.numbers?.length > 0 && (
            <DevSection cmd="stats --summary">
              <div className="grid gap-3 sm:grid-cols-3">
                {data.numbers.map((n, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-[#111113] p-5">
                    <p className="text-3xl font-bold tabular-nums" style={{ color: ORANGE }}>{n.value}</p>
                    <p className="mt-1 text-sm font-medium text-white">{n.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{n.description}</p>
                  </div>
                ))}
              </div>
            </DevSection>
          )}

          {/* Background */}
          {(data.education?.length > 0 || data.certifications?.length > 0) && (
            <DevSection id="background" cmd="cat education.md">
              <div className="space-y-3">
                {data.education?.map((ed, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-[#111113] p-5">
                    <h3 className="font-semibold text-white">{ed.degree}</h3>
                    <p className="text-sm" style={{ color: ORANGE }}>{ed.institution}</p>
                    <p className="mt-1 font-dm-mono text-xs text-zinc-500">{ed.startDate} — {ed.endDate}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                  </div>
                ))}
                {data.certifications?.map((c, i) => (
                  <a key={i} href={c.url || "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111113] p-4 hover:border-[#f55036]/50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-white">{c.name}</p>
                      <p className="font-dm-mono text-xs text-zinc-500">{c.issuer} · {c.date}</p>
                    </div>
                    {c.url && <ArrowUpRight size={14} className="text-zinc-600" />}
                  </a>
                ))}
              </div>
            </DevSection>
          )}

          {/* Contact */}
          <DevSection id="contact" cmd="./contact.sh">
            <div className="flex flex-wrap gap-2.5 font-dm-mono text-[13px]">
              {data.email && <DevLink href={`mailto:${data.email}`} icon={<Mail size={14} />} label="email" />}
              {data.linkedin && <DevLink href={data.linkedin} icon={<Linkedin size={14} />} label="linkedin" />}
              {data.github && <DevLink href={data.github} icon={<Github size={14} />} label="github" />}
              {data.website && <DevLink href={data.website} icon={<Globe size={14} />} label="website" />}
            </div>
            <p className="mt-10 font-dm-mono text-xs text-zinc-700">// © {new Date().getFullYear()} {data.name}</p>
          </DevSection>
        </div>
      </main>
    </div>
  );
}

function DevSection({ id, cmd, children }: { id?: string; cmd: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-20">
      <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
        className="mb-5 font-dm-mono text-[13px] text-zinc-500">
        <span style={{ color: ORANGE }}>$</span> {cmd}
      </motion.p>
      {children}
    </section>
  );
}

function DevLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111113] px-4 py-2 text-zinc-300 hover:border-[#f55036]/50 hover:text-white transition-colors">
      {icon} {label}
    </a>
  );
}
