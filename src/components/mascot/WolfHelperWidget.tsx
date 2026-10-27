import React, { useState } from 'react';
import { PixelWolf } from './PixelWolf';
import { X, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface WolfHelperWidgetProps {
  onSelectStarter?: (prompt: string) => void;
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
    title: 'AI Çalışma Mantığı',
    content: 'AXL Space, girdiğiniz prompta göre projenizi, bileşenlerinizi ve dosya yapınızı sıfırdan mimarilendirir.',
    prompt: 'Markdown formatında notlar tutulabilen ve etiketlerle filtrelenebilen bir kişisel not alma uygulaması.',
  },
];

export const WolfHelperWidget: React.FC<WolfHelperWidgetProps> = ({ onSelectStarter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const currentTip = HELPER_TIPS[activeTipIndex];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-3.5 py-2 bg-axl-panel hover:bg-axl-surface border border-axl-border rounded-full text-xs text-axl-text transition-all duration-200 shadow-lg group focus:outline-none focus:ring-1 focus:ring-axl-muted"
        title="AXL Kurt Rehberi"
        aria-label="AXL Kurt Rehberi'ni Aç"
      >
        <PixelWolf expression="idle" size="sm" />
        <span className="font-medium">AXL Rehber</span>
        <Sparkles className="w-3.5 h-3.5 text-axl-muted group-hover:text-white transition-colors" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-80 sm:w-96 bg-axl-panel border border-axl-border rounded-xl shadow-2xl p-4 text-axl-text animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-axl-border mb-3">
        <div className="flex items-center gap-2.5">
          <PixelWolf expression="thinking" size="md" />
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-white uppercase">AXL Kurt İpucu</h4>
            <p className="text-[11px] text-axl-muted">Vibe coding rehberi</p>
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
  );
};
