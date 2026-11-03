import React from 'react';
import { ProjectFile } from '../../lib/storage/projectRepository';
import { Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  files: ProjectFile[];
  activeFilePath: string;
  onSelectFile: (path: string) => void;
  onUpdateFileContent: (path: string, content: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  files,
  activeFilePath,
  onSelectFile,
  onUpdateFileContent,
}) => {
  const [copied, setCopied] = React.useState(false);
  const activeFile = files.find((f) => f.path === activeFilePath) || files[0];

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard?.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-xs text-axl-subtle">
        Dosya seçilmedi.
      </div>
    );
  }

  const lines = activeFile.content.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0D0D10] overflow-hidden">
      {/* File Tabs Header */}
      <div className="h-10 border-b border-axl-border bg-axl-panel flex items-center justify-between px-2 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {files.map((file) => {
            const isActive = file.path === activeFilePath;
            return (
              <div
                key={file.path}
                onClick={() => onSelectFile(file.path)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t text-xs cursor-pointer select-none transition-colors border-t-2 ${
                  isActive
                    ? 'bg-[#0D0D10] text-blue-400 border-blue-500 font-medium'
                    : 'bg-transparent text-axl-muted hover:text-white border-transparent'
                }`}
              >
                <span>{file.name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pr-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-axl-surface hover:bg-axl-hover text-axl-subtle hover:text-white text-[11px] transition-colors"
            title="Dosyayı kopyala"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
          <span className="text-[10px] font-mono text-axl-subtle uppercase px-1.5 py-0.5 rounded bg-axl-surface border border-axl-border">
            {activeFile.language}
          </span>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex-1 flex overflow-hidden font-mono text-xs leading-relaxed">
        {/* Line Numbers */}
        <div className="w-12 py-3 bg-[#09090B] border-r border-axl-border/60 text-right pr-3 select-none text-zinc-600 shrink-0">
          {lines.map((_, i) => (
            <div key={i} className="h-5 leading-5 text-[11px]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Code Buffer */}
        <div className="flex-1 relative h-full overflow-hidden">
          <textarea
            value={activeFile.content}
            onChange={(e) => onUpdateFileContent(activeFile.path, e.target.value)}
            spellCheck={false}
            className="w-full h-full p-3 bg-transparent text-zinc-200 resize-none font-mono text-xs leading-5 focus:outline-none selection:bg-blue-600/30"
          />
        </div>
      </div>
    </div>
  );
};
