import { useEffect, useRef } from 'react';
import './GradientBlinds.css';

export interface GradientBlindsProps {
  className?: string;
  paused?: boolean;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: 'left' | 'right';
  mixBlendMode?: string;
}

const GradientBlinds = ({
  className = '',
  paused = false,
  gradientColors = ['#0ea5e9', '#6366f1', '#a855f7', '#06b6d4'],
  angle = 45,
  noise = 0.08,
  blindCount = 12,
  blindMinWidth = 50,
  mouseDampening = 0.15,
  spotlightRadius = 0.7,
  spotlightSoftness = 1.2,
  spotlightOpacity = 0.75,
  mixBlendMode = 'normal'
}: GradientBlindsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Center mouse initially
      if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        mouseRef.current = { x: cx, y: cy };
        mouseTargetRef.current = { x: cx, y: cy };
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseTargetRef.current = { x, y };
    };

    window.addEventListener('pointermove', onPointerMove);

    let lastT = 0;
    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (paused) return;

      const dt = (t - lastT) / 1000;
      lastT = t;

      timeRef.current += dt * 0.5; // Smooth slow animation speed

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      if (width === 0 || height === 0) return;

      // 1. Smooth Mouse Dampening
      const tau = Math.max(0.01, mouseDampening);
      let factor = 1 - Math.exp(-dt / tau);
      if (factor > 1) factor = 1;
      
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * factor;
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * factor;

      // 2. Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 3. Draw Background Rotating Gradient Stops
      const angleRad = (angle * Math.PI) / 180 + Math.sin(timeRef.current * 0.1) * 0.2;
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.sqrt(cx * cx + cy * cy);
      
      const x0 = cx - Math.cos(angleRad) * r;
      const y0 = cy - Math.sin(angleRad) * r;
      const x1 = cx + Math.cos(angleRad) * r;
      const y1 = cy + Math.sin(angleRad) * r;

      const bgGrad = ctx.createLinearGradient(x0, y0, x1, y1);
      
      // Interpolate gradient colors based on time
      const stops = gradientColors.length > 0 ? gradientColors : ['#0ea5e9', '#6366f1', '#a855f7', '#06b6d4'];
      stops.forEach((color, i) => {
        const offset = i / (stops.length - 1);
        // Add dynamic hue movement over time
        bgGrad.addColorStop(offset, color);
      });

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Draw Vertical Glass Cyber-Blinds
      const effectiveBlinds = blindMinWidth > 0 
        ? Math.max(2, Math.min(blindCount, Math.floor(width / blindMinWidth)))
        : blindCount;

      const blindWidth = width / effectiveBlinds;
      for (let i = 0; i < effectiveBlinds; i++) {
        const bx = i * blindWidth;
        
        // Draw stripes using a glassy specular highlight gradient overlay
        const stripeGrad = ctx.createLinearGradient(bx, 0, bx + blindWidth, 0);
        stripeGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        stripeGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.15)');
        stripeGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
        stripeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        
        ctx.fillStyle = stripeGrad;
        ctx.fillRect(bx, 0, blindWidth, height);
      }

      // 5. Draw Interactive Spotlight Cursor Glow
      const spotR = Math.max(50, width * spotlightRadius);
      const spotGrad = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        spotR
      );
      
      const alphaVal = spotlightOpacity * 0.45;
      spotGrad.addColorStop(0, `rgba(255, 255, 255, ${alphaVal})`);
      spotGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alphaVal * 0.4})`);
      spotGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // 6. Draw Subtle Dynamic Digital Grain Noise
      if (noise > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${noise * 0.15})`;
        for (let i = 0; i < 400; i++) {
          const rx = Math.random() * width;
          const ry = Math.random() * height;
          ctx.fillRect(rx, ry, 1, 1);
        }
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
    };
  }, [
    paused,
    gradientColors,
    angle,
    noise,
    blindCount,
    blindMinWidth,
    mouseDampening,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    mixBlendMode
  ]);

  return (
    <div
      ref={containerRef}
      className={`gradient-blinds-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...(mixBlendMode && {
          mixBlendMode: mixBlendMode as any
        })
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default GradientBlinds;
