import React, { useState } from 'react';
import { Project, ProjectFile } from '../../lib/storage/projectRepository';
import { PixelWolf, MascotState } from '../../components/mascot/PixelWolf';
import {
  Play,
  Code,
  FolderTree,
  Send,
  Edit2,
  Check,
  X,
  AlertTriangle,
  FileCode,
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  Volume2,
} from 'lucide-react';

interface WorkspaceScreenProps {
  project: Project;
  onUpdateProjectName: (newName: string) => void;
  onSendMessage: (content: string) => void;
}

type WorkspaceTab = 'preview' | 'code' | 'files';

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  project,
  onUpdateProjectName,
  onSendMessage,
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('preview');
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(
    project.files[0] || { path: 'README.md', content: project.initialPrompt, language: 'markdown' }
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [inputMessage, setInputMessage] = useState('');
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  const handleSaveName = () => {
    if (editedName.trim()) {
      onUpdateProjectName(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Trigger task sending with mascot running transition
    setMascotState('running');
    onSendMessage(inputMessage.trim());
    setInputMessage('');

    // After task submission, transition mascot to thinking/idle
    setTimeout(() => {
      setMascotState('thinking');
      setTimeout(() => setMascotState('idle'), 2000);
    }, 1500);
  };

  const handleTriggerHowl = () => {
    if (mascotState === 'howling') return;
    setMascotState('howling');
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-axl-bg">
      {/* Workspace Header */}
      <header className="h-12 border-b border-axl-border bg-axl-panel px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleTriggerHowl}
            title="AXL Kurt'u ulut (Howl)"
            className="focus:outline-none hover:opacity-80 transition-opacity flex items-center gap-1 group"
          >
            <PixelWolf
              state={mascotState}
              size="sm"
              className="shrink-0"
              onHowlComplete={() => setMascotState('idle')}
            />
          </button>

          {isEditingName ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="bg-axl-bg border border-axl-border text-xs px-2 py-1 rounded text-white focus:outline-none focus:border-axl-muted font-medium"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="p-1 hover:text-green-400 text-axl-muted"
                aria-label="Kaydet"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setEditedName(project.name);
                  setIsEditingName(false);
                }}
                className="p-1 hover:text-red-400 text-axl-muted"
                aria-label="İptal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                {project.name}
              </h2>
              <button
                onClick={() => {
                  setEditedName(project.name);
                  setIsEditingName(true);
                }}
                className="p-1 text-axl-muted hover:text-white transition-colors"
                title="Proje adını düzenle"
                aria-label="Proje adını düzenle"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Status & Tab Navigation Controls */}
        <div className="flex items-center gap-3">
          {/* Howl Quick Action Button */}
          <button
            onClick={handleTriggerHowl}
            disabled={mascotState === 'howling'}
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded bg-axl-bg border border-axl-border hover:bg-axl-surface text-[11px] text-axl-muted hover:text-white transition-colors"
            title="AXL Kurt Ulutması"
          >
            <Volume2 className="w-3 h-3 text-axl-muted" />
            <span>Ulut</span>
          </button>

          {/* AI Model Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-axl-bg border border-axl-border text-[11px] text-axl-muted font-mono">
            <Cpu className="w-3 h-3 text-zinc-400" />
            <span>AI: Yapılandırılmadı</span>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center bg-axl-bg p-0.5 rounded-md border border-axl-border">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-axl-surface text-white shadow-xs'
                  : 'text-axl-muted hover:text-axl-text'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>Önizleme</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                activeTab === 'code'
                  ? 'bg-axl-surface text-white shadow-xs'
                  : 'text-axl-muted hover:text-axl-text'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Kod</span>
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                activeTab === 'files'
                  ? 'bg-axl-surface text-white shadow-xs'
                  : 'text-axl-muted hover:text-axl-text'
              }`}
            >
              <FolderTree className="w-3 h-3" />
              <span>Dosyalar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Body: Split Panels */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Conversation & Instructions */}
        <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-axl-border bg-axl-panel flex flex-col h-1/2 md:h-full shrink-0">
          <div className="p-3 border-b border-axl-border flex items-center justify-between text-xs text-axl-muted font-medium uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Gorev Paneli
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-axl-bg rounded">Taslak</span>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {project.messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-axl-surface text-axl-text border border-axl-border ml-2'
                    : msg.role === 'system'
                    ? 'bg-axl-bg border border-axl-border text-axl-muted italic'
                    : 'bg-axl-bg text-axl-text border border-axl-border mr-2'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] uppercase tracking-wider font-semibold text-axl-muted">
                  <span>{msg.role === 'user' ? 'Geliştirici' : msg.role === 'system' ? 'Sistem' : 'AXL AI'}</span>
                  <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}

            {/* AI Not Configured Notice Box */}
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200/90 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-medium text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>AI Entegrasyonu Beklemede</span>
              </div>
              <p className="text-[11px] leading-normal opacity-90">
                AI entegrasyonu henüz yapılandırılmadığı için canlı kod üretimi aktifleştirilmemiştir. Ayarlar panelinden bir API anahtarı bağlayabilirsiniz.
              </p>
            </div>
          </div>

          {/* Task Composer Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-axl-border bg-axl-bg">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Projeye talimat veya revizyon ekle..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="w-full bg-axl-panel border border-axl-border text-xs rounded-md pl-3 pr-8 py-2 text-axl-text placeholder-axl-muted focus:outline-none focus:border-axl-muted transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="absolute right-1.5 p-1 text-axl-muted hover:text-white disabled:opacity-40 transition-colors"
                title="Gönder"
                aria-label="Gönder"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel: View Content (Preview / Code / Files) */}
        <div className="flex-1 bg-axl-bg flex flex-col h-1/2 md:h-full overflow-hidden">
          {activeTab === 'preview' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-axl-panel border border-axl-border flex items-center justify-center text-axl-muted">
                <Layers className="w-7 h-7" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-base font-semibold text-white">Çalıştırma Motoru Bağlı Değil</h3>
                <p className="text-xs text-axl-muted leading-relaxed">
                  Uygulama önizleme ve Sandbox yürütme motoru henüz bu ortama bağlanmadı. AI üretimi ve canlı sanal önizleme sonraki aşamada aktif olacaktır.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-axl-panel border border-axl-border text-xs text-axl-muted font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Web-first Vibe Coding Sandbox</span>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="h-9 border-b border-axl-border bg-axl-panel px-3 flex items-center gap-2 text-xs font-mono text-axl-muted">
                <FileCode className="w-3.5 h-3.5 text-axl-muted" />
                <span>{selectedFile.path}</span>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-xs text-axl-text leading-relaxed bg-[#0B0B0C] selection:bg-axl-surface">
                <pre className="whitespace-pre-wrap">{selectedFile.content}</pre>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <h4 className="text-xs font-medium uppercase tracking-wider text-axl-muted mb-2">
                Proje Dosya Ağacı
              </h4>
              <div className="space-y-1">
                {project.files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => {
                      setSelectedFile(file);
                      setActiveTab('code');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-mono text-left transition-colors ${
                      selectedFile.path === file.path
                        ? 'bg-axl-surface text-white border border-axl-border'
                        : 'text-axl-muted hover:bg-axl-panel hover:text-white'
                    }`}
                  >
                    <FileCode className="w-4 h-4 shrink-0 text-axl-muted" />
                    <span className="truncate">{file.path}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
