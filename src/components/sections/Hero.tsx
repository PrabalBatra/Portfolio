import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CyberMask } from "../CyberMask";
import Prism from "../Prism";
import Shuffle from "../Shuffle";
import GradientText from "../GradientText";
import { SectionDissolve } from "../SectionDissolve";
import { GamoraOverlay } from "../GamoraOverlay";

export function Hero() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [gamoraOpen, setGamoraOpen] = useState(false);

  // ESC key closes GAMORA mode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gamoraOpen) setGamoraOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gamoraOpen]);

  return (
    <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden noise">

      {/* GAMORA full-screen dissolve overlay */}
      <GamoraOverlay isOpen={gamoraOpen} onClose={() => setGamoraOpen(false)} />

      {/* Layer 1 (Bottom): Glowing holographic 3D Prism with seamless bottom fade */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.95,
          maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"
        }}
      >
        <Prism
          animationType="rotate"
          timeScale={0.45}
          height={3.4}
          baseWidth={5.4}
          scale={3.4}
          hueShift={0}
          colorFrequency={0.9}
          noise={0.25}
          glow={0.7}
          bloom={0.7}
          suspendWhenOffscreen={true}
        />
      </div>

      {/* Layer 2 (Top): 3D stealth metallic mask reacting live to AI speech */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 2,
          maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)"
        }}
      >
        <CyberMask isSpeaking={isSpeaking} />
      </div>

      {/* Holographic mesh - static for performance */}
      <svg className="absolute inset-x-0 bottom-0 w-full h-[50vh] opacity-30 pointer-events-none" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="meshG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${120 + i * 28} Q 300 ${100 + i * 28} 600 ${140 + i * 26} T 1200 ${120 + i * 28}`}
            stroke="url(#meshG)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.8"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 60} y1="80"
            x2={i * 60} y2="400"
            stroke="oklch(0.72 0.18 240)"
            strokeOpacity="0.12"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      <SectionDissolve className="max-w-5xl text-center px-6 z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <GradientText
            colors={["#38bdf8", "#818cf8", "#38bdf8", "#818cf8", "#38bdf8"]}
            animationSpeed={4}
            showBorder={true}
            className="text-[11px] tracking-[0.2em] uppercase font-semibold"
          >
            <span className="inline-flex items-center gap-2 px-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              AI Engineer · Portfolio · 2026
            </span>
          </GradientText>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-[clamp(3rem,11vw,9rem)] font-light leading-[0.9] tracking-tighter text-gradient text-glow"
        >
          PRABAL
          <br />
          <span className="font-extralight italic">BATRA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light"
        >
          <Shuffle
            text="Building Intelligent AI Systems for Real-World Intelligence."
            shuffleDirection="right"
            duration={0.4}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.015}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            tag="span"
            loop={true}
            loopDelay={4}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 text-xs tracking-[0.3em] text-muted-foreground/70 uppercase px-4"
        >
          <Shuffle
            text={"Geospatial Intelligence · Multi\u2011Agent Systems · Computer Vision"}
            shuffleDirection="down"
            duration={0.4}
            animationMode="random"
            maxDelay={0.3}
            shuffleTimes={2}
            ease="power3.out"
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            tag="span"
            loop={true}
            loopDelay={4}
          />
        </motion.div>

        {/* ── TALK TO GAMORA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10"
        >
          <button
            id="talk-to-gamora-btn"
            onClick={() => setGamoraOpen(true)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 1.75rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(129,140,248,0.08) 100%)',
              border: '1px solid rgba(56,189,248,0.35)',
              color: '#fff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: '0 0 20px rgba(56,189,248,0.1)',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget;
              btn.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(129,140,248,0.18) 100%)';
              btn.style.borderColor = 'rgba(56,189,248,0.7)';
              btn.style.boxShadow = '0 0 35px rgba(56,189,248,0.3), 0 0 60px rgba(129,140,248,0.15)';
              btn.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget;
              btn.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(129,140,248,0.08) 100%)';
              btn.style.borderColor = 'rgba(56,189,248,0.35)';
              btn.style.boxShadow = '0 0 20px rgba(56,189,248,0.1)';
              btn.style.transform = 'scale(1)';
            }}
          >
            {/* Pulsing dot */}
            <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#38bdf8', opacity: 0.7,
                animation: 'gamora-ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
              }} />
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#38bdf8',
              }} />
            </span>
            Talk to GAMORA
            {/* Arrow */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </SectionDissolve>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{ 
          opacity: { delay: 1.6, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        style={{ left: "50%", x: "-50%" }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[10px] text-muted-foreground uppercase pointer-events-none"
      >
        <span className="tracking-[0.3em]" style={{ marginRight: "-0.3em" }}>
          Scroll to Explore
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      <style>{`
        @keyframes gamora-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
