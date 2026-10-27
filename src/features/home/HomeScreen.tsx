import React, { useState } from 'react';
import { PixelWolf } from '../../components/mascot/PixelWolf';
import { Paperclip, ArrowUp, AlertCircle, Sparkles, Terminal } from 'lucide-react';

interface HomeScreenProps {
  onCreateProject: (prompt: string) => void;
  initialPromptValue?: string;
}

const STARTER_SUGGESTIONS = [
  {
    title: 'Kişisel web sitesi',
    prompt: 'Karanlık temalı, projelerimi gösteren ve iletişim formu olan modern bir kişisel web sitesi.',
  },
  {
    title: 'Görev takip uygulaması',
    prompt: 'Sürükle-bırak Kanban panosuna ve öncelik etiketlerine sahip minimalist görev takip uygulaması.',
  },
  {
    title: 'Analitik paneli',
    prompt: 'Grafikler, performans metrikleri ve son işlemleri gösteren koyu renkli analitik paneli.',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCreateProject, initialPromptValue = '' }) => {
  const [prompt, setPrompt] = useState(initialPromptValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onCreateProject(prompt.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (prompt.trim()) {
        onCreateProject(prompt.trim());
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto w-full min-h-[calc(100vh-3.5rem)]">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8 space-y-3">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-axl-panel border border-axl-border shadow-xl">
          <PixelWolf expression="idle" size="xl" />
        </div>
        <div className="space-y-1.5 max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Bugün ne inşa ediyoruz?
          </h1>
          <p className="text-sm text-axl-muted font-normal leading-relaxed">
            Fikrini anlat. AXL Space ile onu çalışan bir uygulamaya dönüştürmeye hazırlan.
          </p>
        </div>
      </div>

      {/* Multiline Prompt Composer Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-axl-panel border border-axl-border rounded-xl p-3 sm:p-4 shadow-2xl focus-within:border-axl-muted/80 transition-all duration-200"
      >
        <div className="relative min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Bir uygulama fikrini anlat... (ör. Ürünlerimi ve fiyat planlarını listeleyen SaaS açılış sayfası)"
            className="w-full h-28 sm:h-32 bg-transparent text-sm sm:text-base text-axl-text placeholder-axl-muted resize-none focus:outline-none font-sans leading-relaxed"
            rows={4}
          />

          {/* Composer Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-axl-border/60 mt-2">
            <div className="flex items-center gap-3 text-xs text-axl-muted">
              {/* Attachment Icon (Disabled Placeholder) */}
              <button
                type="button"
                disabled
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-axl-surface/50 border border-axl-border/50 text-axl-muted cursor-not-allowed opacity-60 text-[11px]"
                title="Dosya veya görsel ekleme sonraki sürümde sunulacaktır"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dosya Ekle</span>
              </button>

              {/* Model Status Indicator */}
              <div className="flex items-center gap-1.5 text-[11px] text-axl-muted bg-axl-bg px-2 py-1 rounded border border-axl-border/60">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="hidden sm:inline font-mono">AI: Bağlı Değil</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] text-axl-muted font-mono">⌘ + Enter</span>
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-white text-black font-medium text-xs rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-white"
              >
                <span>Projeyi oluştur</span>
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Starter Suggestions */}
      <div className="w-full mt-6 space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-axl-muted text-center sm:text-left pl-1">
          Hızlı Başlangıç Fikirleri
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {STARTER_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(item.prompt)}
              className="text-left p-3 rounded-lg bg-axl-panel hover:bg-axl-surface border border-axl-border/80 hover:border-axl-muted/60 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-white group-hover:text-axl-text">
                  {item.title}
                </span>
                <Sparkles className="w-3 h-3 text-axl-muted group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-axl-muted line-clamp-2 leading-relaxed">
                {item.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Studio Capability Callout */}
      <div className="mt-8 flex items-center gap-2 text-xs text-axl-muted bg-axl-panel/60 border border-axl-border/60 px-3.5 py-2 rounded-full">
        <Terminal className="w-3.5 h-3.5" />
        <span>Arayüz tasarımı, React bileşenleri ve tam proje mimarisi desteği</span>
      </div>
    </div>
  );
};
