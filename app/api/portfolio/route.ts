import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

function slugify(name: string): string {
  const s = (name || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
  return s || "portfolio";
}

const randomSuffix = () => Math.random().toString(36).slice(2, 8);

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Sharing isn't configured on this server yet." }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in to publish." }, { status: 401 });
  }

  let body: { data?: Record<string, unknown>; template?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { data, template } = body;
  if (!data || typeof data !== "object" || !data.name) {
    return NextResponse.json({ error: "Missing portfolio data." }, { status: 400 });
  }

  const supabase = getSupabase();
  const base = slugify(String(data.name));
  // Always suffixed so links can't be guessed or enumerated; the readable base
  // keeps them human-friendly. Regenerate the suffix on the rare collision.
  let slug = `${base}-${randomSuffix()}`;

  for (let attempt = 0; attempt < 6; attempt++) {
    const { data: inserted, error } = await supabase
      .from("portfolios")
      .insert({
        slug,
        data,
        template: template ?? "spectrum",
        owner_email: session.user.email ?? null,
      })
      .select("slug")
      .single();

    if (!error && inserted) {
      return NextResponse.json({ slug: inserted.slug });
    }
    if (error && (error.code === "23505" || /duplicate|unique/i.test(error.message))) {
      slug = `${base}-${randomSuffix()}`;
      continue;
    }
    return NextResponse.json({ error: error?.message ?? "Could not publish portfolio." }, { status: 500 });
  }

  return NextResponse.json({ error: "Could not generate a unique link — please try again." }, { status: 500 });
}
