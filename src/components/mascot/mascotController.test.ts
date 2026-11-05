// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMascotController } from './mascotController';

describe('useMascotController', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes in idle state', () => {
    const { result } = renderHook(() => useMascotController());
    expect(result.current.currentState).toBe('idle');
    expect(result.current.isRunningPreview).toBe(false);
    expect(result.current.isHowling).toBe(false);
  });

  it('toggles running preview on and off', () => {
    const { result } = renderHook(() => useMascotController());

    act(() => {
      result.current.toggleRunningPreview();
    });
    expect(result.current.currentState).toBe('running');
    expect(result.current.isRunningPreview).toBe(true);

    act(() => {
      result.current.toggleRunningPreview();
    });
    expect(result.current.currentState).toBe('idle');
    expect(result.current.isRunningPreview).toBe(false);
  });

  it('executes howling sequence and returns automatically to idle', () => {
    const { result } = renderHook(() => useMascotController());

    act(() => {
      result.current.triggerHowl();
    });
    expect(result.current.currentState).toBe('howling');
    expect(result.current.isHowling).toBe(true);

    // Repeated triggers during howl are ignored
    act(() => {
      result.current.triggerHowl();
    });
    expect(result.current.currentState).toBe('howling');

    // Fast-forward past the howl duration (2600ms)
    act(() => {
      vi.advanceTimersByTime(2650);
    });

    expect(result.current.currentState).toBe('idle');
    expect(result.current.isHowling).toBe(false);
  });

  it('gives priority to real task lifecycle over preview animations', () => {
    const { result, rerender } = renderHook(
      ({ isRunning }) => useMascotController({ isTaskRunning: isRunning }),
      { initialProps: { isRunning: false } }
    );

    expect(result.current.currentState).toBe('idle');

    // Start real task
    rerender({ isRunning: true });
    expect(result.current.currentState).toBe('running');

    // Toggling preview while task runs is a no-op
    act(() => {
      result.current.toggleRunningPreview();
    });
    expect(result.current.currentState).toBe('running');
  });

  it('switches to explicit states: success and error', () => {
    const { result } = renderHook(() => useMascotController());

    act(() => {
      result.current.setState('success');
    });
    expect(result.current.currentState).toBe('success');

    act(() => {
      result.current.setState('error');
    });
    expect(result.current.currentState).toBe('error');

    act(() => {
      result.current.resetToIdle();
    });
    expect(result.current.currentState).toBe('idle');
  });
});
