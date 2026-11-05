import React, { useState } from 'react';
import { PixelWolf, WolfState } from './PixelWolf';
import { useMascotController } from './mascotController';
import { X, Play, Square, ChevronRight, HelpCircle, Volume2 } from 'lucide-react';

interface WolfHelperWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  // Optional external state sync
  externalMascotState?: WolfState;
  onMascotStateChange?: (state: WolfState) => void;
}

const TIPS = [
  {
    title: 'Fikrini net ve adım adım açıkla',
    desc: 'Önce uygulamanın ana amacını, ardından temel sayfaları veya bileşenleri belirtmek en iyi sonucu götürür.',
  },
  {
    title: 'Modüler dosya yapısını koru',
    desc: 'Tek bir devasa dosya yerine, bileşenleri, veri servislerini ve yardımcı fonksiyonları ayrı dosyalarda tut.',
  },
  {
    title: 'Monokrom & odaklanmış tasarım',
    desc: 'Gereksiz renk karmaşasından kaçın. Siyah, gri ve beyaz kontrastı zihinsel berraklık sağlar.',
  },
];

export const WolfHelperWidget: React.FC<WolfHelperWidgetProps> = ({
  isOpen,
  onClose,
  externalMascotState,
  onMascotStateChange,
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Reusable controller hook
  const mascotController = useMascotController();

  const effectiveState = externalMascotState || mascotController.currentState;

  if (!isOpen) return null;

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  const currentTip = TIPS[currentTipIndex];

  const handleToggleRunning = () => {
    if (onMascotStateChange) {
      const next = effectiveState === 'running' ? 'idle' : 'running';
      onMascotStateChange(next);
    } else {
      mascotController.toggleRunningPreview();
    }
  };

  const handleTriggerHowl = () => {
    if (onMascotStateChange) {
      onMascotStateChange('howling');
      setTimeout(() => onMascotStateChange('idle'), 2600);
    } else {
      mascotController.triggerHowl();
    }
  };

  const handleSetState = (state: WolfState) => {
    if (onMascotStateChange) {
      onMascotStateChange(state);
    } else {
      mascotController.setState(state);
    }
  };

  return (
    <div
      role="complementary"
      aria-label="AXL Space Kurt Yardımcısı"
      className="fixed bottom-4 right-4 z-40 w-80 sm:w-96 rounded-xl bg-[#111113] border border-zinc-800 shadow-2xl p-4 text-axl-text select-none animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {/* Widget Header */}
      <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2.5">
          <PixelWolf
            state={effectiveState}
            size="md"
            showSpeechBubble={effectiveState === 'howling'}
            speechText="Awooo~!"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-white">AXL Wolf Companion</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black text-zinc-400 border border-zinc-800">
                {effectiveState}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Vibe coding için dijital yoldaş</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-95"
          aria-label="Yardımcıyı kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mascot Animation Controls with Lively Buttons */}
      <div className="py-2.5 border-b border-zinc-800/80">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5 font-mono">
          <span>Maskot Animasyonları</span>
          <span>Önizleme</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Running loop toggle */}
          <button
            onClick={handleToggleRunning}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-bold transition-all duration-150 active:scale-95 ${
              effectiveState === 'running'
                ? 'bg-white text-black shadow-btn-glow border border-white'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-700 hover:text-white hover:bg-zinc-800 shadow-btn-subtle'
            }`}
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

          {/* Howl one-shot button */}
          <button
            onClick={handleTriggerHowl}
            disabled={effectiveState === 'howling'}
            aria-label="Ulut"
            title="Kurt uluma animasyonu"
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-zinc-900 text-zinc-300 border border-zinc-700 hover:text-white hover:bg-zinc-800 shadow-btn-subtle active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Ulut</span>
          </button>
        </div>

        {/* State Quick Selectors */}
        <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-zinc-400">
          <button
            onClick={() => handleSetState('idle')}
            className={`px-1.5 py-0.5 rounded transition-all active:scale-95 ${effectiveState === 'idle' ? 'bg-zinc-800 text-white font-semibold' : 'hover:text-zinc-200'}`}
          >
            Idle
          </button>
          <button
            onClick={() => handleSetState('success')}
            className={`px-1.5 py-0.5 rounded transition-all active:scale-95 ${effectiveState === 'success' ? 'bg-zinc-800 text-white font-semibold' : 'hover:text-zinc-200'}`}
          >
            ✓
          </button>
          <button
            onClick={() => handleSetState('error')}
            className={`px-1.5 py-0.5 rounded transition-all active:scale-95 ${effectiveState === 'error' ? 'bg-zinc-800 text-white font-semibold' : 'hover:text-zinc-200'}`}
          >
            !
          </button>
        </div>
      </div>

      {/* Tip Content */}
      <div className="pt-3 space-y-2">
        <div className="flex items-start gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-medium text-white">{currentTip.title}</h4>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              {currentTip.desc}
            </p>
          </div>
        </div>

        {/* Tip Pagination */}
        <div className="flex items-center justify-between pt-2 text-[10px] text-zinc-500">
          <span>
            {currentTipIndex + 1} / {TIPS.length}
          </span>
          <button
            onClick={nextTip}
            className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors active:scale-95 font-semibold"
          >
            <span>Sonraki ipucu</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
