import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { DashboardList, type DashRow } from "@/components/DashboardList";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  let rows: DashRow[] = [];
  if (isSupabaseConfigured()) {
    const { data } = await getSupabase()
      .from("portfolios")
      .select("slug, template, views, created_at, data")
      .eq("owner_email", session.user.email)
      .order("created_at", { ascending: false });
    rows = (data ?? []).map((r) => {
      const d = (r.data ?? {}) as { name?: string; title?: string };
      return {
        slug: r.slug as string,
        template: (r.template as string) ?? "spectrum",
        views: (r.views as number) ?? 0,
        created: new Date(r.created_at as string).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        name: d.name ?? "Untitled",
        title: d.title ?? "",
      };
    });
  }

  return <DashboardList rows={rows} email={session.user.email} configured={isSupabaseConfigured()} />;
}
