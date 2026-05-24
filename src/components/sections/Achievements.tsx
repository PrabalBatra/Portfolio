import { Reveal, SectionLabel } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SectionDissolve } from "../SectionDissolve";
import { CosmicBackdrop } from "../CosmicBackdrop";
import { ScrollIndicator } from "../ScrollIndicator";

export function Achievements() {
  const { achievements, metadata } = usePortfolioData();

  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden bg-[#04060b]">
      {/* Dynamic Cosmic Space Backdrop (GPU composite-accelerated, lag-free) */}
      <CosmicBackdrop />

      <SectionDissolve className="max-w-7xl mx-auto z-10">
        <SectionLabel num="06" label="Honors" />
        <Reveal variant="dissolve">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-3xl text-white py-2">
              {metadata.pages?.achievements?.title1 || "Hackathons &"} <span className="italic text-gradient">{metadata.pages?.achievements?.title2 || "Achievements"}</span>.
            </h2>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest max-w-xs">
              {metadata.pages?.achievements?.subtitle || "COMPETITIVE ARCHIVE OF HACKATHON VICTORIES & HONORS"}
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, i) => {
            const isWinner = item.description.toLowerCase().includes("1st") || item.description.toLowerCase().includes("won") || item.description.toLowerCase().includes("award");

            return (
              <Reveal key={item.title || String(i)} delay={i * 0.08} variant="dissolve">
                <div className="glass rounded-3xl overflow-hidden h-full flex flex-col group bg-white/[0.02] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-500 shadow-xl relative">
                  {/* Glowing Winner Badge */}
                  {isWinner && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-[10px] font-mono tracking-widest uppercase text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>🏆 WINNER / HONOR</span>
                    </div>
                  )}

                  {/* Stunning Cloudinary Screenshot */}
                  <div className="relative w-full aspect-video overflow-hidden bg-black/60 border-b border-white/10">
                    {item.imgUrl ? (
                      <img
                        src={item.imgUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 filter saturate-90 group-hover:saturate-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-primary/40 uppercase tracking-widest">
                        [ NO VISUAL ASSET ]
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b12] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-2xl font-light text-white group-hover:text-cyan-300 transition-colors duration-300 flex items-start justify-between gap-3">
                        <span>{item.title}</span>
                        {item.link && item.link.trim() !== "" && item.link.trim() !== "#" && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:border-cyan-400 hover:text-black transition-all shadow-md shrink-0 mt-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </h3>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-cyan-400/80 uppercase tracking-wider flex items-center gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-cyan-400" />
                      <span>COMPETITIVE INTELLIGENCE</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionDissolve>
      <ScrollIndicator />
    </section>
  );
}
