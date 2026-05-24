import { Reveal, SectionLabel } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SectionDissolve } from "../SectionDissolve";
import { CosmicBackdrop } from "../CosmicBackdrop";
import { ScrollIndicator } from "../ScrollIndicator";

export function Experience() {
  const { experience, successStories, metadata } = usePortfolioData();

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden bg-[#04060b]">
      {/* Dynamic Cosmic Space Backdrop (GPU composite-accelerated, lag-free) */}
      <CosmicBackdrop />

      <SectionDissolve className="max-w-7xl mx-auto z-10">
        <SectionLabel num="05" label="Trajectory" />
        <Reveal variant="dissolve">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-3xl text-white py-2">
              {metadata.pages?.log?.title1 || "Professional"} <span className="italic text-gradient">{metadata.pages?.log?.title2 || "Trajectory"}</span>.
            </h2>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest max-w-xs">
              {metadata.pages?.log?.subtitle || "CHRONOLOGICAL RECORD OF INDUSTRY EXPERIENCE"}
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Professional Experience Stream */}
          <div>
            <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium">Industry Roles</h3>
            </div>
            <div className="relative pl-8 border-l border-white/10 space-y-16">
              {experience.map((ex, i) => (
                <Reveal key={ex.title || String(i)} delay={i * 0.1} variant="dissolve">
                  <div className="relative group">
                    <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_#38bdf8] transition-all" />
                    <div className="text-xs font-mono text-cyan-400/80 mb-2">{ex.duration || "2024 — Present"}</div>
                    <div className="text-2xl font-light text-white group-hover:text-cyan-300 transition-colors">{ex.title}</div>
                    <div className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">{ex.description}</div>
                    {ex.link && ex.link.trim() !== "" && ex.link.trim() !== "#" && (
                      <a href={ex.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-cyan-400 hover:text-white transition-colors">
                        <span>Explore Enterprise</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Research & Patents Stream */}
          <div>
            <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#c084fc]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400 font-medium">Research &amp; Publications</h3>
            </div>
            <div className="relative pl-8 border-l border-white/10 space-y-16">
              {successStories.map((ss, i) => (
                <Reveal key={ss.title || String(i)} delay={i * 0.1} variant="dissolve">
                  <div className="relative group">
                    <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_#c084fc] transition-all" />
                    <div className="text-xs font-mono text-purple-400/80 mb-2">PUBLISHED ARCHIVE</div>
                    <div className="text-2xl font-light text-white group-hover:text-purple-300 transition-colors">{ss.title}</div>
                    <div className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">{ss.description}</div>
                    {ss.link && ss.link.trim() !== "" && ss.link.trim() !== "#" && (
                      <a href={ss.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-purple-400 hover:text-white transition-colors">
                        <span>View Publication</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SectionDissolve>
      <ScrollIndicator />
    </section>
  );
}
