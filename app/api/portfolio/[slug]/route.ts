import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

// Unpublish: only the owner (matched on owner_email inside the DB function) can
// delete. The delete_portfolio() SECURITY DEFINER function enforces the match.
export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Sharing isn't configured." }, { status: 503 });
  }
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  }

  const { data, error } = await getSupabase().rpc("delete_portfolio", {
    p_slug: params.slug,
    p_owner: session.user.email,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found, or not yours to delete." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
