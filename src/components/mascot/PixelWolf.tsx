import React, { useEffect, useState } from 'react';

export type WolfState = 'idle' | 'running' | 'howling' | 'thinking' | 'success' | 'error';
export type WolfSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface PixelWolfProps {
  state?: WolfState;
  size?: WolfSize;
  className?: string;
  showSpeechBubble?: boolean;
  speechText?: string;
}

const SIZE_MAP: Record<WolfSize, { width: number; height: number; scaleClass: string }> = {
  sm: { width: 28, height: 28, scaleClass: 'w-7 h-7' },
  md: { width: 36, height: 36, scaleClass: 'w-9 h-9' },
  lg: { width: 52, height: 52, scaleClass: 'w-13 h-13' },
  xl: { width: 72, height: 72, scaleClass: 'w-18 h-18' },
  '2xl': { width: 96, height: 96, scaleClass: 'w-24 h-24' },
};

/**
 * PixelWolf — Handcrafted original frame-based SVG pixel-art wolf mascot.
 * Designed with a 28x28 grid, pointed ears, recognizable snout/muzzle,
 * expressive eyes, 4 legs, bushy tail, and carefully tuned monochrome palette:
 * - Base Fur Dark: #27272A (zinc-800)
 * - Fur Mid: #71717A (zinc-500)
 * - Fur Light: #E4E4E7 (zinc-200)
 * - Fur Highlight: #FFFFFF (white)
 * - Nose & Inner Eye: #09090B (zinc-950)
 * - Inner Ear / Belly Accent: #A1A1AA (zinc-400)
 */
