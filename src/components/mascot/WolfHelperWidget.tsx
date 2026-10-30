import React, { useState } from 'react';
import { PixelWolf } from './PixelWolf';
import { X, ChevronRight, Lightbulb } from 'lucide-react';

const TIPS = [
  {
    title: 'Fikrini net ve adım adım açıkla',
    description: 'Önce uygulamanın ana amacını, ardından temel sayfaları veya bileşenleri belirtmek en iyi sonuca götürür.',
  },
  {
    title: 'Teknolojileri belirtebilirsin',
    description: 'React, Tailwind, TypeScript gibi tercih ettiğin kütüphaneleri veya veri modellerini doğrudan yazabilirsin.',
  },
  {
    title: 'Projeleri modüler tut',
    description: 'Büyük fikirleri parça parça inşa etmek, hızlı prototipleme ve test süreçlerini kolaylaştırır.',
  },
];

interface WolfHelperWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WolfHelperWidget: React.FC<WolfHelperWidgetProps> = ({ isOpen, onClose }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  if (!isOpen) return null;

  const tip = TIPS[currentTipIndex];

  return (
    <div
      role="complementary"
      aria-label="AXL Wolf ipucu asistanı"
      className="fixed bottom-5 right-5 z-40 w-80 max-w-[calc(100vw-2.5rem)] rounded-xl border border-axl-border bg-axl-surface p-4 shadow-2xl backdrop-blur transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-axl-border/60">
        <div className="flex items-center gap-2.5">
          <PixelWolf state="thinking" size="sm" />
          <div>
            <h4 className="text-xs font-medium text-axl-text flex items-center gap-1.5">
              <span>AXL Rehber</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono text-axl-muted bg-axl-panel border border-axl-border">
                İpucu
              </span>
            </h4>
            <p className="text-[11px] text-axl-subtle">Vibe coding için pratik öneriler</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-axl-subtle hover:text-axl-text p-1 rounded-md hover:bg-axl-hover transition-colors"
          aria-label="Rehberi kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3">
        <div className="flex items-start gap-2 mb-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-zinc-300 mt-0.5 shrink-0" />
          <h5 className="text-xs font-semibold text-axl-text">{tip.title}</h5>
        </div>
        <p className="text-xs text-axl-muted leading-relaxed pl-5">{tip.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-axl-border/40 text-[11px]">
        <span className="text-axl-subtle font-mono">
          {currentTipIndex + 1} / {TIPS.length}
        </span>
        <button
          onClick={() => setCurrentTipIndex((prev) => (prev + 1) % TIPS.length)}
          className="inline-flex items-center gap-1 text-axl-text hover:text-white font-medium hover:underline"
        >
          <span>Sonraki ipucu</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
