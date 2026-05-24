import { Reveal, SectionLabel } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { PixelBlast } from "../PixelBlast";
import { SectionDissolve } from "../SectionDissolve";
import { ScrollIndicator } from "../ScrollIndicator";

const stats = [
  { v: "1st", l: "Place @ CU Sharks (Solo)" },
  { v: "02", l: "Patents Filed" },
  { v: "100%", l: "Fueled by Caffeine" },
  { v: "0", l: "Hours of Sleep" },
  { v: "∞", l: "Bugs Fixed" },
];

export function About() {
  const { banner, experience } = usePortfolioData();

  const currentRole = experience.find(e => e.duration?.toLowerCase().includes("present")) || experience[0];
  const pastRole = experience.find(e => !e.duration?.toLowerCase().includes("present")) || experience[1];

  const cards = [
    { title: "Education", lines: ["B.E. Computer Science", "Big Data & Analytics", "Chandigarh University", "2022 — Present"] },
    { title: "Current Role", lines: [currentRole?.title || "Apprenticeship Trainee", currentRole?.duration || "June 2025 — Present", "Mumbai, India"] },
    { title: "Past Experience", lines: [pastRole?.title || "Business Analyst Intern", pastRole?.duration || "June — Aug 2024", "Bangalore, India"] },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Seamless Feathered Ambient PixelBlast Layer */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-auto"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
        }}
      >
        <PixelBlast
          variant="circle"
          pixelSize={10}
          color="#38bdf8"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={true}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent={true}
        />
      </div>

      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      <SectionDissolve className="max-w-7xl mx-auto z-10 pointer-events-none">
        <div className="pointer-events-auto mb-6">
          <SectionLabel num="01" label="Identity" />
        </div>
        <div className="grid lg:grid-cols-12 gap-12 items-center pointer-events-auto">
          <div className="lg:col-span-5 relative z-20">
            <Reveal variant="dissolve">
              <h2 className="text-5xl md:text-7xl font-light leading-[1] tracking-tight text-white">
                Who <span className="italic text-gradient">I&nbsp;am</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} variant="dissolve">
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-md">
                {banner.description || "A Computer Science Engineer specializing in Big Data Analytics — building intelligent systems that combine Artificial Intelligence, Geospatial Intelligence, and Multi-Agent Reasoning."}
              </p>
              <p className="mt-4 text-base text-muted-foreground/80 leading-relaxed font-light max-w-md">
                Production-grade AI, spatial intelligence platforms, computer vision, and reasoning workflows for real-world problems.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4 relative z-20">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1} variant="dissolve">
                <div className="rounded-2xl p-6 h-full border border-white/10 bg-[#0d0b12]/85 backdrop-blur-md shadow-2xl hover:border-primary/40 transition-all hover:-translate-y-1 duration-500">
                  <div className="text-[10px] tracking-[0.25em] text-cyan-400 uppercase mb-4 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{c.title}</span>
                  </div>
                  <div className="space-y-1.5">
                    {c.lines.map((l, j) => (
                      <div key={j} className={j === 0 ? "text-white font-medium text-sm" : j === c.lines.length - 1 ? "text-xs font-mono text-cyan-300/80" : "text-xs text-muted-foreground font-light"}>
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-3 pointer-events-auto relative z-20">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} variant="dissolve">
              <div className="rounded-xl p-5 text-center border border-white/10 bg-[#0d0b12]/85 backdrop-blur-md shadow-xl hover:bg-white/[0.06] hover:border-primary/40 transition-all group">
                <div className="text-3xl md:text-4xl font-display font-light text-gradient group-hover:scale-105 transition-transform">{s.v}</div>
                <div className="mt-2 text-[10px] tracking-wider text-muted-foreground uppercase font-mono">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionDissolve>

      <ScrollIndicator />
    </section>
  );
}