import React from "react";
import { motion } from "framer-motion";

export interface SectionDissolveProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionDissolve: React.FC<SectionDissolveProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full h-full relative z-10 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
};
