import React from 'react';
import { X, KeyRound, Cloud, Cpu, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="w-full max-w-lg rounded-xl border border-axl-border bg-axl-panel p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-axl-border">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-axl-text" />
            <h3 id="settings-title" className="text-base font-semibold text-axl-text">
              Platform Ayarları & Entegrasyonlar
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-axl-muted hover:text-axl-text hover:bg-axl-surface transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs">
          {/* AI Providers Section */}
          <div className="p-3.5 rounded-lg border border-axl-border bg-axl-surface/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-axl-subtle" />
                <span className="font-medium text-axl-text">Model Sağlayıcıları (AI)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-axl-panel text-axl-subtle border border-axl-border">
                Gelecek Sürüm
              </span>
            </div>
            <p className="text-axl-muted leading-relaxed mb-3">
              Google AI Studio (Gemini 2.5), Anthropic ve yerel modeller için API yapılandırma arayüzü bu alanda yer alacaktır.
            </p>
            <input
              type="password"
              disabled
              placeholder="API anahtarı girişi bu aşamada devre dışıdır"
              className="w-full px-3 py-1.5 rounded bg-axl-bg border border-axl-border text-axl-subtle cursor-not-allowed opacity-60"
            />
          </div>

          {/* Cloud & Supabase Section */}
          <div className="p-3.5 rounded-lg border border-axl-border bg-axl-surface/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-axl-subtle" />
                <span className="font-medium text-axl-text">Bulut Depolama & Supabase</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-axl-panel text-axl-subtle border border-axl-border">
                Yerel Depolama Aktif
              </span>
            </div>
            <p className="text-axl-muted leading-relaxed">
              Projeler şu anda tarayıcınızın yerel depolama alanında (<code className="font-mono text-zinc-300">localStorage</code>) güvenle saklanmaktadır. Supabase bulut senkronizasyonu hazırlandığında tek tıkla bağlanabilecektir.
            </p>
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-lg border border-axl-border/60 bg-axl-bg/50 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-axl-subtle leading-normal">
              AXL Space istemci taraflı güvenlik kurallarına tam uyumludur. İstemci koduna hiçbir gizli API anahtarı veya yetkilendirme şifresi eklenmez.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-axl-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
