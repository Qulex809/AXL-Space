import React from 'react';
import { PixelWolf } from '../mascot/PixelWolf';
import { Project } from '../../lib/storage/projectRepository';
import {
  Plus,
  Search,
  Folder,
  Settings,
  ChevronLeft,
  ChevronRight,
  Code2,
  Trash2,
  X,
  User,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProject: (id: string | null) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string, e: React.MouseEvent) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  activeProjectId,
  searchQuery,
  onSearchChange,
  onSelectProject,
  onNewProject,
  onDeleteProject,
  isOpen,
  onToggleOpen,
  onOpenSettings,
}) => {
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.initialPrompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-xs z-30"
          onClick={onToggleOpen}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 bg-axl-panel border-r border-axl-border flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="h-14 border-b border-axl-border flex items-center justify-between px-3.5 shrink-0">
          <button
            onClick={() => onSelectProject(null)}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="AXL Space Ana Sayfa"
          >
            <PixelWolf expression="idle" size="md" className="shrink-0" />
            {isOpen && (
              <div className="overflow-hidden">
                <span className="font-semibold text-sm tracking-tight text-white group-hover:text-axl-muted transition-colors block leading-none">
                  AXL Space
                </span>
                <span className="text-[10px] text-axl-muted font-mono tracking-widest uppercase block mt-0.5">
                  Vibe Studio
                </span>
              </div>
            )}
          </button>

          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-md text-axl-muted hover:text-white hover:bg-axl-surface transition-colors focus:outline-none"
            aria-label={isOpen ? 'Kenar çubuğunu daralt' : 'Kenar çubuğunu genişlet'}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Action: New Project */}
        <div className="p-3 shrink-0">
          <button
            onClick={onNewProject}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-zinc-200 text-black font-medium text-xs rounded-md transition-colors shadow-sm focus:outline-none ${
              !isOpen ? 'px-2' : ''
            }`}
            title="Yeni Proje"
          >
            <Plus className="w-4 h-4 shrink-0 stroke-[2.5]" />
            {isOpen && <span>Yeni proje</span>}
          </button>
        </div>

        {/* Search Field */}
        {isOpen && (
          <div className="px-3 pb-2 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-axl-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Projelerde ara..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-axl-bg border border-axl-border text-xs rounded-md pl-8 pr-7 py-1.5 text-axl-text placeholder-axl-muted focus:outline-none focus:border-axl-muted transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-axl-muted hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Project Navigation / History */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {isOpen && (
            <div className="px-2 py-1 flex items-center justify-between text-[11px] font-medium text-axl-muted uppercase tracking-wider">
              <span>Projelerim</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-axl-surface rounded">
                {projects.length}
              </span>
            </div>
          )}

          {/* Genuine Empty State when no projects exist */}
          {projects.length === 0 ? (
            isOpen ? (
              <div className="px-3 py-8 text-center text-axl-muted border border-dashed border-axl-border/60 rounded-lg my-2 bg-axl-bg/40">
                <Folder className="w-6 h-6 mx-auto mb-2 text-axl-muted opacity-60" />
                <p className="text-xs font-medium text-axl-text">Henüz proje yok</p>
                <p className="text-[11px] mt-1 text-axl-muted">
                  Yeni bir fikir yazarak ilk projenizi başlatın.
                </p>
              </div>
            ) : (
              <div className="flex justify-center py-4 text-axl-muted" title="Henüz proje yok">
                <Folder className="w-4 h-4 opacity-50" />
              </div>
            )
          ) : filteredProjects.length === 0 ? (
            isOpen && (
              <div className="px-3 py-4 text-center text-xs text-axl-muted">
                Aramayla eşleşen proje bulunamadı.
              </div>
            )
          ) : (
            filteredProjects.map((project) => {
              const isActive = activeProjectId === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className={`group relative flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer text-xs transition-colors ${
                    isActive
                      ? 'bg-axl-surface text-white font-medium border border-axl-border'
                      : 'text-axl-muted hover:bg-axl-surface/60 hover:text-axl-text'
                  }`}
                  title={project.name}
                >
                  <Code2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-axl-muted'}`} />
                  {isOpen && (
                    <span className="truncate flex-1 text-left">{project.name}</span>
                  )}
                  {isOpen && (
                    <button
                      onClick={(e) => onDeleteProject(project.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 rounded transition-opacity"
                      title="Projeyi sil"
                      aria-label={`${project.name} projesini sil`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Settings & Profile Placeholder */}
        <div className="p-2 border-t border-axl-border shrink-0 space-y-1">
          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-axl-muted hover:text-white hover:bg-axl-surface transition-colors ${
              !isOpen ? 'justify-center' : ''
            }`}
            title="Ayarlar ve AI Sağlayıcıları"
          >
            <Settings className="w-4 h-4 shrink-0" />
            {isOpen && <span>Ayarlar & Entegrasyonlar</span>}
          </button>

          <div
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-axl-muted bg-axl-bg/50 border border-axl-border/50 ${
              !isOpen ? 'justify-center' : ''
            }`}
            title="Geliştirici Profili (Yerel Oturum)"
          >
            <div className="w-5 h-5 rounded-full bg-axl-surface flex items-center justify-center border border-axl-border shrink-0">
              <User className="w-3 h-3 text-axl-muted" />
            </div>
            {isOpen && (
              <div className="overflow-hidden flex-1 leading-tight">
                <span className="block font-medium text-axl-text truncate">Yerel Alan</span>
                <span className="block text-[10px] text-axl-muted truncate flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Supabase Hazır
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
