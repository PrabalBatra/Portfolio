import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Project } from '@/hooks/usePortfolioData';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 6;
const DEFAULT_SPOTLIGHT_RADIUS = 350;
const MOBILE_BREAKPOINT = 768;

// Curated Vibrant Neon Color Palettes
export const CARD_COLORS = [
  "56, 189, 248",   // Electric Cyan
  "168, 85, 247",   // Neon Purple
  "16, 185, 129",   // Emerald Green
  "245, 158, 11",   // Solar Amber
  "244, 63, 94",    // Crimson Rose
  "99, 102, 241"    // Indigo Laser
];

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 10px rgba(${color}, 0.9), 0 0 20px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

export interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  onClick?: () => void;
}

export const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 1.5 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
        gsap.to(clone, {
          opacity: 0.25,
          duration: 1.2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 80);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    let moveRafId: number | null = null;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = 'perspective(1000px) rotateX(4deg) rotateY(4deg)';
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      element.style.transition = 'transform 0.3s ease';
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0,0)';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      if (moveRafId) return; // throttle to rAF
      moveRafId = requestAnimationFrame(() => {
        moveRafId = null;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = enableTilt ? ((y - centerY) / centerY) * -8 : 0;
        const rotateY = enableTilt ? ((x - centerX) / centerX) * 8 : 0;
        const magnetX = enableMagnetism ? (x - centerX) * 0.04 : 0;
        const magnetY = enableMagnetism ? (y - centerY) * 0.04 : 0;
        element.style.transition = 'transform 0.08s linear';
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${magnetX}px, ${magnetY}px)`;
      });
    };

    const handleClick = () => {
      if (onClick) onClick();
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = rect.width / 2;
      const y = rect.height / 2;
      const maxDistance = Math.hypot(rect.width, rect.height);

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.5) 0%, rgba(${glowColor}, 0.25) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
        transform: scale(0);
        opacity: 1;
        transition: transform 0.8s ease-out, opacity 0.8s ease-out;
      `;
      element.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      });
      setTimeout(() => ripple.remove(), 800);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      if (moveRafId) cancelAnimationFrame(moveRafId);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, onClick]);

  return (
    <div ref={cardRef} className={`${className} particle-container group`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(56, 189, 248, 0.18) 0%,
        rgba(168, 85, 247, 0.10) 20%,
        transparent 65%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.3s ease, left 0.1s linear, top 0.1s linear;
      will-change: left, top, opacity;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    let rafId: number | null = null;
    let lastX = 0, lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!spotlightRef.current || !gridRef.current) return;
        const section = gridRef.current.closest('.bento-section');
        const rect = section?.getBoundingClientRect();
        const mouseInside = rect && lastX >= rect.left && lastX <= rect.right && lastY >= rect.top && lastY <= rect.bottom;

        isInsideSection.current = mouseInside || false;
        const cards = gridRef.current.querySelectorAll('.magic-bento-card');

        if (!mouseInside) {
          spotlightRef.current.style.opacity = '0';
          cards.forEach(card => (card as HTMLElement).style.setProperty('--glow-intensity', '0'));
          return;
        }

        const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
        let minDistance = Infinity;

        cards.forEach(card => {
          const cardElement = card as HTMLElement;
          const cardRect = cardElement.getBoundingClientRect();
          const centerX = cardRect.left + cardRect.width / 2;
          const centerY = cardRect.top + cardRect.height / 2;
          const distance = Math.hypot(lastX - centerX, lastY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
          const effectiveDistance = Math.max(0, distance);

          minDistance = Math.min(minDistance, effectiveDistance);
          let glowIntensity = 0;
          if (effectiveDistance <= proximity) glowIntensity = 1;
          else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

          updateCardGlowProperties(cardElement, lastX, lastY, glowIntensity, spotlightRadius);
        });

        spotlightRef.current.style.left = `${lastX}px`;
        spotlightRef.current.style.top = `${lastY}px`;
        const targetOpacity = minDistance <= proximity ? 0.85 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.85 : 0;
        spotlightRef.current.style.opacity = targetOpacity.toString();
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => (card as HTMLElement).style.setProperty('--glow-intensity', '0'));
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

interface MagicBentoProps {
  projects: Project[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

export const MagicBento: React.FC<MagicBentoProps> = ({
  projects,
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = 350,
  particleCount = 12,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <div className="bento-section w-full relative">
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
        />
      )}

      <div className="card-grid" ref={gridRef}>
        {projects.map((project, index) => {
          const num = String(index + 1).padStart(2, '0');
          const titleLower = project.title.toLowerCase();
          const cardGlow = CARD_COLORS[index % CARD_COLORS.length];

          const label = titleLower.includes("astro") || titleLower.includes("terra") ? "Lunar Intelligence" :
            titleLower.includes("guard") ? "Vision System" :
            titleLower.includes("ocg") ? "Hardware CV" :
            titleLower.includes("robocop") ? "Autonomous AI" :
            titleLower.includes("murphy") ? "Deep Learning" :
            "AI Platform";

          const techStack = titleLower.includes("astro") || titleLower.includes("terra") ? ["OpenCV", "CNN", "PyTorch", "RAG"] :
            titleLower.includes("guard") ? ["Sensor Fusion", "Neural Nets", "Real-Time", "IoT"] :
            titleLower.includes("ocg") ? ["Eye-Tracking", "Edge AI", "Embedded"] :
            titleLower.includes("robocop") ? ["Autonomous AI", "Robotics", "ROS", "YOLO"] :
            titleLower.includes("murphy") ? ["TensorFlow", "Medical AI", "ResNet-50", "Python"] :
            titleLower.includes("rag") || titleLower.includes("agent") ? ["LangChain", "LangGraph", "FastAPI", "PostGIS"] :
            ["Real-Time Triage", "IoT Monitoring", "Cloud Sync", "React"];

          const baseClassName = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          const handleClick = () => {
            if (project.link && project.link.trim() !== "" && project.link.trim() !== "#") {
              window.open(project.link, '_blank');
            }
          };

          const cardContent = (
            <>
              {/* Vibrant Background Image with Crystal Glass Gradient Overlay */}
              {project.imgUrl && (
                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                  <img
                    src={project.imgUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-95 filter saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09070f] via-[#09070f]/80 to-transparent" />
                </div>
              )}

              {/* Card Header: Glowing Monospace Tag & Live Radar Ping Dot */}
              <div className="magic-bento-card__header relative z-10 flex items-center justify-between w-full font-mono text-[11px]">
                <div className="flex items-center gap-2 text-white/90 tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full absolute" style={{ backgroundColor: `rgb(${cardGlow})`, animation: 'bento-ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
                  <span className="w-1.5 h-1.5 rounded-full relative" style={{ backgroundColor: `rgb(${cardGlow})`, boxShadow: `0 0 8px rgb(${cardGlow})` }} />
                  <span>PRJ [{num}]</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <div className="magic-bento-card__label">{label}</div>
                  {project.link && project.link.trim() !== "" && project.link.trim() !== "#" && (
                    <span className="w-6 h-6 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shadow-md" style={{ borderColor: `rgba(${cardGlow}, 0.5)` }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content: Title, Description & Tech Badges */}
              <div className="magic-bento-card__content relative z-10 mt-6 flex flex-col justify-end">
                <div>
                  <h2 className="magic-bento-card__title group-hover:text-white transition-colors duration-300 font-light" style={{ color: `rgb(${cardGlow})` }}>
                    {project.title}
                  </h2>
                  <p className="magic-bento-card__description mt-0.5 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Ultra-Compact Tech Stack Badges */}
                <div className="mt-3.5 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-black/60 border text-[9px] font-mono tracking-wider uppercase transition-colors shadow-sm" style={{ borderColor: `rgba(${cardGlow}, 0.3)`, color: `rgb(${cardGlow})` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          );

          if (enableStars) {
            return (
              <ParticleCard
                key={project.title}
                className={baseClassName}
                style={{ '--card-glow-rgb': cardGlow, '--glow-color': cardGlow } as React.CSSProperties}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={cardGlow}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                onClick={handleClick}
              >
                {cardContent}
              </ParticleCard>
            );
          }

          return (
            <div
              key={project.title}
              className={baseClassName}
              style={{ '--card-glow-rgb': cardGlow, '--glow-color': cardGlow } as React.CSSProperties}
              onClick={handleClick}
            >
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};
