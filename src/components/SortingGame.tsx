import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Volume2, 
  HelpCircle 
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { voiceEngine } from '../utils/speechVoice';

interface SortingItem {
  id: string;
  name: string;
  targetBin: 'input' | 'output' | 'processing' | 'storage';
  hint: string;
}

const ITEMS_TO_SORT: SortingItem[] = [
  { id: '1', name: 'Keyboard (Papan Ketik)', targetBin: 'input', hint: 'Memasukkan teks dan perintah melalui tombol.' },
  { id: '2', name: 'Monitor (Layar Visual)', targetBin: 'output', hint: 'Menampilkan teks, gambar, video hasil kerja komputer.' },
  { id: '3', name: 'Mouse (Pengendali Kursor)', targetBin: 'input', hint: 'Mengendalikan penunjuk kursor dan klik di layar.' },
  { id: '4', name: 'Printer (Pencetak Kertas)', targetBin: 'output', hint: 'Mencetak data ke atas media lembaran kertas fisik.' },
  { id: '5', name: 'Processor / CPU', targetBin: 'processing', hint: 'Otak utama yang mengolah dan menghitung data.' },
  { id: '6', name: 'RAM (Random Access Memory)', targetBin: 'storage', hint: 'Penyimpanan data sementara saat aplikasi terbuka.' },
  { id: '7', name: 'Harddisk HDD / SSD', targetBin: 'storage', hint: 'Menyimpan sistem operasi dan file jangka panjang/permanen.' },
  { id: '8', name: 'VGA Card (Kartu Grafis)', targetBin: 'processing', hint: 'Mengolah data grafis & render visual ke monitor.' },
];

export const SortingGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const currentItem = ITEMS_TO_SORT[currentIndex];

  const bins = [
    { id: 'input', label: '1. Perangkat Masukan (Input)', color: 'border-cyan-500/50 bg-cyan-950/20' },
    { id: 'output', label: '2. Perangkat Keluaran (Output)', color: 'border-emerald-500/50 bg-emerald-950/20' },
    { id: 'processing', label: '3. Pemrosesan & Grafis (CPU/GPU)', color: 'border-amber-500/50 bg-amber-950/20' },
    { id: 'storage', label: '4. Memori & Penyimpanan (RAM/HDD)', color: 'border-indigo-500/50 bg-indigo-950/20' },
  ];

  const handleClassify = (binId: 'input' | 'output' | 'processing' | 'storage') => {
    if (gameFinished) return;

    if (currentItem.targetBin === binId) {
      sounds.playSuccess();
      const newScore = score + 10 + streak * 2;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setFeedback({
        isCorrect: true,
        message: `Tepat sekali! ${currentItem.name} termasuk kategori tersebut. (${currentItem.hint})`
      });
    } else {
      sounds.playError();
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Kurang tepat. ${currentItem.name} seharusnya masuk kategori ${
          currentItem.targetBin === 'input' ? 'Perangkat Masukan' :
          currentItem.targetBin === 'output' ? 'Perangkat Keluaran' :
          currentItem.targetBin === 'processing' ? 'Pemrosesan & Grafis' : 'Memori & Penyimpanan'
        }. (${currentItem.hint})`
      });
    }

    // Advance to next item after brief pause
    setTimeout(() => {
      if (currentIndex + 1 < ITEMS_TO_SORT.length) {
        setCurrentIndex(currentIndex + 1);
        setFeedback(null);
      } else {
        setGameFinished(true);
        confetti({ particleCount: 75, spread: 60 });
      }
    }, 1200);
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setGameFinished(false);
  };

  return (
    <section className="py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>Permainan Edukasi 02</span>
            <span aria-hidden="true">·</span>
            <span>Klasifikasi Cepat</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mt-1">
            Pilah Kategori Komponen Komputer
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Tentukan apakah komponen termasuk dalam Perangkat Masukan (Input), Keluaran (Output), Pemrosesan (CPU/GPU), atau Penyimpanan (Storage).
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400">Skor: </span>
            <span className="font-bold text-cyan-400 text-sm">{score}</span>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Ulangi Game</span>
          </button>
        </div>
      </div>

      {!gameFinished ? (
        <div className="space-y-6">
          
          {/* Active Card to Classify */}
          <div className="mx-auto max-w-xl rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-6 md:p-8 text-center shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Kartu #{currentIndex + 1} dari {ITEMS_TO_SORT.length}</span>
              <span className="text-amber-400 font-semibold">Streak x{streak}</span>
            </div>

            <div className="py-4">
              <div className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-1">
                Di Mana Posisi Komponen Ini?
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {currentItem.name}
              </h3>
            </div>

            {feedback && (
              <div
                className={`flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-medium ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                }`}
              >
                {feedback.isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <span>{feedback.message}</span>
              </div>
            )}
          </div>

          {/* 4 Bins to click */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {bins.map((bin) => (
              <button
                key={bin.id}
                onClick={() => handleClassify(bin.id as 'input' | 'output' | 'processing' | 'storage')}
                className={`rounded-xl border p-4 text-left transition-all hover:scale-[1.02] active:scale-95 ${bin.color} hover:bg-slate-900 shadow-lg`}
              >
                <div className="font-display text-sm font-bold text-white">
                  {bin.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Klik untuk memasukkan ke kategori ini
                </div>
              </button>
            ))}
          </div>

        </div>
      ) : (
        /* Game Over Celebration */
        <div className="mx-auto max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-8 text-center shadow-2xl space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Award className="h-8 w-8" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white">
            Permainan Pilah Selesai!
          </h3>

          <p className="text-sm text-slate-300">
            Kamu telah berhasil mengklasifikasikan seluruh komponen komputer dengan total skor:
          </p>

          <div className="text-4xl font-extrabold text-cyan-400 font-mono">
            {score} Poin
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
            >
              Main Lagi
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
