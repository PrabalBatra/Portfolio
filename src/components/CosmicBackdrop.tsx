import React from 'react';

export function CosmicBackdrop() {
  return (
    <div className="cosmic-nebula-container">
      {/* Volumetric drifting nebula cloud layer (GPU composite optimized) */}
      <div className="cosmic-dust-cloud" />
      
      {/* Parallax Deep Stars Layer */}
      <div className="parallax-stars-deep" />
      
      {/* Parallax Close Stars Layer */}
      <div className="parallax-stars-close" />
      
      {/* Sci-Fi Holographic Grid Lines */}
      <div className="absolute inset-0 grid-bg opacity-15" />
    </div>
  );
}

export default CosmicBackdrop;
