import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isSpeaking: boolean;
  isListening: boolean;
}

export function AIVoiceVisualizer({ isSpeaking, isListening }: VisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    
    let phase = 0;
    let animationFrameId: number;
    
    const wavePaths = svg.querySelectorAll('.wave-path');
    
    const animate = () => {
      // Accelerate wave speed when speaking
      phase += isSpeaking ? 0.14 : isListening ? 0.08 : 0.035;
      
      const width = svg.clientWidth || 400;
      const height = svg.clientHeight || 80;
      const centerY = height / 2;
      
      // Dynamic base amplitude based on states
      let baseAmp = isSpeaking ? 28 : isListening ? 14 : 3.0;
      
      // Apply highly dynamic procedural vocal envelope to simulate syllables, breath, and words
      if (isSpeaking) {
        const syllableOsc = Math.sin(phase * 0.35) * 0.5 + Math.cos(phase * 0.85) * 0.3 + Math.sin(phase * 1.6) * 0.2;
        const speechEnvelope = 0.2 + Math.abs(syllableOsc) * 1.05;
        baseAmp = baseAmp * speechEnvelope;
      }
      
      wavePaths.forEach((path, index) => {
        const points = [];
        const numPoints = 50; // Smooth resolution
        
        // Vary each wave's speed, frequency, and offset
        const speedMultiplier = 1.0 + index * 0.22;
        const currentPhase = phase * speedMultiplier;
        
        // Dynamically compute wave cycles based on the width to keep visuals perfectly balanced
        const numCycles = (3.5 + index * 1.5) * (isSpeaking ? 1.3 : 1.0);
        const waveFreq = (numCycles * 2 * Math.PI) / width;
        const waveAmp = baseAmp * (1.0 - index * 0.28) * (0.85 + Math.sin(phase * 0.4 + index) * 0.15);
        
        for (let i = 0; i <= numPoints; i++) {
          const x = (i / numPoints) * width;
          
          // Multi-harmonic continuous sine wave (no envelope falloff for full edge-to-edge stretching)
          const y = centerY + Math.sin(x * waveFreq + currentPhase) * waveAmp;
          
          points.push(`${x},${y}`);
        }
        
        // Create SVG smooth path data
        const pathData = `M ${points[0]} ` + points.slice(1).map(p => `L ${p}`).join(' ');
        path.setAttribute('d', pathData);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpeaking, isListening]);
  
  return (
    <div className="relative w-full h-24 overflow-hidden flex items-center justify-center pointer-events-none">
      <svg ref={svgRef} className="w-full h-full">
        {/* Primary Glowing Wave */}
        <path 
          className="wave-path fill-none stroke-[2.5] transition-colors duration-500" 
          stroke={isSpeaking ? '#818cf8' : isListening ? '#38bdf8' : 'rgba(56,189,248,0.25)'}
          style={{ 
            mixBlendMode: 'screen', 
            filter: `drop-shadow(0 0 10px ${isSpeaking ? 'rgba(129,140,248,0.6)' : isListening ? 'rgba(56,189,248,0.5)' : 'rgba(56,189,248,0.1)'})` 
          }}
        />
        {/* Secondary Layer Wave */}
        <path 
          className="wave-path fill-none stroke-[1.8] opacity-80 transition-colors duration-500" 
          stroke={isSpeaking ? '#a78bfa' : isListening ? '#67e8f9' : 'rgba(129,140,248,0.18)'}
          style={{ 
            mixBlendMode: 'screen', 
            filter: `drop-shadow(0 0 8px ${isSpeaking ? 'rgba(167,139,250,0.5)' : isListening ? 'rgba(103,232,249,0.4)' : 'rgba(129,140,248,0.05)'})` 
          }}
        />
        {/* Tertiary Detail Wave */}
        <path 
          className="wave-path fill-none stroke-[1.2] opacity-65 transition-colors duration-500" 
          stroke={isSpeaking ? '#f472b6' : isListening ? '#22d3ee' : 'rgba(56,189,248,0.12)'}
          style={{ 
            mixBlendMode: 'screen', 
            filter: `drop-shadow(0 0 6px ${isSpeaking ? 'rgba(244,114,182,0.4)' : isListening ? 'rgba(34,211,238,0.3)' : 'rgba(56,189,248,0.05)'})` 
          }}
        />
      </svg>
    </div>
  );
}
