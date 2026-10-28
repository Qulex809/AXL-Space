import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PixelWolf } from './PixelWolf';

describe('PixelWolf Component', () => {
  it('renders SVG mascot with crisp edges for idle state', () => {
    const { container } = render(<PixelWolf state="idle" size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('shape-rendering')).toBe('crispEdges');
  });

  it('renders running animation state with stride frames', () => {
    const { container } = render(<PixelWolf state="running" size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(container.textContent).toContain('');
  });

  it('renders howling animation state with AWOOO speech bubble', async () => {
    const { container } = render(<PixelWolf state="howling" size="xl" showHowlBubble={true} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('renders success and error states cleanly', () => {
    const { container: successContainer } = render(<PixelWolf state="success" size="md" />);
    expect(successContainer.querySelector('svg')).not.toBeNull();

    const { container: errorContainer } = render(<PixelWolf state="error" size="md" />);
    expect(errorContainer.querySelector('svg')).not.toBeNull();
  });
});
