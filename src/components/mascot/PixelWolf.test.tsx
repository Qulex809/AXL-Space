import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PixelWolf } from './PixelWolf';

describe('PixelWolf Component', () => {
  it('renders SVG mascot with crisp edges', () => {
    const { container } = render(<PixelWolf expression="idle" size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('shape-rendering')).toBe('crispEdges');
  });

  it('renders thinking expression with sparkle element', () => {
    const { container } = render(<PixelWolf expression="thinking" size="lg" />);
    const div = container.querySelector('div');
    expect(div?.className).toContain('animate-pulse');
  });

  it('renders success expression correctly', () => {
    const { container } = render(<PixelWolf expression="success" size="xl" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});
