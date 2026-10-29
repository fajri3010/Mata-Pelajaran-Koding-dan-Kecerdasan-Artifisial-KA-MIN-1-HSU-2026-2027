import React from 'react';
import { Volume2, PlayCircle, Award, Cpu, Sparkles, BookOpen } from 'lucide-react';
import { HARDWARE_IMAGES, SCHOOL_INFO } from '../data/learningData';
import { ClassGrade } from '../types';
import { voiceEngine } from '../utils/speechVoice';
import { sounds } from '../utils/soundEffects';

interface HeroSectionProps {
  studentName: string;
  setStudentName: (name: string) => void;
  selectedGrade: ClassGrade;
  setSelectedGrade: (grade: ClassGrade) => void;
  onStartLearning: () => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  studentName,
  setStudentName,
  selectedGrade,
  setSelectedGrade,
  onStartLearning,
  onStartQuiz,
}) => {
  const handlePlayVoiceIntro = () => {
    sounds.playClick();
    const welcomeText = `Selamat datang di Media Pembelajaran Koding dan Kecerdasan Artifisial, Madrasah Ibtidaiyah Negeri 1 Hulu Sungai Utara, Tahun Ajaran 2026/2027. Bersama pengajar Bapak Fajri, Sarjana Komputer dan Ibu Rima Melati, Sarjana Komputer. Di sini, kamu akan mempelajari perangkat keras komputer, bagian komponen dalam C.P.U., serta lima fungsi hebat dari Gemini A.I.`;
    voiceEngine.speak(welcomeText);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-radial from-cyan-950/20 via-slate-950 to-slate-950 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top quiet metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400/90 font-mono mb-4">
          <span>{SCHOOL_INFO.schoolName}</span>
          <span aria-hidden="true">·</span>
          <span>Tahun Ajaran {SCHOOL_INFO.academicYear}</span>
          <span aria-hidden="true">·</span>
          <span>Mata Pelajaran {SCHOOL_INFO.subject}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Heading and Action Box */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl leading-tight text-balance">
              Jelajahi Anatomi Komputer & Kecerdasan Artifisial
            </h1>

            <p className="text-base text-slate-300 sm:text-lg leading-relaxed max-w-2xl">
              Platform interaktif peserta didik <span className="text-white font-medium">Kelas 5, 6A, dan 6B</span>. 
              Pelajari fungsi komponen hardware asli, coba simulasi merakit PC, ikuti kuis bersuara narator manusia, dan peroleh sertifikat kelulusan resmi.
            </p>

            {/* Teacher Cards */}
            <div className="flex flex-wrap gap-4 pt-1">
              {SCHOOL_INFO.teachers.map((t, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 backdrop-blur-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono">
                    {idx === 0 ? 'F' : 'R'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Student Identification Form */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Pilih Identitas Siswa Untuk Sertifikat
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="student-name-input" className="block text-xs font-medium text-slate-300 mb-1">
                    Nama Lengkap Siswa
                  </label>
                  <input
                    id="student-name-input"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Raisya Nur Azizah"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="student-grade-select" className="block text-xs font-medium text-slate-300 mb-1">
                    Pilih Kelas Pelajaran
                  </label>
                  <select
                    id="student-grade-select"
                    value={selectedGrade}
                    onChange={(e) => {
                      sounds.playClick();
                      setSelectedGrade(e.target.value as ClassGrade);
                    }}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Kelas 5">Kelas 5 (Dasar Komputer & AI)</option>
                    <option value="Kelas 6A">Kelas 6A (Komponen CPU & Gemini AI)</option>
                    <option value="Kelas 6B">Kelas 6B (Hardware & Praktek Rakit)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onStartLearning();
                  }}
                  className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/25"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Pelajari Materi Sekarang</span>
                </button>

                <button
                  onClick={handlePlayVoiceIntro}
                  className="flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                >
                  <Volume2 className="h-4 w-4 text-cyan-400" />
                  <span>Dengarkan Suara Pengantar</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onStartQuiz();
                  }}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Langsung Kuis</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Real Hardware Imagery & Interactive Hotspots */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl overflow-hidden group">
              
              <div className="relative aspect-video sm:aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={HARDWARE_IMAGES.overview}
                  alt="Perangkat Komputer dan Laptop Lengkap"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Quiet Badge Indicator */}
                <div className="absolute top-3 right-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[11px] font-mono text-cyan-300 border border-slate-800">
                  Unit Hardware Asli
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-xs font-semibold text-white">
                    Meja Kerja Komputer & Laptop Terpadu
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Monitor Ultra-Tipis, CPU Tower, Keyboard, Mouse, & Portabel Laptop
                  </div>
                </div>
              </div>

              {/* 3 Quick highlights strip */}
              <div className="grid grid-cols-3 gap-2 p-3 text-center text-xs">
                <div className="rounded-lg bg-slate-950/80 p-2 border border-slate-800">
                  <div className="text-cyan-400 font-bold font-mono">11+ Unit</div>
                  <div className="text-[10px] text-slate-400">Komponen Detail</div>
                </div>
                <div className="rounded-lg bg-slate-950/80 p-2 border border-slate-800">
                  <div className="text-emerald-400 font-bold font-mono">5 Jurus</div>
                  <div className="text-[10px] text-slate-400">Gemini AI</div>
                </div>
                <div className="rounded-lg bg-slate-950/80 p-2 border border-slate-800">
                  <div className="text-amber-400 font-bold font-mono">Sertifikat</div>
                  <div className="text-[10px] text-slate-400">PDF & JPEG Resmi</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
