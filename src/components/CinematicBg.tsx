import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function CinematicBg() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const tx = useTransform(sx, (v) => v * 30);
  const ty = useTransform(sy, (v) => v * 30);
  const tx2 = useTransform(sx, (v) => v * -50);
  const ty2 = useTransform(sy, (v) => v * -50);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-30 z-10" />
      <motion.div
        style={{ x: tx, y: ty }}
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full"
        aria-hidden
      >
        <div className="w-full h-full" style={{ background: "var(--gradient-aurora)" }} />
      </motion.div>
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
        aria-hidden
      >
        <div className="w-full h-full opacity-30" style={{ background: "var(--gradient-glow)" }} />
      </motion.div>
      <motion.div
        style={{ x: tx, y: ty2 }}
        className="absolute bottom-0 -left-40 w-[700px] h-[700px] rounded-full blur-3xl"
        aria-hidden
      >
        <div className="w-full h-full opacity-20" style={{ background: "radial-gradient(circle, oklch(0.85 0.12 210 / 0.5), transparent 60%)" }} />
      </motion.div>
      {/* particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-cyan-soft"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            opacity: 0.4,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-deep)]" />
    </div>
  );
}
