import React, { useState } from 'react';
import { RotateCw, Smartphone, Monitor } from 'lucide-react';
import { ProjectFile } from '../../lib/storage/projectRepository';

interface BrowserPreviewProps {
  files: ProjectFile[];
  projectName: string;
}

export const BrowserPreview: React.FC<BrowserPreviewProps> = ({ files, projectName }) => {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const cssFile = files.find((f) => f.path === 'src/index.css');

  const srcDoc = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; background: #0B0B0C; color: #F5F5F5; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      ${cssFile?.content || ''}
    </style>
  </head>
  <body class="p-6 flex flex-col items-center justify-center min-h-screen">
    <div class="max-w-md w-full bg-[#18181B] border border-[#29292E] rounded-xl p-6 text-center space-y-4 shadow-2xl">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-700">
        <span class="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        <span>Canlı Sanal Önizleme</span>
      </div>
      <h2 class="text-xl font-bold text-white tracking-tight">${projectName}</h2>
      <p class="text-xs text-zinc-400 leading-relaxed">
        Bu önizleme, AXL Space sanal dosya sisteminden derlenmiştir.
      </p>
      <div class="pt-2">
        <button id="btn" class="px-5 py-2.5 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black text-xs font-bold rounded-lg transition-all duration-150 shadow-md active:scale-95 cursor-pointer">
          Tıklama: <span id="num">0</span>
        </button>
      </div>
    </div>
    <script>
      let count = 0;
      document.getElementById('btn').addEventListener('click', () => {
        count++;
        document.getElementById('num').innerText = count;
      });
    </script>
  </body>
</html>
`;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0B0B0C] overflow-hidden">
      {/* Preview Navigation Toolbar */}
      <div className="h-10 px-4 border-b border-axl-border bg-axl-panel flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-95"
            title="Yeniden Yükle"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#09090B] border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>https://axl-space.local/preview</span>
          </div>
        </div>

        {/* Viewport controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center p-0.5 rounded bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1 rounded transition-all active:scale-95 ${viewport === 'desktop' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
              title="Masaüstü görünümü"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1 rounded transition-all active:scale-95 ${viewport === 'mobile' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
              title="Mobil görünümü"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 p-4 flex items-center justify-center bg-[#070708] overflow-auto">
        <div
          className={`h-full bg-black rounded-lg border border-zinc-800 shadow-2xl overflow-hidden transition-all duration-300 ${
            viewport === 'mobile' ? 'w-[375px] max-h-[720px]' : 'w-full'
          }`}
        >
          <iframe
            key={key}
            title="AXL Sandboxed Preview"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};
