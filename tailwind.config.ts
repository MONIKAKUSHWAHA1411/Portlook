import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
        "plex-mono": ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        "dm-mono": ["var(--font-dm-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        // Template accent palettes (see lib/templates.ts)
        ember: "#E8420A",
        halo: {
          black: "#080810",
          surface: "#181719",
          indigo: "#634DFF",
        },
        ink: {
          black: "#0a0a0a",
          surface: "#161616",
          red: "#ff3d1f",
          teal: "#00e5c3",
          purple: "#b57bff",
          yellow: "#f5d231",
          lime: "#c8f135",
        },
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        ticker: "ticker 22s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
