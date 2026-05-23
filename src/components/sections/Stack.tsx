import { Reveal, SectionLabel } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SectionDissolve } from "../SectionDissolve";
import { ParticleCard, CARD_COLORS } from "../MagicBento";
import React, { useState } from "react";
import { CosmicBackdrop } from "../CosmicBackdrop";

export function Stack() {
  const { skills, metadata } = usePortfolioData();

  // State to track hovered skill index per card to trigger circuit energy pulses
  // Structure: { cardIndex: skillIndex }
  const [hoveredJunction, setHoveredJunction] = useState<{ [key: number]: number | null }>({});

  return (
    <section id="stack" className="relative py-32 px-6 overflow-hidden bg-[#04060b]">
      {/* Dynamic Cosmic Space Backdrop (GPU composite-accelerated, lag-free) */}
      <CosmicBackdrop />

      <SectionDissolve className="max-w-7xl mx-auto z-10 pointer-events-none">
        <div className="pointer-events-auto mb-6">
          <SectionLabel num="02" label="Ecosystem" />
        </div>
        <Reveal variant="dissolve">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-24 max-w-3xl text-white pointer-events-auto relative z-20 py-2">
            {metadata.pages?.skills?.title1 || "Technology"} <span className="italic text-gradient text-glow">{metadata.pages?.skills?.title2 || "ecosystem"}</span>.
          </h2>
        </Reveal>

        {/* 3-Column Glassmorphic Asymmetric Motherboard Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto relative z-20">
          {skills.map((category, i) => {
            const parts = category.title ? category.title.split(" ") : ["01", "CORE"];
            const num = parts[0];
            const name = parts.slice(1).join(" ");
            const cardColor = CARD_COLORS[i % CARD_COLORS.length];

            // Define 6 completely different motherboard layouts based on card index "i"
            let junctions: { x: number; y: number; lx: number; ly: number; path: string }[] = [];
            let processorElement: React.ReactNode = null;
            let auxiliaryElements: React.ReactNode = null;

            // -------------------------------------------------------------
            // CARD 1: Vertical Mainframe Bus Topology
            // -------------------------------------------------------------
            if (i === 0) {
              junctions = [
                { x: 195, y: 45, lx: 60, ly: 45, path: "M 60 45 L 140 45 L 195 45" },
                { x: 195, y: 85, lx: 60, ly: 85, path: "M 60 85 L 140 85 L 195 85" },
                { x: 195, y: 125, lx: 60, ly: 125, path: "M 60 125 L 140 125 L 195 125" },
                { x: 195, y: 165, lx: 60, ly: 165, path: "M 60 165 L 140 165 L 195 165" }
              ];

              processorElement = (
                <g>
                  {/* Left Mainframe Vertical Card */}
                  <rect 
                    x="25" y="40" 
                    width="35" height="130" 
                    rx="4" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="2" 
                    style={{ filter: `drop-shadow(0 0 5px rgb(${cardColor}))` }} 
                  />
                  {/* Vertical text inside card */}
                  <text 
                    x="42" y="105" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    className="font-mono text-[9px] font-bold tracking-widest uppercase"
                    transform="rotate(-90, 42, 105)"
                  >
                    SPATIAL
                  </text>
                  {/* Vertical backbone trace line */}
                  <line x1="60" y1="45" x2="60" y2="165" stroke={`rgba(${cardColor}, 0.35)`} strokeWidth="2.5" />
                </g>
              );
            }

            // -------------------------------------------------------------
            // CARD 2: Concentric Radar Star Orbit Topology
            // -------------------------------------------------------------
            else if (i === 1) {
              junctions = [
                { x: 120, y: 38, lx: 120, ly: 75, path: "M 120 75 L 120 38" },     // Top
                { x: 202, y: 100, lx: 145, ly: 100, path: "M 145 100 L 202 100" }, // Right
                { x: 120, y: 162, lx: 120, ly: 125, path: "M 120 125 L 120 162" }, // Bottom
                { x: 38, y: 100, lx: 95, ly: 100, path: "M 95 100 L 38 100" }     // Left
              ];

              processorElement = (
                <g>
                  {/* Circular Processor Core */}
                  <circle 
                    cx="120" cy="100" 
                    r="25" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="2" 
                    style={{ filter: `drop-shadow(0 0 5px rgb(${cardColor}))` }} 
                  />
                  <text 
                    x="120" y="103" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    className="font-mono text-[8px] font-bold tracking-wider uppercase"
                  >
                    AGENTS
                  </text>
                  {/* Background circular orbital trace track */}
                  <circle cx="120" cy="100" r="50" fill="none" stroke={`rgba(${cardColor}, 0.08)`} strokeWidth="1.2" strokeDasharray="4 4" />
                </g>
              );
            }

            // -------------------------------------------------------------
            // CARD 3: Staggered Asymmetric motherboard Cascade
            // -------------------------------------------------------------
            else if (i === 2) {
              junctions = [
                { x: 40, y: 40, lx: 95, ly: 75, path: "M 40 40 L 95 75" },
                { x: 200, y: 70, lx: 145, ly: 85, path: "M 200 70 L 145 85" },
                { x: 40, y: 140, lx: 95, ly: 110, path: "M 40 140 L 95 110" },
                { x: 200, y: 165, lx: 145, ly: 125, path: "M 200 165 L 145 125" }
              ];

              processorElement = (
                <g>
                  <rect 
                    x="95" y="75" 
                    width="50" height="50" 
                    rx="6" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="2" 
                    style={{ filter: `drop-shadow(0 0 5px rgb(${cardColor}))` }} 
                  />
                  <text 
                    x="120" y="104" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    className="font-mono text-[9px] font-bold tracking-widest uppercase"
                  >
                    NEURAL
                  </text>
                </g>
              );
            }

            // -------------------------------------------------------------
            // CARD 4: Twin-Core Parallel Processor Topology
            // -------------------------------------------------------------
            else if (i === 3) {
              junctions = [
                { x: 40, y: 45, lx: 65, ly: 85, path: "M 40 45 L 65 85" },      // Core 1 Left
                { x: 200, y: 45, lx: 175, ly: 85, path: "M 200 45 L 175 85" },    // Core 2 Right
                { x: 40, y: 155, lx: 65, ly: 117, path: "M 40 155 L 65 117" },    // Core 1 Left
                { x: 200, y: 155, lx: 175, ly: 117, path: "M 200 155 L 175 117" }   // Core 2 Right
              ];

              processorElement = (
                <g>
                  {/* Left Core */}
                  <rect 
                    x="65" y="82" 
                    width="32" height="36" 
                    rx="4" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="1.5" 
                    style={{ filter: `drop-shadow(0 0 4px rgba(${cardColor}, 0.6))` }} 
                  />
                  <text x="81" y="103" textAnchor="middle" fill="#ffffff" className="font-mono text-[7px] font-bold">SYS1</text>
                  
                  {/* Right Core */}
                  <rect 
                    x="143" y="82" 
                    width="32" height="36" 
                    rx="4" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="1.5" 
                    style={{ filter: `drop-shadow(0 0 4px rgba(${cardColor}, 0.6))` }} 
                  />
                  <text x="159" y="103" textAnchor="middle" fill="#ffffff" className="font-mono text-[7px] font-bold">SYS2</text>
                  
                  {/* Core bridging bus trace */}
                  <line x1="97" y1="100" x2="143" y2="100" stroke={`rgb(${cardColor})`} strokeWidth="1.5" strokeDasharray="3 3" />
                </g>
              );
            }

            // -------------------------------------------------------------
            // CARD 5: Closed-Loop Diamond Ring Network
            // -------------------------------------------------------------
            else if (i === 4) {
              junctions = [
                { x: 120, y: 40, lx: 120, ly: 75, path: "M 120 75 L 120 40" },
                { x: 190, y: 100, lx: 145, ly: 100, path: "M 145 100 L 190 100" },
                { x: 120, y: 160, lx: 120, ly: 125, path: "M 120 125 L 120 160" },
                { x: 50, y: 100, lx: 95, ly: 100, path: "M 95 100 L 50 100" }
              ];

              processorElement = (
                <g>
                  <rect 
                    x="95" y="75" 
                    width="50" height="50" 
                    rx="6" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="2" 
                    style={{ filter: `drop-shadow(0 0 5px rgb(${cardColor}))` }} 
                  />
                  <text 
                    x="120" y="104" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    className="font-mono text-[9px] font-bold tracking-widest uppercase"
                  >
                    MLOPS
                  </text>
                </g>
              );

              auxiliaryElements = (
                <polygon 
                  points="120,40 190,100 120,160 50,100" 
                  fill="none" 
                  stroke={`rgba(${cardColor}, 0.08)`} 
                  strokeWidth="1.5" 
                />
              );
            }

            // -------------------------------------------------------------
            // CARD 6: Triangular Star Core Topology
            // -------------------------------------------------------------
            else {
              junctions = [
                { x: 120, y: 38, lx: 120, ly: 72, path: "M 120 72 L 120 38" },     // Top peak
                { x: 42, y: 155, lx: 92, ly: 120, path: "M 92 120 L 42 155" },     // Left base
                { x: 120, y: 165, lx: 120, ly: 120, path: "M 120 120 L 120 165" },  // Center base
                { x: 198, y: 155, lx: 148, ly: 120, path: "M 148 120 L 198 155" }  // Right base
              ];

              processorElement = (
                <g>
                  {/* Central glowing triangle core */}
                  <polygon 
                    points="120,72 92,120 148,120" 
                    fill="#0d0b12" 
                    stroke={`rgb(${cardColor})`} 
                    strokeWidth="2" 
                    style={{ filter: `drop-shadow(0 0 5px rgb(${cardColor}))` }} 
                  />
                  <text 
                    x="120" y="107" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    className="font-mono text-[7px] font-bold tracking-widest"
                  >
                    3D_TWIN
                  </text>
                </g>
              );
            }

            return (
              <Reveal key={category.title || String(i)} delay={i * 0.05} variant="dissolve">
                <ParticleCard
                  glowColor={cardColor}
                  particleCount={8}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  className="magic-bento-card magic-bento-card--border-glow min-h-[380px] p-8 flex flex-col justify-between cursor-default"
                  style={{ 
                    '--card-glow-rgb': cardColor, 
                    '--glow-color': cardColor,
                    position: 'relative',
                    overflow: 'hidden'
                  } as React.CSSProperties}
                >
                  {/* Card Header: Pulsing Node & Styling Labels */}
                  <div className="magic-bento-card__header relative z-10 flex items-center justify-between w-full font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-white/90 tracking-widest uppercase">
                      <span 
                        className="w-1.5 h-1.5 rounded-full absolute" 
                        style={{ 
                          backgroundColor: `rgb(${cardColor})`, 
                          animation: 'bento-ping 2s cubic-bezier(0,0,0.2,1) infinite' 
                        }} 
                      />
                      <span 
                        className="w-1.5 h-1.5 rounded-full relative" 
                        style={{ 
                          backgroundColor: `rgb(${cardColor})`, 
                          boxShadow: `0 0 8px rgb(${cardColor})` 
                        }} 
                      />
                      <span>SYS [{num}]</span>
                    </div>

                    <div 
                      className="magic-bento-card__label font-bold" 
                      style={{ 
                        color: `rgb(${cardColor})`, 
                        borderColor: `rgba(${cardColor}, 0.3)`, 
                        backgroundColor: `rgba(${cardColor}, 0.12)` 
                      }}
                    >
                      {name.replace(/[\[\]]/g, "").replace(/_&_/g, " & ").replace(/_/g, " ")}
                    </div>
                  </div>

                  {/* Asymmetric motherboard SVG Display */}
                  <div className="flex items-center justify-center h-[210px] flex-grow relative z-10 select-none mt-4">
                    <svg className="w-full h-full max-w-[260px] overflow-visible" viewBox="0 0 240 200">
                      
                      {/* Auxiliary backing elements (e.g. Card 5 loops) */}
                      {auxiliaryElements}

                      {/* 4 Custom-Routed Circuit Trace Lines */}
                      {junctions.map((junc, idx) => {
                        const isHovered = hoveredJunction[i] === idx;
                        return (
                          <g key={`trace-${idx}`}>
                            {/* Ambient Trace Line */}
                            <path
                              d={junc.path}
                              fill="none"
                              stroke={isHovered ? "#ffffff" : `rgba(${cardColor}, 0.2)`}
                              strokeWidth={isHovered ? "2" : "1.5"}
                              className="transition-colors duration-300"
                            />
                            {/* Sweeping Laser energy pulse on hover */}
                            {isHovered && (
                              <path
                                d={junc.path}
                                fill="none"
                                stroke={`rgb(${cardColor})`}
                                strokeWidth="2.5"
                                strokeDasharray="60"
                                strokeDashoffset="60"
                                style={{
                                  filter: `drop-shadow(0 0 4px rgb(${cardColor}))`,
                                  animation: "dash 0.8s linear infinite"
                                }}
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* Central Motherboard Processor Chip */}
                      {processorElement}

                      {/* Render the 4 Custom Staggered Skill Nodes */}
                      {junctions.map((junc, idx) => {
                        const skill = category.skills?.[idx] || { name: "Skill", progress: 85 };
                        const isHovered = hoveredJunction[i] === idx;

                        return (
                          <g 
                            key={skill.name} 
                            className="group/junc cursor-pointer"
                            onMouseEnter={() => setHoveredJunction(prev => ({ ...prev, [i]: idx }))}
                            onMouseLeave={() => setHoveredJunction(prev => ({ ...prev, [i]: null }))}
                          >
                            {/* Circuit node circle */}
                            <circle
                              cx={junc.x} cy={junc.y}
                              r={isHovered ? "6" : "5"}
                              fill="#0d0b12"
                              stroke={isHovered ? "#ffffff" : `rgb(${cardColor})`}
                              strokeWidth="2"
                              className="transition-all duration-300"
                              style={{ filter: `drop-shadow(0 0 4px rgb(${cardColor}))` }}
                            />
                            {/* Glowing node labels */}
                            <text
                              x={junc.x} y={junc.y - 12}
                              textAnchor="middle"
                              fill={isHovered ? "#ffffff" : "rgba(255,255,255,0.75)"}
                              className={`font-mono text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                isHovered ? "text-white" : ""
                              }`}
                            >
                              {skill.name.split(" ")[0]}
                            </text>
                            <text
                              x={junc.x} y={junc.y + 16}
                              textAnchor="middle"
                              fill={`rgb(${cardColor})`}
                              className="font-mono text-[7.5px] font-bold transition-all duration-300"
                              style={{
                                filter: isHovered ? `drop-shadow(0 0 2px rgb(${cardColor}))` : "none"
                              }}
                            >
                              {skill.progress}%
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Diagnostic Footer */}
                  <div 
                    className="mt-8 pt-3 border-t border-white/10 flex items-center justify-between text-[8px] font-mono relative z-10 uppercase tracking-[0.2em] w-full" 
                    style={{ color: `rgba(${cardColor}, 0.65)` }}
                  >
                    <span>SYS_CORE: SECURE</span>
                    <span>ENG_MODE: 0{i + 1}</span>
                  </div>
                </ParticleCard>
              </Reveal>
            );
          })}
        </div>
      </SectionDissolve>
    </section>
  );
}
