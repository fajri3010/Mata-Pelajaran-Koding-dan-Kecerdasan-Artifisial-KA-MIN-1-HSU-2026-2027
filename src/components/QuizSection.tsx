import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  User,
  GraduationCap
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { SCHOOL_INFO } from '../data/learningData';
import { ClassGrade, StudentProfile } from '../types';
import { CertificateView } from './CertificateView';
import { sounds } from '../utils/soundEffects';
import { voiceEngine } from '../utils/speechVoice';

interface QuizSectionProps {
  initialStudentName: string;
  initialGrade: ClassGrade;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ initialStudentName, initialGrade }) => {
  const [studentName, setStudentName] = useState<string>(initialStudentName);
  const [selectedGrade, setSelectedGrade] = useState<ClassGrade>(initialGrade);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const passingScore = 70;

  const handleStartQuiz = () => {
    sounds.playClick();
    if (!studentName.trim()) {
      setStudentName('Peserta Didik MIN 1 HSU');
    }
    setHasStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers({});
    setIsQuizFinished(false);
    setShowCertificate(false);
  };

  const handleSpeakQuestion = () => {
    sounds.playClick();
    const optionsText = currentQ.options.map((opt, i) => `Pilihan ${String.fromCharCode(65 + i)}: ${opt}`).join('. ');
    const fullPrompt = `Pertanyaan nomor ${currentQuestionIndex + 1}. ${currentQ.question}. ${optionsText}`;
    voiceEngine.speak(fullPrompt);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sounds.playClick();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 10);
    } else {
      sounds.playError();
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: selectedOption
    }));
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
      if (score + (selectedOption === currentQ.correctIndex ? 0 : 0) >= passingScore) {
        sounds.playComputerBoot();
        confetti({ particleCount: 120, spread: 80 });
      }
    }
  };

  const handleRestartQuiz = () => {
    sounds.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setUserAnswers({});
    setIsQuizFinished(false);
    setShowCertificate(false);
  };

  // If user opened certificate view
  if (showCertificate) {
    const profile: StudentProfile = {
      name: studentName,
      grade: selectedGrade,
      score: score,
      totalQuestions: totalQuestions,
      certificateId: `KA/MIN1-HSU/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      completedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
    return (
      <CertificateView 
        profile={profile} 
        onBackToQuiz={() => setShowCertificate(false)} 
      />
    );
  }

  return (
    <section className="py-10 space-y-8">
      
      {/* Quiz Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>Uji Kompetensi Pelajaran</span>
            <span aria-hidden="true">·</span>
            <span>Tahun Ajaran {SCHOOL_INFO.academicYear}</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mt-1">
            Kuis Koding & Kecerdasan Artifisial
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Pilih kelasmu (Kelas 5, Kelas 6A, atau Kelas 6B), jawab soal berdasarkan materi catatan Raisya, dan dapatkan sertifikat resmi dari pengajar Fajri, S.Kom & Rima Melati, S.Kom!
          </p>
        </div>
      </div>

      {/* Screen 1: Registration / Class Selection */}
      {!hasStarted ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Identitas Peserta Ujian
              </h3>
              <div className="text-xs text-slate-400">
                Data ini akan dicetak pada Sertifikat Kelulusan
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="quiz-student-name" className="block text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 mb-1.5">
                Nama Lengkap Siswa
              </label>
              <div className="relative">
                <input
                  id="quiz-student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Masukkan nama lengkap siswa..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <User className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 mb-1.5">
                Pilih Kelas Pelajaran
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SCHOOL_INFO.studentClasses.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedGrade(cls);
                    }}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      selectedGrade === cls
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold shadow-md ring-1 ring-cyan-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="font-display text-sm">{cls}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">MIN 1 HSU</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>Ketentuan Sertifikat Kelulusan:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Terdiri dari 10 soal pilihan ganda berbobot 10 poin per soal.</li>
                <li>Batas Kriteria Ketuntasan Minimal (KKM): <span className="text-white font-bold">70 Poin</span>.</li>
                <li>Siswa yang lulus langsung dapat mengunduh sertifikat berformat JPEG atau PDF.</li>
                <li>Ditandatangani oleh kedua pengajar: Fajri, S.Kom & Rima Melati, S.Kom.</li>
              </ul>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/25"
            >
              <span>Mulai Ujian Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : !isQuizFinished ? (
        /* Screen 2: Active Question Card */
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>Soal {currentQuestionIndex + 1} dari {totalQuestions}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{selectedGrade}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-mono font-bold text-slate-300">
                Skor: <span className="text-cyan-400">{score}</span>
              </div>
              <button
                onClick={handleSpeakQuestion}
                className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20"
                title="Dengarkan Soal & Pilihan"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Dengarkan Soal</span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase text-slate-400">
              Topik: {currentQ.targetCategory}
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let optionStyle = 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-950';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                } else {
                  optionStyle = 'border-slate-800 bg-slate-950/40 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left rounded-xl p-3.5 transition-all flex items-start gap-3 border ${optionStyle}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-xs font-mono font-bold text-cyan-400">
                    {letter}
                  </span>
                  <span className="text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box */}
          {isAnswerSubmitted && (
            <div
              className={`rounded-xl p-4 border text-xs leading-relaxed space-y-1 animate-fade-in ${
                selectedOption === currentQ.correctIndex
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                  : 'border-rose-500/40 bg-rose-950/30 text-rose-200'
              }`}
            >
              <div className="font-bold font-mono uppercase flex items-center gap-1.5">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Jawaban Tepat! (+10 Poin)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span>Jawaban Kurang Tepat</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 pt-0.5">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Peserta: {studentName} ({selectedGrade})
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-colors ${
                  selectedOption !== null
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                Kunci Jawaban
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20"
              >
                <span>{currentQuestionIndex + 1 < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Screen 3: Quiz Finished Summary & Certificate Unlock */
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Award className="h-9 w-9" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Evaluasi Pembelajaran Selesai
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {score >= passingScore ? 'Selamat! Kamu Dinyatakan LULUS' : 'Perlu Belajar Lagi'}
            </h3>
            <p className="text-xs text-slate-400">
              {studentName} · {selectedGrade} · MIN 1 Hulu Sungai Utara
            </p>
          </div>

          {/* Score Indicator */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-2">
            <div className="text-4xl sm:text-5xl font-extrabold text-cyan-400 font-mono">
              {score} / 100
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {score >= passingScore 
                ? 'Kompetensi Koding & KA berhasil dicapai dengan memuaskan!'
                : 'Skor belum mencapai KKM (70). Kamu bisa mengulang kuis untuk memperbaiki nilai.'}
            </div>
          </div>

          {/* Action to View & Claim Certificate */}
          <div className="space-y-3 pt-2">
            {score >= passingScore ? (
              <button
                onClick={() => {
                  sounds.playSuccess();
                  setShowCertificate(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 shadow-xl shadow-cyan-500/25 transition-all"
              >
                <Award className="h-5 w-5" />
                <span>Lihat & Unduh Sertifikat Resmi (JPEG / PDF)</span>
              </button>
            ) : (
              <button
                onClick={handleRestartQuiz}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Ulangi Ujian Kuis</span>
              </button>
            )}

            <button
              onClick={handleRestartQuiz}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Uji Kembali dengan Identitas Baru
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
