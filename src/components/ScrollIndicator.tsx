import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: [0, 10, 0]
      }}
      transition={{ 
        opacity: { delay: 1.0, duration: 1 },
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
  );
}
