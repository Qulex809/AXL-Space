import React from 'react';

export type MascotExpression = 'idle' | 'thinking' | 'success';

interface PixelWolfProps {
  expression?: MascotExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

/**
 * PixelWolf Component
 * Redesigned handcrafted 24x24 pixel-art wolf mascot for AXL Space.
 * Distinctive wolf silhouette with tall pointed ears, detailed face mask, dark snout, and expression variants.
 * Uses `shapeRendering="crispEdges"` for razor-sharp pixel presentation.
 */
export const PixelWolf: React.FC<PixelWolfProps> = ({
  expression = 'idle',
  size = 'md',
  className = '',
  animated = true,
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${dim} ${className} ${
        animated && expression === 'thinking' ? 'animate-pulse' : ''
      }`}
      aria-label={`AXL Kurt Maskotu (${expression})`}
      role="img"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === TALL POINTED WOLF EARS === */}
        {/* Left Ear Outer Shadow */}
        <rect x="3" y="1" width="3" height="6" fill="#18181B" />
        <rect x="4" y="2" width="3" height="5" fill="#27272A" />
        {/* Left Ear Inner Fur Pinkish Gray */}
        <rect x="4" y="2" width="1" height="4" fill="#A1A1AA" />
        <rect x="5" y="3" width="1" height="2" fill="#E4E4E7" />

        {/* Right Ear Outer Shadow */}
        <rect x="18" y="1" width="3" height="6" fill="#18181B" />
        <rect x="17" y="2" width="3" height="5" fill="#27272A" />
        {/* Right Ear Inner Fur */}
        <rect x="19" y="2" width="1" height="4" fill="#A1A1AA" />
        <rect x="18" y="3" width="1" height="2" fill="#E4E4E7" />

        {/* === HEAD & FACE MASK BASE === */}
        {/* Outer Dark Charcoal Fur */}
        <rect x="5" y="5" width="14" height="13" fill="#18181B" />
        <rect x="4" y="8" width="16" height="8" fill="#27272A" />
        <rect x="6" y="6" width="12" height="13" fill="#3F3F46" />

        {/* Forehead Fur Tuft / Crown */}
        <rect x="9" y="5" width="6" height="3" fill="#71717A" />
        <rect x="10" y="5" width="4" height="2" fill="#A1A1AA" />

        {/* Cheek Fluffs (Wolf Side Tufts) */}
        <rect x="2" y="11" width="2" height="4" fill="#3F3F46" />
        <rect x="20" y="11" width="2" height="4" fill="#3F3F46" />
        <rect x="3" y="12" width="1" height="2" fill="#A1A1AA" />
        <rect x="20" y="12" width="1" height="2" fill="#A1A1AA" />

        {/* Inner White/Silver Face Mask */}
        <rect x="6" y="8" width="12" height="10" fill="#E4E4E7" />
        <rect x="7" y="9" width="10" height="9" fill="#FAFAFA" />

        {/* Muzzle / Compact Wolf Snout */}
        <rect x="8" y="12" width="8" height="6" fill="#FFFFFF" />
        <rect x="9" y="13" width="6" height="4" fill="#F4F4F5" />

        {/* Black Nose Pixel */}
        <rect x="10" y="13" width="4" height="2" fill="#09090B" />
        <rect x="11" y="13" width="2" height="1" fill="#27272A" />

        {/* Mouth & Chin Line */}
        <rect x="11" y="15" width="2" height="2" fill="#18181B" />
        <rect x="9" y="18" width="6" height="1" fill="#27272A" />

        {/* === EXPRESSION VARIATIONS === */}

        {/* IDLE: Alert, calm wolf gaze with bright pupil catchlights */}
        {expression === 'idle' && (
          <>
            {/* Eye Sockets */}
            <rect x="7" y="9" width="3" height="3" fill="#18181B" />
            <rect x="14" y="9" width="3" height="3" fill="#18181B" />
            {/* Pupils */}
            <rect x="8" y="9" width="2" height="2" fill="#09090B" />
            <rect x="14" y="9" width="2" height="2" fill="#09090B" />
            {/* Catchlight */}
            <rect x="8" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="14" y="9" width="1" height="1" fill="#FFFFFF" />
          </>
        )}

        {/* THINKING: Attentive gaze with angled brow and pixel sparkle */}
        {expression === 'thinking' && (
          <>
            {/* Brow Line */}
            <rect x="7" y="8" width="3" height="1" fill="#18181B" />
            <rect x="14" y="8" width="3" height="1" fill="#18181B" />
            {/* Eyes looking up/attentive */}
            <rect x="7" y="9" width="3" height="2" fill="#09090B" />
            <rect x="14" y="9" width="3" height="2" fill="#09090B" />
            <rect x="8" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="15" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* Sparkle pixel above right ear */}
            <rect x="21" y="1" width="2" height="2" fill="#FFFFFF" />
            <rect x="22" y="0" width="1" height="4" fill="#A1A1AA" />
            <rect x="20" y="1" width="4" height="1" fill="#A1A1AA" />
          </>
        )}

        {/* SUCCESS: Happy squinting arc eyes and subtle smile */}
        {expression === 'success' && (
          <>
            {/* Squint Eyes */}
            <rect x="7" y="10" width="3" height="1" fill="#09090B" />
            <rect x="8" y="9" width="1" height="1" fill="#09090B" />

            <rect x="14" y="10" width="3" height="1" fill="#09090B" />
            <rect x="15" y="9" width="1" height="1" fill="#09090B" />

            {/* Cheek blush pixels */}
            <rect x="6" y="11" width="2" height="1" fill="#A1A1AA" />
            <rect x="16" y="11" width="2" height="1" fill="#A1A1AA" />

            {/* Happy Smile Curve */}
            <rect x="10" y="16" width="4" height="1" fill="#09090B" />
          </>
        )}

        {/* Neck / Collar */}
        <rect x="8" y="19" width="8" height="2" fill="#18181B" />
        <rect x="9" y="20" width="6" height="1" fill="#3F3F46" />
      </svg>
    </div>
  );
};
