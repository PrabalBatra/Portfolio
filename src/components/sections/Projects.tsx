import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "../Reveal";

const projects = [
  {
    n: "01",
    t: "Agentic RAG-Based Geospatial Intelligence Platform",
    time: "2026 — Present",
    d: "Production-grade GenAI system using Agentic / Structured RAG for intelligent geospatial query understanding. Multi-agent workflows for intent parsing, task decomposition and execution across PostGIS and APIs.",
    r: ["100+ Queries/day", "+40% Accuracy", "92% Context Reduction", "60% Faster"],
    tech: ["Agentic AI", "Structured RAG", "PostGIS", "FastAPI", "Multi-Agent", "GenAI"],
  },
  {
    n: "02",
    t: "Multi-Agent Research & Reasoning System",
    time: "2025 — 2026",
    d: "Advanced reasoning system using LangChain + LangGraph. Graph-based pipelines with specialized agents for summarization, research and analysis.",
    r: ["+40% Multi-step Handling", "+30–50% Relevance", "+35% Faster Generation"],
    tech: ["LangChain", "LangGraph", "RAG", "FAISS", "ChromaDB", "AI Agents"],
  },
  {
    n: "03",
    t: "Astroterra — Lunar Crater Detection",
    time: "2024 — 2025",
    d: "Computer vision pipeline for lunar crater detection using transfer learning on high-resolution satellite imagery. Spatial indexing reduced duplicate detections.",
    r: ["85–90% Accuracy", "1000+ Images", "+50% Training Efficiency"],
    tech: ["Computer Vision", "CNN", "Satellite Imagery", "Deep Learning", "Transfer Learning"],
  },
];

export function Projects() {
  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{ background: "var(--gradient-aurora)" }} />
      <div className="relative max-w-7xl mx-auto">
        <SectionLabel num="03" label="Featured Work" />
        <Reveal variant="dissolve">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-20 max-w-3xl">
            Selected <span className="italic text-gradient">cinematic</span> projects.
          </h2>
        </Reveal>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1} variant="dissolve">
              <motion.article
                whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="glass rounded-3xl p-8 md:p-12 grid lg:grid-cols-12 gap-8 hover:border-primary/40 hover:shadow-[0_30px_80px_-20px_var(--glow)] transition-all duration-700 relative overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <div className="lg:col-span-4">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">Project {p.n}</div>
                  <div className="mt-2 text-xs text-muted-foreground tracking-wider">{p.time}</div>
                  <h3 className="mt-6 text-2xl md:text-3xl font-light leading-[1.15] tracking-tight">{p.t}</h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">{p.d}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 space-y-2">
                  <div className="text-[10px] tracking-[0.25em] text-primary uppercase mb-3">Impact</div>
                  {p.r.map((r) => (
                    <div key={r} className="flex items-center gap-2 text-sm text-white/90">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {r}
                    </div>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
