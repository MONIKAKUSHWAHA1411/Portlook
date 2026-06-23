import { ImageResponse } from "next/og";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";
export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  let name = "Portfolio";
  let title = "";
  if (isSupabaseConfigured()) {
    try {
      const { data } = await getSupabase()
        .from("portfolios")
        .select("data")
        .eq("slug", params.slug)
        .single();
      const d = (data?.data ?? {}) as { name?: string; title?: string };
      if (d.name) name = d.name;
      if (d.title) title = d.title;
    } catch {
      /* fall back to defaults */
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#0a0a1a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a78bfa",
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, marginTop: 28, lineHeight: 1.05 }}>
          {name}
        </div>
        {title ? (
          <div style={{ display: "flex", fontSize: 46, color: "#9ca3af", marginTop: 14 }}>{title}</div>
        ) : null}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            height: 10,
            width: 180,
            borderRadius: 5,
            background: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
