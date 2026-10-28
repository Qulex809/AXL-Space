import { useState, useCallback, useRef, useEffect } from 'react';
import { MascotState } from './PixelWolf';

export interface UseMascotControllerReturn {
  currentState: MascotState;
  isRunningPreview: boolean;
  isHowling: boolean;
  toggleRunningPreview: () => void;
  triggerHowl: () => void;
  setTaskState: (taskStatus: 'pending' | 'in_progress' | 'completed' | 'failed' | null) => void;
  resetToIdle: () => void;
}

/**
 * Mascot Animation Controller Hook
 * Manages mascot state transitions cleanly, enforces task priority over demo previews,
 * and handles timer cleanup to prevent conflicting animation states.
 */
export function useMascotController(initialState: MascotState = 'idle'): UseMascotControllerReturn {
  const [currentState, setCurrentState] = useState<MascotState>(initialState);
  const [isRunningPreview, setIsRunningPreview] = useState(false);
  const activeTaskStatusRef = useRef<'pending' | 'in_progress' | 'completed' | 'failed' | null>(null);
  const howlTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any scheduled howl transition
  const clearHowlTimer = useCallback(() => {
    if (howlTimeoutRef.current) {
      clearTimeout(howlTimeoutRef.current);
      howlTimeoutRef.current = null;
    }
  }, []);

  // Set task state (highest priority)
  const setTaskState = useCallback((taskStatus: 'pending' | 'in_progress' | 'completed' | 'failed' | null) => {
    activeTaskStatusRef.current = taskStatus;
    clearHowlTimer();
    setIsRunningPreview(false);

    if (taskStatus === 'in_progress' || taskStatus === 'pending') {
      setCurrentState('running');
    } else if (taskStatus === 'completed') {
      setCurrentState('success');
      setTimeout(() => {
        if (activeTaskStatusRef.current === 'completed') {
          setCurrentState('idle');
          activeTaskStatusRef.current = null;
        }
      }, 2500);
    } else if (taskStatus === 'failed') {
      setCurrentState('error');
      setTimeout(() => {
        if (activeTaskStatusRef.current === 'failed') {
          setCurrentState('idle');
          activeTaskStatusRef.current = null;
        }
      }, 3000);
    } else {
      setCurrentState('idle');
    }
  }, [clearHowlTimer]);

  // Toggle "AXL Running" demo preview
  const toggleRunningPreview = useCallback(() => {
    // If a real task is underway, do not allow overriding
    if (activeTaskStatusRef.current === 'in_progress' || activeTaskStatusRef.current === 'pending') {
      return;
    }

    clearHowlTimer();

    setIsRunningPreview((prev) => {
      const next = !prev;
      setCurrentState(next ? 'running' : 'idle');
      return next;
    });
  }, [clearHowlTimer]);

  // Trigger "Ulut" (Howl) animation beat
  const triggerHowl = useCallback(() => {
    // Prevent interrupting ongoing tasks or active howling
    if (activeTaskStatusRef.current === 'in_progress' || currentState === 'howling') {
      return;
    }

    clearHowlTimer();
    setIsRunningPreview(false);
    setCurrentState('howling');

    // Return to idle after howl cycle completes (2.1s)
    howlTimeoutRef.current = setTimeout(() => {
      setCurrentState('idle');
      howlTimeoutRef.current = null;
    }, 2100);
  }, [currentState, clearHowlTimer]);

  const resetToIdle = useCallback(() => {
    clearHowlTimer();
    setIsRunningPreview(false);
    activeTaskStatusRef.current = null;
    setCurrentState('idle');
  }, [clearHowlTimer]);

  useEffect(() => {
    return () => clearHowlTimer();
  }, [clearHowlTimer]);

  return {
    currentState,
    isRunningPreview,
    isHowling: currentState === 'howling',
    toggleRunningPreview,
    triggerHowl,
    setTaskState,
    resetToIdle,
  };
}
