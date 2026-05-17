import { Reveal, SectionLabel } from "../Reveal";

const items = [
  {
    co: "Genesys International Corporation",
    role: "Apprenticeship Trainee",
    loc: "Mumbai, India",
    time: "June 2025 — Present",
    d: "Working on intelligent geospatial systems, production-grade AI workflows, and Digital Twin technologies. Presented Agentic AI systems to executive leadership and investors; contributed to multiple project bidding presentations.",
  },
  {
    co: "Ozibook",
    role: "Business Analyst Assistant Intern",
    loc: "Bangalore, India",
    time: "June 2024 — Aug 2024",
    d: "Worked on business analysis processes, operational understanding, and structured problem-solving workflows.",
  },
];

const ach = [
  { t: "Academic Excellence Award", d: "Awarded by Chandigarh University for outstanding academic performance." },
  { t: "Patent Application", d: "AI-Enabled Tracking-Based Security System · 202311054397" },
  { t: "Patent Application", d: "Mycofibre Composite & Method for Synthesis · 202311048967" },
  { t: "Publication", d: "Hybrid Metal Additive Manufacturing — Book Chapter (2023)" },
  { t: "Leadership", d: "Presented Agentic AI to leadership & investors at Genesys International." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <SectionLabel num="04" label="Journey" />
        <Reveal variant="dissolve">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-20">
            Professional <span className="italic text-gradient">trajectory</span>.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
            {items.map((it, i) => (
              <Reveal key={it.co} delay={i * 0.15} variant="dissolve">
                <div className="relative pl-12 pb-12 last:pb-0">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full glass-strong flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-primary uppercase">{it.time} · {it.loc}</div>
                  <h3 className="mt-2 text-2xl font-light text-white">{it.co}</h3>
                  <div className="text-sm text-muted-foreground mt-1">{it.role}</div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light max-w-lg">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal variant="dissolve">
              <div className="text-[10px] tracking-[0.3em] text-primary uppercase mb-6">Recognition & Achievements</div>
            </Reveal>
            <div className="space-y-3">
              {ach.map((a, i) => (
                <Reveal key={i} delay={i * 0.08} variant="dissolve">
                  <div className="glass rounded-xl p-5 hover:border-primary/40 transition-all duration-500 group">
                    <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{a.t}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{a.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
