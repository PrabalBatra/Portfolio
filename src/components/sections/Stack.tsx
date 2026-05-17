import { Reveal, SectionLabel } from "../Reveal";

const groups = [
  { t: "AI & Machine Learning", items: ["LangChain", "LangGraph", "TensorFlow", "PyTorch", "Scikit-learn", "LLMs", "RAG", "NLP"] },
  { t: "Backend & Systems", items: ["FastAPI", "Python", "Docker", "APIs", "AWS", "Git"] },
  { t: "Data & Analytics", items: ["NumPy", "Pandas", "Power BI", "Tableau", "EDA", "Feature Engineering"] },
  { t: "Computer Vision", items: ["OpenCV", "Deep Learning", "Image Processing", "Object Detection"] },
  { t: "Databases", items: ["MySQL", "PostGIS", "Spatial Databases"] },
];

export function Stack() {
  return (
    <section id="stack" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto">
        <SectionLabel num="05" label="Ecosystem" />
        <Reveal variant="dissolve">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-20 max-w-3xl">
            Technology <span className="italic text-gradient">ecosystem</span>.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <Reveal key={g.t} delay={i * 0.08} variant="dissolve">
              <div className="glass rounded-2xl p-6 h-full hover:border-primary/40 transition-all duration-500 group">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  <div className="text-[10px] tracking-[0.25em] text-primary uppercase">{g.t}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all cursor-default"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
