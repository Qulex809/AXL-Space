import React, { useState } from 'react';
import { Project, PROJECT_CATEGORIES } from '../../lib/storage/projectRepository';
import {
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
  FileCode2,
} from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string, e: React.MouseEvent) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onNewProject,
  onDeleteProject,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.initialPrompt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 flex flex-col p-6 sm:p-8 max-w-6xl mx-auto w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-axl-border">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>KAYITLI PROJELER</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projelerim</h1>
          <p className="text-xs text-axl-muted mt-1">
            Yerel depolama alanında kayıtlı tüm AXL Space vibing projeleriniz ({projects.length})
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Yeni Proje Başlat</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-axl-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Proje adı veya prompt içeriğinde ara..."
            className="w-full bg-axl-panel border border-axl-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-axl-subtle focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-axl-surface text-blue-400 border border-blue-500/30'
                : 'bg-axl-panel text-axl-muted border border-axl-border hover:text-white'
            }`}
          >
            Tümü ({projects.length})
          </button>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-axl-surface text-blue-400 border border-blue-500/30'
                  : 'bg-axl-panel text-axl-muted border border-axl-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-axl-border bg-axl-panel/40">
          <FileCode2 className="w-12 h-12 text-zinc-600 mb-3" />
          <h3 className="text-sm font-semibold text-white">Eşleşen Proje Bulunamadı</h3>
          <p className="text-xs text-axl-muted mt-1 max-w-sm">
            Arama kriterlerinizi değiştirebilir veya yeni bir yapay zekâ kodlama projesi başlatabilirsiniz.
          </p>
          <button
            onClick={onNewProject}
            className="mt-4 px-4 py-2 bg-axl-surface border border-axl-border hover:border-zinc-500 text-xs text-white font-medium rounded-lg transition-colors"
          >
            Hemen Proje Oluştur
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className="group flex flex-col justify-between p-4 rounded-xl bg-axl-panel border border-axl-border hover:border-blue-500/50 hover:bg-axl-surface/70 cursor-pointer transition-all duration-150"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Code2 className="w-3 h-3" />
                    {proj.category}
                  </span>
                  <button
                    onClick={(e) => onDeleteProject(proj.id, e)}
                    className="p-1 rounded text-axl-subtle hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Projeyi sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {proj.name}
                </h3>

                <p className="text-xs text-axl-muted mt-2 line-clamp-2 leading-relaxed">
                  {proj.initialPrompt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-axl-border/60 flex items-center justify-between text-[11px] text-axl-subtle">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400 font-medium">
                  <span>Çalışma Alanı</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
