import React, { useState } from 'react';
import { PixelWolf, WolfState } from './PixelWolf';
import { useMascotController } from './mascotController';
import { X, ChevronRight, Lightbulb, Play, Square, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

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
  // Optional external mascot controller if controlled from parent
  externalMascotState?: WolfState;
  onMascotStateChange?: (state: WolfState) => void;
}

export const WolfHelperWidget: React.FC<WolfHelperWidgetProps> = ({
  isOpen,
  onClose,
  externalMascotState,
  onMascotStateChange,
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const localController = useMascotController();
  const effectiveState = externalMascotState || localController.currentState;

  if (!isOpen) return null;

  const tip = TIPS[currentTipIndex];

  const handleToggleRunning = () => {
    if (onMascotStateChange) {
      onMascotStateChange(effectiveState === 'running' ? 'idle' : 'running');
    } else {
      localController.toggleRunningPreview();
    }
  };

  const handleHowl = () => {
    if (onMascotStateChange) {
      onMascotStateChange('howling');
      setTimeout(() => onMascotStateChange('idle'), 2600);
    } else {
      localController.triggerHowl();
    }
  };

  const handleSetState = (st: WolfState) => {
    if (onMascotStateChange) {
      onMascotStateChange(st);
    } else {
      localController.setState(st);
    }
  };

  return (
    <div
      role="complementary"
      aria-label="AXL Wolf ipucu asistanı"
      className="fixed bottom-5 right-5 z-40 w-84 max-w-[calc(100vw-2.5rem)] rounded-xl border border-axl-border bg-axl-surface p-4 shadow-2xl backdrop-blur transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-axl-border/60">
        <div className="flex items-center gap-2.5">
          <PixelWolf
            state={effectiveState}
            size="md"
            showSpeechBubble={effectiveState === 'howling'}
            speechText="Awooo~!"
          />
          <div>
            <h4 className="text-xs font-medium text-axl-text flex items-center gap-1.5">
              <span>AXL Wolf Companion</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono text-zinc-300 bg-axl-panel border border-axl-border">
                {effectiveState}
              </span>
            </h4>
            <p className="text-[11px] text-axl-subtle">Vibe coding için dijital yoldaş</p>
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

      {/* Mascot Interactive Animation Controls */}
      <div className="py-2.5 px-3 my-2.5 rounded-lg bg-axl-panel/80 border border-axl-border/80 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-axl-subtle font-mono">
          <span>Maskot Animasyonları</span>
          <span className="text-[10px] text-zinc-400">Önizleme</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* AXL Running Toggle */}
          <button
            onClick={handleToggleRunning}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              effectiveState === 'running'
                ? 'bg-white text-black border-white'
                : 'bg-axl-surface text-axl-text border-axl-border hover:bg-zinc-800'
            }`}
            aria-label="AXL Running animasyonunu başlat veya durdur"
            title="AXL Running animasyonu"
          >
            {effectiveState === 'running' ? (
              <>
                <Square className="w-3 h-3 fill-current" />
                <span>Durdur</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>AXL Running</span>
              </>
            )}
          </button>

          {/* Howl (Ulut) Action */}
          <button
            onClick={handleHowl}
            disabled={effectiveState === 'howling'}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-axl-surface text-axl-text border border-axl-border hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Ulut"
            title="Kurt uluma animasyonu"
          >
            <Volume2 className="w-3 h-3" />
            <span>Ulut</span>
          </button>

          {/* Quick expression buttons */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => handleSetState('idle')}
              className={`p-1 rounded text-xs border ${
                effectiveState === 'idle'
                  ? 'border-zinc-300 text-white bg-zinc-800'
                  : 'border-transparent text-axl-subtle hover:text-white'
              }`}
              title="Idle"
              aria-label="Idle pozuna geç"
            >
              Idle
            </button>
            <button
              onClick={() => handleSetState('success')}
              className={`p-1 rounded text-xs border ${
                effectiveState === 'success'
                  ? 'border-zinc-300 text-white bg-zinc-800'
                  : 'border-transparent text-axl-subtle hover:text-white'
              }`}
              title="Success"
              aria-label="Başarı pozuna geç"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleSetState('error')}
              className={`p-1 rounded text-xs border ${
                effectiveState === 'error'
                  ? 'border-zinc-300 text-white bg-zinc-800'
                  : 'border-transparent text-axl-subtle hover:text-white'
              }`}
              title="Error"
              aria-label="Hata pozuna geç"
            >
              <AlertCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tip of the day */}
      <div className="py-2">
        <div className="flex items-start gap-2 mb-1">
          <Lightbulb className="w-3.5 h-3.5 text-zinc-300 mt-0.5 shrink-0" />
          <h5 className="text-xs font-semibold text-axl-text">{tip.title}</h5>
        </div>
        <p className="text-xs text-axl-muted leading-relaxed pl-5">{tip.description}</p>
      </div>

      {/* Footer pagination */}
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
