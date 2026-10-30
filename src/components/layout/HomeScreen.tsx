import React, { useState } from 'react';
import { PixelWolf } from '../mascot/PixelWolf';
import { ArrowUpRight, Paperclip, Sparkles, Cpu, AlertCircle } from 'lucide-react';

interface HomeScreenProps {
  onCreateProject: (prompt: string) => void;
}

const STARTER_SUGGESTIONS = [
  {
    title: 'Kişisel web sitesi',
    prompt: 'Kişisel bir portföy ve blog web sitesi oluştur. Giriş bölümü, deneyimler zaman çizelgesi, öne çıkan projeler gridi ve minimalist bir iletişim formu içersin. Koyu tema ve sade bir tipografi kullanılsın.',
  },
  {
    title: 'Görev takip uygulaması',
    prompt: 'Modern bir görev ve yapılacaklar (To-Do) takip uygulaması hazırla. Görevleri panolara (Yapılacak, Devam Eden, Tamamlanan) ayırabilmeli, etiketler ekleyebilmeli ve yerel hafızada durumları saklayabilmeli.',
  },
  {
    title: 'Analitik paneli',
    prompt: 'SaaS uygulaması için minimalist bir analitik kontrol paneli (Dashboard) geliştir. Kullanıcı büyümesi, aylık gelir grafiği, son işlem tablosu ve hızlı filtreleme butonları yer alsın.',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCreateProject }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    onCreateProject(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto w-full min-h-[calc(100vh-4rem)]">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="relative group">
          <PixelWolf state="idle" size="lg" className="hover:scale-110 transition-transform duration-200" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Bugün ne inşa ediyoruz?
          </h1>
          <p className="text-sm sm:text-base text-axl-muted max-w-lg mx-auto">
            Fikrini anlat. AXL Space ile onu çalışan bir uygulamaya dönüştürmeye hazırlan.
          </p>
        </div>
      </div>

      {/* Multiline Prompt Composer Card */}
      <div className="w-full bg-axl-panel border border-axl-border rounded-xl shadow-2xl p-4 transition-all focus-within:border-zinc-400">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Bir uygulama fikrini anlat..."
            className="w-full bg-transparent text-sm sm:text-base text-axl-text placeholder-axl-subtle resize-none focus:outline-none"
            aria-label="Uygulama fikri"
          />

          <div className="flex items-center justify-between pt-2 border-t border-axl-border/60">
            {/* Attachment & Model Integration status */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled
                title="Dosya ekleme özelliği henüz aktif değil (Gelecek sürüm)"
                className="flex items-center gap-1.5 text-xs text-axl-subtle opacity-50 cursor-not-allowed px-2 py-1 rounded hover:bg-axl-surface"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dosya ekle</span>
              </button>

              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-axl-surface border border-axl-border text-[11px] text-axl-muted"
                title="Model henüz yapılandırılmadı"
              >
                <Cpu className="w-3 h-3 text-axl-subtle" />
                <span className="hidden sm:inline">Model:</span>
                <span className="text-zinc-300 font-mono">Yapılandırılmadı</span>
              </div>
            </div>

            {/* Submission Button */}
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[11px] text-axl-subtle font-mono">⌘ + Enter</span>
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black font-medium text-xs sm:text-sm hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                <span>Projeyi oluştur</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Starter Suggestions */}
      <div className="w-full mt-8">
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <Sparkles className="w-3.5 h-3.5 text-axl-subtle" />
          <span className="text-xs font-medium text-axl-subtle uppercase tracking-wider">
            Başlangıç Fikirleri
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STARTER_SUGGESTIONS.map((sug) => (
            <button
              key={sug.title}
              type="button"
              onClick={() => setPrompt(sug.prompt)}
              className="text-left p-3.5 rounded-lg border border-axl-border bg-axl-surface/60 hover:bg-axl-surface hover:border-zinc-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-axl-text group-hover:text-white">
                  {sug.title}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-axl-subtle group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-axl-subtle line-clamp-2 leading-relaxed">
                {sug.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Platform Context Notification */}
      <div className="mt-8 p-3 rounded-lg border border-axl-border/60 bg-axl-panel/50 flex items-start gap-2.5 max-w-xl text-left">
        <AlertCircle className="w-4 h-4 text-axl-subtle shrink-0 mt-0.5" />
        <p className="text-xs text-axl-subtle leading-relaxed">
          AXL Space web tabanlı bir vibe coding çalışma alanıdır. Projenizi oluşturduktan sonra arayüz, kod görüntüleyici ve model entegrasyon noktalarını inceleyebilirsiniz.
        </p>
      </div>
    </div>
  );
};
