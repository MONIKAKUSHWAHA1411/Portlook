import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROMPT = `You are an expert CV/Resume parser. Extract all information from the CV text below and return ONLY valid JSON — no markdown fences, no explanation, just raw JSON.

Use this exact structure (null for missing fields, [] for missing arrays):

{
  "name": "Full Name",
  "title": "Professional Title",
  "email": "email or null",
  "phone": "phone or null",
  "location": "City, Country or null",
  "linkedin": "full URL or null",
  "github": "full URL or null",
  "website": "URL or null",
  "summary": "Compelling 2-3 sentence professional summary in first person. Craft one from context if not present.",
  "skills": {
    "languages": ["Python", "Java"],
    "frameworks": ["React", "Spring Boot"],
    "aiml": ["LangChain", "TensorFlow", "RAG"],
    "cloud": ["AWS", "Docker", "Kubernetes"],
    "databases": ["PostgreSQL", "MongoDB"],
    "tools": ["Git", "Figma", "Postman"]
  },
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "Jan 2022",
      "endDate": "Present",
      "location": "City or null",
      "description": ["Key achievement 1", "Key achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Bachelor of Technology in Computer Science",
      "startDate": "2018",
      "endDate": "2022",
      "grade": "GPA: 3.8 or null"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "1-2 sentence description of impact and purpose.",
      "techStack": ["React", "Node.js"],
      "github": "URL or null",
      "live": "URL or null"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Month Year",
      "url": "URL or null"
    }
  ]
}

CV Text:
`;

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

    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: PROMPT + text.slice(0, 12000) }],
    });

    const raw = msg.content[0];
    if (raw.type !== "text") throw new Error("Unexpected response from Anthropic");

    const data = JSON.parse(raw.text.trim());
    return NextResponse.json({ data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed: ${msg}` }, { status: 500 });
  }
}
