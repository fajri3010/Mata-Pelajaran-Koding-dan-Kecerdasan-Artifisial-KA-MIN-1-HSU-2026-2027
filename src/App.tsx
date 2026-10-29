/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MaterialExplorer } from './components/MaterialExplorer';
import { GeminiAIGuide } from './components/GeminiAIGuide';
import { PCBuilderGame } from './components/PCBuilderGame';
import { SortingGame } from './components/SortingGame';
import { QuizSection } from './components/QuizSection';
import { AudioNarrationBar } from './components/AudioNarrationBar';
import { ClassGrade } from './types';
import { SCHOOL_INFO } from './data/learningData';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('materi');
  const [studentName, setStudentName] = useState<string>('Raisya Nur Azizah');
  const [selectedGrade, setSelectedGrade] = useState<ClassGrade>('Kelas 6B');

  const handleStartLearning = () => {
    setActiveTab('materi');
    const el = document.getElementById('main-content-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setActiveTab('kuis');
    const el = document.getElementById('main-content-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-white">
      
      {/* Top Bar Contract (1 line wordmark, single-line links, 1 primary action) */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Hero Section */}
      <HeroSection
        studentName={studentName}
        setStudentName={setStudentName}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        onStartLearning={handleStartLearning}
        onStartQuiz={handleStartQuiz}
      />

      {/* Main Content Sections */}
      <main id="main-content-section" className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* Navigation Tabs Bar for Mobile/Desktop Quick Switch */}
        <div className="pt-6 pb-2 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
            {[
              { id: 'materi', label: '1. Materi Hardware Asli' },
              { id: 'ai', label: '2. 5 Jurus Gemini AI' },
              { id: 'rakit', label: '3. Game Rakit PC' },
              { id: 'pilah', label: '4. Pilah Komponen' },
              { id: 'kuis', label: '5. Kuis & Sertifikat' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'materi' && <MaterialExplorer />}
        {activeTab === 'ai' && <GeminiAIGuide />}
        {activeTab === 'rakit' && <PCBuilderGame />}
        {activeTab === 'pilah' && <SortingGame />}
        {activeTab === 'kuis' && (
          <QuizSection 
            initialStudentName={studentName}
            initialGrade={selectedGrade}
          />
        )}

      </main>

      {/* Floating Audio Narration Controller */}
      <AudioNarrationBar />

      {/* Modern Tech School Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300 font-medium">
            <span>{SCHOOL_INFO.schoolName}</span>
            <span aria-hidden="true">·</span>
            <span>Tahun Ajaran {SCHOOL_INFO.academicYear}</span>
            <span aria-hidden="true">·</span>
            <span>Mata Pelajaran {SCHOOL_INFO.subject}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-[11px]">
            <span>Pengajar: Fajri, S.Kom & Rima Melati, S.Kom</span>
            <span aria-hidden="true">·</span>
            <span>Tingkat: Kelas 5, Kelas 6A, Kelas 6B</span>
          </div>

          <div className="text-[10px] text-slate-500 pt-2 font-mono">
            Platform Media Pembelajaran Interaktif Koding & Kecerdasan Artifisial
          </div>
        </div>
      </footer>

    </div>
  );
}
