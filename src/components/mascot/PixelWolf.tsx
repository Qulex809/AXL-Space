import React, { useState, useEffect, useRef } from 'react';

export type MascotState = 'idle' | 'running' | 'howling' | 'success' | 'error' | 'thinking';

export interface PixelWolfProps {
  state?: MascotState;
  expression?: MascotState; // Alias for backward compatibility
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onHowlComplete?: () => void;
  showHowlBubble?: boolean;
}

/**
 * PixelWolf — Redesigned 32x24 Frame-Based Pixel-Art Wolf Mascot for AXL Space.
 * Features a distinct wolf silhouette: tall pointed ears, expressive eyes,
 * white/gray face mask, dark snout, 4 visible legs, body posture, and tail.
 * Supports running strides, howling animation sequence, success, error, and thinking.
 */
export const PixelWolf: React.FC<PixelWolfProps> = ({
  state,
  expression,
  size = 'md',
  className = '',
  onHowlComplete,
  showHowlBubble = true,
}) => {
  const activeState: MascotState = state || expression || 'idle';

  const [runningFrame, setRunningFrame] = useState(0);
  const [howlStep, setHowlStep] = useState(0);
  const howlTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Size map for clean scaling
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  const dim = sizeMap[size] || sizeMap.md;

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Running stride animation timer
  useEffect(() => {
    if (activeState !== 'running' || prefersReducedMotion) {
      setRunningFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setRunningFrame((prev) => (prev + 1) % 4);
    }, 130); // ~7.7 fps stride rate

    return () => clearInterval(interval);
  }, [activeState, prefersReducedMotion]);

  // Howling animation step sequence
  useEffect(() => {
    if (activeState !== 'howling') {
      setHowlStep(0);
      if (howlTimerRef.current) clearTimeout(howlTimerRef.current);
      return;
    }

    if (prefersReducedMotion) {
      setHowlStep(2); // Hold static howl posture
      const timer = setTimeout(() => {
        if (onHowlComplete) onHowlComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Step sequence: 0 (init) -> 1 (head tilt) -> 2 (open mouth howl) -> 3 (lowering) -> complete
    setHowlStep(1);
    const t1 = setTimeout(() => setHowlStep(2), 300);
    const t2 = setTimeout(() => setHowlStep(3), 1600);
    const t3 = setTimeout(() => {
      setHowlStep(0);
      if (onHowlComplete) onHowlComplete();
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeState, prefersReducedMotion, onHowlComplete]);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${dim} ${className}`}
      aria-label={`AXL Space Wolf Mascot (${activeState})`}
      role="img"
    >
      {/* Speech Bubble during Howling */}
      {activeState === 'howling' && howlStep === 2 && showHowlBubble && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 px-1.5 py-0.5 bg-white text-black font-mono text-[9px] font-bold rounded-sm border border-black shadow-md animate-bounce">
          AWOOO!
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}

      <svg
        viewBox="0 0 32 24"
        className="w-full h-full"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ============================================================ */}
        {/* STATE: RUNNING POSES (4 Stride Frames)                      */}
        {/* ============================================================ */}
        {activeState === 'running' && (
          <g>
            {/* Frame 0: Front legs reach forward, back legs back */}
            {runningFrame === 0 && (
              <g>
                {/* Tail */}
                <rect x="2" y="10" width="4" height="2" fill="#3F3F46" />
                <rect x="1" y="11" width="3" height="2" fill="#71717A" />
                {/* Body */}
                <rect x="6" y="10" width="14" height="6" fill="#27272A" />
                <rect x="7" y="9" width="12" height="7" fill="#3F3F46" />
                <rect x="8" y="11" width="10" height="4" fill="#E4E4E7" />
                {/* Back Legs (Pushed back) */}
                <rect x="4" y="15" width="3" height="2" fill="#18181B" />
                <rect x="3" y="17" width="3" height="2" fill="#27272A" />
                {/* Front Legs (Reaching forward) */}
                <rect x="18" y="15" width="3" height="2" fill="#18181B" />
                <rect x="20" y="17" width="3" height="2" fill="#27272A" />
                {/* Head */}
                <rect x="17" y="5" width="8" height="8" fill="#3F3F46" />
                <rect x="18" y="6" width="7" height="6" fill="#E4E4E7" />
                {/* Ears */}
                <rect x="18" y="1" width="2" height="5" fill="#18181B" />
                <rect x="22" y="1" width="2" height="5" fill="#18181B" />
                {/* Eye & Nose */}
                <rect x="21" y="8" width="2" height="2" fill="#09090B" />
                <rect x="22" y="8" width="1" height="1" fill="#FFFFFF" />
                <rect x="24" y="10" width="3" height="2" fill="#09090B" />
              </g>
            )}

            {/* Frame 1: High Stride Bounce */}
            {runningFrame === 1 && (
              <g transform="translate(0, -1)">
                {/* Tail angled up */}
                <rect x="1" y="8" width="4" height="3" fill="#71717A" />
                {/* Body */}
                <rect x="6" y="9" width="14" height="6" fill="#27272A" />
                <rect x="7" y="8" width="12" height="7" fill="#3F3F46" />
                <rect x="8" y="10" width="10" height="4" fill="#E4E4E7" />
                {/* Back Legs (Bent under) */}
                <rect x="7" y="15" width="2" height="3" fill="#18181B" />
                <rect x="8" y="17" width="2" height="2" fill="#27272A" />
                {/* Front Legs (Bent forward) */}
                <rect x="16" y="15" width="2" height="3" fill="#18181B" />
                <rect x="17" y="17" width="2" height="2" fill="#27272A" />
                {/* Head */}
                <rect x="17" y="4" width="8" height="8" fill="#3F3F46" />
                <rect x="18" y="5" width="7" height="6" fill="#E4E4E7" />
                {/* Ears */}
                <rect x="18" y="0" width="2" height="5" fill="#18181B" />
                <rect x="22" y="0" width="2" height="5" fill="#18181B" />
                {/* Eye & Nose */}
                <rect x="21" y="7" width="2" height="2" fill="#09090B" />
                <rect x="22" y="7" width="1" height="1" fill="#FFFFFF" />
                <rect x="24" y="9" width="3" height="2" fill="#09090B" />
              </g>
            )}

            {/* Frame 2: Opposite Leg Extension */}
            {runningFrame === 2 && (
              <g>
                {/* Tail */}
                <rect x="2" y="10" width="4" height="2" fill="#3F3F46" />
                <rect x="1" y="11" width="3" height="2" fill="#71717A" />
                {/* Body */}
                <rect x="6" y="10" width="14" height="6" fill="#27272A" />
                <rect x="7" y="9" width="12" height="7" fill="#3F3F46" />
                <rect x="8" y="11" width="10" height="4" fill="#E4E4E7" />
                {/* Back Legs (Reaching forward under) */}
                <rect x="9" y="15" width="3" height="3" fill="#18181B" />
                <rect x="10" y="17" width="3" height="2" fill="#27272A" />
                {/* Front Legs (Pushed back) */}
                <rect x="14" y="15" width="3" height="3" fill="#18181B" />
                <rect x="13" y="17" width="3" height="2" fill="#27272A" />
                {/* Head */}
                <rect x="17" y="5" width="8" height="8" fill="#3F3F46" />
                <rect x="18" y="6" width="7" height="6" fill="#E4E4E7" />
                {/* Ears */}
                <rect x="18" y="1" width="2" height="5" fill="#18181B" />
                <rect x="22" y="1" width="2" height="5" fill="#18181B" />
                {/* Eye & Nose */}
                <rect x="21" y="8" width="2" height="2" fill="#09090B" />
                <rect x="22" y="8" width="1" height="1" fill="#FFFFFF" />
                <rect x="24" y="10" width="3" height="2" fill="#09090B" />
              </g>
            )}

            {/* Frame 3: Gathered Stride */}
            {runningFrame === 3 && (
              <g transform="translate(0, -1)">
                {/* Tail */}
                <rect x="2" y="9" width="4" height="3" fill="#71717A" />
                {/* Body */}
                <rect x="6" y="9" width="14" height="6" fill="#27272A" />
                <rect x="7" y="8" width="12" height="7" fill="#3F3F46" />
                <rect x="8" y="10" width="10" height="4" fill="#E4E4E7" />
                {/* Legs gathered */}
                <rect x="11" y="15" width="4" height="3" fill="#18181B" />
                <rect x="12" y="17" width="3" height="2" fill="#27272A" />
                {/* Head */}
                <rect x="17" y="4" width="8" height="8" fill="#3F3F46" />
                <rect x="18" y="5" width="7" height="6" fill="#E4E4E7" />
                {/* Ears */}
                <rect x="18" y="0" width="2" height="5" fill="#18181B" />
                <rect x="22" y="0" width="2" height="5" fill="#18181B" />
                {/* Eye & Nose */}
                <rect x="21" y="7" width="2" height="2" fill="#09090B" />
                <rect x="22" y="7" width="1" height="1" fill="#FFFFFF" />
                <rect x="24" y="9" width="3" height="2" fill="#09090B" />
              </g>
            )}
          </g>
        )}

        {/* ============================================================ */}
        {/* STATE: HOWLING (Multi-step howl sequence)                    */}
        {/* ============================================================ */}
        {activeState === 'howling' && (
          <g>
            {/* Body Base */}
            <rect x="6" y="11" width="12" height="7" fill="#27272A" />
            <rect x="7" y="10" width="10" height="8" fill="#3F3F46" />
            <rect x="8" y="12" width="8" height="5" fill="#E4E4E7" />

            {/* 4 Visible Legs */}
            <rect x="6" y="17" width="2" height="5" fill="#18181B" />
            <rect x="9" y="17" width="2" height="5" fill="#27272A" />
            <rect x="13" y="17" width="2" height="5" fill="#18181B" />
            <rect x="16" y="17" width="2" height="5" fill="#27272A" />

            {/* Raised Fluffy Tail */}
            <rect x="2" y="9" width="4" height="5" fill="#71717A" />
            <rect x="3" y="8" width="3" height="3" fill="#E4E4E7" />

            {/* Step 1: Raising head */}
            {howlStep === 1 && (
              <g>
                <rect x="14" y="5" width="7" height="8" fill="#3F3F46" />
                <rect x="15" y="6" width="6" height="7" fill="#E4E4E7" />
                <rect x="15" y="1" width="2" height="5" fill="#18181B" />
                <rect x="19" y="1" width="2" height="5" fill="#18181B" />
                <rect x="19" y="5" width="4" height="2" fill="#09090B" />
              </g>
            )}

            {/* Step 2: Full Howl Position (Head 60° back, mouth wide open) */}
            {howlStep === 2 && (
              <g>
                {/* Stretched Neck */}
                <rect x="13" y="5" width="8" height="7" fill="#3F3F46" />
                <rect x="14" y="6" width="6" height="6" fill="#E4E4E7" />

                {/* Back-tilted Ears */}
                <rect x="11" y="1" width="2" height="5" fill="#18181B" />
                <rect x="14" y="2" width="2" height="5" fill="#18181B" />

                {/* Open Muzzle Pointed Upward */}
                <rect x="19" y="1" width="5" height="5" fill="#3F3F46" />
                <rect x="20" y="2" width="4" height="3" fill="#FAFAFA" />

                {/* Wide Open Howling Mouth */}
                <rect x="21" y="2" width="3" height="3" fill="#09090B" />
                <rect x="22" y="3" width="1" height="1" fill="#71717A" />

                {/* Closed eyes in howl */}
                <rect x="16" y="4" width="3" height="1" fill="#09090B" />
              </g>
            )}

            {/* Step 3: Lowering Head */}
            {howlStep === 3 && (
              <g>
                <rect x="14" y="6" width="7" height="7" fill="#3F3F46" />
                <rect x="15" y="7" width="6" height="6" fill="#E4E4E7" />
                <rect x="16" y="2" width="2" height="5" fill="#18181B" />
                <rect x="20" y="2" width="2" height="5" fill="#18181B" />
                <rect x="19" y="8" width="3" height="2" fill="#09090B" />
              </g>
            )}
          </g>
        )}

        {/* ============================================================ */}
        {/* STATES: IDLE, THINKING, SUCCESS, ERROR (Standing Poses)      */}
        {/* ============================================================ */}
        {activeState !== 'running' && activeState !== 'howling' && (
          <g>
            {/* Fluffy Curved Wolf Tail */}
            <rect x="2" y="10" width="4" height="5" fill="#3F3F46" />
            <rect x="1" y="11" width="3" height="4" fill="#71717A" />

            {/* Main Wolf Torso & Back */}
            <rect x="6" y="10" width="12" height="7" fill="#27272A" />
            <rect x="7" y="9" width="10" height="8" fill="#3F3F46" />
            <rect x="8" y="11" width="8" height="5" fill="#E4E4E7" />

            {/* 4 Visible Legs */}
            <rect x="6" y="17" width="2" height="5" fill="#18181B" />
            <rect x="9" y="17" width="2" height="5" fill="#27272A" />
            <rect x="13" y="17" width="2" height="5" fill="#18181B" />
            <rect x="16" y="17" width="2" height="5" fill="#27272A" />

            {/* Head Silhouette Base */}
            <rect x="15" y="4" width="9" height="9" fill="#27272A" />
            <rect x="16" y="3" width="8" height="10" fill="#3F3F46" />
            <rect x="17" y="5" width="6" height="8" fill="#E4E4E7" />
            <rect x="18" y="6" width="5" height="7" fill="#FAFAFA" />

            {/* Pointed Wolf Ears */}
            {activeState === 'error' ? (
              // Drooped ear for error
              <>
                <rect x="15" y="4" width="2" height="4" fill="#18181B" />
                <rect x="22" y="1" width="2" height="5" fill="#18181B" />
              </>
            ) : (
              <>
                <rect x="16" y="0" width="2" height="5" fill="#18181B" />
                <rect x="17" y="1" width="1" height="3" fill="#A1A1AA" />
                <rect x="22" y="0" width="2" height="5" fill="#18181B" />
                <rect x="23" y="1" width="1" height="3" fill="#A1A1AA" />
              </>
            )}

            {/* Snout & Nose */}
            <rect x="20" y="8" width="5" height="4" fill="#FFFFFF" />
            <rect x="22" y="8" width="3" height="2" fill="#09090B" />
            <rect x="23" y="8" width="1" height="1" fill="#27272A" />

            {/* EXPRESSION SPECIFIC EYES & DETAILS */}
            {activeState === 'idle' && (
              <>
                <rect x="18" y="6" width="2" height="2" fill="#09090B" />
                <rect x="18" y="6" width="1" height="1" fill="#FFFFFF" />
              </>
            )}

            {activeState === 'thinking' && (
              <>
                <rect x="18" y="5" width="2" height="2" fill="#09090B" />
                <rect x="19" y="5" width="1" height="1" fill="#FFFFFF" />
                {/* Thinking Sparkle */}
                <rect x="26" y="1" width="2" height="2" fill="#FFFFFF" />
                <rect x="27" y="0" width="1" height="4" fill="#A1A1AA" />
                <rect x="25" y="1" width="4" height="1" fill="#A1A1AA" />
              </>
            )}

            {activeState === 'success' && (
              <>
                <rect x="17" y="7" width="3" height="1" fill="#09090B" />
                <rect x="18" y="6" width="1" height="1" fill="#09090B" />
                {/* Tail wag higher */}
                <rect x="1" y="8" width="4" height="4" fill="#E4E4E7" />
              </>
            )}

            {activeState === 'error' && (
              <>
                <rect x="18" y="7" width="2" height="1" fill="#09090B" />
                <rect x="19" y="6" width="1" height="1" fill="#09090B" />
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
