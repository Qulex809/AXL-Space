import React, { useState } from 'react';
import { Terminal, Trash2, Info, AlertTriangle, XCircle } from 'lucide-react';
import { ConsoleLog } from '../../lib/storage/projectRepository';

interface ConsoleDiagnosticsProps {
  logs: ConsoleLog[];
  onClearLogs?: () => void;
}

export const ConsoleDiagnostics: React.FC<ConsoleDiagnosticsProps> = ({ logs, onClearLogs }) => {
  const [filter, setFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    return log.level === filter;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090B] overflow-hidden text-xs font-mono">
      {/* Console Header */}
      <div className="h-10 px-4 border-b border-axl-border bg-axl-panel flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Konsol ve Tanılama</span>
          </div>

          <div className="flex items-center gap-1">
            {(['all', 'info', 'warn', 'error'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                  filter === lvl
                    ? 'bg-axl-surface text-white border border-axl-border'
                    : 'text-axl-subtle hover:text-zinc-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {onClearLogs && (
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1 px-2 py-1 rounded bg-axl-surface hover:bg-axl-hover text-axl-subtle hover:text-white text-[10px] transition-colors"
            title="Konsolu temizle"
          >
            <Trash2 className="w-3 h-3" />
            <span>Temizle</span>
          </button>
        )}
      </div>

      {/* Log Entries */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {filteredLogs.length === 0 ? (
          <div className="text-zinc-600 text-center py-8">
            Konsol çıktısı veya hata kaydı bulunmuyor.
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isWarn = log.level === 'warn';
            const isError = log.level === 'error';
            return (
              <div
                key={log.id}
                className={`flex items-start gap-2 p-2 rounded border text-[11px] leading-relaxed ${
                  isError
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : isWarn
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-axl-surface/50 border-axl-border/60 text-zinc-300'
                }`}
              >
                {isError ? (
                  <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                ) : isWarn ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-axl-subtle mb-0.5">
                    {log.source && <span className="font-semibold text-zinc-400">[{log.source}]</span>}
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="break-words">{log.message}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
