import { Reveal, SectionLabel } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { DomeGallery, ImageItem } from "../DomeGallery";
import { SectionDissolve } from "../SectionDissolve";
import { CosmicBackdrop } from "../CosmicBackdrop";

export function Expertise() {
  const { projects, achievements, successStories } = usePortfolioData();

  const galleryImages: ImageItem[] = [
    ...projects.filter(p => p.imgUrl).map(p => ({ src: p.imgUrl, alt: p.title, title: p.title, description: p.description, link: p.link })),
    ...achievements.filter(a => a.imgUrl).map(a => ({ src: a.imgUrl, alt: a.title, title: a.title, description: a.description, link: a.link })),
    ...successStories.filter(s => s.imgUrl).map(s => ({ src: s.imgUrl, alt: s.title, title: s.title, description: s.description, link: s.link })),
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop', alt: 'AI Neural Matrix', title: 'Cosmic Neural Reasoning', description: 'Autonomous multi-agent orchestration across decentralized computational nodes.' },
    { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', alt: 'Quantum Geospatial', title: 'Geospatial Reconnaissance', description: 'Real-time satellite imagery synthesis and 3D terrain reconstruction pipelines.' }
  ];

  return (
    <section id="expertise" className="relative py-32 overflow-hidden bg-[#04060b]">
      {/* Dynamic Cosmic Space Backdrop (GPU composite-accelerated, lag-free) */}
      <CosmicBackdrop />

      <SectionDissolve className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel num="03" label="Visual Dome" />
          <Reveal variant="dissolve">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-3xl text-white py-2">
                Visual <span className="italic text-gradient">Intelligence</span> Dome.
              </h2>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest max-w-xs">
                INTERACTIVE 3D SPATIAL DOME · CLICK TILE TO ENLARGE ASSET &amp; GO TO PROJECT
              </div>
            </div>
          </Reveal>
        </div>

        {/* Compact 3D Interactive Dome Floating Directly on Page */}
        <div className="w-full relative h-[540px] my-6 z-10">
          <DomeGallery 
            images={galleryImages}
            fit={0.46}
            minRadius={380}
            maxRadius={850}
            padFactor={0.25}
            segments={35}
            enlargeTransitionMs={450}
            openedImageWidth="420px"
            openedImageHeight="420px"
            grayscale={false}
          />
        </div>
      </SectionDissolve>
    </section>
  );
}
