import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-6"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center gap-1 text-xs tracking-wider">
        <a href="#top" className="font-display font-medium pr-4 mr-2 border-r border-white/10 text-white">
          PB<span className="text-primary">.</span>
        </a>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-white transition-colors uppercase"
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
