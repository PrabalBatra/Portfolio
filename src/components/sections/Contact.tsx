import { motion } from "framer-motion";
import { Reveal } from "../Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="relative z-10 text-center max-w-5xl">
        <Reveal>
          <div className="text-[10px] tracking-[0.3em] text-primary uppercase mb-8">Final Scene · 06</div>
        </Reveal>
        <Reveal delay={0.1} variant="dissolve">
          <h2 className="text-[clamp(2.5rem,9vw,7.5rem)] font-light leading-[0.95] tracking-tighter text-gradient text-glow">
            Let&apos;s build
            <br />
            <span className="italic font-extralight">the future</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.3} variant="dissolve">
          <p className="mt-10 text-lg text-muted-foreground font-light max-w-xl mx-auto">
            Interested in AI, geospatial intelligence, multi-agent systems, or intelligent automation? Let&apos;s create something impactful.
          </p>
          <p className="mt-2 text-xs font-mono text-primary tracking-widest">+91 9413829248 · batraprabal04@gmail.com</p>
        </Reveal>
        <Reveal delay={0.5} variant="dissolve">
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { l: "Email", h: "mailto:batraprabal04@gmail.com" },
              { l: "LinkedIn", h: "https://www.linkedin.com/in/prabal-batra" },
              { l: "GitHub", h: "https://github.com/prabal-batra" },
            ].map((b, i) => (
              <a
                key={b.l}
                href={b.h}
                target="_blank"
                rel="noreferrer"
                className={`group relative px-7 py-3.5 rounded-full text-sm tracking-wider uppercase transition-all duration-500 ${
                  i === 0
                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_var(--glow)]"
                    : "glass hover:border-primary/50 text-white"
                }`}
              >
                <span className="relative z-10">{b.l}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-24 pt-8 border-t border-white/5 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Designed &amp; Engineered by Prabal Batra · 2026
          </div>
        </Reveal>
      </div>
    </section>
  );
}
