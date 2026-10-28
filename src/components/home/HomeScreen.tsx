import React, { useState } from 'react';
import { PixelWolf } from '../mascot/PixelWolf';
import { ArrowRight, Paperclip, AlertTriangle, Sparkles, Code2, Layout, BarChart2 } from 'lucide-react';

interface HomeScreenProps {
  onCreateProject: (prompt: string) => void;
  initialPrompt?: string;
}

const STARTER_SUGGESTIONS = [
  {
    title: 'Kişisel Web Sitesi',
    description: 'Modern, karanlık mod destekli interaktif portfolyo ve blog',
    prompt: 'Karanlık mod destekli, modern ve duyarlı (responsive) kişisel portfolyo ve blog sitesi oluştur.',
    icon: Layout,
  },
  {
    title: 'Görev Takip Uygulaması',
    description: 'Kategorili, öncelik etiketli ve arama filtreli yapılacaklar listesi',
    prompt: 'Sürükle-bırak destekli, sürükleyici yapılacaklar ve görev takip (Kanban / Todo) uygulaması oluştur.',
    icon: Code2,
  },
  {
    title: 'Analitik Paneli',
    description: 'Grafikler, istatistik kartları ve performans metrikleri sunan gösterge paneli',
    prompt: 'SaaS platformları için metrik kartları ve filtreler içeren modern bir analitik paneli arayüzü tasarla.',
    icon: BarChart2,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCreateProject, initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState(initialPrompt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onCreateProject(prompt.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto">
      {/* Header & Hero */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="mb-4 inline-flex items-center justify-center p-3 bg-[#111113] border border-[#29292E] rounded-2xl shadow-inner">
          <PixelWolf size="lg" state="idle" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-3">
          Bugün ne inşa ediyoruz?
        </h1>
        <p className="text-sm md:text-base text-[#A1A1AA] max-w-lg leading-relaxed">
          Fikrini anlat. AXL Space ile onu çalışan bir uygulamaya dönüştürmeye hazırlan.
        </p>
      </div>

      {/* Main Prompt Composer */}
      <div className="w-full max-w-2xl bg-[#111113] border border-[#29292E] rounded-2xl p-4 shadow-2xl focus-within:border-zinc-500 transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Bir uygulama fikrini anlat..."
            rows={4}
            className="w-full bg-transparent text-sm md:text-base text-[#F5F5F5] placeholder-[#A1A1AA] resize-none focus:outline-none leading-relaxed"
          />

          {/* Composer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#29292E]/60 mt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="p-2 text-[#A1A1AA] opacity-50 cursor-not-allowed rounded-lg hover:bg-[#18181B]"
                title="Dosya Ekleme (Gelecekteki Özellik)"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Status Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#18181B] border border-[#29292E] rounded-full text-[11px] text-[#A1A1AA]">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                <span>AI Bağlantısı Yok</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!prompt.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold text-xs md:text-sm rounded-xl hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              <span>Projeyi oluştur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile AI Warning status display */}
      <div className="sm:hidden mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#18181B] border border-[#29292E] rounded-lg text-xs text-[#A1A1AA]">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        <span>Yapay zeka entegrasyonu henüz yapılmadı.</span>
      </div>

      {/* Starter Suggestions */}
      <div className="w-full max-w-2xl mt-10">
        <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>Örnek Çalışmalar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {STARTER_SUGGESTIONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => setPrompt(item.prompt)}
                className="flex flex-col text-left p-3.5 bg-[#111113] hover:bg-[#18181B] border border-[#29292E] rounded-xl transition-all group focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <div className="p-2 bg-[#18181B] border border-[#29292E] rounded-lg w-fit mb-2 text-white group-hover:bg-[#29292E] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#F5F5F5] group-hover:text-white mb-1">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#A1A1AA] line-clamp-2 leading-relaxed">
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
