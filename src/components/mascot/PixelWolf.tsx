import React from 'react';

export type MascotState = 'idle' | 'thinking' | 'success' | 'running' | 'howling' | 'error';
export type MascotSize = 'sm' | 'md' | 'lg';

interface PixelWolfProps {
  state?: MascotState;
  size?: MascotSize;
  className?: string;
  animate?: boolean;
}

const SIZE_MAP: Record<MascotSize, number> = {
  sm: 24,
  md: 36,
  lg: 48,
};

export const PixelWolf: React.FC<PixelWolfProps> = ({
  state = 'idle',
  size = 'md',
  className = '',
  animate = true,
}) => {
  const pixelSize = SIZE_MAP[size];

  // Colors:
  // Light Fur: #F5F5F5 (white/light gray)
  // Mid Fur: #A1A1AA (zinc-400)
  // Dark Outline/Details: #18181B (zinc-900)
  // Eye/Nose: #0B0B0C (black)
  // Accent Accent (Ears/Cheeks/Sparkle): #D4D4D8 (zinc-300) / #52525B

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      aria-label={`AXL Wolf Mascot (${state})`}
      role="img"
    >
      <svg
        viewBox="0 0 24 24"
        width={pixelSize}
        height={pixelSize}
        shapeRendering="crispEdges"
        className={`transition-transform duration-200 ${
          animate && state === 'thinking' ? 'animate-pulse' : ''
        } ${animate && state === 'howling' ? '-translate-y-0.5' : ''}`}
      >
        {/* Background / Base fill for transparency safety if needed */}

        {/* EARS */}
        {/* Left Ear */}
        <rect x="5" y="3" width="2" height="3" fill="#A1A1AA" />
        <rect x="6" y="4" width="1" height="2" fill="#F5F5F5" />
        {/* Right Ear */}
        <rect x="13" y="3" width="2" height="3" fill="#A1A1AA" />
        <rect x="13" y="4" width="1" height="2" fill="#F5F5F5" />

        {/* HEAD BASE */}
        <rect x="4" y="6" width="12" height="7" fill="#F5F5F5" />
        {/* Ear Shadow / Forehead outline */}
        <rect x="6" y="6" width="8" height="1" fill="#D4D4D8" />

        {/* CHEEKS / SIDE FUR */}
        <rect x="3" y="8" width="1" height="4" fill="#A1A1AA" />
        <rect x="16" y="8" width="1" height="4" fill="#A1A1AA" />

        {/* EYES according to state */}
        {state === 'idle' && (
          <>
            {/* Friendly open eyes */}
            <rect x="6" y="8" width="2" height="2" fill="#18181B" />
            <rect x="6" y="8" width="1" height="1" fill="#F5F5F5" />
            <rect x="12" y="8" width="2" height="2" fill="#18181B" />
            <rect x="12" y="8" width="1" height="1" fill="#F5F5F5" />
          </>
        )}

        {state === 'thinking' && (
          <>
            {/* Looking up / curious eyes */}
            <rect x="6" y="7" width="2" height="2" fill="#18181B" />
            <rect x="7" y="7" width="1" height="1" fill="#F5F5F5" />
            <rect x="12" y="7" width="2" height="2" fill="#18181B" />
            <rect x="13" y="7" width="1" height="1" fill="#F5F5F5" />
            {/* Small thought pixel icon on upper right */}
            <rect x="17" y="3" width="2" height="2" fill="#A1A1AA" />
            <rect x="19" y="1" width="2" height="2" fill="#F5F5F5" />
          </>
        )}

        {state === 'success' && (
          <>
            {/* Happy squint eyes (^ ^) */}
            <rect x="6" y="8" width="2" height="1" fill="#18181B" />
            <rect x="6" y="9" width="1" height="1" fill="#18181B" />
            <rect x="12" y="8" width="2" height="1" fill="#18181B" />
            <rect x="13" y="9" width="1" height="1" fill="#18181B" />
            {/* Sparkle icon */}
            <rect x="18" y="2" width="1" height="3" fill="#F5F5F5" />
            <rect x="17" y="3" width="3" height="1" fill="#F5F5F5" />
          </>
        )}

        {state === 'running' && (
          <>
            {/* Focused motion eyes */}
            <rect x="7" y="8" width="2" height="2" fill="#18181B" />
            <rect x="8" y="8" width="1" height="1" fill="#F5F5F5" />
            <rect x="13" y="8" width="2" height="2" fill="#18181B" />
            <rect x="14" y="8" width="1" height="1" fill="#F5F5F5" />
          </>
        )}

        {state === 'howling' && (
          <>
            {/* Howling / Eyes closed enjoying song */}
            <rect x="6" y="8" width="2" height="1" fill="#18181B" />
            <rect x="12" y="8" width="2" height="1" fill="#18181B" />
          </>
        )}

        {state === 'error' && (
          <>
            {/* Wide alert eyes */}
            <rect x="6" y="8" width="2" height="2" fill="#18181B" />
            <rect x="12" y="8" width="2" height="2" fill="#18181B" />
            <rect x="17" y="4" width="2" height="2" fill="#71717A" />
          </>
        )}

        {/* MUZZLE & NOSE */}
        <rect x="8" y="10" width="4" height="4" fill="#E4E4E7" />
        {/* Nose */}
        <rect x="9" y="10" width="2" height="2" fill="#18181B" />

        {/* BODY & TAIL */}
        {/* Chest fur */}
        <rect x="6" y="13" width="8" height="6" fill="#F5F5F5" />
        <rect x="8" y="13" width="4" height="4" fill="#FFFFFF" />

        {/* Legs / Paws */}
        {state === 'running' ? (
          <>
            <rect x="5" y="19" width="2" height="2" fill="#A1A1AA" />
            <rect x="13" y="19" width="2" height="2" fill="#A1A1AA" />
          </>
        ) : (
          <>
            <rect x="7" y="19" width="2" height="3" fill="#A1A1AA" />
            <rect x="11" y="19" width="2" height="3" fill="#A1A1AA" />
          </>
        )}

        {/* Tail (Fluffy pixel tail) */}
        <rect x="14" y="14" width="3" height="3" fill="#A1A1AA" />
        <rect x="16" y="12" width="2" height="3" fill="#F5F5F5" />
        <rect x="17" y="11" width="2" height="2" fill="#E4E4E7" />
      </svg>
    </div>
  );
};
