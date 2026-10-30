import React from 'react';

export type WolfState = 'idle' | 'thinking' | 'success';
export type WolfSize = 'sm' | 'md' | 'lg' | 'xl';

interface PixelWolfProps {
  state?: WolfState;
  size?: WolfSize;
  className?: string;
  animate?: boolean;
}

const SIZE_MAP: Record<WolfSize, { width: number; height: number; scaleClass: string }> = {
  sm: { width: 24, height: 24, scaleClass: 'w-6 h-6' },
  md: { width: 36, height: 36, scaleClass: 'w-9 h-9' },
  lg: { width: 48, height: 48, scaleClass: 'w-12 h-12' },
  xl: { width: 72, height: 72, scaleClass: 'w-18 h-18' },
};

/**
 * PixelWolf: Handcrafted original SVG pixel-art wolf mascot for AXL Space.
 * Features pointed ears, compact wolf muzzle, pixelated tail & body,
 * and distinct facial/posture states: idle, thinking, and success.
 * Crisp edges preserve the authentic pixel-art aesthetic.
 */
export const PixelWolf: React.FC<PixelWolfProps> = ({
  state = 'idle',
  size = 'md',
  className = '',
  animate = true,
}) => {
  const { width, height, scaleClass } = SIZE_MAP[size];

  // Palette:
  // Fur Light: #E4E4E7 (zinc-200)
  // Fur Mid: #A1A1AA (zinc-400)
  // Fur Shadow / Dark: #52525B (zinc-600)
  // Inner Ear / Accent: #D4D4D8
  // Eye / Nose: #18181B (zinc-900)
  // Eye Sparkle / Highlight: #FFFFFF

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      shapeRendering="crispEdges"
      className={`${scaleClass} inline-block select-none ${
        animate ? 'transition-transform duration-200' : ''
      } ${className}`}
      aria-label={`AXL Wolf mascot (${state})`}
      role="img"
    >
      {/* Background / Base Body */}
      {/* Tail - slightly raised */}
      <rect x="2" y="14" width="2" height="3" fill="#A1A1AA" />
      <rect x="1" y="12" width="2" height="3" fill="#D4D4D8" />

      {/* Main Body */}
      <rect x="4" y="13" width="9" height="7" fill="#A1A1AA" />
      <rect x="5" y="14" width="7" height="5" fill="#E4E4E7" />
      {/* Legs */}
      <rect x="4" y="19" width="2" height="3" fill="#71717A" />
      <rect x="7" y="19" width="2" height="3" fill="#A1A1AA" />
      <rect x="11" y="19" width="2" height="3" fill="#71717A" />

      {/* Pointed Ears */}
      {/* Left Ear */}
      <rect x="9" y="3" width="2" height="3" fill="#71717A" />
      <rect x="9" y="4" width="1" height="2" fill="#D4D4D8" />
      <rect x="10" y="5" width="2" height="2" fill="#E4E4E7" />

      {/* Right Ear */}
      {state === 'thinking' ? (
        // Right ear cocked/curious
        <>
          <rect x="15" y="4" width="2" height="2" fill="#71717A" />
          <rect x="16" y="5" width="1" height="2" fill="#D4D4D8" />
        </>
      ) : (
        <>
          <rect x="15" y="3" width="2" height="3" fill="#71717A" />
          <rect x="15" y="4" width="1" height="2" fill="#D4D4D8" />
          <rect x="14" y="5" width="2" height="2" fill="#E4E4E7" />
        </>
      )}

      {/* Head Base */}
      <rect x="8" y="6" width="9" height="8" fill="#E4E4E7" />
      <rect x="7" y="8" width="2" height="4" fill="#D4D4D8" />
      <rect x="8" y="13" width="8" height="2" fill="#D4D4D8" />

      {/* Eyes & Expressions */}
      {state === 'idle' && (
        <>
          {/* Calm, alert eyes */}
          <rect x="10" y="8" width="2" height="2" fill="#18181B" />
          <rect x="11" y="8" width="1" height="1" fill="#FFFFFF" />
          <rect x="14" y="8" width="2" height="2" fill="#18181B" />
          <rect x="15" y="8" width="1" height="1" fill="#FFFFFF" />
          {/* Wolf Muzzle */}
          <rect x="12" y="10" width="5" height="3" fill="#F4F4F5" />
          <rect x="15" y="10" width="2" height="2" fill="#18181B" /> {/* Nose tip */}
          <rect x="13" y="12" width="2" height="1" fill="#71717A" /> {/* Mouth line */}
        </>
      )}

      {state === 'thinking' && (
        <>
          {/* Curious gaze looking upward / sideways */}
          <rect x="10" y="7" width="2" height="2" fill="#18181B" />
          <rect x="10" y="7" width="1" height="1" fill="#FFFFFF" />
          <rect x="14" y="7" width="2" height="2" fill="#18181B" />
          <rect x="14" y="7" width="1" height="1" fill="#FFFFFF" />
          {/* Wolf Muzzle */}
          <rect x="12" y="10" width="5" height="3" fill="#F4F4F5" />
          <rect x="15" y="10" width="2" height="2" fill="#18181B" />
          <rect x="14" y="12" width="1" height="1" fill="#71717A" />
          {/* Thought dots pixel */}
          <rect x="19" y="3" width="1" height="1" fill="#A1A1AA" />
          <rect x="21" y="1" width="2" height="2" fill="#E4E4E7" />
        </>
      )}

      {state === 'success' && (
        <>
          {/* Happy squint eyes */}
          <rect x="10" y="9" width="2" height="1" fill="#18181B" />
          <rect x="14" y="9" width="2" height="1" fill="#18181B" />
          {/* Subtle wolf smile muzzle */}
          <rect x="12" y="10" width="5" height="3" fill="#FFFFFF" />
          <rect x="15" y="10" width="2" height="2" fill="#18181B" />
          <rect x="13" y="12" width="3" height="1" fill="#27272A" />
          {/* Sparkle pixel */}
          <rect x="19" y="6" width="1" height="3" fill="#FFFFFF" />
          <rect x="18" y="7" width="3" height="1" fill="#FFFFFF" />
        </>
      )}
    </svg>
  );
};
