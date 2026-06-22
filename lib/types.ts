export interface PortfolioSkills {
  languages: string[];
  frameworks: string[];
  aiml: string[];
  cloud: string[];
  databases: string[];
  tools: string[];
}

export interface PortfolioExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location?: string | null;
  description: string[];
}

export interface PortfolioEducation {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade?: string | null;
}

export interface PortfolioProject {
  name: string;
  description: string;
  techStack: string[];
  github?: string | null;
  live?: string | null;
}

export interface PortfolioCertification {
  name: string;
  issuer: string;
  date: string;
  url?: string | null;
}

export interface TopSkill {
  name: string;
  pct: number;
  subtitle?: string;
}

export interface PortfolioMetric {
  value: string;
  title: string;
  description: string;
  bubble: string;
  iconType: "check" | "zap" | "layers" | "shield" | "bot" | "dollar" | "bar" | "target" | "users" | "rocket" | "code" | "award";
  color: "purple" | "cyan" | "emerald";
}

export interface PhilosophyCard {
  emoji: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  label: string;
  color: "purple" | "cyan" | "emerald" | "yellow" | "blue" | "pink";
  skills: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  summary: string;

  // Role-specific dynamic content
  role: string;
  heroHeadline: string;
  heroSubtitle: string;
  statusBadge: string;
  topSkills: TopSkill[];
  philosophyCards: PhilosophyCard[];
  numbers: PortfolioMetric[];
  skillCategories: SkillCategory[];

  // Raw CV data
  skills: PortfolioSkills;
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  projects: PortfolioProject[];
  certifications: PortfolioCertification[];
}
