import React, { useState } from 'react';
import { PixelWolf } from '../mascot/PixelWolf';
import {
  Plus,
  Search,
  Folder,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Trash2,
  X,
  Code2,
} from 'lucide-react';
import { ProjectSummary } from '../../types/project';

interface SidebarProps {
  projects: ProjectSummary[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onDeleteProject?: (id: string) => void;
  onOpenSettings: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onNewProject,
  onDeleteProject,
  onOpenSettings,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.initialPrompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111113] border-r border-[#29292E] text-[#F5F5F5] select-none">
      {/* Brand & Mascot Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#29292E]">
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={onNewProject}
          title="AXL Space Ana Sayfa"
        >
          <PixelWolf size="sm" state="idle" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
                AXL Space
              </span>
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-mono">
                Vibe Coding
              </span>
            </div>
          )}
        </div>

        {/* Mobile close button or Desktop collapse toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-[#A1A1AA] hover:text-white hover:bg-[#18181B] rounded-md"
            aria-label="Menüyü Kapat"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 text-[#A1A1AA] hover:text-white hover:bg-[#18181B] rounded-md transition-colors"
            title={isCollapsed ? 'Sidebar Genişlet' : 'Sidebar Daralt'}
            aria-label={isCollapsed ? 'Sidebar Genişlet' : 'Sidebar Daralt'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Action: New Project */}
      <div className="p-3">
        <button
          onClick={() => {
            onNewProject();
            onCloseMobile();
          }}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 bg-white text-black font-medium text-xs rounded-lg hover:bg-zinc-200 transition-all focus:outline-none focus:ring-2 focus:ring-white active:scale-[0.98] ${
            isCollapsed ? 'px-0 justify-center' : ''
          }`}
          title="Yeni Proje Oluştur"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Yeni Proje</span>}
        </button>
      </div>

      {/* Search Input (Only when expanded) */}
      {!isCollapsed && (
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Projelerde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#18181B] border border-[#29292E] rounded-md text-xs text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
        {!isCollapsed && (
          <div className="px-2 py-1.5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
            Projelerim ({filteredProjects.length})
          </div>
        )}

        {filteredProjects.length === 0 ? (
          !isCollapsed && (
            <div className="px-3 py-6 text-center text-xs text-[#A1A1AA] border border-dashed border-[#29292E] rounded-lg m-1">
              <Folder className="w-5 h-5 mx-auto mb-1.5 opacity-40" />
              {searchQuery ? 'Aramayla eşleşen proje bulunamadı' : 'Henüz kaydedilmiş proje yok.'}
            </div>
          )
        ) : (
          filteredProjects.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
              <div
                key={project.id}
                className={`group relative flex items-center justify-between rounded-md text-xs transition-colors ${
                  isActive
                    ? 'bg-[#18181B] text-white font-medium border border-[#29292E]'
                    : 'text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#18181B]/60'
                }`}
              >
                <button
                  onClick={() => {
                    onSelectProject(project.id);
                    onCloseMobile();
                  }}
                  className={`flex-1 flex items-center gap-2.5 px-2.5 py-2 text-left truncate ${
                    isCollapsed ? 'justify-center px-0' : ''
                  }`}
                  title={project.title}
                >
                  <Code2 className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                  {!isCollapsed && <span className="truncate">{project.title}</span>}
                </button>

                {!isCollapsed && onDeleteProject && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-[#A1A1AA] hover:text-red-400 rounded transition-opacity mr-1"
                    title="Projeyi Sil"
                    aria-label={`${project.title} projesini sil`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer / User Profile & Settings */}
      <div className="p-2 border-t border-[#29292E] space-y-1">
        <button
          onClick={onOpenSettings}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Ayarlar"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Ayarlar</span>}
        </button>

        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-[#A1A1AA] ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Yerel Kullanıcı"
        >
          <div className="w-5 h-5 rounded-full bg-[#18181B] border border-[#29292E] flex items-center justify-center flex-shrink-0 text-white">
            <User className="w-3 h-3" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs text-white truncate">Geliştirici</span>
              <span className="text-[10px] text-[#A1A1AA] truncate">Yerel Oturum</span>
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
        className={`hidden md:block transition-all duration-200 h-screen flex-shrink-0 z-20 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        >
          <aside
            className="w-72 h-full bg-[#111113]"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
