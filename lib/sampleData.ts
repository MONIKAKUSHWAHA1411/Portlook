import type { PortfolioData } from "./types";

/**
 * A complete demo profile used by the "Preview with sample data" button so the
 * six templates can be browsed instantly without calling the Groq API (handy
 * when you're exploring designs or have hit a free-tier token limit).
 */
export const SAMPLE_PORTFOLIO: PortfolioData = {
  name: "Alex Rivera",
  title: "AI Engineer",
  email: "alex.rivera@example.com",
  phone: "+1 555 0100",
  location: "San Francisco, CA",
  linkedin: "https://linkedin.com/in/alexrivera",
  github: "https://github.com/alexrivera",
  website: "https://alexrivera.dev",
  summary:
    "AI engineer specializing in LLM evaluation, RAG systems, and production ML. I build tools that make model behavior measurable and trustworthy.",
  role: "ai_engineer",
  heroHeadline: "Building AI That Survives Production",
  heroSubtitle: "LLM evaluation, RAG, and agentic systems that ship.",
  statusBadge: "Open to Senior AI Roles",
  topSkills: [
    { name: "Python", pct: 95, subtitle: "Primary language for 6+ years" },
    { name: "LLM Evaluation", pct: 90, subtitle: "RAGAS, custom judges" },
    { name: "RAG Systems", pct: 88 },
    { name: "PyTorch", pct: 80 },
  ],
  philosophyCards: [
    { emoji: "🎯", title: "Measure everything", description: "If a model's behavior isn't measured, it isn't managed." },
    { emoji: "🛡️", title: "Trust by design", description: "Guardrails and evals before scale, not after." },
    { emoji: "⚡", title: "Ship to learn", description: "Production is the only real benchmark." },
    { emoji: "🔍", title: "Debug deeply", description: "Trace every failure to its root cause." },
  ],
  numbers: [
    { value: "2000+", title: "Evals Automated", description: "Deterministic evals running in CI on every commit.", bubble: "Zero flakes!", iconType: "check", color: "purple" },
    { value: "40%", title: "Latency Cut", description: "Reduced inference latency via caching + batching.", bubble: "Fast!", iconType: "zap", color: "cyan" },
    { value: "12", title: "Models Shipped", description: "Across NLP and multimodal use cases.", bubble: "", iconType: "layers", color: "emerald" },
    { value: "99.9%", title: "Uptime", description: "Reliable model-serving infrastructure.", bubble: "", iconType: "shield", color: "purple" },
    { value: "5", title: "Agents Built", description: "Tool-using agents running in production.", bubble: "", iconType: "bot", color: "cyan" },
    { value: "$1.2M", title: "Cost Saved", description: "Through model and infra optimization.", bubble: "", iconType: "dollar", color: "emerald" },
  ],
  skillCategories: [
    { label: "Languages", color: "purple", skills: ["Python", "TypeScript", "SQL", "Go"] },
    { label: "ML / AI", color: "cyan", skills: ["PyTorch", "LangChain", "Transformers", "RAGAS"] },
    { label: "Infra", color: "emerald", skills: ["Docker", "Kubernetes", "AWS", "Ray"] },
    { label: "Data", color: "yellow", skills: ["Postgres", "ChromaDB", "Spark"] },
    { label: "Tools", color: "blue", skills: ["Git", "MLflow", "W&B"] },
    { label: "Frontend", color: "pink", skills: ["React", "Next.js", "Tailwind"] },
  ],
  skills: {
    languages: ["Python", "TypeScript", "SQL", "Go"],
    frameworks: ["PyTorch", "LangChain", "Next.js", "FastAPI"],
    aiml: ["RAG", "LLM Eval", "Fine-tuning", "Agents"],
    cloud: ["AWS", "GCP", "Docker", "Kubernetes"],
    databases: ["Postgres", "ChromaDB", "Redis"],
    tools: ["Git", "MLflow", "W&B"],
  },
  experience: [
    {
      company: "Acme AI",
      role: "Senior AI Engineer",
      startDate: "Jan 2023",
      endDate: "Present",
      location: "Remote",
      description: [
        "Built the LLM evaluation platform used across 4 product teams.",
        "Cut inference latency 40% via caching and request batching.",
        "Shipped 5 tool-using agents to production with guardrails.",
      ],
    },
    {
      company: "DataCorp",
      role: "ML Engineer",
      startDate: "Jun 2020",
      endDate: "Dec 2022",
      location: "Bengaluru",
      description: [
        "Owned the RAG pipeline serving 1M+ queries per month.",
        "Reduced hallucination rate by 30% with retrieval guardrails.",
      ],
    },
  ],
  education: [
    { institution: "UC Berkeley", degree: "B.S. in Computer Science", startDate: "2016", endDate: "2020", grade: "3.9 GPA" },
  ],
  projects: [
    { name: "TrustLLM", description: "Open platform for evaluating LLM reliability, safety, and accuracy.", techStack: ["Python", "Streamlit", "ChromaDB"], github: "https://github.com/alexrivera/trustllm", live: "https://example.com" },
    { name: "RAG Debugger", description: "Change-one-variable comparison loop for RAG pipelines.", techStack: ["Python", "RAGAS", "FastAPI"], github: null, live: null },
    { name: "Agent Eval", description: "Benchmark harness for tool-using agents.", techStack: ["TypeScript", "LangChain"], github: "https://github.com/alexrivera/agent-eval", live: null },
  ],
  certifications: [
    { name: "AWS Certified ML — Specialty", issuer: "Amazon", date: "2023", url: "https://aws.amazon.com" },
    { name: "Deep Learning Specialization", issuer: "Coursera", date: "2021", url: null },
  ],
};
