import { useState, useCallback, useRef, useEffect } from 'react';
import { WolfState } from './PixelWolf';

export interface TaskLifecycleState {
  isTaskRunning: boolean;
  isTaskSuccess?: boolean;
  isTaskError?: boolean;
}

export interface MascotController {
  currentState: WolfState;
  isRunningPreview: boolean;
  isHowling: boolean;
  toggleRunningPreview: () => void;
  triggerHowl: () => void;
  setState: (state: WolfState) => void;
  resetToIdle: () => void;
}

/**
 * useMascotController: Manages mascot animations and priority.
 * Priority rule: Real task lifecycle > preview animations (howling / running preview).
 * Howl animations play through to completion (approx 2.5s) and cleanly return to idle.
 */
export function useMascotController(taskLifecycle?: TaskLifecycleState): MascotController {
  const [internalState, setInternalState] = useState<WolfState>('idle');
  const [isRunningPreview, setIsRunningPreview] = useState(false);
  const [isHowling, setIsHowling] = useState(false);

  const howlTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with real task lifecycle if provided
  useEffect(() => {
    if (!taskLifecycle) return;

    if (taskLifecycle.isTaskRunning) {
      setInternalState('running');
    } else if (taskLifecycle.isTaskSuccess) {
      setInternalState('success');
      const timer = setTimeout(() => setInternalState('idle'), 2500);
      return () => clearTimeout(timer);
    } else if (taskLifecycle.isTaskError) {
      setInternalState('error');
      const timer = setTimeout(() => setInternalState('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [taskLifecycle?.isTaskRunning, taskLifecycle?.isTaskSuccess, taskLifecycle?.isTaskError]);

  const toggleRunningPreview = useCallback(() => {
    if (taskLifecycle?.isTaskRunning) return; // Real task takes precedence
    if (isHowling) return; // Do not interrupt howling

    setIsRunningPreview((prev) => {
      const next = !prev;
      setInternalState(next ? 'running' : 'idle');
      return next;
    });
  }, [taskLifecycle?.isTaskRunning, isHowling]);

  const triggerHowl = useCallback(() => {
    if (taskLifecycle?.isTaskRunning) return; // Real task takes precedence
    if (isHowling) return; // Do not overlap multiple howls

    setIsRunningPreview(false);
    setIsHowling(true);
    setInternalState('howling');

    if (howlTimerRef.current) {
      clearTimeout(howlTimerRef.current);
    }

    // Complete howling sequence length: 2600ms
    howlTimerRef.current = setTimeout(() => {
      setIsHowling(false);
      setInternalState('idle');
      howlTimerRef.current = null;
    }, 2600);
  }, [taskLifecycle?.isTaskRunning, isHowling]);

  const setState = useCallback(
    (newState: WolfState) => {
      if (taskLifecycle?.isTaskRunning || isHowling) return;
      setIsRunningPreview(newState === 'running');
      setInternalState(newState);
    },
    [taskLifecycle?.isTaskRunning, isHowling]
  );

  const resetToIdle = useCallback(() => {
    if (howlTimerRef.current) {
      clearTimeout(howlTimerRef.current);
      howlTimerRef.current = null;
    }
    setIsHowling(false);
    setIsRunningPreview(false);
    setInternalState('idle');
  }, []);

  useEffect(() => {
    return () => {
      if (howlTimerRef.current) clearTimeout(howlTimerRef.current);
    };
  }, []);

  return {
    currentState: internalState,
    isRunningPreview,
    isHowling,
    toggleRunningPreview,
    triggerHowl,
    setState,
    resetToIdle,
  };
}
