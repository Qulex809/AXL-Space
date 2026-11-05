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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>KAYITLI PROJELER</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projelerim</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Yerel depolama alanında kayıtlı tüm AXL Space vibing projeleriniz ({projects.length})
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 text-black text-xs font-bold rounded-lg shadow-btn-subtle hover:shadow-btn-glow active:scale-95 transition-all duration-150 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Yeni Proje Başlat</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Proje adı veya prompt içeriğinde ara..."
            className="w-full bg-[#111113] border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 active:scale-95 ${
              selectedCategory === 'all'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'bg-[#111113] text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Tümü ({projects.length})
          </button>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-[#111113] text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-zinc-800 bg-[#111113]/40">
          <FileCode2 className="w-12 h-12 text-zinc-700 mb-3" />
          <h3 className="text-sm font-semibold text-white">Eşleşen Proje Bulunamadı</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm">
            Arama kriterlerinizi değiştirebilir veya yeni bir yapay zekâ kodlama projesi başlatabilirsiniz.
          </p>
          <button
            onClick={onNewProject}
            className="mt-4 px-4 py-2 bg-white hover:bg-zinc-100 text-black text-xs font-semibold rounded-lg shadow-btn-subtle active:scale-95 transition-all"
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
              className="group flex flex-col justify-between p-4 rounded-xl bg-[#111113] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80 cursor-pointer transition-all duration-150 active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                    <Code2 className="w-3 h-3 text-zinc-400" />
                    {proj.category}
                  </span>
                  <button
                    onClick={(e) => onDeleteProject(proj.id, e)}
                    className="p-1 rounded text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                    title="Projeyi sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
                  {proj.name}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {proj.initialPrompt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-300 group-hover:text-white font-medium transition-colors">
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
