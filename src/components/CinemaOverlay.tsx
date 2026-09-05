import React from 'react';

interface CinemaOverlayProps {
  grainIntensity?: 'standard' | 'heavy' | 'subtle';
}

export const CinemaOverlay: React.FC<CinemaOverlayProps> = ({ grainIntensity = 'standard' }) => {
  const grainOpacityClass = {
    subtle: 'opacity-[0.025]',
    standard: 'opacity-[0.042]',
    heavy: 'opacity-[0.065]',
  }[grainIntensity];

  return (
    <>
      {/* 35mm Organic Film Grain Texture */}
      <div className={`film-grain-overlay ${grainOpacityClass} transition-opacity duration-300`} />

      {/* Subtle Optical Edge Lens Vignette */}
      <div className="cinematic-vignette" />
    </>
  );
};
