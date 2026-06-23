import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { getTemplate } from "@/lib/templates";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import type { PortfolioData } from "@/lib/types";

export const dynamic = "force-dynamic";

async function fetchPortfolio(slug: string) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await getSupabase()
    .from("portfolios")
    .select("data, template")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as { data: PortfolioData; template: string };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const row = await fetchPortfolio(params.slug);
  if (!row) return { title: "Portfolio not found" };
  const d = row.data;
  return {
    title: `${d.name} — ${d.title}`,
    description: d.summary?.slice(0, 160) || `${d.name}'s portfolio`,
  };
}

export default async function SharedPortfolioPage({ params }: { params: { slug: string } }) {
  const row = await fetchPortfolio(params.slug);
  if (!row) notFound();

  // Best-effort view counter — never blocks or fails the render.
  getSupabase()
    .rpc("increment_views", { p_slug: params.slug })
    .then(
      () => {},
      () => {}
    );

  return <TemplateRenderer template={getTemplate(row.template)} data={row.data} />;
}