export const PixelWolf: React.FC<PixelWolfProps> = ({
  state = 'idle',
  size = 'md',
  className = '',
  showSpeechBubble = false,
  speechText = 'Awooo~',
}) => {
  const { width, height, scaleClass } = SIZE_MAP[size];

  // Running frame loop: 4 distinct poses for a natural quadruped lope
  const [runFrame, setRunFrame] = useState(0);

  // Howling frame sequence: 0: pre-howl breath, 1: tilt up, 2: open mouth howl peak, 3: sustained howl, 4: closing
  const [howlFrame, setHowlFrame] = useState(0);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Running frame loop timer (140ms per frame for a brisk energetic stride)
  useEffect(() => {
    if (state !== 'running' || prefersReducedMotion) {
      setRunFrame(0);
      return;
    }
    const timer = setInterval(() => {
      setRunFrame((prev) => (prev + 1) % 4);
    }, 140);
    return () => clearInterval(timer);
  }, [state, prefersReducedMotion]);

  // Howling frame sequence timer
  useEffect(() => {
    if (state !== 'howling' || prefersReducedMotion) {
      setHowlFrame(2); // In reduced motion, display the peak howl frame statically
      return;
    }
    setHowlFrame(0);
    const timeline = [
      setTimeout(() => setHowlFrame(1), 200),  // head tilting
      setTimeout(() => setHowlFrame(2), 500),  // peak howl starts
      setTimeout(() => setHowlFrame(3), 1400), // howl sustain
      setTimeout(() => setHowlFrame(4), 2100), // relaxing back
    ];
    return () => timeline.forEach(clearTimeout);
  }, [state, prefersReducedMotion]);

  const renderWolfGraphic = () => {
    switch (state) {
      case 'running':
        return renderRunningFrame(runFrame);
      case 'howling':
        return renderHowlingFrame(howlFrame);
      case 'thinking':
        return renderThinkingPose();
      case 'success':
        return renderSuccessPose();
      case 'error':
        return renderErrorPose();
      case 'idle':
      default:
        return renderIdlePose();
    }
  };

  /**
   * IDLE POSE:
   * Alert, proud, compact wolf with pointed ears, bushy tail resting up,
   * 4 legs visible with depth shading.
   */
  const renderIdlePose = () => (
    <g id="wolf-idle">
      {/* Bushy Tail */}
      <rect x="2" y="14" width="2" height="4" fill="#52525B" />
      <rect x="3" y="12" width="2" height="4" fill="#71717A" />
      <rect x="4" y="11" width="2" height="3" fill="#A1A1AA" />
      <rect x="3" y="11" width="1" height="1" fill="#FFFFFF" />

      {/* Back Legs (far side - darker) */}
      <rect x="7" y="19" width="2" height="4" fill="#3F3F46" />
      <rect x="6" y="22" width="2" height="1" fill="#27272A" />
      <rect x="17" y="19" width="2" height="4" fill="#3F3F46" />
      <rect x="18" y="22" width="2" height="1" fill="#27272A" />

      {/* Main Body */}
      <rect x="6" y="13" width="12" height="6" fill="#71717A" />
      <rect x="7" y="14" width="10" height="4" fill="#A1A1AA" />
      {/* Wolf Chest / Ruff */}
      <rect x="15" y="12" width="4" height="6" fill="#D4D4D8" />
      <rect x="16" y="13" width="3" height="4" fill="#FFFFFF" />

      {/* Front Legs (near side) */}
      <rect x="8" y="18" width="2" height="5" fill="#71717A" />
      <rect x="7" y="22" width="3" height="1" fill="#52525B" />
      <rect x="15" y="18" width="2" height="5" fill="#A1A1AA" />
      <rect x="15" y="22" width="3" height="1" fill="#52525B" />

      {/* Wolf Neck */}
      <rect x="15" y="8" width="5" height="5" fill="#71717A" />
      <rect x="17" y="9" width="3" height="4" fill="#D4D4D8" />

      {/* Ears: Pointed, inner ear highlight */}
      {/* Left Ear (Back) */}
      <rect x="16" y="2" width="2" height="4" fill="#52525B" />
      <rect x="17" y="3" width="1" height="2" fill="#A1A1AA" />
      {/* Right Ear (Front) */}
      <rect x="20" y="2" width="2" height="5" fill="#71717A" />
      <rect x="21" y="3" width="1" height="3" fill="#E4E4E7" />
      <rect x="20" y="3" width="1" height="2" fill="#27272A" />

      {/* Head Silhouette */}
      <rect x="17" y="5" width="6" height="6" fill="#A1A1AA" />
      <rect x="18" y="6" width="5" height="4" fill="#E4E4E7" />

      {/* Eyes: Calm, intelligent gaze */}
      <rect x="19" y="6" width="2" height="2" fill="#09090B" />
      <rect x="20" y="6" width="1" height="1" fill="#FFFFFF" />

      {/* Muzzle & Snout */}
      <rect x="22" y="8" width="4" height="3" fill="#E4E4E7" />
      <rect x="25" y="8" width="2" height="2" fill="#09090B" /> {/* Nose */}
      <rect x="23" y="10" width="3" height="1" fill="#71717A" /> {/* Chin/jaw */}
    </g>
  );

  /**
   * RUNNING FRAMES:
   * Frame 0: Front reach (front legs extended forward, hind legs trailing)
   * Frame 1: Gathering stride (bounce up, legs tucking inward)
   * Frame 2: Hind push-off (hind legs extended back with power)
   * Frame 3: Extension flight (all legs airborne, elongated stride)
   */
  const renderRunningFrame = (frame: number) => {
    switch (frame) {
      case 0: // Front Reach
        return (
          <g id="wolf-run-0">
            {/* Horizontal Trail Tail */}
            <rect x="1" y="13" width="4" height="2" fill="#52525B" />
            <rect x="3" y="12" width="3" height="2" fill="#A1A1AA" />
            {/* Body tilted forward */}
            <rect x="6" y="12" width="12" height="6" fill="#71717A" />
            <rect x="7" y="13" width="10" height="4" fill="#A1A1AA" />
            <rect x="16" y="11" width="4" height="5" fill="#FFFFFF" />
            {/* Hind Legs - trailing back */}
            <rect x="4" y="17" width="3" height="2" fill="#3F3F46" />
            <rect x="3" y="19" width="3" height="2" fill="#27272A" />
            <rect x="7" y="17" width="2" height="3" fill="#71717A" />
            {/* Front Legs - reaching forward */}
            <rect x="17" y="16" width="3" height="3" fill="#71717A" />
            <rect x="19" y="18" width="3" height="3" fill="#A1A1AA" />
            <rect x="22" y="20" width="2" height="2" fill="#52525B" />
            {/* Head low & focused */}
            <rect x="16" y="7" width="5" height="5" fill="#71717A" />
            <rect x="17" y="1" width="2" height="4" fill="#52525B" /> {/* Ears swept back */}
            <rect x="19" y="2" width="2" height="4" fill="#71717A" />
            <rect x="18" y="5" width="6" height="5" fill="#E4E4E7" />
            <rect x="20" y="6" width="2" height="2" fill="#09090B" />
            <rect x="21" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="23" y="7" width="4" height="3" fill="#E4E4E7" />
            <rect x="26" y="7" width="2" height="2" fill="#09090B" />
          </g>
        );

      case 1: // Gathering (bounce up)
        return (
          <g id="wolf-run-1" transform="translate(0, -1)">
            {/* Tail raised */}
            <rect x="2" y="10" width="3" height="3" fill="#52525B" />
            <rect x="3" y="9" width="3" height="2" fill="#A1A1AA" />
            {/* Body gathered */}
            <rect x="7" y="11" width="11" height="6" fill="#71717A" />
            <rect x="8" y="12" width="9" height="4" fill="#A1A1AA" />
            <rect x="16" y="11" width="4" height="4" fill="#FFFFFF" />
            {/* Legs tucked under */}
            <rect x="8" y="17" width="3" height="3" fill="#52525B" />
            <rect x="9" y="19" width="2" height="2" fill="#27272A" />
            <rect x="14" y="16" width="2" height="3" fill="#71717A" />
            <rect x="13" y="18" width="2" height="2" fill="#A1A1AA" />
            {/* Head alert */}
            <rect x="16" y="6" width="5" height="5" fill="#71717A" />
            <rect x="18" y="2" width="2" height="4" fill="#71717A" />
            <rect x="19" y="5" width="6" height="5" fill="#E4E4E7" />
            <rect x="21" y="6" width="2" height="2" fill="#09090B" />
            <rect x="22" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="24" y="7" width="3" height="3" fill="#E4E4E7" />
            <rect x="26" y="7" width="2" height="2" fill="#09090B" />
          </g>
        );

      case 2: // Hind Push-off
        return (
          <g id="wolf-run-2">
            {/* Tail trailing straight */}
            <rect x="1" y="14" width="4" height="2" fill="#52525B" />
            <rect x="2" y="13" width="3" height="2" fill="#A1A1AA" />
            {/* Body forward */}
            <rect x="6" y="12" width="12" height="6" fill="#71717A" />
            <rect x="7" y="13" width="10" height="4" fill="#A1A1AA" />
            <rect x="16" y="11" width="4" height="5" fill="#FFFFFF" />
            {/* Hind push powerful */}
            <rect x="5" y="17" width="3" height="2" fill="#71717A" />
            <rect x="6" y="19" width="2" height="3" fill="#3F3F46" />
            <rect x="7" y="21" width="2" height="2" fill="#27272A" />
            {/* Front legs coming down */}
            <rect x="16" y="17" width="2" height="4" fill="#71717A" />
            <rect x="17" y="20" width="2" height="2" fill="#A1A1AA" />
            {/* Head */}
            <rect x="16" y="7" width="5" height="5" fill="#71717A" />
            <rect x="18" y="3" width="2" height="4" fill="#71717A" />
            <rect x="19" y="6" width="5" height="5" fill="#E4E4E7" />
            <rect x="21" y="7" width="2" height="2" fill="#09090B" />
            <rect x="22" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="23" y="8" width="4" height="3" fill="#E4E4E7" />
            <rect x="26" y="8" width="2" height="2" fill="#09090B" />
          </g>
        );

      case 3: // Full airborne flight stride
      default:
        return (
          <g id="wolf-run-3" transform="translate(0, -1)">
            {/* Tail streaming back */}
            <rect x="0" y="12" width="5" height="2" fill="#52525B" />
            <rect x="2" y="11" width="3" height="2" fill="#A1A1AA" />
            <rect x="0" y="11" width="2" height="1" fill="#FFFFFF" />
            {/* Extended body */}
            <rect x="6" y="11" width="13" height="6" fill="#71717A" />
            <rect x="7" y="12" width="11" height="4" fill="#A1A1AA" />
            <rect x="17" y="10" width="4" height="5" fill="#FFFFFF" />
            {/* Legs fully extended front & back */}
            <rect x="3" y="15" width="4" height="2" fill="#3F3F46" />
            <rect x="1" y="17" width="3" height="2" fill="#27272A" />
            <rect x="18" y="16" width="4" height="2" fill="#71717A" />
            <rect x="21" y="18" width="4" height="2" fill="#A1A1AA" />
            {/* Streamlined head */}
            <rect x="17" y="6" width="5" height="5" fill="#71717A" />
            <rect x="18" y="2" width="2" height="4" fill="#52525B" />
            <rect x="20" y="3" width="2" height="3" fill="#71717A" />
            <rect x="19" y="5" width="6" height="5" fill="#E4E4E7" />
            <rect x="21" y="6" width="2" height="2" fill="#09090B" />
            <rect x="22" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="24" y="7" width="4" height="3" fill="#E4E4E7" />
            <rect x="27" y="7" width="1" height="2" fill="#09090B" />
          </g>
        );
    }
  };

  /**
   * HOWLING FRAMES:
   * Frame 0: Deep breath, chest expanding
   * Frame 1: Head tilting back, neck lengthening
   * Frame 2 & 3: Peak howl: muzzle pointing up toward the sky, mouth open (awooo), chest proud
   * Frame 4: Head lowering back to neutral
   */
  const renderHowlingFrame = (frame: number) => {
    // Frames 2 & 3: Peak Howl
    if (frame === 2 || frame === 3) {
      return (
        <g id="wolf-howl-peak">
          {/* Relaxed low tail */}
          <rect x="2" y="16" width="2" height="4" fill="#52525B" />
          <rect x="3" y="18" width="2" height="3" fill="#71717A" />

          {/* Stretched Body & Legs planted firmly */}
          <rect x="6" y="14" width="11" height="6" fill="#71717A" />
          <rect x="7" y="14" width="9" height="5" fill="#A1A1AA" />
          {/* Back legs */}
          <rect x="6" y="20" width="2" height="3" fill="#3F3F46" />
          <rect x="5" y="22" width="2" height="1" fill="#27272A" />
          {/* Front legs straight supporting */}
          <rect x="15" y="17" width="2" height="6" fill="#A1A1AA" />
          <rect x="15" y="22" width="3" height="1" fill="#52525B" />

          {/* Elongated chest arched upward */}
          <rect x="14" y="11" width="5" height="7" fill="#D4D4D8" />
          <rect x="15" y="12" width="3" height="6" fill="#FFFFFF" />

          {/* Upward angled Neck */}
          <rect x="16" y="7" width="4" height="6" fill="#71717A" />
          <rect x="17" y="8" width="3" height="5" fill="#D4D4D8" />

          {/* Head tilted upward at 60 degrees */}
          <rect x="17" y="4" width="5" height="5" fill="#A1A1AA" />
          <rect x="18" y="4" width="4" height="4" fill="#E4E4E7" />

          {/* Ears swept down along neck */}
          <rect x="14" y="5" width="3" height="2" fill="#52525B" />
          <rect x="13" y="6" width="3" height="2" fill="#71717A" />

          {/* Closed singing eye */}
          <rect x="18" y="5" width="2" height="1" fill="#09090B" />

          {/* Muzzle pointing straight UP toward sky */}
          <rect x="20" y="1" width="3" height="4" fill="#E4E4E7" />
          <rect x="20" y="0" width="2" height="2" fill="#09090B" /> {/* Nose point */}

          {/* Open Howling Mouth ('O' shaped pixel opening) */}
          <rect x="22" y="3" width="2" height="3" fill="#09090B" />
          <rect x="23" y="4" width="1" height="1" fill="#71717A" />
          <rect x="23" y="6" width="2" height="1" fill="#A1A1AA" /> {/* Lower jaw */}

          {/* Sound waves / visual howl notes */}
          {frame === 3 && (
            <g id="howl-vibes" opacity="0.8">
              <rect x="24" y="0" width="1" height="1" fill="#FFFFFF" />
              <rect x="26" y="1" width="1" height="1" fill="#A1A1AA" />
              <rect x="25" y="-2" width="1" height="2" fill="#E4E4E7" />
            </g>
          )}
        </g>
      );
    }

    if (frame === 1) {
      // Tilting up
      return (
        <g id="wolf-howl-tilt">
          <rect x="2" y="15" width="2" height="4" fill="#52525B" />
          <rect x="6" y="14" width="11" height="6" fill="#71717A" />
          <rect x="6" y="20" width="2" height="3" fill="#3F3F46" />
          <rect x="15" y="18" width="2" height="5" fill="#A1A1AA" />
          <rect x="15" y="12" width="4" height="6" fill="#FFFFFF" />
          {/* Head beginning upward angle */}
          <rect x="16" y="6" width="5" height="5" fill="#A1A1AA" />
          <rect x="15" y="3" width="2" height="3" fill="#52525B" />
          <rect x="18" y="5" width="2" height="1" fill="#09090B" />
          <rect x="21" y="4" width="3" height="3" fill="#E4E4E7" />
          <rect x="23" y="3" width="2" height="2" fill="#09090B" />
          <rect x="23" y="6" width="2" height="1" fill="#71717A" />
        </g>
      );
    }

    // Default return to idle/pre-howl
    return renderIdlePose();
  };

  /**
   * THINKING POSE:
   * Head tilted quizzically, one ear cocked forward, eyes looking up,
   * subtle thought pixel spark.
   */
  const renderThinkingPose = () => (
    <g id="wolf-thinking">
      <rect x="2" y="14" width="2" height="4" fill="#52525B" />
      <rect x="3" y="12" width="2" height="4" fill="#71717A" />
      <rect x="4" y="11" width="2" height="3" fill="#A1A1AA" />

      <rect x="7" y="19" width="2" height="4" fill="#3F3F46" />
      <rect x="17" y="19" width="2" height="4" fill="#3F3F46" />

      <rect x="6" y="13" width="12" height="6" fill="#71717A" />
      <rect x="7" y="14" width="10" height="4" fill="#A1A1AA" />
      <rect x="15" y="12" width="4" height="6" fill="#D4D4D8" />
      <rect x="16" y="13" width="3" height="4" fill="#FFFFFF" />

      <rect x="8" y="18" width="2" height="5" fill="#71717A" />
      <rect x="15" y="18" width="2" height="5" fill="#A1A1AA" />

      {/* Head tilted slightly */}
      <rect x="16" y="8" width="4" height="5" fill="#71717A" />
      {/* Cocked ears: Left ear folded, Right ear perked high */}
      <rect x="15" y="4" width="2" height="3" fill="#52525B" />
      <rect x="20" y="1" width="2" height="5" fill="#71717A" />
      <rect x="21" y="2" width="1" height="3" fill="#E4E4E7" />

      <rect x="16" y="5" width="7" height="6" fill="#E4E4E7" />
      {/* Curious eyes looking up */}
      <rect x="18" y="6" width="2" height="2" fill="#09090B" />
      <rect x="18" y="6" width="1" height="1" fill="#FFFFFF" />
      <rect x="21" y="6" width="2" height="2" fill="#09090B" />
      <rect x="21" y="6" width="1" height="1" fill="#FFFFFF" />

      {/* Snout */}
      <rect x="23" y="8" width="3" height="3" fill="#E4E4E7" />
      <rect x="25" y="8" width="2" height="2" fill="#09090B" />

      {/* Thinking pixel indicators */}
      <rect x="25" y="2" width="1" height="1" fill="#A1A1AA" />
      <rect x="26" y="0" width="2" height="2" fill="#FFFFFF" />
    </g>
  );

  /**
   * SUCCESS POSE:
   * Happy wagging tail, squinting happy eyes, proud chest, sparkle pixels.
   */
  const renderSuccessPose = () => (
    <g id="wolf-success">
      {/* High wagging tail */}
      <rect x="1" y="10" width="3" height="4" fill="#A1A1AA" />
      <rect x="2" y="8" width="2" height="3" fill="#FFFFFF" />

      <rect x="7" y="19" width="2" height="4" fill="#3F3F46" />
      <rect x="17" y="19" width="2" height="4" fill="#3F3F46" />

      <rect x="6" y="13" width="12" height="6" fill="#71717A" />
      <rect x="7" y="14" width="10" height="4" fill="#A1A1AA" />
      <rect x="15" y="12" width="4" height="6" fill="#FFFFFF" />

      <rect x="8" y="18" width="2" height="5" fill="#71717A" />
      <rect x="15" y="18" width="2" height="5" fill="#A1A1AA" />

      <rect x="16" y="7" width="5" height="5" fill="#71717A" />
      <rect x="16" y="2" width="2" height="4" fill="#52525B" />
      <rect x="20" y="2" width="2" height="4" fill="#71717A" />

      <rect x="17" y="5" width="6" height="6" fill="#E4E4E7" />
      {/* Happy squint eyes (^^) */}
      <rect x="18" y="7" width="2" height="1" fill="#09090B" />
      <rect x="21" y="7" width="2" height="1" fill="#09090B" />

      {/* Snout with small smile */}
      <rect x="22" y="8" width="4" height="3" fill="#FFFFFF" />
      <rect x="25" y="8" width="2" height="2" fill="#09090B" />
      <rect x="23" y="10" width="3" height="1" fill="#27272A" />

      {/* Sparkles */}
      <rect x="26" y="3" width="1" height="3" fill="#FFFFFF" />
      <rect x="25" y="4" width="3" height="1" fill="#FFFFFF" />
    </g>
  );

  /**
   * ERROR POSE:
   * Ears flattened back, concerned eyes, tail lowered.
   */
  const renderErrorPose = () => (
    <g id="wolf-error">
      {/* Lowered tail */}
      <rect x="3" y="16" width="2" height="5" fill="#52525B" />
      <rect x="2" y="19" width="2" height="3" fill="#3F3F46" />

      <rect x="6" y="14" width="12" height="6" fill="#71717A" />
      <rect x="7" y="15" width="10" height="4" fill="#52525B" />

      <rect x="8" y="19" width="2" height="4" fill="#52525B" />
      <rect x="15" y="19" width="2" height="4" fill="#52525B" />

      <rect x="15" y="9" width="4" height="5" fill="#71717A" />

      {/* Flattened ears */}
      <rect x="13" y="7" width="3" height="2" fill="#52525B" />
      <rect x="12" y="8" width="3" height="2" fill="#3F3F46" />

      <rect x="16" y="7" width="6" height="5" fill="#A1A1AA" />
      {/* Worried / concerned eyes (> < or small dots) */}
      <rect x="18" y="8" width="2" height="2" fill="#09090B" />
      <rect x="21" y="8" width="2" height="2" fill="#09090B" />

      <rect x="22" y="10" width="4" height="2" fill="#D4D4D8" />
      <rect x="25" y="10" width="2" height="2" fill="#09090B" />
      {/* Downward mouth */}
      <rect x="23" y="12" width="2" height="1" fill="#27272A" />

      {/* Small sweat drop */}
      <rect x="17" y="11" width="1" height="2" fill="#A1A1AA" />
    </g>
  );

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Optional Speech Bubble for Howl or Tips */}
      {showSpeechBubble && (state === 'howling' || speechText) && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-7 -right-12 z-20 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-200 shadow-lg whitespace-nowrap animate-bounce"
        >
          {speechText}
          <div className="absolute left-2 -bottom-1 w-1.5 h-1.5 bg-zinc-900 border-r border-b border-zinc-700 transform rotate-45" />
        </div>
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        width={width}
        height={height}
        shapeRendering="crispEdges"
        className={`${scaleClass} inline-block select-none overflow-visible`}
        aria-label={`AXL Wolf mascot (${state})`}
        role="img"
      >
        {renderWolfGraphic()}
      </svg>
    </div>
  );
};
