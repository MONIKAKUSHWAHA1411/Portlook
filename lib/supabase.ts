import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Server-only Supabase client. The publishable key is intentionally NOT exposed
 * to the browser (no NEXT_PUBLIC_ prefix) — every read/write happens in server
 * code (the /api/portfolio route and the /p/[slug] server component). RLS keeps
 * the table public-read and writes flow through our NextAuth-gated API.
 */
export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.");
  }
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export const isSupabaseConfigured = () =>
  !!(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
