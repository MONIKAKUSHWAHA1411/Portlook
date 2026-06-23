"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Sparkles, ArrowRight, CheckCircle2, AlertCircle, X, Check, LogOut, LayoutGrid } from "lucide-react";
import { TEMPLATES, DEFAULT_TEMPLATE, type TemplateId } from "@/lib/templates";
import { SAMPLE_PORTFOLIO } from "@/lib/sampleData";

type State = "idle" | "dragging" | "selected" | "parsing" | "error";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [template, setTemplate] = useState<TemplateId>(DEFAULT_TEMPLATE);

  const handleFile = (f: File) => {
    const ok = f.name.endsWith(".pdf") || f.name.endsWith(".docx") || f.name.endsWith(".doc");
    if (!ok) { setError("Please upload a PDF or Word document (.pdf, .docx)"); setState("error"); return; }
    if (f.size > 10 * 1024 * 1024) { setError("File must be under 10 MB"); setState("error"); return; }
    setFile(f); setState("selected"); setError("");
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setState("idle");
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, []);

  const reset = () => { setFile(null); setState("idle"); setError(""); if (inputRef.current) inputRef.current.value = ""; };

  const generate = async () => {
    if (!file) return;
    setState("parsing");
    try {
      const fd = new FormData(); fd.append("cv", file);
      const res = await fetch("/api/parse-cv", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Parsing failed");
      sessionStorage.setItem("portfolioData", JSON.stringify(json.data));
      sessionStorage.setItem("portfolioTemplate", template);
      router.push("/portfolio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  };

  const previewSample = () => {
    sessionStorage.setItem("portfolioData", JSON.stringify(SAMPLE_PORTFOLIO));
    sessionStorage.setItem("portfolioTemplate", template);
    router.push("/portfolio");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Signed-in user */}
      {session?.user && (
        <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
          <span className="text-xs text-zinc-500 hidden sm:block">{session.user.email}</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-zinc-400 border border-white/8 bg-white/[0.02] hover:text-white hover:border-white/20 transition-colors"
          >
            <LayoutGrid size={12} /> My Portfolios
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-zinc-400 border border-white/8 bg-white/[0.02] hover:text-white hover:border-white/20 transition-colors"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      )}

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-5">
            <Sparkles size={12} /> Powered by Claude AI
          </div>
          <h1 className="text-5xl font-black mb-3">
            <span className="text-white">Your CV,</span><br />
            <span className="gradient-text">Reimagined.</span>
          </h1>
          <p className="text-zinc-400 leading-relaxed">Upload your resume and get a stunning animated portfolio in seconds.</p>
        </motion.div>

        {/* Upload / Parsing area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <AnimatePresence mode="wait">
            {state === "parsing" ? (
              <motion.div key="parsing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass rounded-2xl p-10 flex flex-col items-center gap-5">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-500 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-400 border-l-cyan-400 animate-[spin_1.5s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center"><Sparkles className="text-purple-400" size={20} /></div>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">Generating your portfolio…</p>
                  <p className="text-zinc-500 text-sm mt-1">Claude is reading your CV</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => { e.preventDefault(); setState("dragging"); }}
                  onDragLeave={() => state === "dragging" && setState("idle")}
                  onClick={() => state !== "selected" && inputRef.current?.click()}
                  className={`relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200
                    ${state === "dragging" ? "border-purple-400 bg-purple-500/5 scale-[1.01]"
                    : state === "selected" ? "border-emerald-500/50 bg-emerald-500/5 cursor-default"
                    : state === "error" ? "border-red-500/40 bg-red-500/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"}`}
                >
                  <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />

                  {state === "selected" && file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                        <CheckCircle2 className="text-emerald-400" size={24} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{file.name}</p>
                        <p className="text-zinc-500 text-sm">{(file.size / 1024).toFixed(0)} KB · Ready</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); reset(); }} className="text-zinc-600 hover:text-zinc-400 text-sm flex items-center gap-1 transition-colors">
                        <X size={12} /> Remove
                      </button>
                    </div>
                  ) : state === "error" ? (
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="text-red-400" size={36} />
                      <p className="text-red-400 text-sm">{error}</p>
                      <button onClick={(e) => { e.stopPropagation(); reset(); inputRef.current?.click(); }} className="text-zinc-400 hover:text-white text-sm transition-colors">Try again</button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform ${state === "dragging" ? "scale-110" : ""}`}>
                        <Upload className={state === "dragging" ? "text-purple-400" : "text-zinc-400"} size={24} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{state === "dragging" ? "Drop it here!" : "Drop your CV here"}</p>
                        <p className="text-zinc-500 text-sm mt-1">or <span className="text-purple-400">browse files</span> · PDF or DOCX · Max 10 MB</p>
                      </div>
                      <div className="flex gap-4">
                        {["PDF", "DOCX", "DOC"].map((e) => (
                          <span key={e} className="flex items-center gap-1 text-xs text-zinc-600"><FileText size={11} />{e}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {state === "selected" && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5">
                      {/* Template picker */}
                      <p className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">Choose a style</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {TEMPLATES.map((t) => {
                          const active = template === t.id;
                          return (
                            <button
                              key={t.id}
                              onClick={() => setTemplate(t.id)}
                              title={t.blurb}
                              className={`relative text-left rounded-xl p-3 border transition-all ${
                                active
                                  ? "border-purple-500/60 bg-purple-500/10"
                                  : "border-white/8 bg-white/[0.02] hover:border-white/20"
                              }`}
                            >
                              {active && (
                                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                                  <Check size={11} className="text-white" />
                                </span>
                              )}
                              <div className="flex gap-1 mb-2">
                                {t.swatches.map((c, i) => (
                                  <span key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ background: c }} />
                                ))}
                              </div>
                              <p className="text-sm font-semibold text-white">{t.name}</p>
                              <p className="text-[10px] text-zinc-500 leading-tight mt-0.5 line-clamp-2">{t.blurb}</p>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={generate}
                        className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all shadow-xl shadow-purple-500/20">
                        <Sparkles size={18} /> Generate My Portfolio <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sample-data preview (no upload, no API) */}
        {state !== "parsing" && (
          <div className="text-center mt-5">
            <button onClick={previewSample} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
              or <span className="text-purple-400 underline underline-offset-2">preview with sample data</span>
              <span className="text-zinc-600"> — no upload, no API</span>
            </button>
          </div>
        )}

        {/* Feature pills */}
        <motion.div className="flex flex-wrap justify-center gap-2 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          {["✨ Animated sections", "🎨 Dark AI aesthetic", "📱 Mobile responsive", "⚡ Instant generation", "🔒 Data stays local"].map((p) => (
            <span key={p} className="px-3 py-1.5 rounded-full text-xs text-zinc-500 border border-white/6 bg-white/[0.02]">{p}</span>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
