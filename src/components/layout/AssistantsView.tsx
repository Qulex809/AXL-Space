import React from 'react';
import { Bot } from 'lucide-react';
import { PixelWolf } from '../mascot/PixelWolf';

interface AssistantProfile {
  id: string;
  name: string;
  role: string;
  description: string;
  specialties: string[];
  systemPromptHint: string;
  status: 'active' | 'coming-soon';
}

export const AssistantsView: React.FC = () => {
  const assistants: AssistantProfile[] = [
    {
      id: 'frontend-architect',
      name: 'AXL Frontend Architect',
      role: 'React, TypeScript & Tailwind Uzmanı',
      description: 'Piksel hassasiyetinde bileşen sistemleri, erişilebilir arayüzler ve modern state yönetimi mimarileri kurar.',
      specialties: ['React 19', 'Tailwind CSS', 'Accessible UI', 'Component Tokens'],
      systemPromptHint: 'Sen üst düzey bir React ve modern arayüz mimarısın...',
      status: 'active',
    },
    {
      id: 'fullstack-agent',
      name: 'Full-Stack Vibe Engineer',
      role: 'Uçtan Uca Uygulama Geliştirici',
      description: 'Kullanıcı fikrini tam işlevsel ön ve arka yüz mimarilerine çevirir, veri modelleri ve iş kurallarını kodlar.',
      specialties: ['Next.js/Vite', 'Node/Hono', 'PostgreSQL', 'Auth Flows'],
      systemPromptHint: 'Sen uçtan uca modern web uygulamaları inşa eden bir full-stack mühendisisin...',
      status: 'active',
    },
    {
      id: 'ui-ux-designer',
      name: 'Pixel & Motion Designer',
      role: 'Görsel Dil ve Mikro-Etkileşim Tasarımcısı',
      description: 'Monokrom, minimalist ve geliştirici odaklı zarif kullanıcı deneyimleri şekillendirir.',
      specialties: ['Design Systems', 'Micro-interactions', 'Dark Mode Ergonomics'],
      systemPromptHint: 'Sen minimalist, Apple/Linear tarzı zarif developer-tool tasarımcısı bir AI asistanısın...',
      status: 'active',
    },
    {
      id: 'debugger-optimizer',
      name: 'Debugger & Performance Specialist',
      role: 'Hata Ayıklama ve Bundle Optimize Edici',
      description: 'Konsol hatalarını analiz eder, bellek sızıntılarını tespit eder ve derleme sürelerini hızlandırır.',
      specialties: ['Type Checking', 'Console Diagnostics', 'Performance Profiling'],
      systemPromptHint: 'Sen TypeScript hatalarını ve çalışma zamanı performans darboğazlarını çözen bir uzmansın...',
      status: 'active',
    },
    {
      id: 'database-api',
      name: 'Database & API Specialist',
      role: 'Veri Şeması ve REST/GraphQL Mimarı',
      description: 'Supabase, Prisma ve RESTful API yapılarını güvenli yetkilendirme modelleriyle projelendirir.',
      specialties: ['Supabase / RLS', 'Prisma Schema', 'REST API', 'Security Rules'],
      systemPromptHint: 'Sen güvenli veritabanı şemaları ve ölçeklenebilir API mimarileri kurgulayan bir uzmansın...',
      status: 'active',
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 sm:p-8 max-w-6xl mx-auto w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-axl-border">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Bot className="w-3.5 h-3.5" />
            <span>UZMANLAŞMIŞ YAZILIM ASİSTANLARI</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Asistanları</h1>
          <p className="text-xs text-axl-muted mt-1 max-w-2xl">
            AXL Space, farklı yazılım disiplinlerine göre özelleştirilmiş AI geliştirici profilleri sunar. Her asistan belirli kodlama ve tasarım görevleri için optimize edilmiştir.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-axl-surface border border-axl-border text-xs text-zinc-300">
          <PixelWolf state="thinking" size="sm" />
          <span className="font-mono text-[11px]">Asistan Motoru: Hazır</span>
        </div>
      </div>

      {/* Grid of AI Assistants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className="flex flex-col justify-between p-5 rounded-xl bg-axl-panel border border-axl-border hover:border-blue-500/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Kullanılabilir
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                {assistant.name}
              </h3>
              <p className="text-xs text-blue-400 font-medium mt-0.5">{assistant.role}</p>

              <p className="text-xs text-axl-muted mt-3 leading-relaxed">
                {assistant.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {assistant.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-axl-surface text-zinc-300 border border-axl-border"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-axl-border/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-axl-subtle">Sistem Rolü Tanımlı</span>
              <span className="text-blue-400 text-xs font-semibold group-hover:underline">
                Workspace'e Ekle →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
