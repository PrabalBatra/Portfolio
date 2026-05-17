import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import Shuffle from "./Shuffle";

const slideVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const dissolveVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(16px) brightness(2)",
    scale: 0.94,
    clipPath: "inset(0% 0% 100% 0%)",
  },
  show: {
    opacity: 1,
    filter: "blur(0px) brightness(1)",
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export type RevealVariant = "slide" | "dissolve";

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "slide"
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const chosenVariants = variant === "dissolve" ? dissolveVariants : slideVariants;

  return (
    <motion.div
      variants={chosenVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-primary uppercase mb-6">
        <span className="font-mono">{num}</span>
        <span className="w-12 h-px bg-primary/40" />
        <Shuffle
          text={label}
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={true}
          respectReducedMotion={true}
          tag="span"
          className="text-muted-foreground cursor-pointer hover:text-primary transition-colors"
        />
      </div>
    </Reveal>
  );
}
