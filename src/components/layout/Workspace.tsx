import React, { useState } from 'react';
import JSZip from 'jszip';
import { Project } from '../../lib/storage/projectRepository';
import { PixelWolf, WolfState } from '../mascot/PixelWolf';
import { useMascotController } from '../mascot/mascotController';
import { FileExplorer } from '../../features/workspace/FileExplorer';
import { CodeEditor } from '../../features/workspace/CodeEditor';
import { BrowserPreview } from '../../features/workspace/BrowserPreview';
import { ConsoleDiagnostics } from '../../features/workspace/ConsoleDiagnostics';
import { SUPPORTED_MODELS } from '../../lib/ai/types';
import {
  Eye,
  Code,
  Files,
  Terminal,
  Send,
  Edit2,
  Check,
  Download,
  Play,
  Square,
  Volume2,
  ChevronDown,
} from 'lucide-react';

interface WorkspaceProps {
  project: Project;
  onUpdateProjectName: (id: string, name: string) => void;
  onAddMessage: (projectId: string, content: string) => void;
  onUpdateFileContent: (projectId: string, path: string, content: string) => void;
  onAddFile: (projectId: string, path: string) => void;
  // External mascot state & controls
  mascotState?: WolfState;
  onMascotStateChange?: (state: WolfState) => void;
}

type TabType = 'preview' | 'code' | 'files' | 'console';

