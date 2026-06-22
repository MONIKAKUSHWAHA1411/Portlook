"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types";

const ITEMS = [
  { label: "STORY", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "BY THE NUMBERS", href: "#numbers" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation({ data }: { data: PortfolioData }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const name = data?.name ?? "Portfolio";
  const initials = name.split(" ").slice(0, 2).map((w: string) => w[0] ?? "").join("").toLowerCase() || "p";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const { href } of [...ITEMS].reverse()) {
        const el = document.getElementById(href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(href.slice(1)); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/5" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="text-white font-bold text-lg tracking-tight">{initials}.</a>
        <div className="hidden md:flex items-center gap-7">
          {ITEMS.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <a key={label} href={href} className={`text-xs font-semibold tracking-widest transition-colors relative ${active === id ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`}>
                {label}
                {active === id && <motion.div layoutId="nav-ul" className="absolute -bottom-1 left-0 right-0 h-[2px] rounded bg-gradient-to-r from-purple-500 to-cyan-400" />}
              </a>
            );
          })}
        </div>
        <a href="#contact" className="hire-btn">Hire Me</a>
      </div>
    </motion.nav>
  );
}
