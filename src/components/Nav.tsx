import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Menu, X } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
const profileImg = "/profile.png";

const links = [
  { to: "/about", label: "About", sector: "NEURAL IDENTITY // SECTOR 01" },
  { to: "/stack", label: "Stack", sector: "TECH ECOSYSTEM // SECTOR 02" },
  { to: "/work", label: "Work", sector: "PRODUCTION REPOSITORIES // SECTOR 04" },
  { to: "/experience", label: "Experience", sector: "PROFESSIONAL TRAJECTORY // SECTOR 05" },
  { to: "/honors", label: "Honors", sector: "ACADEMIC DECORATIONS // SECTOR 06" },
  { to: "/contact", label: "Contact", sector: "COMMUNICATOR SYSTEM // SECTOR 07" },
];

export function Nav() {
  const router = useRouter();
  const activePath = router.state.location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  // Check screen width for mobile size (below 768px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer if user transitions to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleNavClick = (e: React.MouseEvent, to: string, sector: string) => {
    e.preventDefault();
    setIsOpen(false);
    const trigger = (window as any).__triggerRouteTransition;
    if (trigger) {
      trigger(to, sector);
    } else {
      router.navigate({ to });
      window.scrollTo(0, 0);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-6 pointer-events-none"
      >
        {isMobile ? (
          /* Mobile Navigation Pill */
          <div className="w-full max-w-[360px] rounded-full px-5 py-3 border border-white/15 bg-[#0d0b12]/85 backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.15)] flex items-center justify-between pointer-events-auto">
            <a 
              href="/" 
              onClick={(e) => handleNavClick(e, "/", "CORE INITIATION // SECTOR 00")}
              className="font-display font-medium text-white flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>PB<span className="text-primary">.</span></span>
            </a>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-400 p-1.5 rounded-full hover:bg-white/5 transition-all focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        ) : (
          /* Desktop Navigation Pill */
          <div className="rounded-full px-6 py-3 border border-white/15 bg-[#0d0b12]/85 backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.15)] flex items-center gap-1 md:gap-2 text-xs tracking-wider pointer-events-auto">
            <a 
              href="/" 
              onClick={(e) => handleNavClick(e, "/", "CORE INITIATION // SECTOR 00")}
              className="font-display font-medium pr-4 mr-2 border-r border-white/15 text-white flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>PB<span className="text-primary">.</span></span>
            </a>
            {links.map((l) => {
              const isActive = activePath === l.to;
              return (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={(e) => handleNavClick(e, l.to, l.sector)}
                  className={`px-3.5 py-1.5 rounded-full uppercase tracking-widest text-[11px] font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)] font-bold"
                      : "text-muted-foreground hover:text-cyan-300 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}

            {/* Profile Avatar Container with Hover Tooltip */}
            <div 
              className="relative pl-3.5 ml-1 border-l border-white/15 flex items-center h-5 pointer-events-auto"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <a
                href="/about"
                onClick={(e) => handleNavClick(e, "/about", "NEURAL IDENTITY // SECTOR 01")}
                className="w-7 h-7 rounded-full overflow-hidden border border-white/20 hover:border-cyan-400/60 shadow-[0_0_10px_rgba(56,189,248,0.15)] hover:shadow-[0_0_18px_rgba(56,189,248,0.35)] hover:scale-110 transition-all duration-300 flex-shrink-0 cursor-pointer flex items-center justify-center"
                title="View Operator Profile"
              >
                <img 
                  src={profileImg} 
                  alt="Operator Profile" 
                  className="w-full h-full object-cover select-none" 
                />
              </a>

              {/* Hover Operator ID Card Tooltip */}
              <AnimatePresence>
                {isProfileHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute right-0 top-8 z-50 w-64 p-4 rounded-2xl border border-white/10 bg-[#0d0b12]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.15)] pointer-events-auto flex flex-col gap-3.5"
                  >
                    {/* Clear Portrait Frame */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/5 bg-black/40">
                      <img 
                        src={profileImg} 
                        alt="Prabal Batra" 
                        className="w-full h-full object-cover select-none"
                      />
                      {/* Scanning Line overlay */}
                      <motion.div 
                        animate={{ y: ["0%", "95%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-1 bg-cyan-400/35 shadow-[0_0_8px_rgba(34,211,238,0.5)] z-10 pointer-events-none"
                      />
                    </div>

                    {/* Operator Stats */}
                    <div className="flex flex-col font-sans text-left">
                      <div className="text-sm font-semibold tracking-wider text-white font-display">
                        PRABAL BATRA
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase mt-0.5">
                        AI Engineer · Spatial Intel
                      </div>
                      
                      <div className="h-px bg-white/5 my-2.5" />
                      
                      <div className="space-y-1.5 font-mono text-[9px] text-muted-foreground/80 tracking-wide">
                        <div className="flex justify-between">
                          <span>DATE OF BIRTH:</span>
                          <span className="text-cyan-300">15/09/2004</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SECTOR LOCATION:</span>
                          <span className="text-white">MUMBAI, INDIA</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GRADUATION:</span>
                          <span className="text-green-400">CLASS OF 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer text */}
                    <div className="text-center text-[8px] font-mono text-cyan-400/50 tracking-[0.15em] uppercase border-t border-white/5 pt-2">
                      Click to View Bio Detail
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.nav>

      {/* Mobile Fullscreen Drawer Overlay */}
      <AnimatePresence>        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#060408]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-4"
          >
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.05 }}
              className="flex flex-col gap-3 text-center w-full max-w-[320px] px-6"
            >
              <a 
                href="/" 
                className="text-lg font-display font-medium text-white flex items-center justify-center gap-2 mb-1"
                onClick={(e) => handleNavClick(e, "/", "CORE INITIATION // SECTOR 00")}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>PB<span className="text-primary">.</span></span>
              </a>

              {/* Mobile Menu profile picture */}
              <div className="flex flex-col items-center justify-center mb-2 gap-1.5">
                <a
                  href="/about"
                  onClick={(e) => handleNavClick(e, "/about", "NEURAL IDENTITY // SECTOR 01")}
                  className="w-16 h-16 rounded-full overflow-hidden border border-white/20 shadow-[0_0_12px_rgba(56,189,248,0.2)] flex-shrink-0 active:scale-95 transition-transform"
                  title="View Operator Profile"
                >
                  <img 
                    src={profileImg} 
                    alt="Prabal Batra" 
                    className="w-full h-full object-cover select-none" 
                  />
                </a>
                <div className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-[0.25em] mt-1">
                  PRABAL BATRA // OPERATOR
                </div>
              </div>

              {/* Compact 2-Column Links Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-[280px] mx-auto mt-2 text-center items-center">
                {links.map((l, index) => {
                  const isActive = activePath === l.to;
                  const isLast = index === links.length - 1;
                  return (
                    <motion.a
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ delay: 0.1 + index * 0.04 }}
                      key={l.to}
                      href={l.to}
                      onClick={(e) => handleNavClick(e, l.to, l.sector)}
                      className={`font-mono transition-all duration-300 ${
                        isLast
                          ? "col-span-2 text-center text-xs tracking-[0.2em] font-semibold uppercase py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/35 rounded-full mt-2.5 shadow-[0_0_10px_rgba(56,189,248,0.08)] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                          : "text-sm tracking-widest uppercase py-1 cursor-pointer " + (isActive ? "text-cyan-300 font-bold scale-105" : "text-muted-foreground hover:text-white")
                      }`}
                    >
                      {isLast && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                      {l.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
