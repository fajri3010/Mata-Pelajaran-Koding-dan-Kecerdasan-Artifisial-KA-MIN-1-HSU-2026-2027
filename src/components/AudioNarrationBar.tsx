import React, { useState, useEffect } from 'react';
import { Volume2, Square, Play, Pause, FastForward } from 'lucide-react';
import { voiceEngine } from '../utils/speechVoice';
import { sounds } from '../utils/soundEffects';

export const AudioNarrationBar: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [speed, setSpeed] = useState<number>(0.95);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const unsub = voiceEngine.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      if (text) setCurrentText(text);
      if (!speaking) setIsPaused(false);
    });
    return unsub;
  }, []);

  if (!isSpeaking && !currentText) return null;

  const handleStop = () => {
    sounds.playClick();
    voiceEngine.stop();
    setCurrentText('');
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    sounds.playClick();
    if (isPaused) {
      voiceEngine.resume();
      setIsPaused(false);
    } else {
      voiceEngine.pause();
      setIsPaused(true);
    }
  };

  const handleCycleSpeed = () => {
    sounds.playClick();
    const nextSpeed = speed === 0.95 ? 1.15 : speed === 1.15 ? 0.8 : 0.95;
    setSpeed(nextSpeed);
    // If speaking, replay with new speed
    if (isSpeaking && currentText) {
      voiceEngine.speak(currentText, { rate: nextSpeed });
    }
  };

  return (
    <aside aria-label="Audio Narasi" className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md sm:bottom-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Voice waveform and speaking status */}
        <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Volume2 className="h-5 w-5 animate-pulse" />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Pengisi Suara Narator
              </span>
              {/* Subtle animated audio equalizer bars */}
              {isSpeaking && !isPaused && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-cyan-400 h-2 animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-1 bg-cyan-400 h-3 animate-[pulse_0.6s_ease-in-out_infinite_0.1s]" />
                  <span className="w-1 bg-cyan-400 h-1.5 animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
                  <span className="w-1 bg-cyan-400 h-3 animate-[pulse_0.7s_ease-in-out_infinite_0.15s]" />
                </div>
              )}
            </div>
            <p className="truncate text-xs text-slate-300">
              {currentText || 'Mendengarkan penjelasan materi...'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={handleCycleSpeed}
            title="Ubah Kecepatan Suara"
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-300 hover:border-cyan-500/40"
          >
            <FastForward className="h-3.5 w-3.5 text-cyan-400" />
            <span>{speed}x</span>
          </button>

          <button
            onClick={handlePauseResume}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20"
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            <span>{isPaused ? 'Lanjut' : 'Jeda'}</span>
          </button>

          <button
            onClick={handleStop}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40"
          >
            <Square className="h-3.5 w-3.5" />
            <span>Tutup</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
