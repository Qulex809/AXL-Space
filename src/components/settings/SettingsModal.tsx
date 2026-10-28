import React, { useState } from 'react';
import { X, Key, Shield, Check } from 'lucide-react';
import { getAIProvider, setAIProvider, GeminiAIProvider, UnconfiguredAIProvider } from '../../lib/ai/provider';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const currentProvider = getAIProvider();
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setAIProvider(new GeminiAIProvider(apiKey.trim()));
    } else {
      setAIProvider(new UnconfiguredAIProvider());
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#111113] border border-[#29292E] rounded-2xl p-5 shadow-2xl text-[#F5F5F5]">
        <div className="flex items-center justify-between pb-3 border-b border-[#29292E]">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold">AXL Space Ayarları</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#A1A1AA] hover:text-white rounded-md hover:bg-[#18181B] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
              Google Gemini API Anahtarı
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 bg-[#18181B] border border-[#29292E] rounded-lg text-xs font-mono text-white placeholder-[#A1A1AA] focus:outline-none focus:border-zinc-400"
            />
            <p className="mt-1.5 text-[11px] text-[#A1A1AA] leading-relaxed">
              Google AI Studio üzerinden alacağınız API anahtarı tarayıcınızın hafızasında tutulur. Sunucuya gönderilmez.
            </p>
          </div>

          <div className="p-3 bg-[#18181B] border border-[#29292E] rounded-lg space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Güvenlik & Gizlilik</span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
              Şu anki Aktif Sağlayıcı:{' '}
              <span className="font-mono text-white">{currentProvider.name}</span>
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#29292E]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#18181B] text-xs text-[#A1A1AA] hover:text-white rounded-lg border border-[#29292E] transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Kaydedildi</span>
                </>
              ) : (
                <span>Kaydet</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
