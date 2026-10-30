import React, { useState } from 'react';
import { Project } from '../../lib/storage/projectRepository';
import { PixelWolf, WolfState } from '../mascot/PixelWolf';
import { useMascotController } from '../mascot/mascotController';
import {
  Eye,
  Code,
  Files,
  Send,
  Cpu,
  Edit2,
  Check,
  Terminal,
  FolderTree,
  FileCode,
  Info,
  Play,
  Square,
  Volume2,
} from 'lucide-react';

interface WorkspaceProps {
  project: Project;
  onUpdateProjectName: (id: string, name: string) => void;
  onAddMessage: (projectId: string, content: string) => void;
  // External mascot state & controls
  mascotState?: WolfState;
  onMascotStateChange?: (state: WolfState) => void;
}

type TabType = 'preview' | 'code' | 'files';

export const Workspace: React.FC<WorkspaceProps> = ({
  project,
  onUpdateProjectName,
  onAddMessage,
  mascotState,
  onMascotStateChange,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(project.name);
  const [promptInput, setPromptInput] = useState('');

  // Local controller fallback
  const localController = useMascotController();
  const effectiveState = mascotState || localController.currentState;

  const handleTitleSubmit = () => {
    if (titleDraft.trim()) {
      onUpdateProjectName(project.id, titleDraft);
    } else {
      setTitleDraft(project.name);
    }
    setIsEditingTitle(false);
  };

  const handleSendPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;
    onAddMessage(project.id, promptInput.trim());
    setPromptInput('');
  };

  const handleToggleRunning = () => {
    if (onMascotStateChange) {
      onMascotStateChange(effectiveState === 'running' ? 'idle' : 'running');
    } else {
      localController.toggleRunningPreview();
    }
  };

  const handleHowl = () => {
    if (onMascotStateChange) {
      onMascotStateChange('howling');
      setTimeout(() => onMascotStateChange('idle'), 2600);
    } else {
      localController.triggerHowl();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-axl-bg text-axl-text">
      {/* Workspace Header */}
      <header className="h-13 px-4 py-2.5 border-b border-axl-border bg-axl-panel flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <PixelWolf
            state={effectiveState}
            size="sm"
            showSpeechBubble={effectiveState === 'howling'}
            speechText="Awoo!"
          />
          <div className="flex items-center gap-2 min-w-0">
            {isEditingTitle ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTitleSubmit();
                    if (e.key === 'Escape') setIsEditingTitle(false);
                  }}
                  autoFocus
                  className="px-2 py-0.5 rounded bg-axl-surface border border-zinc-400 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleTitleSubmit}
                  className="p-1 rounded hover:bg-axl-surface text-white"
                  aria-label="Başlığı kaydet"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h2 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {project.name}
                </h2>
                <button
                  onClick={() => {
                    setTitleDraft(project.name);
                    setIsEditingTitle(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-axl-subtle transition-opacity"
                  aria-label="Proje adını düzenle"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Header Status Controls */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-axl-surface border border-axl-border text-axl-muted text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-axl-subtle" />
            <span className="hidden sm:inline">Model:</span>
            <span className="font-mono text-zinc-300">Bağlantı Yok</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-axl-surface border border-axl-border text-[11px] text-axl-subtle">
            <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
            <span>Derleme Hazır</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Conversation & Task Panel */}
        <section
          aria-label="Görev ve Talimatlar Paneli"
          className="w-full md:w-96 lg:w-[420px] flex flex-col border-b md:border-b-0 md:border-r border-axl-border bg-axl-panel h-[45vh] md:h-full shrink-0"
        >
          <div className="px-3 py-2 border-b border-axl-border text-xs font-medium text-axl-subtle uppercase tracking-wider flex items-center justify-between">
            <span>Görev Akışı</span>
            <span className="text-[10px] font-mono lowercase text-axl-muted">
              {project.messages.length} mesaj
            </span>
          </div>

          {/* Conversation history */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {project.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 text-xs ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-axl-subtle">
                  <span>{msg.role === 'user' ? 'Sen' : 'Sistem / AI'}</span>
                  <span>•</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`p-3 rounded-lg max-w-[90%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-white text-black font-medium'
                      : 'bg-axl-surface border border-axl-border text-axl-text'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Task Composer */}
          <div className="p-3 border-t border-axl-border bg-axl-panel">
            <form onSubmit={handleSendPrompt} className="relative">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendPrompt();
                  }
                }}
                rows={2}
                placeholder="Bir sonraki talimatı veya değişikliği yaz..."
                className="w-full bg-axl-surface border border-axl-border rounded-lg p-2.5 pr-10 text-xs text-axl-text placeholder-axl-subtle resize-none focus:outline-none focus:border-zinc-400"
              />
              <button
                type="submit"
                disabled={!promptInput.trim()}
                className="absolute right-2 bottom-3 p-1.5 rounded-md bg-white text-black hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Talimatı gönder"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </section>

        {/* Right Column: Code / Files / Preview Viewport */}
        <section
          aria-label="Çalışma ve Önizleme Alanı"
          className="flex-1 flex flex-col h-full bg-axl-bg overflow-hidden"
        >
          {/* Viewport Tabs */}
          <div className="h-11 px-4 border-b border-axl-border bg-axl-panel/50 flex items-center justify-between shrink-0">
            <nav className="flex items-center gap-1" aria-label="Sekmeler">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-axl-surface text-white border border-axl-border'
                    : 'text-axl-muted hover:text-axl-text'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Önizleme</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'bg-axl-surface text-white border border-axl-border'
                    : 'text-axl-muted hover:text-axl-text'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Kod</span>
              </button>

              <button
                onClick={() => setActiveTab('files')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'files'
                    ? 'bg-axl-surface text-white border border-axl-border'
                    : 'text-axl-muted hover:text-axl-text'
                }`}
              >
                <Files className="w-3.5 h-3.5" />
                <span>Dosyalar</span>
              </button>
            </nav>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] font-mono text-axl-subtle">localhost:3000 (beklemede)</span>
            </div>
          </div>

          {/* Viewport Content Area */}
          <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center">
            {activeTab === 'preview' && (
              <div className="max-w-md w-full text-center space-y-4 p-8 rounded-xl border border-axl-border bg-axl-panel/40">
                <div className="flex justify-center">
                  <PixelWolf
                    state={effectiveState}
                    size="xl"
                    showSpeechBubble={effectiveState === 'howling'}
                    speechText="Awooooo!"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-white">Çalıştırma Motoru Beklemede</h3>
                  <p className="text-xs text-axl-muted leading-relaxed">
                    Uygulama önizleme ve WebContainer / sandboxed iframe motoru henüz bağlanmadı. Gerçek bir model sağlayıcısı bağlandığında, oluşturulan arayüz burada canlı görüntülenecektir.
                  </p>
                </div>

                {/* Interactive Mascot Testing Controls in Workspace */}
                <div className="pt-2 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleRunning}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        effectiveState === 'running'
                          ? 'bg-white text-black border-white'
                          : 'bg-axl-surface text-axl-text border-axl-border hover:bg-zinc-800'
                      }`}
                    >
                      {effectiveState === 'running' ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          <span>Durdur</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>AXL Running</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleHowl}
                      disabled={effectiveState === 'howling'}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-axl-surface text-axl-text border border-axl-border hover:bg-zinc-800 disabled:opacity-40 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Ulut</span>
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-axl-surface border border-axl-border text-[11px] text-axl-subtle font-mono">
                    <Terminal className="w-3 h-3" />
                    <span>status: {effectiveState}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="w-full h-full flex flex-col rounded-lg border border-axl-border bg-axl-panel/40 overflow-hidden">
                <div className="px-4 py-2 border-b border-axl-border flex items-center justify-between text-xs text-axl-subtle font-mono">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-axl-muted" />
                    <span>App.tsx (örnek taslak yapısı)</span>
                  </div>
                  <span>TypeScript / React</span>
                </div>
                <div className="p-4 font-mono text-xs text-axl-muted leading-relaxed overflow-auto flex-1">
                  <p className="text-axl-subtle">// AXL Space - Kod Görünümü</p>
                  <p className="text-axl-subtle">// Model sağlayıcısı bağlandığında üretilen dosyalar burada gerçek zamanlı görüntülenecektir.</p>
                  <br />
                  <p className="text-zinc-400">export default function App() &#123;</p>
                  <p className="text-zinc-400 ml-4">return (</p>
                  <p className="text-zinc-300 ml-8">&lt;div className="min-h-screen bg-black text-white"&gt;</p>
                  <p className="text-zinc-300 ml-12">&lt;h1&gt;{project.name}&lt;/h1&gt;</p>
                  <p className="text-zinc-300 ml-8">&lt;/div&gt;</p>
                  <p className="text-zinc-400 ml-4">);</p>
                  <p className="text-zinc-400">&#125;</p>
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="w-full h-full flex flex-col rounded-lg border border-axl-border bg-axl-panel/40 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FolderTree className="w-4 h-4 text-axl-muted" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-axl-text">
                    Proje Dosya Ağacı
                  </h3>
                </div>
                <div className="text-xs text-axl-muted space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-white">
                    <span>📁 src/</span>
                  </div>
                  <div className="pl-4 flex items-center gap-2 text-axl-subtle">
                    <span>📄 App.tsx</span>
                  </div>
                  <div className="pl-4 flex items-center gap-2 text-axl-subtle">
                    <span>📄 main.tsx</span>
                  </div>
                  <div className="pl-4 flex items-center gap-2 text-axl-subtle">
                    <span>📄 index.css</span>
                  </div>
                  <div className="flex items-center gap-2 text-axl-subtle">
                    <span>📄 package.json</span>
                  </div>
                </div>

                <div className="mt-8 p-3 rounded-lg border border-axl-border/60 bg-axl-surface/40 flex items-start gap-2 text-xs text-axl-subtle">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-zinc-400" />
                  <span>
                    Dosya ağacı düzenleme ve sanal dosya sistemi altyapısı gelecekteki kod üretimi entegrasyonu için hazırlanmıştır.
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