export const Workspace: React.FC<WorkspaceProps> = ({
  project,
  onUpdateProjectName,
  onAddMessage,
  onUpdateFileContent,
  onAddFile,
  mascotState,
  onMascotStateChange,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [activeFilePath, setActiveFilePath] = useState<string>('src/App.tsx');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(project.name);
  const [promptInput, setPromptInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(project.modelId || 'gemini-1.5-pro');

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

  const handleExportZip = async () => {
    const zip = new JSZip();
    project.files.forEach((f) => {
      zip.file(f.path, f.content);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-source.zip`;
    a.click();
    URL.revokeObjectURL(url);
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
                  className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-500 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleTitleSubmit}
                  className="p-1 rounded hover:bg-zinc-700 text-white active:scale-95 transition-all"
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
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-axl-subtle transition-opacity active:scale-95"
                  aria-label="Proje adını düzenle"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              {project.category}
            </span>
          </div>
        </div>

        {/* Right Header Status Controls with Lively Buttons */}
        <div className="flex items-center gap-2 text-xs">
          {/* Model Selector */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 rounded-md pl-2.5 pr-7 py-1.5 focus:outline-none focus:border-zinc-500 cursor-pointer transition-colors"
            >
              {SUPPORTED_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-zinc-950 text-white">
                  {m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-zinc-500" />
          </div>

          {/* Export Project ZIP Button */}
          <button
            onClick={handleExportZip}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-[11px] text-zinc-200 hover:text-white font-medium shadow-btn-subtle active:scale-95 transition-all duration-150"
            title="Tüm kaynak kodlarını ZIP olarak indir"
          >
            <Download className="w-3.5 h-3.5 text-zinc-300" />
            <span>Dışa Aktar</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: AI Conversation & Task Panel */}
        <section
          aria-label="Görev ve Talimatlar Paneli"
          className="w-full md:w-96 lg:w-[420px] flex flex-col border-b md:border-b-0 md:border-r border-axl-border bg-axl-panel h-[45vh] md:h-full shrink-0"
        >
          <div className="px-3 py-2 border-b border-axl-border text-xs font-semibold text-axl-subtle uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400 inline-block" />
              <span>AI Görev ve Akış Paneli</span>
            </span>
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
                  <span>{msg.role === 'user' ? 'Sen' : 'Sistem / AI Asistanı'}</span>
                  <span>•</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`p-3 rounded-lg max-w-[90%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-white text-black font-semibold shadow-btn-subtle'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                  }`}
                >
                  <p>{msg.content}</p>

                  {/* Changed Files Badge if available */}
                  {msg.filesChanged && msg.filesChanged.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-800">
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                        Dosya Değişiklikleri:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.filesChanged.map((file) => (
                          <span
                            key={file}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black border border-zinc-700 text-zinc-300"
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 pr-10 text-xs text-white placeholder-zinc-500 resize-none focus:outline-none focus:border-zinc-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!promptInput.trim()}
                className="absolute right-2 bottom-3 p-1.5 rounded-md bg-white hover:bg-zinc-200 text-black shadow-btn-subtle active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
          {/* Viewport Tabs with High-Contrast Lively Action Buttons */}
          <div className="h-11 px-4 border-b border-axl-border bg-axl-panel/50 flex items-center justify-between shrink-0">
            <nav className="flex items-center gap-1.5" aria-label="Sekmeler">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 active:scale-95 ${
                  activeTab === 'preview'
                    ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                    : 'text-axl-muted hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Önizleme</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 active:scale-95 ${
                  activeTab === 'code'
                    ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                    : 'text-axl-muted hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Kod Düzenleyici</span>
              </button>

              <button
                onClick={() => setActiveTab('files')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 active:scale-95 ${
                  activeTab === 'files'
                    ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                    : 'text-axl-muted hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Files className="w-3.5 h-3.5" />
                <span>Dosyalar</span>
              </button>

              <button
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 active:scale-95 ${
                  activeTab === 'console'
                    ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                    : 'text-axl-muted hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Konsol ({project.logs.length})</span>
              </button>
            </nav>

            {/* Mascot Quick Controls: High contrast lively buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleToggleRunning}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold border transition-all duration-150 active:scale-95 ${
                  effectiveState === 'running'
                    ? 'bg-white text-black border-white shadow-btn-glow'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white hover:bg-zinc-800 hover:border-zinc-500 shadow-btn-subtle'
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
                    <span>AXL Run</span>
                  </>
                )}
              </button>

              <button
                onClick={handleHowl}
                disabled={effectiveState === 'howling'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-700 hover:text-white hover:bg-zinc-800 hover:border-zinc-500 shadow-btn-subtle active:scale-95 disabled:opacity-40 transition-all duration-150"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ulut</span>
              </button>
            </div>
          </div>

          {/* Viewport Content Area */}
          <div className="flex-1 overflow-hidden flex">
            {activeTab === 'preview' && (
              <BrowserPreview files={project.files} projectName={project.name} />
            )}

            {activeTab === 'code' && (
              <div className="flex-1 flex overflow-hidden">
                <FileExplorer
                  files={project.files}
                  activeFilePath={activeFilePath}
                  onSelectFile={setActiveFilePath}
                  onAddFile={(path) => onAddFile(project.id, path)}
                />
                <CodeEditor
                  files={project.files}
                  activeFilePath={activeFilePath}
                  onSelectFile={setActiveFilePath}
                  onUpdateFileContent={(path, content) =>
                    onUpdateFileContent(project.id, path, content)
                  }
                />
              </div>
            )}

            {activeTab === 'files' && (
              <div className="flex-1 flex overflow-hidden">
                <FileExplorer
                  files={project.files}
                  activeFilePath={activeFilePath}
                  onSelectFile={(path) => {
                    setActiveFilePath(path);
                    setActiveTab('code');
                  }}
                  onAddFile={(path) => onAddFile(project.id, path)}
                />
                <div className="flex-1 p-8 text-xs text-zinc-400 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Sanal Dosya Sistemi</h3>
                  <p>
                    AXL Space sanal dosya sistemi, yapay zekâ modelinizin doğrudan kod yazıp düzenleyebileceği bir çalışma alanıdır.
                  </p>
                  <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                    <span className="font-semibold text-white">Toplam Dosya: {project.files.length}</span>
                    <ul className="space-y-1 font-mono text-[11px] text-zinc-300">
                      {project.files.map((f) => (
                        <li key={f.path}>📄 {f.path} ({f.language})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'console' && (
              <ConsoleDiagnostics logs={project.logs} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
