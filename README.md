# Portlook

Turn a CV into a beautiful, shareable portfolio site in seconds — pick from **12 designer templates**, powered by AI.

**🔗 Live:** [portlook-ye1g.vercel.app](https://portlook-ye1g.vercel.app)

Upload a PDF/DOCX résumé → an LLM extracts and structures it → render it in any of 12 distinct styles → publish a public link to share with recruiters.

---

## Features

- **AI CV parsing** — drop a PDF/DOCX; Groq (LLaMA) extracts roles, skills, metrics, projects and writes role-specific portfolio copy.
- **12 switchable templates** — flip between styles live; every template is driven by the same parsed data.
- **Thumbnail previews** — a hand-built mini-mockup of each style in the picker and switcher, grouped by Light/Dark, with a "Surprise me" shuffle.
- **Shareable links** — publish to a permanent public URL (`/p/your-name-7f2a`); no login needed to view.
- **My Portfolios dashboard** — list, copy, open, and unpublish your published portfolios; per-portfolio view counts.
- **Social previews** — auto-generated Open Graph image per portfolio for clean link unfurls.
- **Auth** — Google sign-in, with a guest-login fallback so the app is usable before OAuth is configured.
- **Try with sample data** — preview all templates instantly with zero API usage.

## Templates

| Template | Theme | Inspired by |
|----------|-------|-------------|
| Spectrum | Dark | AI-engineer portfolios (animated gradient) |
| Halo | Dark | onecomhalo.ai (glass nav, radial glow) |
| Dev | Dark | Groq console (docs/mono, sidebar) |
| Ink | Dark | MoodInk (brutalist, Bebas Neue, grain) |
| Pulse | Dark | braintrust.dev (animated aurora, count-up, marquee) |
| Edge | Dark | vercel.com (black/white, conic glow, deploy cards) |
| Ember | Light | trustllm.site (warm orange SaaS) |
| Editorial | Light | teamtailor.com (magazine masthead) |
| Deck | Light | shopdeck.com (blue dashboard cards) |
| Comet | Light | gocomet.com (navy + teal enterprise) |
| Quill | Light | crackaiinterviews.co.in (cream + Instrument Serif) |
| Analyst | Light | artificialanalysis.ai (benchmark bar charts) |

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** for animations
- **Auth.js / NextAuth v5** — Google OAuth + guest credentials fallback
- **Groq SDK** — CV → structured JSON (`llama-3.1-8b-instant` by default)
- **Supabase** (Postgres + RLS) — persistent shareable portfolios
- **pdf-parse** / **mammoth** — PDF & DOCX text extraction

## Quick start

```bash
git clone https://github.com/MONIKAKUSHWAHA1411/Portlook.git
cd Portlook
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

In development, the login page offers **"Continue without Google"** — so you can use everything without configuring OAuth.

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GROQ_API_KEY` | ✅ | CV parsing — get one at [console.groq.com/keys](https://console.groq.com/keys) |
| `AUTH_SECRET` | ✅ | Session signing — generate with `openssl rand -base64 33` |
| `GROQ_MODEL` | optional | Override the model (default `llama-3.3-70b-versatile`; `llama-3.1-8b-instant` has a larger free daily budget) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | optional | Google OAuth. When unset, the app uses guest login. Redirect URI: `<origin>/api/auth/callback/google` |
| `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` | optional | Enables publishing + the dashboard. Without them, the app still runs (sharing is disabled). Server-side only. |

## Database (Supabase)

Publishing needs a `portfolios` table with RLS (public read; writes via the server). Minimal schema:

```sql
create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  data jsonb not null,
  template text not null default 'spectrum',
  owner_email text,
  created_at timestamptz not null default now(),
  views integer not null default 0
);
alter table public.portfolios enable row level security;
create policy "Public read" on public.portfolios for select using (true);
create policy "Insert" on public.portfolios for insert with check (true);
```

Plus an `increment_views(p_slug text)` and an owner-gated `delete_portfolio(p_slug text, p_owner text)` SECURITY DEFINER function for view counts and unpublishing.

## Deploy

Deploys to **Vercel** (it's a Next.js app):

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add the environment variables above.
3. For Google sign-in, add the production redirect URI to your OAuth client and set `AUTH_URL` to your deployment URL.

## Project structure

```
app/
  page.tsx                 # home — upload, template picker, sample-data preview
  login/                   # sign-in (Google + guest)
  portfolio/               # private preview with the live template switcher
  dashboard/               # "My Portfolios" — manage published links
  p/[slug]/                # public shared portfolio + opengraph-image
  api/parse-cv/            # PDF/DOCX → structured JSON via Groq
  api/portfolio/           # publish (POST) + unpublish ([slug] DELETE)
components/
  templates/               # 12 templates + TemplateRenderer / Switcher / Thumbnail
  portfolio/               # section components used by the Spectrum template
lib/
  templates.ts             # template registry
  types.ts                 # PortfolioData type
  supabase.ts              # server-only Supabase client
  sampleData.ts            # demo profile for zero-API previews
auth.ts / auth.config.ts   # Auth.js config (Google + guest)
middleware.ts              # route gate (everything except /login, /p/*, /api/auth)
```

---

Built with [Claude Code](https://claude.com/claude-code).
