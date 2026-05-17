import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "../Reveal";

const items = [
  { t: "Artificial Intelligence", d: "LLMs, agentic AI, reasoning systems, prompt orchestration." },
  { t: "Geospatial Intelligence", d: "Spatial analysis, Digital Twins, GIS, infrastructure." },
  { t: "Multi-Agent Systems", d: "Task planning, decomposition, reasoning pipelines." },
  { t: "Computer Vision", d: "Satellite imagery, object detection, image analysis." },
  { t: "Backend Intelligence", d: "FastAPI, scalable APIs, AI orchestration." },
  { t: "3D & Digital Twins", d: "Spatial systems, simulations, immersive data." },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto">
        <SectionLabel num="02" label="Expertise" />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Orbital */}
          <div className="relative aspect-square max-w-[520px] mx-auto w-full">
            {/* core */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{ background: "var(--gradient-glow)", boxShadow: "var(--shadow-glow)" }}
            />
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass-strong flex items-center justify-center">
              <div className="text-[10px] tracking-[0.25em] text-center text-white uppercase font-display">
                Core<br/>Intelligence
              </div>
            </div>
            {/* orbits */}
            {[1, 2, 3].map((r) => (
              <div
                key={r}
                className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
                style={{ width: `${r * 32}%`, height: `${r * 32}%` }}
              />
            ))}
            {/* orbiting nodes */}
            {items.map((it, i) => {
              const angle = (i / items.length) * Math.PI * 2;
              const r = 42;
              const x = (50 + Math.cos(angle) * r).toFixed(4);
              const y = (50 + Math.sin(angle) * r).toFixed(4);
              return (
                <motion.div
                  key={it.t}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_var(--glow)] group-hover:scale-150 transition-transform" />
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] tracking-wider text-muted-foreground uppercase opacity-70 group-hover:opacity-100 group-hover:text-white transition">
                    {it.t.split(" ")[0]}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div>
            <Reveal variant="dissolve">
              <h2 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
                Building intelligence across <span className="italic text-gradient">data, space &amp; systems</span>.
              </h2>
            </Reveal>
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {items.map((it, i) => (
                <Reveal key={it.t} delay={i * 0.06} variant="dissolve">
                  <div className="glass rounded-xl p-4 hover:border-primary/50 hover:bg-white/[0.05] transition-all duration-500 group">
                    <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{it.t}</div>
                    <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{it.d}</div>
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
