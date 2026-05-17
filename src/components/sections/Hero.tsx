import React, { useState } from "react";
import { motion } from "framer-motion";
import { CyberMask } from "../CyberMask";
import Prism from "../Prism";
import Shuffle from "../Shuffle";
import GradientText from "../GradientText";
import { CosmicAIVoice } from "../CosmicAIVoice";

export function Hero() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden noise">
      {/* 🚀 Free Local AI Voice Assistant */}
      <CosmicAIVoice onSpeakingChange={setIsSpeaking} />

      {/* Layer 1 (Bottom): Glowing holographic 3D Prism from React Bits */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, opacity: 0.95 }}>
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
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
        <CyberMask isSpeaking={isSpeaking} />
      </div>

      {/* Holographic mesh */}
      <svg className="absolute inset-x-0 bottom-0 w-full h-[50vh] opacity-40" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="meshG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${100 + i * 20} Q 300 ${80 + i * 20} 600 ${120 + i * 18} T 1200 ${100 + i * 20}`}
            stroke="url(#meshG)"
            strokeWidth="0.6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.05 }}
          />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 40} y1="80"
            x2={i * 40} y2="400"
            stroke="oklch(0.72 0.18 240)"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      <div className="relative z-10 text-center px-6 max-w-5xl">
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
          className="mt-6 text-xs tracking-[0.3em] text-muted-foreground/70 uppercase"
        >
          <Shuffle
            text="Geospatial Intelligence · Multi-Agent Systems · Computer Vision"
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 1 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
      >
        Scroll to Explore
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
