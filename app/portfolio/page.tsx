"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioData } from "@/lib/types";
import { ParticleCanvas } from "@/components/portfolio/ParticleCanvas";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Numbers } from "@/components/portfolio/Numbers";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";

export default function PortfolioPage() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("portfolioData");
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      setData(JSON.parse(raw));
    } catch {
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

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
    <main className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      <ParticleCanvas />
      <Navigation data={data} />

      <div className="relative z-10">
        <Hero data={data} />
        <About data={data} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Numbers data={data} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Certifications certifications={data.certifications} />
        <Contact data={data} />
      </div>
    </main>
  );
}
