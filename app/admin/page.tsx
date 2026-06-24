import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import Link from "next/link";
import { Users, Activity, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "monikakushwaha1411@gmail.com";

type UserRow = {
  email: string;
  name: string | null;
  provider: string;
  sign_in_count: number;
  first_seen_at: string;
  last_seen_at: string;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Active = signed in within the last 24 hours
const isActive = (iso: string) =>
  Date.now() - new Date(iso).getTime() < 24 * 60 * 60 * 1000;

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  if (session.user.email !== ADMIN_EMAIL) redirect("/dashboard");

  let users: UserRow[] = [];
  if (isSupabaseConfigured()) {
    const { data } = await getSupabase().rpc("get_all_users");
    users = (data ?? []) as UserRow[];
  }

  const activeCount = users.filter((u) => isActive(u.last_seen_at)).length;

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/dashboard" className="mb-3 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft size={13} /> Dashboard
            </Link>
            <h1 className="text-2xl font-black">Users</h1>
            <p className="text-sm text-zinc-500 mt-0.5">All accounts that have signed in</p>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1 text-zinc-500">
                <Users size={14} /> <span className="text-[11px] uppercase tracking-wide font-medium">Total</span>
              </div>
              <p className="text-3xl font-black">{users.length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 px-5 py-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1 text-emerald-500/70">
                <Activity size={14} /> <span className="text-[11px] uppercase tracking-wide font-medium">Active 24h</span>
              </div>
              <p className="text-3xl font-black text-emerald-400">{activeCount}</p>
            </div>
          </div>
        </div>

        {!isSupabaseConfigured() ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 px-6 text-center">
            <p className="font-semibold">Supabase not configured</p>
            <p className="text-sm text-zinc-500 mt-1">Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY to track users.</p>
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 px-6 text-center">
            <p className="font-semibold text-zinc-400">No users yet</p>
            <p className="text-sm text-zinc-600 mt-1">Users will appear here after their first sign-in.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {users.map((u) => {
              const active = isActive(u.last_seen_at);
              return (
                <div
                  key={u.email}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4 hover:border-white/15 transition-colors"
                >
                  {/* Avatar initial */}
                  <div className="grid shrink-0 size-9 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-sm font-bold">
                    {(u.name ?? u.email)[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{u.name ?? u.email}</p>
                    <p className="text-xs text-zinc-500 truncate">{u.email}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex shrink-0 items-center gap-3 text-right">
                    <div className="hidden sm:block">
                      <p className="text-[11px] text-zinc-500">
                        <span className="capitalize">{u.provider}</span> · {u.sign_in_count}× signed in
                      </p>
                      <p className="text-[11px] text-zinc-600">last seen {timeAgo(u.last_seen_at)}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        active
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-white/5 text-zinc-500"
                      }`}
                    >
                      {active ? "active" : "inactive"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
