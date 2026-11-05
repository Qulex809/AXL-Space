import React, { useState } from 'react';
import { PixelWolf } from '../mascot/PixelWolf';
import { Project } from '../../lib/storage/projectRepository';
import {
  Plus,
  Search,
  FolderCode,
  Settings,
  ChevronLeft,
  ChevronRight,
  Code2,
  Trash2,
  HelpCircle,
  Home,
  Bot,
  LayoutTemplate,
  Layers,
} from 'lucide-react';

export type MainNavView = 'home' | 'projects' | 'assistants' | 'templates' | 'settings';

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  activeNavView: MainNavView;
  onNavigate: (view: MainNavView) => void;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string, e: React.MouseEvent) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenSettings: () => void;
  onOpenHelper: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  activeProjectId,
  activeNavView,
  onNavigate,
  onSelectProject,
  onNewProject,
  onDeleteProject,
  isCollapsed,
  onToggleCollapse,
  onOpenSettings,
  onOpenHelper,
  isMobileOpen,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems: { id: MainNavView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: '1. Ana Sayfa', icon: Home },
    { id: 'projects', label: '2. Projelerim', icon: Layers },
    { id: 'assistants', label: '3. AI Asistanları', icon: Bot },
    { id: 'templates', label: '4. Şablonlar', icon: LayoutTemplate },
    { id: 'settings', label: '5. Ayarlar', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-axl-panel border-r border-axl-border text-axl-text select-none">
      {/* Brand & Wordmark */}
      <div className="px-4 py-3.5 border-b border-axl-border/80 flex items-center justify-between">
        <div
          onClick={() => {
            onNavigate('home');
            onCloseMobile();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-zinc-400 rounded p-1 -m-1"
          aria-label="AXL Space ana sayfası"
        >
          <PixelWolf state="idle" size="sm" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  AXL Space
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold">
                  PRO
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-axl-subtle uppercase">
                CODE · BUILD · CREATE
              </span>
            </div>
          )}
        </div>

        {/* Desktop collapse button */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1 rounded hover:bg-axl-hover text-axl-subtle hover:text-white transition-all duration-150 active:scale-95"
          aria-label={isCollapsed ? 'Kenar çubuğunu genişlet' : 'Kenar çubuğunu daralt'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Project Primary CTA Button with Lively Monochrome Feedback */}
      <div className="p-3">
        <button
          onClick={() => {
            onNewProject();
            onCloseMobile();
          }}
          className={`w-full group relative flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white hover:bg-zinc-100 text-black font-semibold text-xs transition-all duration-200 shadow-btn-subtle hover:shadow-btn-glow active:scale-[0.97] active:bg-zinc-200 border border-white/80 ${
            isCollapsed ? 'px-0' : ''
          }`}
          title="Yeni proje oluştur"
        >
          <Plus className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
          {!isCollapsed && <span className="tracking-tight">Yeni proje</span>}
        </button>
      </div>

      {/* Main 5-Section Navigation */}
      <div className="px-2 py-1 space-y-1 border-b border-axl-border/60 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeProjectId === null && activeNavView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'settings') {
                  onOpenSettings();
                } else {
                  onNavigate(item.id);
                }
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-150 active:scale-[0.98] ${
                isActive
                  ? 'bg-zinc-800/90 text-white border border-zinc-600 shadow-sm'
                  : 'text-axl-muted hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-axl-subtle'}`} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Project Search (only when expanded) */}
      {!isCollapsed && (
        <div className="px-3 pt-3 pb-1">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-axl-subtle pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Projelerde ara..."
              className="w-full bg-axl-surface border border-axl-border rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder-axl-subtle focus:outline-none focus:border-zinc-400 focus:bg-zinc-900 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Saved Projects List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        {!isCollapsed && (
          <div className="px-2 pt-2 pb-1 text-[10px] font-semibold text-axl-subtle uppercase tracking-wider flex items-center justify-between">
            <span>Son Çalışmalar</span>
            <span className="font-mono text-[9px] text-zinc-500">({filteredProjects.length})</span>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          !isCollapsed && (
            <div className="px-3 py-6 text-center text-xs text-axl-subtle">
              {searchQuery ? (
                'Eşleşen proje bulunamadı'
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <FolderCode className="w-6 h-6 text-zinc-700" />
                  <span className="text-[11px]">Henüz kaydedilmiş proje yok</span>
                </div>
              )}
            </div>
          )
        ) : (
          filteredProjects.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
              <div
                key={project.id}
                onClick={() => {
                  onSelectProject(project.id);
                  onCloseMobile();
                }}
                className={`group flex items-center justify-between px-2.5 py-2 rounded-md text-xs cursor-pointer transition-all duration-150 active:scale-[0.99] ${
                  isActive
                    ? 'bg-zinc-800 text-white font-medium border border-zinc-600 shadow-sm'
                    : 'text-axl-muted hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
                title={project.name}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Code2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-axl-subtle'}`} />
                  {!isCollapsed && (
                    <div className="min-w-0 flex flex-col">
                      <span className="truncate">{project.name}</span>
                      <span className="text-[10px] text-axl-subtle truncate">{project.category}</span>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <button
                    onClick={(e) => onDeleteProject(project.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 rounded transition-opacity"
                    aria-label={`Sil: ${project.name}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-2 border-t border-axl-border/80 space-y-1">
        <button
          onClick={onOpenHelper}
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-axl-muted hover:text-white hover:bg-zinc-900 transition-colors active:scale-98"
          title="Kurt Rehberi ve İpuçları"
        >
          <HelpCircle className="w-4 h-4 shrink-0 text-zinc-400" />
          {!isCollapsed && <span>Rehber ve İpuçları</span>}
        </button>

        {/* Profile / Account Placeholder */}
        <div className="pt-2 border-t border-axl-border/40 px-2.5 py-1 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono text-zinc-200 shrink-0 font-bold">
            AX
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="text-xs text-axl-text font-medium truncate">Geliştirici Hesabı</div>
              <div className="text-[10px] text-axl-subtle truncate">Yerel Oturum · Standart Plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col transition-all duration-200 shrink-0 h-screen sticky top-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
