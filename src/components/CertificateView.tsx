import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Download, Printer, Award, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { SCHOOL_INFO } from '../data/learningData';
import { StudentProfile } from '../types';
import { sounds } from '../utils/soundEffects';

interface CertificateViewProps {
  profile: StudentProfile;
  onBackToQuiz?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ profile, onBackToQuiz }) => {
  const certRef = useRef<HTMLDivElement>(null);

  const studentName = profile.name.trim() || 'Peserta Didik Berprestasi';
  const grade = profile.grade || 'Kelas 6B';
  const score = profile.score ?? 100;
  const certId = profile.certificateId || `KA/MIN1-HSU/2026/${Math.floor(1000 + Math.random() * 9000)}`;
  const dateFormatted = profile.completedAt || new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getPredicate = (s: number) => {
    if (s >= 90) return 'Sangat Memuaskan (Istimewa)';
    if (s >= 80) return 'Memuaskan (Baik Sekali)';
    return 'Lulus Kompetensi (Baik)';
  };

  /**
   * High-Resolution 2400x1600 Canvas Drawing for JPEG Export
   */
  const handleDownloadJPEG = () => {
    sounds.playSuccess();
    const canvas = document.createElement('canvas');
    canvas.width = 2400;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient: Deep dark tech navy with modern geometric borders
    const bgGradient = ctx.createLinearGradient(0, 0, 2400, 1600);
    bgGradient.addColorStop(0, '#060a12');
    bgGradient.addColorStop(0.5, '#0b1324');
    bgGradient.addColorStop(1, '#070c17');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 2400, 1600);

    // Subtle modern tech grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 60; x < 2400; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, 1540);
      ctx.stroke();
    }
    for (let y = 60; y < 1600; y += 80) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(2340, y);
      ctx.stroke();
    }

    // Outer cybernetic border
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 2280, 1480);

    // Inner gold/cyan hairline accent border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(75, 75, 2250, 1450);

    // Corner decorative brackets
    const bracketSize = 50;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(60, 60 + bracketSize); ctx.lineTo(60, 60); ctx.lineTo(60 + bracketSize, 60); ctx.stroke();
    // Top-Right
    ctx.beginPath();
    ctx.moveTo(2340 - bracketSize, 60); ctx.lineTo(2340, 60); ctx.lineTo(2340, 60 + bracketSize); ctx.stroke();
    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(60, 1540 - bracketSize); ctx.lineTo(60, 1540); ctx.lineTo(60 + bracketSize, 1540); ctx.stroke();
    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(2340 - bracketSize, 1540); ctx.lineTo(2340, 1540); ctx.lineTo(2340, 1540 - bracketSize); ctx.stroke();

    // Institution Headers
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 32px monospace';
    ctx.fillText('KEMENTERIAN AGAMA REPUBLIK INDONESIA', 1200, 160);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(SCHOOL_INFO.schoolName, 1200, 225);

    ctx.fillStyle = '#64748b';
    ctx.font = '500 28px sans-serif';
    ctx.fillText(`Mata Pelajaran: ${SCHOOL_INFO.subject} · Tahun Ajaran ${SCHOOL_INFO.academicYear}`, 1200, 280);

    // Main Certificate Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 68px sans-serif';
    ctx.fillText('SERTIFIKAT KELULUSAN & KOMPETENSI', 1200, 420);

    // Subtle divider
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(850, 460);
    ctx.lineTo(1550, 460);
    ctx.stroke();

    // Serial number
    ctx.fillStyle = '#38bdf8';
    ctx.font = '500 26px monospace';
    ctx.fillText(`NO. REGISTRASI: ${certId}`, 1200, 510);

    // Diberikan kepada
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 30px sans-serif';
    ctx.fillText('Sertifikat ini dengan bangga dianugerahkan kepada:', 1200, 600);

    // Student Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 84px sans-serif';
    ctx.fillText(studentName, 1200, 710);

    // Underline student name
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    const textWidth = ctx.measureText(studentName).width;
    ctx.beginPath();
    ctx.moveTo(1200 - textWidth / 2 - 40, 740);
    ctx.lineTo(1200 + textWidth / 2 + 40, 740);
    ctx.stroke();

    // Grade and Description
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(`Peserta Didik ${grade}`, 1200, 810);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 32px sans-serif';
    ctx.fillText('Atas keberhasilan dan ketuntasan menguasai materi pembelajaran:', 1200, 890);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 36px sans-serif';
    ctx.fillText('Arsitektur Perangkat Komputer, Komponen Dalam CPU, & Pengenalan Gemini AI', 1200, 950);

    // Score & Predicate Pill
    ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(750, 1010, 900, 90, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(`Nilai Akhir: ${score}/100 · Predikat: ${getPredicate(score)}`, 1200, 1068);

    // Location and Date
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 28px sans-serif';
    ctx.fillText(`Amuntai, Hulu Sungai Utara, ${dateFormatted}`, 1200, 1180);

    // Signatures: Both teachers without NIP (Strictly complying with prompt)
    // Left Teacher: Fajri, S.Kom
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Fajri, S.Kom', 650, 1370);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 26px sans-serif';
    ctx.fillText('Guru Pengampu Koding & KA', 650, 1415);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(480, 1330);
    ctx.lineTo(820, 1330);
    ctx.stroke();

    // Center Official Seal & Verification Text
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('★ RESMI TERVERIFIKASI ★', 1200, 1340);
    ctx.fillStyle = '#64748b';
    ctx.font = '400 20px monospace';
    ctx.fillText('MIN 1 HULU SUNGAI UTARA', 1200, 1380);

    // Right Teacher: Rima Melati, S.Kom
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Rima Melati, S.Kom', 1750, 1370);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 26px sans-serif';
    ctx.fillText('Guru Pengampu Koding & KA', 1750, 1415);
    ctx.beginPath();
    ctx.moveTo(1580, 1330);
    ctx.lineTo(1920, 1330);
    ctx.stroke();

    // Trigger download
    const link = document.createElement('a');
    link.download = `Sertifikat_${grade.replace(/\s+/g, '_')}_${studentName.replace(/\s+/g, '_')}.jpeg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  /**
   * PDF Download via jsPDF Landscape
   */
  const handleDownloadPDF = () => {
    sounds.playSuccess();
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4' // 297mm x 210mm
    });

    // Dark slate background
    doc.setFillColor(11, 19, 36);
    doc.rect(0, 0, 297, 210, 'F');

    // Outer cyan border
    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(1.2);
    doc.rect(8, 8, 281, 194);

    // Inner gold border
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.rect(11, 11, 275, 188);

    // Header Text
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('KEMENTERIAN AGAMA REPUBLIK INDONESIA', 148.5, 23, { align: 'center' });

    doc.setTextColor(56, 189, 248);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(SCHOOL_INFO.schoolName, 148.5, 31, { align: 'center' });

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Mata Pelajaran: ${SCHOOL_INFO.subject} · Tahun Ajaran ${SCHOOL_INFO.academicYear}`, 148.5, 38, { align: 'center' });

    // Certificate Title
    doc.setTextColor(248, 250, 252);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('SERTIFIKAT KELULUSAN & KOMPETENSI', 148.5, 54, { align: 'center' });

    // Serial
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(8);
    doc.text(`NO. REGISTRASI: ${certId}`, 148.5, 62, { align: 'center' });

    // Diberikan kepada
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(11);
    doc.text('Sertifikat ini dengan bangga dianugerahkan kepada:', 148.5, 75, { align: 'center' });

    // Student Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text(studentName, 148.5, 90, { align: 'center' });

    // Grade and Description
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`Peserta Didik ${grade}`, 148.5, 102, { align: 'center' });

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Telah berhasil menguasai seluruh materi dan menyelesaikan evaluasi kompetensi:', 148.5, 112, { align: 'center' });

    doc.setTextColor(241, 245, 249);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Perangkat Komputer, Komponen Dalam CPU, & Pengenalan Gemini AI', 148.5, 119, { align: 'center' });

    // Score & Predicate Box
    doc.setFillColor(15, 23, 42);
    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(0.5);
    doc.roundedRect(80, 126, 137, 12, 3, 3, 'FD');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Nilai Akhir: ${score}/100 · Predikat: ${getPredicate(score)}`, 148.5, 134, { align: 'center' });

    // Location & Date
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.text(`Amuntai, Hulu Sungai Utara, ${dateFormatted}`, 148.5, 150, { align: 'center' });

    // Left Teacher: Fajri, S.Kom (no NIP)
    doc.setDrawColor(71, 85, 105);
    doc.line(45, 175, 95, 175);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Fajri, S.Kom', 70, 182, { align: 'center' });
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Guru Pengampu Koding & KA', 70, 188, { align: 'center' });

    // Center Seal
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('★ DOKUMEN RESMI TERVERIFIKASI ★', 148.5, 177, { align: 'center' });
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.text('MIN 1 HULU SUNGAI UTARA', 148.5, 183, { align: 'center' });

    // Right Teacher: Rima Melati, S.Kom (no NIP)
    doc.setDrawColor(71, 85, 105);
    doc.line(202, 175, 252, 175);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Rima Melati, S.Kom', 227, 182, { align: 'center' });
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Guru Pengampu Koding & KA', 227, 188, { align: 'center' });

    // Save PDF
    doc.save(`Sertifikat_${grade.replace(/\s+/g, '_')}_${studentName.replace(/\s+/g, '_')}.pdf`);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <section className="py-8 space-y-6">
      
      {/* Action Toolbar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          {onBackToQuiz && (
            <button
              onClick={() => {
                sounds.playClick();
                onBackToQuiz();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Kuis</span>
            </button>
          )}

          <div>
            <div className="text-xs font-mono uppercase text-cyan-400 font-semibold">
              Sertifikat Kelulusan Siap Diunduh
            </div>
            <div className="text-xs text-slate-400">
              Format resolusi tinggi cocok untuk dicetak atau dibagikan ke wali murid.
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadJPEG}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
          >
            <Download className="h-4 w-4" />
            <span>Simpan Format JPEG</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Simpan Format PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Cetak Langsung</span>
          </button>
        </div>
      </div>

      {/* Modern Certificate Display Container */}
      <div 
        ref={certRef}
        className="mx-auto max-w-4xl rounded-2xl border-2 border-cyan-500/40 bg-radial from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6"
      >
        {/* Subtle cyber grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Decorative corner brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

        {/* Institution Brand Header */}
        <div className="space-y-1 relative z-10">
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-slate-400">
            Kementerian Agama Republik Indonesia
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-cyan-400 tracking-tight">
            {SCHOOL_INFO.schoolName}
          </h2>
          <div className="text-xs text-slate-400">
            Mata Pelajaran: {SCHOOL_INFO.subject} · Tahun Ajaran {SCHOOL_INFO.academicYear}
          </div>
        </div>

        {/* Main Certificate Title */}
        <div className="pt-2 relative z-10">
          <div className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono text-cyan-300 font-semibold mb-2">
            NO. SERI: {certId}
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            SERTIFIKAT KELULUSAN & KOMPETENSI
          </h1>
          <div className="mx-auto mt-2 h-1 w-24 rounded bg-cyan-500" />
        </div>

        {/* Recipient */}
        <div className="space-y-1 relative z-10 pt-2">
          <div className="text-xs sm:text-sm text-slate-400">
            Sertifikat ini secara sah dianugerahkan kepada:
          </div>
          <div className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
            {studentName}
          </div>
          <div className="text-sm font-semibold text-cyan-400 font-mono">
            Peserta Didik {grade}
          </div>
        </div>

        {/* Achievement Text */}
        <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          Telah berhasil menyelesaikan rangkaian modul pembelajaran dan evaluasi dengan penguasaan materi mengenai{' '}
          <span className="text-white font-medium">
            Arsitektur Perangkat Komputer, Komponen Dalam CPU, serta 5 Fungsi Unggulan Google Gemini AI
          </span>.
        </div>

        {/* Score & Predicate Pill */}
        <div className="inline-flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 px-6 py-2.5 text-xs sm:text-sm relative z-10 shadow-md">
          <Award className="h-5 w-5 text-amber-400 shrink-0" />
          <span className="font-mono text-cyan-400 font-bold">Nilai: {score}/100</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-medium">Predikat: {getPredicate(score)}</span>
        </div>

        {/* Location & Date */}
        <div className="text-xs text-slate-400 relative z-10 pt-2">
          Amuntai, Hulu Sungai Utara, {dateFormatted}
        </div>

        {/* Signatures of both teachers without NIP */}
        <div className="grid grid-cols-2 gap-8 pt-8 max-w-2xl mx-auto relative z-10 border-t border-slate-800/80">
          
          {/* Teacher 1: Fajri, S.Kom */}
          <div className="space-y-1 text-center">
            <div className="mx-auto h-12 w-32 flex items-center justify-center opacity-80 text-cyan-400 font-mono text-xs italic">
              [Ttd. Digital]
            </div>
            <div className="mx-auto w-36 border-b border-slate-700" />
            <div className="font-display text-sm font-bold text-white pt-1">
              Fajri, S.Kom
            </div>
            <div className="text-[11px] text-slate-400">
              Guru Pengampu Koding & KA
            </div>
          </div>

          {/* Teacher 2: Rima Melati, S.Kom */}
          <div className="space-y-1 text-center">
            <div className="mx-auto h-12 w-32 flex items-center justify-center opacity-80 text-cyan-400 font-mono text-xs italic">
              [Ttd. Digital]
            </div>
            <div className="mx-auto w-36 border-b border-slate-700" />
            <div className="font-display text-sm font-bold text-white pt-1">
              Rima Melati, S.Kom
            </div>
            <div className="text-[11px] text-slate-400">
              Guru Pengampu Koding & KA
            </div>
          </div>

        </div>

        {/* Digital verification badge */}
        <div className="flex items-center justify-center gap-2 pt-4 text-[10px] font-mono text-slate-500 relative z-10">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
          <span>MIN 1 HULU SUNGAI UTARA · SISTEM PEMBELAJARAN TERPADU 2026/2027</span>
        </div>

      </div>

    </section>
  );
};
