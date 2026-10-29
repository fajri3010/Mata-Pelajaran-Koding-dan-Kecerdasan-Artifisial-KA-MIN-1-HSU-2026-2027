import React, { useEffect } from 'react';
import { X, Volume2, CheckCircle2, Bookmark, Cpu } from 'lucide-react';
import { HardwareItem } from '../types';
import { voiceEngine } from '../utils/speechVoice';
import { sounds } from '../utils/soundEffects';

interface ComponentDetailModalProps {
  item: HardwareItem | null;
  onClose: () => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleSpeakDetails = () => {
    sounds.playClick();
    const narration = `${item.name}. ${item.fullDefinition}. Fungsi utama: ${item.functions.join('. ')}.`;
    voiceEngine.speak(narration);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                {item.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{item.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{item.isInternal ? 'Komponen Internal CPU' : 'Perangkat Eksternal'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakDetails}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              title="Dengarkan Penjelasan Suara"
            >
              <Volume2 className="h-4 w-4" />
              <span className="hidden sm:inline">Dengarkan Suara</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Tutup Detail"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Real component image showcase */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-mono text-cyan-300 border border-slate-800">
                Dokumentasi Unit Perangkat Asli
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Koding & KA MIN 1 HSU
              </span>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          {item.highlightSpecs && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {item.highlightSpecs.map((spec, i) => (
                <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] font-mono uppercase text-slate-400">{spec.label}</div>
                  <div className="text-sm font-bold text-cyan-400 font-display mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Definition */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Pengertian & Cara Kerja
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/80">
              {item.fullDefinition}
            </p>
          </div>

          {/* Core Functions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Fungsi-Fungsi Utama
            </h3>
            <div className="space-y-2">
              {item.functions.map((func, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{func}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Types or Specs from notes */}
          {item.typesOrSpecs && item.typesOrSpecs.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Jenis / Tipe Komponen yang Sering Digunakan
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.typesOrSpecs.map((type, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs text-slate-200 font-mono"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes Citation */}
          <div className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-300">
            <Bookmark className="h-4 w-4 shrink-0 text-cyan-400" />
            <span>{item.notesOrigin}</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-950/60 flex justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
