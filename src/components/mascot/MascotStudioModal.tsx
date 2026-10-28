import React, { useState } from 'react';
import { PixelWolf, MascotState } from './PixelWolf';
import { X, Play, Pause, Volume2, ShieldCheck } from 'lucide-react';

interface MascotStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_STATES: { id: MascotState; label: string; desc: string }[] = [
  { id: 'idle', label: 'Idle', desc: 'Sakin duruş & nefes alma' },
  { id: 'running', label: 'AXL Running', desc: '4 bacaklı koşu döngüsü' },
  { id: 'howling', label: 'Ulut (Howl)', desc: 'Gökyüzüne uluma & AWOOO!' },
  { id: 'thinking', label: 'Thinking', desc: 'Dikkatli odaklanma & ışıltı' },
  { id: 'success', label: 'Success', desc: 'Kuyruk sallayan mutlu duruş' },
  { id: 'error', label: 'Error', desc: 'Düşük kulaklı endişeli durum' },
];

export const MascotStudioModal: React.FC<MascotStudioModalProps> = ({ isOpen, onClose }) => {
  const [activeGlobalState, setActiveGlobalState] = useState<MascotState>('idle');
  const [previewScale, setPreviewScale] = useState<'sm' | 'md' | 'lg' | 'xl'>('xl');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-axl-panel border border-axl-border rounded-xl shadow-2xl overflow-hidden text-axl-text flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-axl-border flex items-center justify-between bg-axl-panel shrink-0">
          <div className="flex items-center gap-3">
            <PixelWolf state="thinking" size="md" />
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">AXL Kurt Stüdyosu</h3>
              <p className="text-xs text-axl-muted">Maskot animasyonları ve piksel netliği inceleme paneli</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-axl-muted hover:text-white hover:bg-axl-surface transition-colors focus:outline-none"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global Animation Control Bar */}
        <div className="px-5 py-3 border-b border-axl-border bg-axl-bg flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-axl-muted uppercase">Tüm Durumları Çalıştır:</span>
            <button
              onClick={() => setActiveGlobalState(activeGlobalState === 'running' ? 'idle' : 'running')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                activeGlobalState === 'running'
                  ? 'bg-white text-black border-white'
                  : 'bg-axl-surface text-axl-text border-axl-border hover:bg-axl-subtle'
              }`}
            >
              {activeGlobalState === 'running' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>AXL Running Toggle</span>
            </button>

            <button
              onClick={() => setActiveGlobalState('howling')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-axl-surface hover:bg-axl-subtle text-axl-text border border-axl-border text-xs font-medium transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-axl-muted" />
              <span>Tümünü Ulut (Howl)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-axl-muted uppercase">Boyut:</span>
            {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setPreviewScale(sz)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border uppercase transition-colors ${
                  previewScale === sz
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-axl-surface text-axl-muted border-axl-border hover:text-white'
                }`}
              >
                {sz === 'sm' ? '32px' : sz === 'md' ? '48px' : sz === 'lg' ? '80px' : '96px'}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side Animation Matrix */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-axl-bg/50 flex-1">
          {ALL_STATES.map((st) => {
            const isCurrent = activeGlobalState === st.id;
            return (
              <div
                key={st.id}
                className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-3 transition-all ${
                  isCurrent
                    ? 'bg-axl-panel border-white/80 shadow-lg'
                    : 'bg-axl-panel/60 border-axl-border hover:border-axl-muted'
                }`}
              >
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="font-semibold text-white uppercase">{st.label}</span>
                  <span className="text-[10px] font-mono text-axl-muted px-1.5 py-0.5 bg-axl-bg rounded">
                    {st.id}
                  </span>
                </div>

                {/* Pixel Art Render Display Box */}
                <div className="w-full h-32 rounded-lg bg-[#0B0B0C] border border-axl-border/80 flex items-center justify-center p-2 relative overflow-hidden">
                  <PixelWolf
                    state={st.id}
                    size={previewScale}
                    onHowlComplete={() => {
                      if (activeGlobalState === 'howling') setActiveGlobalState('idle');
                    }}
                  />
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#29292e10_1px,transparent_1px),linear-gradient(to_bottom,#29292e10_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                </div>

                <div className="w-full flex items-center justify-between text-[11px] text-axl-muted">
                  <span className="truncate">{st.desc}</span>
                  <button
                    onClick={() => setActiveGlobalState(st.id)}
                    className="text-xs text-white hover:underline font-medium shrink-0 ml-2"
                  >
                    Test et &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Banner Footer */}
        <div className="px-5 py-3 border-t border-axl-border bg-axl-panel flex items-center justify-between text-xs text-axl-muted shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>crispEdges piksel yapısı & el yapımı Vibe Coding maskotu</span>
          </div>
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
