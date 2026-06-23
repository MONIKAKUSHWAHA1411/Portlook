import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an expert CV/resume parser and portfolio content generator.

Analyze the CV text and return ONLY valid JSON — no markdown fences, no explanation.

STEP 1 — DETECT ROLE from these categories:
ai_engineer, qa_engineer, product_manager, backend_engineer, frontend_engineer,
fullstack_engineer, devops_engineer, data_engineer, data_scientist,
mobile_engineer, security_engineer, other

STEP 2 — GENERATE ROLE-SPECIFIC CONTENT. Rules:
• heroHeadline: 5–8 words, punchy, specific to their role. Examples:
  - QA/SDET       → "Building Software That Never Ships Bugs"
  - PM            → "Shipping Products That Users Love"
  - Backend       → "Engineering Systems That Scale to Millions"
  - Frontend      → "Interfaces Users Never Want to Leave"
  - DevOps        → "Infrastructure That Deploys While You Sleep"
  - Data Engineer → "Pipelines That Power Every Decision"
  - Data Scientist→ "Models That Actually Move the Needle"
  - AI Engineer   → "Building AI That Survives Production"
  - Fullstack     → "Full-Stack Systems Built to Last"
• heroSubtitle: 1 sentence expanding on the headline
• statusBadge: e.g. "Open to Senior QA Roles" / "Open to Product Manager Roles"
• philosophyCards: 4 role-specific values this person demonstrates (from their CV)
• topSkills: their 5 most prominent skills with realistic proficiency % + optional 1-sentence subtitle
• numbers: 6 metrics with REAL numbers extracted from the CV (years, counts, %, $). Estimate realistically from context if exact number not stated.
  - QA focus: test cases, coverage %, bugs caught, automation %, pipelines, regression suites
  - PM focus: products shipped, revenue generated, features launched, user growth %, NPS, iteration speed
  - Backend focus: APIs built, uptime %, latency ms, users served, services, throughput
  - DevOps focus: deployments/day, MTTR, infra cost saved, uptime %, pipelines, environments
  - Data Eng focus: pipelines built, TB processed, models served, freshness SLA, sources integrated
  - Data Sci focus: models trained, accuracy %, dataset size, experiments run, $ impact
  - AI Eng focus: agents/guardrails, accuracy %, tokens/day, hallucination rate, systems deployed
• skillCategories: 6 categories with names fitting their role (e.g. "Test Frameworks", "Product Tools", "ML Libraries")
  Use these colors in order: purple, cyan, emerald, yellow, blue, pink

Return this exact JSON structure (null for missing optional fields, [] for missing arrays):

{
  "name": "Full Name",
  "title": "Current or target job title",
  "email": "email or null",
  "phone": "phone or null",
  "location": "City, Country or null",
  "linkedin": "full URL or null",
  "github": "full URL or null",
  "website": "URL or null",
  "summary": "2–3 sentence first-person professional summary",
  "role": "detected role key",
  "heroHeadline": "Role-specific punchy headline",
  "heroSubtitle": "One sentence expanding on the headline",
  "statusBadge": "Open to [Role] Roles",
  "topSkills": [
    { "name": "Skill Name", "pct": 92, "subtitle": "Optional 1-sentence quip or null" }
  ],
  "philosophyCards": [
    { "emoji": "🎯", "title": "Value Title", "description": "Brief description specific to their work" }
  ],
  "numbers": [
    {
      "value": "2000+",
      "title": "Test Cases Automated",
      "description": "Every test is deterministic and runs in CI on every commit.",
      "bubble": "Zero flakes, ever! 🚀",
      "iconType": "check",
      "color": "purple"
    }
  ],
  "skillCategories": [
    { "label": "Category Name", "color": "purple", "skills": ["Skill1", "Skill2", "Skill3"] }
  ],
  "skills": {
    "languages": [],
    "frameworks": [],
    "aiml": [],
    "cloud": [],
    "databases": [],
    "tools": []
  },
  "experience": [
    {
      "company": "Company",
      "role": "Title",
      "startDate": "Jan 2022",
      "endDate": "Present",
      "location": "City or null",
      "description": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University",
      "degree": "Degree in Field",
      "startDate": "2018",
      "endDate": "2022",
      "grade": "GPA or null"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "1–2 sentence impact-focused description.",
      "techStack": ["Tech1", "Tech2"],
      "github": "URL or null",
      "live": "URL or null"
    }
  ],
  "certifications": [
    {
      "name": "Cert Name",
      "issuer": "Issuer",
      "date": "Month Year",
      "url": "URL or null"
    }
  ]
}`;

async function extractPdf(buffer: Buffer): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  return (await pdfParse(buffer)).text;
}

async function extractDocx(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  return (await mammoth.extractRawText({ buffer })).value;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const name = file.name.toLowerCase();

    let text = "";
    if (name.endsWith(".pdf")) text = await extractPdf(buffer);
    else if (name.endsWith(".docx") || name.endsWith(".doc")) text = await extractDocx(buffer);
    else return NextResponse.json({ error: "Unsupported file type. Upload a PDF or DOCX." }, { status: 400 });

    if (!text.trim()) return NextResponse.json({ error: "Could not read text from file." }, { status: 400 });

    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      temperature: 0.2,
      // Portfolio JSON output is ~1.8k tokens; keep this small so the whole
      // request (input + reserved output) fits free-tier per-minute limits
      // (e.g. llama-3.1-8b-instant = 6k TPM).
      max_tokens: 3000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text.slice(0, 8000) },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(cleaned);
    return NextResponse.json({ data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed: ${msg}` }, { status: 500 });
  }
}
