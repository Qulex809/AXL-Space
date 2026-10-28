import React, { useState } from 'react';
import { Project } from '../../types/project';
import { PixelWolf } from '../mascot/PixelWolf';
import {
  Play,
  Code,
  FolderTree,
  Send,
  AlertCircle,
  Copy,
  Check,
  Edit2,
  Cpu,
  Menu,
} from 'lucide-react';

interface WorkspaceProps {
  project: Project;
  onUpdateTitle: (title: string) => void;
  onSendMessage: (message: string) => void;
  onOpenMobileMenu: () => void;
}

type WorkspaceTab = 'preview' | 'code' | 'files';

export const Workspace: React.FC<WorkspaceProps> = ({
  project,
  onUpdateTitle,
  onSendMessage,
  onOpenMobileMenu,
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('preview');
  const [inputMessage, setInputMessage] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(
    project.files.length > 0 ? project.files[0].path : null
  );
  const [copied, setCopied] = useState(false);

  const handleTitleSubmit = () => {
    if (editedTitle.trim()) {
      onUpdateTitle(editedTitle.trim());
    } else {
      setEditedTitle(project.title);
    }
    setIsEditingTitle(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage.trim());
    setInputMessage('');
  };

  const selectedFile = project.files.find((f) => f.path === selectedFilePath);

  const handleCopyCode = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0B0C] text-[#F5F5F5] overflow-hidden">
      {/* Workspace Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-[#111113] border-b border-[#29292E] z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 text-[#A1A1AA] hover:text-white rounded-md hover:bg-[#18181B]"
            aria-label="Menüyü Aç"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Project Title Editor */}
          {isEditingTitle ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
              autoFocus
              className="bg-[#18181B] border border-[#29292E] rounded px-2 py-1 text-sm font-semibold text-white focus:outline-none focus:border-zinc-400"
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="flex items-center gap-2 group text-sm font-semibold text-white hover:text-zinc-300 transition-colors"
              title="Başlığı Düzenle"
            >
              <span className="truncate max-w-[200px] md:max-w-md">{project.title}</span>
              <Edit2 className="w-3.5 h-3.5 text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* AI Provider Status Control Placeholder */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#18181B] border border-[#29292E] rounded-full text-xs text-[#A1A1AA]">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Model:</span>
            <span className="font-mono text-[11px] text-zinc-300">Unconfigured</span>
          </div>
        </div>
      </header>

      {/* Workspace Panels (Desktop Split or Mobile Tabs) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Conversation & Task Log Panel */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col bg-[#111113] border-r border-[#29292E] h-1/2 md:h-full flex-shrink-0">
          <div className="p-3 border-b border-[#29292E] flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Görevler & Konuşma
            </span>
            <span className="text-[10px] font-mono text-[#A1A1AA]">
              {project.messages.length} mesaj
            </span>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {project.messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#18181B] border border-[#29292E] text-white ml-4'
                    : msg.role === 'system'
                    ? 'bg-amber-950/20 border border-amber-900/40 text-amber-200'
                    : 'bg-[#18181B]/80 border border-[#29292E] text-zinc-300 mr-4'
                }`}
              >
                <div className="flex items-center justify-between mb-1 opacity-60 text-[10px] font-mono">
                  <span>{msg.role === 'user' ? 'Geliştirici' : msg.role === 'system' ? 'Sistem' : 'AXL AI'}</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
          </div>

          {/* Bottom Task Input Composer */}
          <div className="p-3 border-t border-[#29292E] bg-[#111113]">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Bir revizyon iste..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-[#18181B] border border-[#29292E] rounded-lg px-3 py-2 text-xs text-white placeholder-[#A1A1AA] focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 bg-white text-black rounded-lg hover:bg-zinc-200 disabled:opacity-40 transition-colors"
                title="Gönder"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right / Preview & Code & Files Workspace Panel */}
        <div className="flex-1 flex flex-col h-1/2 md:h-full bg-[#0B0B0C] overflow-hidden">
          {/* Workspace Subtabs Header */}
          <div className="flex items-center justify-between px-3 bg-[#111113] border-b border-[#29292E]">
            <div className="flex">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'border-white text-white bg-[#18181B]/50'
                    : 'border-transparent text-[#A1A1AA] hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Önizleme</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === 'code'
                    ? 'border-white text-white bg-[#18181B]/50'
                    : 'border-transparent text-[#A1A1AA] hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Kod</span>
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === 'files'
                    ? 'border-white text-white bg-[#18181B]/50'
                    : 'border-transparent text-[#A1A1AA] hover:text-white'
                }`}
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span>Dosyalar ({project.files.length})</span>
              </button>
            </div>

            {/* Action buttons (e.g. copy code) */}
            {activeTab === 'code' && selectedFile && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-[#18181B] border border-[#29292E] rounded text-[#A1A1AA] hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            )}
          </div>

          {/* Main View Area based on tab */}
          <div className="flex-1 overflow-auto p-4 flex flex-col">
            {activeTab === 'preview' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#111113] border border-[#29292E] rounded-xl my-auto">
                <PixelWolf size="lg" state="thinking" />
                <h3 className="mt-4 text-base font-semibold text-white">
                  Önizleme Motoru Bağlanmadı
                </h3>
                <p className="mt-2 text-xs text-[#A1A1AA] max-w-md leading-relaxed">
                  AXL Space henüz bir yapay zeka sağlayıcısına bağlanmadığı için bu proje için canlı önizleme ve kod üretimi gerçekleştirilemedi.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#18181B] border border-[#29292E] rounded-lg text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Google AI Studio veya Gemini API entegrasyonu bekleniyor.</span>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="flex-1 flex flex-col bg-[#111113] border border-[#29292E] rounded-xl overflow-hidden">
                {selectedFile ? (
                  <>
                    <div className="px-4 py-2 bg-[#18181B] border-b border-[#29292E] text-xs font-mono text-[#A1A1AA]">
                      {selectedFile.path}
                    </div>
                    <pre className="p-4 font-mono text-xs text-zinc-200 overflow-auto flex-1 leading-relaxed">
                      <code>{selectedFile.content}</code>
                    </pre>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-xs text-[#A1A1AA] p-8">
                    <Code className="w-8 h-8 opacity-40 mb-2" />
                    <span>Bu projede henüz üretilmiş dosya bulunmuyor.</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'files' && (
              <div className="flex-1 bg-[#111113] border border-[#29292E] rounded-xl p-4">
                <h4 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-3">
                  Proje Dosya Ağacı
                </h4>
                {project.files.length === 0 ? (
                  <div className="text-xs text-[#A1A1AA] py-4 italic">
                    Dosya yok. Kod üretildiğinde dosyalar burada listelenecek.
                  </div>
                ) : (
                  <ul className="space-y-1 font-mono text-xs">
                    {project.files.map((file) => (
                      <li key={file.path}>
                        <button
                          onClick={() => {
                            setSelectedFilePath(file.path);
                            setActiveTab('code');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md hover:bg-[#18181B] transition-colors flex items-center justify-between ${
                            selectedFilePath === file.path ? 'bg-[#18181B] text-white font-medium' : 'text-[#A1A1AA]'
                          }`}
                        >
                          <span>{file.path}</span>
                          <span className="text-[10px] text-zinc-500">
                            {file.content.length} B
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
