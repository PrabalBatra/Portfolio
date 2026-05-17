import { Reveal, SectionLabel } from "../Reveal";

const cards = [
  { title: "Education", lines: ["B.E. Computer Science", "Big Data & Analytics", "Chandigarh University", "2022 — Present · CGPA 7.09"] },
  { title: "Current Role", lines: ["Apprenticeship Trainee", "Genesys International", "Mumbai, India", "Jun 2025 — Present"] },
  { title: "Past Experience", lines: ["Business Analyst Intern", "Ozibook", "Bangalore, India", "Jun — Aug 2024"] },
];

const stats = [
  { v: "100+", l: "Spatial Queries / day" },
  { v: "92%", l: "Context Optimization" },
  { v: "60%", l: "Faster AI Responses" },
  { v: "40%", l: "Better Complex Query Handling" },
  { v: "02", l: "Patent Applications" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative max-w-7xl mx-auto">
        <SectionLabel num="01" label="Identity" />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="dissolve">
              <h2 className="text-5xl md:text-7xl font-light leading-[1] tracking-tight">
                Who <span className="italic text-gradient">I&nbsp;am</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} variant="dissolve">
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-md">
                A Computer Science Engineer specializing in Big Data Analytics — building intelligent systems that combine Artificial Intelligence, Geospatial Intelligence, and Multi-Agent Reasoning.
              </p>
              <p className="mt-4 text-base text-muted-foreground/80 leading-relaxed font-light max-w-md">
                Production-grade AI, spatial intelligence platforms, computer vision, and reasoning workflows for real-world problems.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1} variant="dissolve">
                <div className="glass rounded-2xl p-6 h-full hover:border-primary/40 transition-all hover:-translate-y-1 duration-500">
                  <div className="text-[10px] tracking-[0.25em] text-primary uppercase mb-4">{c.title}</div>
                  <div className="space-y-1.5">
                    {c.lines.map((l, j) => (
                      <div key={j} className={j === 0 ? "text-white font-medium" : "text-xs text-muted-foreground"}>
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} variant="dissolve">
              <div className="glass rounded-xl p-5 text-center hover:bg-white/[0.06] transition-colors">
                <div className="text-3xl md:text-4xl font-display font-light text-gradient">{s.v}</div>
                <div className="mt-2 text-[10px] tracking-wider text-muted-foreground uppercase">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
