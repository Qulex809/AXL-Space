import React, { useState } from 'react';
import { ProjectFile } from '../../lib/storage/projectRepository';
import { FolderTree, FileCode, Plus, Folder, FileText, ChevronDown, ChevronRight } from 'lucide-react';

interface FileExplorerProps {
  files: ProjectFile[];
  activeFilePath: string;
  onSelectFile: (path: string) => void;
  onAddFile: (path: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFilePath,
  onSelectFile,
  onAddFile,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newPathInput, setNewPathInput] = useState('');
  const [isSrcOpen, setIsSrcOpen] = useState(true);

  const handleAddSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newPathInput.trim()) return;
    onAddFile(newPathInput.trim());
    setNewPathInput('');
    setIsAdding(false);
  };

  const srcFiles = files.filter((f) => f.path.startsWith('src/'));
  const rootFiles = files.filter((f) => !f.path.startsWith('src/'));

  return (
    <div className="w-56 shrink-0 bg-axl-panel border-r border-axl-border flex flex-col h-full select-none text-xs">
      {/* Explorer Header */}
      <div className="px-3 py-2 border-b border-axl-border flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
          <FolderTree className="w-3.5 h-3.5 text-zinc-400" />
          <span>Dosya Gezgini</span>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-95"
          title="Yeni dosya ekle"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add File Input prompt */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="p-2 border-b border-axl-border bg-zinc-900/60">
          <input
            type="text"
            value={newPathInput}
            onChange={(e) => setNewPathInput(e.target.value)}
            placeholder="src/components/MyComponent.tsx"
            autoFocus
            className="w-full bg-black border border-zinc-500 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-white transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsAdding(false);
            }}
          />
          <div className="flex justify-end gap-1 mt-1 text-[10px]">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-2 py-0.5 rounded text-zinc-400 hover:text-white transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-2.5 py-0.5 rounded bg-white hover:bg-zinc-200 text-black font-semibold shadow-btn-subtle active:scale-95 transition-all"
            >
              Ekle
            </button>
          </div>
        </form>
      )}

      {/* Tree list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 font-mono text-[11px]">
        {/* src directory */}
        <div>
          <button
            onClick={() => setIsSrcOpen(!isSrcOpen)}
            className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            {isSrcOpen ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronRight className="w-3 h-3 text-zinc-500" />}
            <Folder className="w-3.5 h-3.5 text-zinc-300" />
            <span className="font-medium text-zinc-200">src</span>
          </button>

          {isSrcOpen && (
            <div className="pl-4 space-y-0.5 mt-0.5 border-l border-zinc-800 ml-2.5">
              {srcFiles.map((file) => {
                const isActive = file.path === activeFilePath;
                return (
                  <button
                    key={file.path}
                    onClick={() => onSelectFile(file.path)}
                    className={`w-full flex items-center gap-2 px-2 py-1 rounded transition-all text-left truncate active:scale-[0.99] ${
                      isActive
                        ? 'bg-zinc-800 text-white font-medium border border-zinc-600 shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                    }`}
                  >
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Root level files */}
        <div className="pt-1 space-y-0.5">
          {rootFiles.map((file) => {
            const isActive = file.path === activeFilePath;
            return (
              <button
                key={file.path}
                onClick={() => onSelectFile(file.path)}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded transition-all text-left truncate active:scale-[0.99] ${
                  isActive
                    ? 'bg-zinc-800 text-white font-medium border border-zinc-600 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                <span className="truncate">{file.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
