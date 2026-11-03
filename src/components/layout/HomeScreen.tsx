import React, { useState } from 'react';
import { PixelWolf } from '../mascot/PixelWolf';
import { ProjectCategory, PROJECT_CATEGORIES } from '../../lib/storage/projectRepository';
import { SUPPORTED_MODELS } from '../../lib/ai/types';
import {
  Sparkles,
  Paperclip,
  ArrowRight,
  Globe,
  LayoutDashboard,
  CheckSquare,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

interface HomeScreenProps {
  onCreateProject: (prompt: string, category: ProjectCategory, modelId: string) => void;
  onOpenTemplates?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCreateProject, onOpenTemplates }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Web uygulaması');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-1.5-pro');

  const suggestions = [
    {
      title: 'Kişisel web sitesi',
      category: 'Web sitesi' as ProjectCategory,
      text: 'Yazılımcılar için minimalist ve modern bir portfolyo web sitesi oluştur. Karanlık tema, proje galerisi ve iletişim formu içersin.',
    },
    {
      title: 'Görev takip uygulaması',
      category: 'Verimlilik aracı' as ProjectCategory,
      text: 'Modern bir görev ve yapılacaklar (To-Do) takip uygulaması hazırla. Görevleri panolara (Yapılacak, Devam Eden, Tamamlanan) ayırabilmeli, etiketler ekleyebilmeli ve yerel hafızada durumları saklayabilmeli.',
    },
    {
      title: 'Analitik paneli',
      category: 'Dashboard' as ProjectCategory,
      text: 'SaaS işletmeleri için gerçek zamanlı metrikleri gösteren analitik dashboard paneli tasarla. Gelir grafikleri, aktif kullanıcı istatistikleri ve filtreleme özellikleri içersin.',
    },
    {
      title: 'E-ticaret Mağazası',
      category: 'E-ticaret' as ProjectCategory,
      text: 'Minimalist ürün vitrini, sepet yönetimi ve ödeme simülasyonu içeren responsive bir e-ticaret web uygulaması hazırla.',
    },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    onCreateProject(prompt.trim(), selectedCategory, selectedModel);
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    setPrompt(suggestion.text);
    setSelectedCategory(suggestion.category);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto w-full min-h-screen">
      {/* Brand Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center mb-1">
          <div className="p-3 rounded-2xl bg-axl-surface border border-axl-border shadow-inner">
            <PixelWolf state="idle" size="lg" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CODE · BUILD · CREATE</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Hayalindeki projeler, parmaklarının ucunda.
        </h1>

        <p className="text-sm sm:text-base text-axl-muted max-w-2xl mx-auto leading-relaxed">
          AXL Space, fikirlerini yapay zekâ ile gerçek yazılım projelerine dönüştürmeni sağlayan yeni nesil bir geliştirme platformudur.
        </p>
      </div>

      {/* Main Composer Box */}
      <div className="w-full bg-axl-panel border border-axl-border rounded-xl shadow-2xl p-4 sm:p-5 transition-all focus-within:border-blue-500/80 focus-within:ring-1 focus-within:ring-blue-500/40">
        {/* Category Pill Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 border-b border-axl-border/60 scrollbar-none">
          <span className="text-[11px] font-medium text-axl-subtle uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Tür:
          </span>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-axl-surface text-axl-muted hover:text-white hover:bg-axl-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              rows={4}
              placeholder="Bir uygulama fikrini anlat... Örneğin: modern bir görev panosu, landing page veya REST API arayüzü..."
              className="w-full bg-transparent text-sm sm:text-base text-axl-text placeholder-axl-subtle resize-none focus:outline-none leading-relaxed"
            />
          </div>

          {/* Composer Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-axl-border/80">
            <div className="flex flex-wrap items-center gap-2">
              {/* Attachment Placeholder */}
              <button
                type="button"
                disabled
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-axl-subtle bg-axl-surface border border-axl-border cursor-not-allowed opacity-60"
                title="Dosya eki ekleme (Gelecek güncellemede aktif)"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dosya ekle</span>
              </button>

              {/* Model Selector dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="appearance-none bg-axl-surface border border-axl-border text-xs text-zinc-300 rounded-md pl-2.5 pr-7 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {SUPPORTED_MODELS.map((m) => (
                    <option key={m.id} value={m.id} className="bg-axl-panel text-white">
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-axl-subtle" />
              </div>

              {/* Model Status Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-axl-surface border border-axl-border text-xs text-axl-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block" />
                <span className="text-[11px]">Bağlantı Bekleniyor</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              <span>Projeyi oluştur</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </form>
      </div>

      {/* Starter Suggestions */}
      <div className="w-full mt-8 space-y-3">
        <div className="flex items-center justify-between text-xs text-axl-subtle px-1">
          <span className="font-medium uppercase tracking-wider">Hızlı Başlangıç Fikirleri</span>
          {onOpenTemplates && (
            <button
              onClick={onOpenTemplates}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Tüm şablonları gör →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {suggestions.map((item, idx) => {
            const icons = [Globe, CheckSquare, LayoutDashboard, ShoppingBag];
            const Icon = icons[idx % icons.length];
            return (
              <button
                key={item.title}
                onClick={() => handleSuggestionClick(item)}
                className="flex flex-col items-start p-3.5 rounded-lg bg-axl-panel border border-axl-border hover:border-blue-500/50 hover:bg-axl-surface text-left transition-all group"
              >
                <div className="flex items-center gap-2 mb-1.5 text-axl-subtle group-hover:text-blue-400 transition-colors">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-semibold text-white group-hover:text-blue-400">
                    {item.title}
                  </span>
                </div>
                <span className="text-[11px] text-axl-muted line-clamp-2 leading-relaxed">
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
