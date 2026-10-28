import React, { useState } from 'react';
import { PixelWolf, MascotState } from './PixelWolf';
import { X, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface WolfHelperProps {
  onInsertPrompt?: (prompt: string) => void;
}

const TIPS = [
  {
    title: 'Fikrini Netleştir',
    description: 'Uygulamanın ne yapacağını, ana ekranlarını ve kullanacak kişiyi tek bir paragrafta özetle.',
    prompt: 'Bana modern, karanlık temalı bir yapılacaklar (Todo) listesi uygulaması oluştur.',
  },
  {
    title: 'Adım Adım Geliştir',
    description: 'İlk sürümde sadece temel işlevlere odaklan. Görsel detayları ve ek özellikleri sonra iste.',
    prompt: 'Basit bir kişisel portfolyo ve blog sitesi tasarla.',
  },
  {
    title: 'Teknolojileri Belirt',
    description: 'Özel bir kütüphane veya stil tercihin varsa baştan söyle (örn: React, Tailwind CSS).',
    prompt: 'Tailwind CSS ile şık bir SaaS analitik paneli taslağı hazırla.',
  },
];

export const WolfHelper: React.FC<WolfHelperProps> = ({ onInsertPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setMascotState('howling');
          setTimeout(() => setMascotState('idle'), 1500);
        }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-3 py-2 bg-[#18181B] border border-[#29292E] rounded-full text-xs text-[#F5F5F5] hover:bg-[#29292E] transition-all shadow-lg group focus:outline-none focus:ring-1 focus:ring-zinc-400"
        title="AXL Kurt İpucu Yardımcısı"
        aria-label="AXL Kurt Yardımcısını Aç"
      >
        <PixelWolf size="sm" state="idle" animate={false} />
        <span className="font-medium text-xs text-[#A1A1AA] group-hover:text-white transition-colors">
          AXL İpuçları
        </span>
      </button>
    );
  }

  const currentTip = TIPS[activeTipIndex];

  return (
    <aside
      className="fixed bottom-5 right-5 z-40 w-80 bg-[#111113] border border-[#29292E] rounded-xl p-4 shadow-2xl text-[#F5F5F5] animate-in fade-in slide-in-from-bottom-2 duration-200"
      aria-label="AXL İpucu Yardımcısı"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#29292E]">
        <div className="flex items-center gap-2">
          <PixelWolf size="md" state={mascotState} />
          <div>
            <h4 className="text-xs font-semibold text-[#F5F5F5]">AXL İpucu Rehbeli</h4>
            <p className="text-[10px] text-[#A1A1AA]">Vibe coding rehberiniz</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-[#A1A1AA] hover:text-white rounded-md hover:bg-[#18181B] transition-colors"
          aria-label="Yardımcıyı kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-zinc-300" />
            İpucu {activeTipIndex + 1}/{TIPS.length}
          </span>
          <div className="flex gap-1">
            {TIPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTipIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  idx === activeTipIndex ? 'bg-white' : 'bg-[#29292E]'
                }`}
                aria-label={`İpucu ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <h5 className="text-xs font-semibold text-white mb-1">{currentTip.title}</h5>
        <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">{currentTip.description}</p>

        {onInsertPrompt && (
          <button
            onClick={() => {
              onInsertPrompt(currentTip.prompt);
              setMascotState('success');
              setTimeout(() => setMascotState('idle'), 1200);
            }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#18181B] hover:bg-[#29292E] border border-[#29292E] rounded-md text-[11px] text-[#F5F5F5] transition-colors text-left group"
          >
            <span className="truncate pr-2 italic">"{currentTip.prompt}"</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white flex-shrink-0" />
          </button>
        )}
      </div>

      <div className="pt-2 border-t border-[#29292E] flex items-center justify-between text-[10px] text-[#A1A1AA]">
        <span className="flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> Statik İpuçları
        </span>
        <button
          onClick={() => setActiveTipIndex((prev) => (prev + 1) % TIPS.length)}
          className="hover:text-white transition-colors underline underline-offset-2"
        >
          Sonraki İpucu
        </button>
      </div>
    </aside>
  );
};
