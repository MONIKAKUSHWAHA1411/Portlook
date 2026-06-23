"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioData } from "@/lib/types";
import { getTemplate, type TemplateId } from "@/lib/templates";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { TemplateSwitcher } from "@/components/templates/TemplateSwitcher";

function sanitize(raw: Record<string, unknown>): PortfolioData {
  const skills = (raw.skills as Record<string, string[]> | null) ?? {};
  return {
    name:         (raw.name as string)         ?? "Your Name",
    title:        (raw.title as string)        ?? "Professional",
    email:        (raw.email as string)        ?? null,
    phone:        (raw.phone as string)        ?? null,
    location:     (raw.location as string)     ?? null,
    linkedin:     (raw.linkedin as string)     ?? null,
    github:       (raw.github as string)       ?? null,
    website:      (raw.website as string)      ?? null,
    summary:      (raw.summary as string)      ?? "",
    role:         (raw.role as string)         ?? "other",
    heroHeadline: (raw.heroHeadline as string) ?? "Building Things That Matter",
    heroSubtitle: (raw.heroSubtitle as string) ?? "",
    statusBadge:  (raw.statusBadge as string)  ?? "Open to New Roles",
    topSkills:    Array.isArray(raw.topSkills)    ? raw.topSkills    : [],
    philosophyCards: Array.isArray(raw.philosophyCards) ? raw.philosophyCards : [],
    numbers:      Array.isArray(raw.numbers)      ? raw.numbers      : [],
    skillCategories: Array.isArray(raw.skillCategories) ? raw.skillCategories : [],
    skills: {
      languages:  Array.isArray(skills.languages)  ? skills.languages  : [],
      frameworks: Array.isArray(skills.frameworks) ? skills.frameworks : [],
      aiml:       Array.isArray(skills.aiml)       ? skills.aiml       : [],
      cloud:      Array.isArray(skills.cloud)      ? skills.cloud      : [],
      databases:  Array.isArray(skills.databases)  ? skills.databases  : [],
      tools:      Array.isArray(skills.tools)      ? skills.tools      : [],
    },
    experience:     Array.isArray(raw.experience)     ? raw.experience     : [],
    education:      Array.isArray(raw.education)      ? raw.education      : [],
    projects:       Array.isArray(raw.projects)       ? raw.projects       : [],
    certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
  } as PortfolioData;
}

export default function PortfolioPage() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [template, setTemplate] = useState<TemplateId>("spectrum");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("portfolioData");
    if (!raw) { router.replace("/"); return; }
    try {
      setData(sanitize(JSON.parse(raw)));
      setTemplate(getTemplate(sessionStorage.getItem("portfolioTemplate")));
    } catch {
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const choose = (id: TemplateId) => {
    setTemplate(id);
    sessionStorage.setItem("portfolioTemplate", id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen">
      <TemplateRenderer template={template} data={data} />
      <TemplateSwitcher current={template} onChange={choose} data={data} />
    </main>
  );
}
