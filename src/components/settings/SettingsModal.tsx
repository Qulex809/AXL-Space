import React, { useState } from 'react';
import { X, Key, Cpu, Database, Github, CheckCircle, ShieldCheck } from 'lucide-react';
import { PixelWolf } from '../mascot/PixelWolf';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'anthropic' | 'openai'>('gemini');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-axl-panel border border-axl-border rounded-xl shadow-2xl overflow-hidden text-axl-text">
        {/* Header */}
        <div className="px-5 py-4 border-b border-axl-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PixelWolf expression="thinking" size="md" />
            <div>
              <h3 className="text-sm font-semibold text-white">Ayarlar & Entegrasyonlar</h3>
              <p className="text-xs text-axl-muted">AI model ve platform bağlantıları</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-axl-muted hover:text-white hover:bg-axl-surface transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* AI Model Provider Section */}
          <form onSubmit={handleSave} className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
              <Cpu className="w-4 h-4 text-axl-muted" />
              <span>AI Model Sağlayıcısı</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gemini', name: 'Google Gemini' },
                { id: 'anthropic', name: 'Anthropic Claude' },
                { id: 'openai', name: 'OpenAI GPT' },
              ].map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedProvider === provider.id
                      ? 'bg-axl-surface text-white border-axl-muted'
                      : 'bg-axl-bg text-axl-muted border-axl-border hover:text-white'
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-axl-muted flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" />
                <span>API Anahtarı ({selectedProvider.toUpperCase()})</span>
              </label>
              <input
                type="password"
                placeholder="sk-... veya AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-axl-bg border border-axl-border text-xs rounded-md px-3 py-2 text-axl-text placeholder-axl-muted focus:outline-none focus:border-axl-muted transition-colors font-mono"
              />
              <p className="text-[11px] text-axl-muted">
                API anahtarınız yalnızca yerel tarayıcı belleğinizde saklanır ve sunucuya gönderilmez.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-zinc-200 text-black font-medium text-xs rounded-md transition-colors"
            >
              {isSaved ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Kaydedildi</span>
                </>
              ) : (
                <span>Sağlayıcıyı Kaydet</span>
              )}
            </button>
          </form>

          {/* Extension Architecture Roadmap */}
          <div className="border-t border-axl-border pt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-axl-muted" />
              <span>Gelecek Entegrasyon Noktaları</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-axl-bg border border-axl-border flex items-start gap-2.5">
                <Database className="w-4 h-4 text-axl-muted shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Supabase Bulut Depolama</p>
                  <p className="text-[11px] text-axl-muted mt-0.5">
                    Kullanıcı kimlik doğrulama, proje veritabanı eşitleme ve çoklu cihaz senkronizasyonu için hazırlanmış mimari.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-axl-bg border border-axl-border flex items-start gap-2.5">
                <Github className="w-4 h-4 text-axl-muted shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">GitHub Entegrasyonu</p>
                  <p className="text-[11px] text-axl-muted mt-0.5">
                    Kod depolarını içe/dışa aktarma ve versiyon kontrolü entegrasyonu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-axl-border bg-axl-bg flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-axl-surface hover:bg-axl-border text-white text-xs font-medium rounded-md transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
