import { Reveal, SectionLabel } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { MagicBento } from "../MagicBento";
import { SectionDissolve } from "../SectionDissolve";
import { CosmicBackdrop } from "../CosmicBackdrop";
import { ScrollIndicator } from "../ScrollIndicator";

export function Projects() {
  const { projects } = usePortfolioData();

  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden bg-[#04060b]">
      {/* Dynamic Cosmic Space Backdrop (GPU composite-accelerated, lag-free) */}
      <CosmicBackdrop />
      
      <SectionDissolve className="max-w-7xl mx-auto z-10">
        <SectionLabel num="04" label="Featured Work" />
        <Reveal variant="dissolve">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16 max-w-3xl text-white py-2">
            Selected <span className="italic text-gradient">cinematic</span> projects.
          </h2>
        </Reveal>

        <Reveal variant="dissolve" delay={0.2}>
          <MagicBento 
            projects={projects}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            spotlightRadius={380}
            particleCount={15}
          />
        </Reveal>
      </SectionDissolve>
      <ScrollIndicator />
    </section>
  );
}
