import React from 'react';
import { LayoutTemplate, ArrowRight, Laptop, BarChart3, ShoppingCart, CheckCircle2, Server } from 'lucide-react';
import { ProjectCategory } from '../../lib/storage/projectRepository';

interface TemplateItem {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  features: string[];
  initialPrompt: string;
  icon: React.FC<{ className?: string }>;
}

interface TemplatesViewProps {
  onSelectTemplate: (prompt: string, category: ProjectCategory) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onSelectTemplate }) => {
  const templates: TemplateItem[] = [
    {
      id: 'portfolio',
      title: 'Kişisel Portfolyo & Blog',
      category: 'Web sitesi',
      description: 'Yazılımcılar ve tasarımcılar için ultra minimalist, modern monokrom portfolyo.',
      features: ['Özgeçmiş zaman çizelgesi', 'Proje vitrini', 'İletişim formu', 'Karanlık tema'],
      initialPrompt: 'Minimalist, karanlık modlu bir kişisel geliştirici portfolyo sitesi oluştur. Deneyimlerim, projelerim ve iletişim formunu estetik bir düzende sun.',
      icon: Laptop,
    },
    {
      id: 'saas-dashboard',
      title: 'SaaS Metrik & Analitik Paneli',
      category: 'Dashboard',
      description: 'Aktif kullanıcılar, MRR grafiği ve dönüşüm oranlarını gösteren kurumsal kontrol paneli.',
      features: ['KPI kartları', 'Gelir çizgi grafikleri', 'Müşteri tablosu', 'Tarih aralığı filtresi'],
      initialPrompt: 'SaaS şirketi için gerçek zamanlı analitik kontrol paneli oluştur. Gelir metrikleri, kullanıcı büyümesi ve filtreli veri tablosu içersin.',
      icon: BarChart3,
    },
    {
      id: 'ecommerce',
      title: 'Modern E-Ticaret & Sepet Akışı',
      category: 'E-ticaret',
      description: 'Hızlı ürün listeleme, dinamik sepet modalı ve ödeme adımları simülasyonu.',
      features: ['Kategori filtreleme', 'Sepet state yönetimi', 'Stok göstergesi', 'Checkout ekranı'],
      initialPrompt: 'Şık ve modern bir e-ticaret mağaza arayüzü inşa et. Sepete ekleme, adet güncelleme ve checkout akışını eksiksiz hazırla.',
      icon: ShoppingCart,
    },
    {
      id: 'task-flow',
      title: 'Kanban Görev & İş Akışı Panosu',
      category: 'Verimlilik aracı',
      description: 'Sürükle-bırak destekli, etiketli ve yerel hafıza senkronizasyonlu görev yöneticisi.',
      features: ['3 sütunlu Kanban (Todo, In Progress, Done)', 'Öncelik rozetleri', 'Local storage persistence'],
      initialPrompt: 'Modern bir Kanban panosu oluştur. Görev kartlarını sütunlar arasında taşıyabilmeli, öncelik etiketi atayabilmeli ve yerel hafızada saklayabilmeli.',
      icon: CheckCircle2,
    },
    {
      id: 'api-service',
      title: 'REST API & Webhook Servis Arayüzü',
      category: 'Backend / API',
      description: 'Geliştiriciler için API dokümantasyonu, endpoint test konsolu ve webhook izleme paneli.',
      features: ['Endpoint test istekleri', 'JSON yanıt görüntüleyici', 'Status kod rozetleri'],
      initialPrompt: 'Geliştiriciler için interaktif bir REST API test konsolu ve dokümantasyon sayfası oluştur. GET/POST istekleri atıp yanıtları görebilsin.',
      icon: Server,
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 sm:p-8 max-w-6xl mx-auto w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>HAZIR VIBE CODING ŞABLONLARI</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Proje Şablonları</h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Sıfırdan başlamak yerine kanıtlanmış bir mimari seçin. AXL Space, seçtiğiniz şablon için gerekli dosya yapısını ve yönlendirici promptu otomatik hazırlar.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {templates.map((tmpl) => {
          const Icon = tmpl.icon;
          return (
            <div
              key={tmpl.id}
              className="flex flex-col justify-between p-5 rounded-xl bg-[#111113] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-150 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {tmpl.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {tmpl.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {tmpl.description}
                </p>

                <div className="mt-4 space-y-1.5">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Öne Çıkan Özellikler:
                  </span>
                  <ul className="text-xs text-zinc-300 space-y-1">
                    {tmpl.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-zinc-400 inline-block" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-zinc-800/80">
                <button
                  onClick={() => onSelectTemplate(tmpl.initialPrompt, tmpl.category)}
                  className="w-full group/btn flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white hover:bg-zinc-100 text-black font-bold text-xs shadow-btn-subtle hover:shadow-btn-glow active:scale-95 transition-all duration-150"
                >
                  <span>Bu Şablonla Başla</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
