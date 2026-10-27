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
 * Original handcrafted pixel-art wolf mascot for AXL Space.
 * Features crisp pixel shapes via shapeRendering="crispEdges" and restrained monochrome color palette.
 * Expressions:
 * - idle: friendly, calm wolf face with dark snout and pointed ears.
 * - thinking: attentive wolf face with curious eye pixels and subtle accent spark.
 * - success: happy wolf face with raised eye pixels and tiny cheek pixel highlights.
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

  // Render SVG pixel grid (24x24 pixel art coordinate space)
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${dim} ${className} ${
        animated && expression === 'thinking' ? 'animate-pulse' : ''
      }`}
      aria-label={`AXL Space Wolf Mascot (${expression})`}
      role="img"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full fill-current text-axl-text"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === Background / Outer Outline Shadow === */}
        {/* Ears outline */}
        <rect x="4" y="2" width="4" height="4" fill="#18181B" />
        <rect x="16" y="2" width="4" height="4" fill="#18181B" />
        <rect x="5" y="3" width="2" height="2" fill="#29292E" />
        <rect x="17" y="3" width="2" height="2" fill="#29292E" />

        {/* Ear inner tips */}
        <rect x="5" y="4" width="2" height="2" fill="#71717A" />
        <rect x="17" y="4" width="2" height="2" fill="#71717A" />

        {/* Head Main Shape */}
        <rect x="5" y="6" width="14" height="12" fill="#27272A" />
        <rect x="6" y="5" width="12" height="13" fill="#3F3F46" />
        <rect x="7" y="6" width="10" height="11" fill="#E4E4E7" />

        {/* Crown highlight / Fur texture */}
        <rect x="9" y="5" width="6" height="2" fill="#F4F4F5" />
        <rect x="8" y="7" width="8" height="2" fill="#FFFFFF" />

        {/* Side Fur Fluffs */}
        <rect x="4" y="9" width="2" height="4" fill="#D4D4D8" />
        <rect x="18" y="9" width="2" height="4" fill="#D4D4D8" />
        <rect x="3" y="11" width="2" height="2" fill="#A1A1AA" />
        <rect x="19" y="11" width="2" height="2" fill="#A1A1AA" />

        {/* Muzzle / Lower Face */}
        <rect x="8" y="12" width="8" height="5" fill="#FFFFFF" />
        <rect x="9" y="13" width="6" height="4" fill="#FAFAFA" />

        {/* Nose / Snout */}
        <rect x="10" y="13" width="4" height="2" fill="#18181B" />
        <rect x="11" y="13" width="2" height="1" fill="#27272A" />

        {/* Mouth line */}
        <rect x="11" y="15" width="2" height="1" fill="#27272A" />

        {/* Dynamic Expression: EYES & ACCENTS */}
        {expression === 'idle' && (
          <>
            {/* Eyes - calm neutral square pixels */}
            <rect x="8" y="9" width="2" height="2" fill="#18181B" />
            <rect x="14" y="9" width="2" height="2" fill="#18181B" />
            {/* Catchlight */}
            <rect x="8" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="14" y="9" width="1" height="1" fill="#FFFFFF" />
          </>
        )}

        {expression === 'thinking' && (
          <>
            {/* Eyes - wide attentive look with top brow */}
            <rect x="8" y="8" width="2" height="1" fill="#27272A" />
            <rect x="14" y="8" width="2" height="1" fill="#27272A" />
            <rect x="8" y="9" width="2" height="2" fill="#09090B" />
            <rect x="14" y="9" width="2" height="2" fill="#09090B" />
            <rect x="9" y="9" width="1" height="1" fill="#FFFFFF" />
            <rect x="15" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* Thinking Pixel Sparkle above right ear */}
            <rect x="20" y="2" width="2" height="2" fill="#F4F4F5" />
            <rect x="21" y="1" width="1" height="4" fill="#E4E4E7" />
            <rect x="19" y="2" width="4" height="1" fill="#E4E4E7" />
          </>
        )}

        {expression === 'success' && (
          <>
            {/* Eyes - happy squint / arc pixels */}
            <rect x="7" y="10" width="3" height="1" fill="#18181B" />
            <rect x="8" y="9" width="1" height="1" fill="#18181B" />

            <rect x="14" y="10" width="3" height="1" fill="#18181B" />
            <rect x="15" y="9" width="1" height="1" fill="#18181B" />

            {/* Subtle cheek blush pixels */}
            <rect x="6" y="12" width="2" height="1" fill="#A1A1AA" />
            <rect x="16" y="12" width="2" height="1" fill="#A1A1AA" />

            {/* Smile accent */}
            <rect x="10" y="16" width="4" height="1" fill="#18181B" />
          </>
        )}

        {/* Neck / Collar */}
        <rect x="8" y="17" width="8" height="2" fill="#18181B" />
        <rect x="9" y="18" width="6" height="1" fill="#3F3F46" />
      </svg>
    </div>
  );
};
