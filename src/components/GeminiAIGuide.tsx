import React, { useState } from 'react';
import { Sparkles, Volume2, Code2, BarChart3, Bot, Languages, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import { GEMINI_AI_MATERIAL } from '../data/learningData';
import { voiceEngine } from '../utils/speechVoice';
import { sounds } from '../utils/soundEffects';

export const GeminiAIGuide: React.FC = () => {
  const [activeFuncIndex, setActiveFuncIndex] = useState<number>(0);
  const [interactiveResult, setInteractiveResult] = useState<string | null>(null);

  const activeFunction = GEMINI_AI_MATERIAL.fiveCoreFunctions[activeFuncIndex];

  const handleSpeakFunction = (func: typeof activeFunction) => {
    sounds.playClick();
    const text = `Fungsi ${func.number}: ${func.title}. ${func.detail}`;
    voiceEngine.speak(text);
  };

  const getFunctionIcon = (num: string) => {
    switch (num) {
      case '1': return <PenTool className="h-5 w-5" />;
      case '2': return <BarChart3 className="h-5 w-5" />;
      case '3': return <Code2 className="h-5 w-5" />;
      case '4': return <Bot className="h-5 w-5" />;
      case '5': return <Languages className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const handleRunInteractiveDemo = (num: string) => {
    sounds.playSuccess();
    switch (num) {
      case '1':
        setInteractiveResult(
          '✨ Hasil Pembuatan Konten:\n"Komputer di MIN 1 HSU menyatukan logika dan seni koding untuk masa depan cemerlang!" (Disusun otomatis dalam 0.3 detik)'
        );
        break;
      case '2':
        setInteractiveResult(
          '📊 Hasil Analisis Data:\n"Dari 100 data komponen komputer di laboratorium: 98% berfungsi prima, suhu rata-rata CPU 42°C, rekomendasi: bersihkan filter debu kipas."'
        );
        break;
      case '3':
        setInteractiveResult(
          '💻 Hasil Pengembangan Aplikasi:\nfunction hitungNilai(skor) {\n  return skor >= 70 ? "Selamat Lulus Koding!" : "Ayo Coba Lagi";\n} // Bug diperbaiki & sintaks tervalidasi!'
        );
        break;
      case '4':
        setInteractiveResult(
          '🤖 Percakapan Interaktif Chatbot:\nSiswa: "Gemini, apa itu PSU?"\nGemini AI: "Halo temanku di MIN 1 HSU! PSU adalah Power Supply Unit yang mengubah arus AC stopkontak jadi DC stabil untuk komputermu!"'
        );
        break;
      case '5':
        setInteractiveResult(
          '🌐 Penerjemahan Bahasa (NLP):\nTeks Asli: "We love learning Artificial Intelligence and Coding at MIN 1 Hulu Sungai Utara!"\nTerjemahan Alami: "Kami senang belajar Kecerdasan Artifisial dan Koding di MIN 1 Hulu Sungai Utara!"'
        );
        break;
    }
  };

  return (
    <section className="py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>Materi Pembelajaran 04</span>
            <span aria-hidden="true">·</span>
            <span>Kecerdasan Artifisial (AI)</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mt-1">
            5 Fungsi Utama Google Gemini AI
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Diambil dari materi catatan siswa Raisya (Kelas VI B): Memahami bagaimana AI modern berpikir, membantu memprogram, menganalisis, dan menerjemahkan bahasa.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            voiceEngine.speak(GEMINI_AI_MATERIAL.audioScript);
          }}
          className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 whitespace-nowrap shrink-0"
        >
          <Volume2 className="h-4 w-4" />
          <span>Dengarkan Seluruh Fungsi</span>
        </button>
      </div>

      {/* Main Two-Zone Explorer */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Column: 5 Function Selector Tabs */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
            Pilih Jurus Utama AI:
          </div>

          {GEMINI_AI_MATERIAL.fiveCoreFunctions.map((func, idx) => {
            const isSelected = activeFuncIndex === idx;
            return (
              <button
                key={func.number}
                onClick={() => {
                  sounds.playClick();
                  setActiveFuncIndex(idx);
                  setInteractiveResult(null);
                }}
                className={`w-full text-left rounded-xl p-4 transition-all duration-150 flex items-start gap-3.5 border ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold font-mono ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                      : 'border-slate-800 bg-slate-950 text-cyan-400'
                  }`}
                >
                  {func.number}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                      {func.title}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400">
                      {func.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {func.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Function In-depth Stage & Interactive Simulation */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6 flex flex-col justify-between h-full shadow-xl">
            
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {getFunctionIcon(activeFunction.number)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      0{activeFunction.number}. {activeFunction.title}
                    </h3>
                    <div className="text-xs text-slate-400">
                      Kecerdasan Artifisial Tingkat Lanjut
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeakFunction(activeFunction)}
                  className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 whitespace-nowrap"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>Dengarkan Penjelasan</span>
                </button>
              </div>

              {/* Full Text From Notebook */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                <div className="text-xs font-mono uppercase text-slate-400">
                  Ulasan Materi Catatan:
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeFunction.detail}
                </p>
              </div>

              {/* Interactive Try Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleRunInteractiveDemo(activeFunction.number)}
                  className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Simulasikan Jurus AI #{activeFunction.number}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Simulation Result Terminal */}
              {interactiveResult && (
                <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 text-xs font-mono text-cyan-300 space-y-2 animate-fade-in whitespace-pre-line leading-relaxed">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] border-b border-slate-800 pb-1">
                    <span>SIMULASI HASIL GEMINI AI</span>
                    <span className="text-emerald-400">STATUS: SUKSES</span>
                  </div>
                  <div>{interactiveResult}</div>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                Gemini AI dapat memadukan pemahaman teks, gambar, audio, dan koding secara multimodal.
              </span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
