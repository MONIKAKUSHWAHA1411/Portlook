export type TemplateId =
  | "spectrum"
  | "halo"
  | "ember"
  | "editorial"
  | "dev"
  | "ink"
  | "deck"
  | "comet"
  | "quill"
  | "analyst";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  blurb: string;
  theme: "light" | "dark";
  /** Three representative colors shown as a swatch in the picker. */
  swatches: [string, string, string];
  inspiredBy: string;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "spectrum",
    name: "Spectrum",
    blurb: "Dark, animated, gradient-rich AI portfolio.",
    theme: "dark",
    swatches: ["#0a0a1a", "#8b5cf6", "#22d3ee"],
    inspiredBy: "AI-engineer portfolios",
  },
  {
    id: "halo",
    name: "Halo",
    blurb: "Premium indigo SaaS — glass nav, radial glow.",
    theme: "dark",
    swatches: ["#080810", "#634DFF", "#e8e6f2"],
    inspiredBy: "onecomhalo.ai",
  },
  {
    id: "ember",
    name: "Ember",
    blurb: "Clean light SaaS with a warm orange accent.",
    theme: "light",
    swatches: ["#ffffff", "#E8420A", "#0A0A0A"],
    inspiredBy: "trustllm.site",
  },
  {
    id: "editorial",
    name: "Editorial",
    blurb: "Spacious black-on-white editorial grid.",
    theme: "light",
    swatches: ["#ffffff", "#111827", "#2563eb"],
    inspiredBy: "teamtailor.com",
  },
  {
    id: "dev",
    name: "Dev",
    blurb: "Developer-docs look — mono type, code panels.",
    theme: "dark",
    swatches: ["#0f0f0f", "#f55036", "#e5e5e5"],
    inspiredBy: "Groq console",
  },
  {
    id: "ink",
    name: "Ink",
    blurb: "Brutalist poster — Bebas type, grain, ticker.",
    theme: "dark",
    swatches: ["#0a0a0a", "#ff3d1f", "#00e5c3"],
    inspiredBy: "MoodInk",
  },
  {
    id: "deck",
    name: "Deck",
    blurb: "Bright D2C SaaS — rounded cards, dashboard hero.",
    theme: "light",
    swatches: ["#ffffff", "#2f6bff", "#0b1437"],
    inspiredBy: "shopdeck.com",
  },
  {
    id: "comet",
    name: "Comet",
    blurb: "Navy + teal enterprise, stats-forward grid.",
    theme: "light",
    swatches: ["#0b1e3b", "#06b6a4", "#ffffff"],
    inspiredBy: "gocomet.com",
  },
  {
    id: "quill",
    name: "Quill",
    blurb: "Warm cream with elegant serif headings.",
    theme: "light",
    swatches: ["#fdfcfa", "#7c3aed", "#1a1a1a"],
    inspiredBy: "crackaiinterviews.co.in",
  },
  {
    id: "analyst",
    name: "Analyst",
    blurb: "Data-journal — benchmark tables & charts.",
    theme: "light",
    swatches: ["#ffffff", "#2563eb", "#64748b"],
    inspiredBy: "artificialanalysis.ai",
  },
];

export const DEFAULT_TEMPLATE: TemplateId = "spectrum";

/** Coerce any stored/queried value to a valid template id. */
export function getTemplate(id: string | null | undefined): TemplateId {
  return TEMPLATES.some((t) => t.id === id) ? (id as TemplateId) : DEFAULT_TEMPLATE;
}
