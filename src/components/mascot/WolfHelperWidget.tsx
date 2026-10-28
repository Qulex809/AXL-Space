import React, { useState } from 'react';
import { PixelWolf, MascotState } from './PixelWolf';
import { MascotStudioModal } from './MascotStudioModal';
import { X, Sparkles, ChevronRight, HelpCircle, Play, Pause, Volume2, RotateCcw, Layers } from 'lucide-react';

interface WolfHelperWidgetProps {
  onSelectStarter?: (prompt: string) => void;
  onStateChange?: (state: MascotState) => void;
}

const HELPER_TIPS = [
  {
    title: 'Fikirleri Tanımlamak',
    content: 'Uygulamanızın ne yaptığını, kimin kullanacağını ve ana ekranlarını kısaca açıklayın.',
    prompt: 'Kullanıcıların günlük su tüketimini takip edebileceği, minimalist bir alışkanlık takip paneli.',
  },
  {
    title: 'Modüler Yapı',
    content: 'Küçük adımlarla ilerleyin. Önce ana akışı ve arayüzü kurgulayıp ardından veritabanı veya API ekleyin.',
    prompt: 'Ürünlerin listelendiği, sepet ve ödeme simülasyonu içeren modern bir e-ticaret vitrini.',
  },
  {
    title: 'AXL Kurt Animasyonları',
    content: 'AXL Running, Ulut (Howl) ve Kurt Stüdyosu ile maskotun canlı hareketlerini ve durumlarını test edebilirsiniz.',
    prompt: 'Markdown formatında notlar tutulabilen ve etiketlerle filtrelenebilen bir kişisel not alma uygulaması.',
  },
];

export const WolfHelperWidget: React.FC<WolfHelperWidgetProps> = ({ onSelectStarter, onStateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  const currentTip = HELPER_TIPS[activeTipIndex];

  const updateState = (newState: MascotState) => {
    setMascotState(newState);
    if (onStateChange) onStateChange(newState);
  };

  const handleToggleRunning = () => {
    const nextState = mascotState === 'running' ? 'idle' : 'running';
    updateState(nextState);
  };

  const handleTriggerHowl = () => {
    if (mascotState === 'howling') return;
    updateState('howling');
  };

  if (!isOpen) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-3.5 py-2 bg-axl-panel hover:bg-axl-surface border border-axl-border rounded-full text-xs text-axl-text transition-all duration-200 shadow-lg group focus:outline-none focus:ring-1 focus:ring-axl-muted"
          title="AXL Kurt Rehberi ve Animasyon Kontrolleri"
          aria-label="AXL Kurt Rehberi'ni Aç"
        >
          <PixelWolf state={mascotState} size="sm" />
          <span className="font-medium">AXL Rehber</span>
          <Sparkles className="w-3.5 h-3.5 text-axl-muted group-hover:text-white transition-colors" />
        </button>

        <MascotStudioModal isOpen={isStudioOpen} onClose={() => setIsStudioOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 w-80 sm:w-96 bg-axl-panel border border-axl-border rounded-xl shadow-2xl p-4 text-axl-text animate-in fade-in slide-in-from-bottom-3 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-axl-border mb-3">
          <div className="flex items-center gap-2.5">
            <PixelWolf
              state={mascotState}
              size="md"
              onHowlComplete={() => updateState('idle')}
            />
            <div>
              <h4 className="text-xs font-semibold tracking-wide text-white uppercase">AXL Kurt İpucu & Animasyon</h4>
              <p className="text-[11px] text-axl-muted">Vibe coding companion</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-axl-muted hover:text-white hover:bg-axl-surface transition-colors focus:outline-none"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot Interactive Control Bar */}
        <div className="bg-axl-bg border border-axl-border/80 rounded-lg p-2.5 mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-axl-muted uppercase">
            <span>Maskot Animasyon Testi</span>
            <button
              onClick={() => setIsStudioOpen(true)}
              className="inline-flex items-center gap-1 text-[10px] text-white hover:underline font-mono"
            >
              <Layers className="w-3 h-3 text-axl-muted" />
              <span>Kurt Stüdyosu &rarr;</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* AXL Running Toggle Button */}
            <button
              onClick={handleToggleRunning}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-xs font-medium border transition-colors ${
                mascotState === 'running'
                  ? 'bg-white text-black border-white'
                  : 'bg-axl-surface text-axl-text border-axl-border hover:bg-axl-subtle'
              }`}
            >
              {mascotState === 'running' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>AXL Running</span>
            </button>

            {/* Howl Button */}
            <button
              onClick={handleTriggerHowl}
              disabled={mascotState === 'howling'}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-axl-surface hover:bg-axl-subtle disabled:opacity-50 text-axl-text border border-axl-border rounded text-xs font-medium transition-colors"
            >
              <Volume2 className="w-3 h-3 text-axl-muted" />
              <span>Ulut (Howl)</span>
            </button>

            {/* Reset to Idle */}
            <button
              onClick={() => updateState('idle')}
              className="p-1.5 bg-axl-surface hover:bg-axl-subtle text-axl-muted hover:text-white border border-axl-border rounded transition-colors"
              title="Sıfırla (Idle)"
              aria-label="Maskotu idle durumuna getir"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* State Presets */}
          <div className="grid grid-cols-4 gap-1 text-[10px]">
            {(['idle', 'thinking', 'success', 'error'] as MascotState[]).map((st) => (
              <button
                key={st}
                onClick={() => updateState(st)}
                className={`py-1 rounded border capitalize transition-colors ${
                  mascotState === st
                    ? 'bg-axl-surface border-axl-muted text-white font-medium'
                    : 'bg-axl-bg border-axl-border/60 text-axl-muted hover:text-axl-text'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Tip Content */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-axl-muted shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-white">{currentTip.title}</p>
              <p className="text-xs text-axl-muted mt-1 leading-relaxed">{currentTip.content}</p>
            </div>
          </div>

          {/* Starter suggestion action inside helper */}
          <div className="bg-axl-bg border border-axl-border/80 rounded-lg p-2.5">
            <p className="text-[10px] text-axl-muted uppercase font-medium mb-1">Örnek İstek:</p>
            <p className="text-xs text-axl-text italic font-mono text-balance">"{currentTip.prompt}"</p>
            {onSelectStarter && (
              <button
                onClick={() => {
                  onSelectStarter(currentTip.prompt);
                  setIsOpen(false);
                }}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-white bg-axl-surface hover:bg-axl-border border border-axl-border px-2.5 py-1 rounded transition-colors w-full justify-center font-medium"
              >
                <span>Bu ipucunu composer'a aktar</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-axl-border mt-3 text-xs text-axl-muted">
          <div className="flex items-center gap-1">
            {HELPER_TIPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTipIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === activeTipIndex ? 'bg-white' : 'bg-axl-border hover:bg-axl-muted'
                }`}
                aria-label={`İpucu ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveTipIndex((prev) => (prev + 1) % HELPER_TIPS.length)}
            className="hover:text-white transition-colors text-[11px] font-medium"
          >
            Sonraki İpucu &rarr;
          </button>
        </div>
      </div>

      <MascotStudioModal isOpen={isStudioOpen} onClose={() => setIsStudioOpen(false)} />
    </>
  );
};
