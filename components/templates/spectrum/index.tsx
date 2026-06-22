"use client";

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
import type { TemplateProps } from "../types";

/**
 * Spectrum — the original dark, animated, gradient-rich template.
 * Wraps the existing components/portfolio/* section components.
 */
export function SpectrumTemplate({ data }: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      <ParticleCanvas />
      <Navigation data={data} />
      <div className="relative z-10">
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Projects projects={data.projects} />
        <Numbers numbers={data.numbers} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Certifications certifications={data.certifications} />
        <Contact data={data} />
      </div>
    </div>
  );
}
