import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { voiceEngine } from '../utils/speechVoice';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCertificateDirect?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = voiceEngine.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
    if (nextMuted) {
      voiceEngine.stop();
    } else {
      sounds.playClick();
      voiceEngine.speak('Suara narasi diaktifkan.');
    }
  };

  const navItems = [
    { id: 'materi', label: 'Materi Hardware' },
    { id: 'ai', label: 'Gemini AI' },
    { id: 'rakit', label: 'Game Rakit PC' },
    { id: 'pilah', label: 'Pilah Komponen' },
    { id: 'kuis', label: 'Kuis & Sertifikat' },
  ];

  const handleNavClick = (id: string) => {
    sounds.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => handleNavClick('materi')}
          className="group flex items-center gap-2 text-left whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
              Koding & KA
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 ml-2">
              MIN 1 Hulu Sungai Utara
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-cyan-400 py-1 ${
                activeTab === item.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Suara & Narasi' : 'Matikan Suara & Narasi'}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              isMuted
                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                : isSpeaking
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                : 'bg-slate-800/80 text-cyan-400 border border-slate-700 hover:border-cyan-500/50'
            }`}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {isMuted ? 'Suara Senyap' : isSpeaking ? 'Narator Membaca...' : 'Audio Aktif'}
            </span>
          </button>

          <button
            onClick={() => handleNavClick('kuis')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400 whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20"
          >
            Mulai Kuis
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-5 md:hidden">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-left ${
                  activeTab === item.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('kuis')}
                className="w-full rounded-lg bg-cyan-500 py-2.5 text-center text-sm font-bold text-slate-950 hover:bg-cyan-400"
              >
                Mulai Kuis & Ambil Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
