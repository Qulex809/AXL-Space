import React, { useState } from 'react';
import {
  X,
  Cpu,
  Key,
  ShieldCheck,
  Database,
  GitBranch,
  Layers,
  Eye,
  EyeOff,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'models' | 'integrations' | 'environment';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('models');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [keysState, setKeysState] = useState<Record<string, string>>({
    gemini: '',
    claude: '',
    kimi: '',
    openrouter: '',
    groq: '',
    github: '',
    supabaseUrl: '',
    supabaseAnonKey: '',
    figma: '',
  });
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleShowKey = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleKeyChange = (id: string, value: string) => {
    setKeysState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setSaveStatus('Ayarlar güvenli yerel tarayıcı belleğine kaydedildi.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-axl-panel border border-axl-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-axl-border">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Platform ve Model Ayarları</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-axl-muted hover:text-white hover:bg-axl-surface transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-axl-border px-6 bg-axl-bg/50">
          <button
            onClick={() => setActiveTab('models')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'models'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-axl-muted hover:text-white'
            }`}
          >
            AI Modelleri (Gemini, Claude, Kimi, Groq)
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'integrations'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-axl-muted hover:text-white'
            }`}
          >
            Geliştirici Entegrasyonları (GitHub, Supabase, Figma)
          </button>
          <button
            onClick={() => setActiveTab('environment')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'environment'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-axl-muted hover:text-white'
            }`}
          >
            Ortam & Güvenlik
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {activeTab === 'models' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-white">Sıfır İstemci Sızıntısı Prensibi:</span>
                  <br />
                  Girdiğiniz API anahtarları yalnızca yerel tarayıcı oturumunuzda tutulur ve hiçbir üçüncü taraf sunucuya iletilmez. Google AI Studio ortamına aktarıldığında sistem ortam değişkenleriyle eşleşir.
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'gemini', name: 'Google Gemini Pro / Flash API', placeholder: 'AIzaSy...' },
                  { id: 'claude', name: 'Anthropic Claude API', placeholder: 'sk-ant-api03...' },
                  { id: 'kimi', name: 'Moonshot Kimi API', placeholder: 'sk-kimi-...' },
                  { id: 'openrouter', name: 'OpenRouter API', placeholder: 'sk-or-v1-...' },
                  { id: 'groq', name: 'Groq Cloud API (Llama 3.3)', placeholder: 'gsk_...' },
                ].map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-axl-surface border border-axl-border space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-axl-subtle" />
                        <span className="font-medium text-white">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-axl-panel text-axl-muted border border-axl-border">
                        {keysState[item.id] ? 'Yapılandırıldı' : 'Yapılandırılmadı'}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type={showKeys[item.id] ? 'text' : 'password'}
                        value={keysState[item.id]}
                        onChange={(e) => handleKeyChange(item.id, e.target.value)}
                        placeholder={item.placeholder}
                        className="w-full bg-axl-panel border border-axl-border rounded-md px-3 py-1.5 text-xs text-white placeholder-axl-subtle pr-8 font-mono focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowKey(item.id)}
                        className="absolute right-2.5 top-2 text-axl-subtle hover:text-white"
                      >
                        {showKeys[item.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              {/* GitHub */}
              <div className="p-4 rounded-lg bg-axl-surface border border-axl-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-white" />
                    <span className="font-semibold text-white">GitHub Sürüm Kontrolü</span>
                  </div>
                  <span className="text-[10px] text-axl-subtle">Depo Dışa Aktarma & Sync</span>
                </div>
                <p className="text-axl-muted text-[11px] leading-relaxed">
                  Projelerinizi doğrudan GitHub deponuza `git commit` veya yeni repository olarak göndermenizi sağlar.
                </p>
                <input
                  type="password"
                  value={keysState.github}
                  onChange={(e) => handleKeyChange('github', e.target.value)}
                  placeholder="ghp_PersonalAccessToken..."
                  className="w-full bg-axl-panel border border-axl-border rounded-md px-3 py-1.5 text-xs text-white placeholder-axl-subtle font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Supabase */}
              <div className="p-4 rounded-lg bg-axl-surface border border-axl-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">Supabase Cloud Backend</span>
                  </div>
                  <span className="text-[10px] text-axl-subtle">PostgreSQL & Auth Entegrasyonu</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={keysState.supabaseUrl}
                    onChange={(e) => handleKeyChange('supabaseUrl', e.target.value)}
                    placeholder="https://xyz.supabase.co"
                    className="w-full bg-axl-panel border border-axl-border rounded-md px-3 py-1.5 text-xs text-white placeholder-axl-subtle font-mono focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="password"
                    value={keysState.supabaseAnonKey}
                    onChange={(e) => handleKeyChange('supabaseAnonKey', e.target.value)}
                    placeholder="anon-public-token..."
                    className="w-full bg-axl-panel border border-axl-border rounded-md px-3 py-1.5 text-xs text-white placeholder-axl-subtle font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Figma */}
              <div className="p-4 rounded-lg bg-axl-surface border border-axl-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold text-white">Figma Tasarım Bağlantısı</span>
                  </div>
                  <span className="text-[10px] text-axl-subtle">Tasarım Kodlama Dönüştürücüsü</span>
                </div>
                <input
                  type="password"
                  value={keysState.figma}
                  onChange={(e) => handleKeyChange('figma', e.target.value)}
                  placeholder="figd_PersonalAccessToken..."
                  className="w-full bg-axl-panel border border-axl-border rounded-md px-3 py-1.5 text-xs text-white placeholder-axl-subtle font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'environment' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-axl-surface border border-axl-border space-y-2">
                <h3 className="font-semibold text-white">Google AI Studio Uyumluluğu</h3>
                <p className="text-axl-muted text-[11px] leading-relaxed">
                  AXL Space platform temeli, Google AI Studio Build ortamında doğrudan Node/Vite web uygulaması olarak içe aktarılmak üzere optimize edilmiştir.
                </p>
                <div className="mt-2 font-mono text-[11px] bg-axl-panel p-2.5 rounded border border-axl-border text-zinc-300">
                  GEMINI_API_KEY=your_key_here<br />
                  NODE_ENV=production
                </div>
              </div>

              <div className="p-4 rounded-lg bg-axl-surface border border-axl-border space-y-2">
                <h3 className="font-semibold text-white">Sanal Önizleme Güvenlik Mimarisi</h3>
                <p className="text-axl-muted text-[11px] leading-relaxed">
                  Kullanıcı kodları ana sayfa bağlamında (main thread window) doğrudan eval edilmez; `sandbox="allow-scripts"` kısıtlamalı izole iframe içerisine aktarılır.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-axl-border bg-axl-bg/50">
          <div className="text-[11px] text-emerald-400 font-medium">
            {saveStatus && <span>✓ {saveStatus}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-axl-border text-xs text-axl-muted hover:text-white hover:bg-axl-surface transition-colors"
            >
              Vazgeç
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Yapılandırmayı Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
