import React, { useState } from 'react';
import { Volume2, Laptop, Monitor, Sparkles, Eye, HardDrive, Cpu, Radio } from 'lucide-react';
import { CORE_DEFINITIONS, HARDWARE_COMPONENTS, HARDWARE_IMAGES } from '../data/learningData';
import { HardwareCategory, HardwareItem } from '../types';
import { ComponentDetailModal } from './ComponentDetailModal';
import { voiceEngine } from '../utils/speechVoice';
import { sounds } from '../utils/soundEffects';

export const MaterialExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<HardwareItem | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Komponen' },
    { id: 'processing', label: 'Otak & Pemrosesan' },
    { id: 'input', label: 'Perangkat Masukan' },
    { id: 'output', label: 'Perangkat Keluaran' },
    { id: 'storage', label: 'Memori & Penyimpanan' },
    { id: 'power_ports', label: 'PSU & Colokan Port' },
  ];

  const filteredComponents = selectedCategory === 'all'
    ? HARDWARE_COMPONENTS
    : HARDWARE_COMPONENTS.filter((item) => item.category === selectedCategory);

  const handleSpeakText = (title: string, text: string) => {
    sounds.playClick();
    voiceEngine.speak(`${title}. ${text}`);
  };

  return (
    <section className="py-10 space-y-12">
      
      {/* 1. Core Foundations: Komputer & Laptop Overview */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>Materi Pembelajaran 01</span>
            <span aria-hidden="true">·</span>
            <span>Konsep Dasar Sistem</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mt-1">
            Pengertian Komputer & Laptop
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Sesuai materi pelajaran Koding & KA di MIN 1 Hulu Sungai Utara, pahami bagaimana komponen bekerja sama menerima input, memproses, dan menghasilkan output.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Card Komputer */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {CORE_DEFINITIONS.komputer.title}
                    </h3>
                    <div className="text-xs text-slate-400">Sistem Elektronik Terpadu</div>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeakText(CORE_DEFINITIONS.komputer.title, CORE_DEFINITIONS.komputer.audioScript)}
                  className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20"
                  title="Dengarkan Penjelasan"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Dengarkan</span>
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {CORE_DEFINITIONS.komputer.content}
              </p>

              {/* 3 Step Flow */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                  <div className="text-cyan-400 font-bold">1. INPUT</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Menerima Data</div>
                </div>
                <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                  <div className="text-amber-400 font-bold">2. PROSES</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Mengolah Data</div>
                </div>
                <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                  <div className="text-emerald-400 font-bold">3. OUTPUT</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Hasil Informasi</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
              "Terorganisasi di bawah kontrol program yang tersimpan di dalam memori."
            </div>
          </div>

          {/* Card Laptop */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {CORE_DEFINITIONS.laptop.title}
                    </h3>
                    <div className="text-xs text-slate-400">Komputer Bergerak / Portabel</div>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeakText(CORE_DEFINITIONS.laptop.title, CORE_DEFINITIONS.laptop.audioScript)}
                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20"
                  title="Dengarkan Penjelasan"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Dengarkan</span>
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {CORE_DEFINITIONS.laptop.content}
              </p>

              {/* Integrated Components in Laptop */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="text-xs font-semibold text-slate-200">Komponen yang Disatukan dalam Laptop:</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-md bg-slate-950 px-2.5 py-1 text-slate-300 border border-slate-800 font-mono">
                    CPU & Motherboard
                  </span>
                  <span className="rounded-md bg-slate-950 px-2.5 py-1 text-slate-300 border border-slate-800 font-mono">
                    Layar Monitor
                  </span>
                  <span className="rounded-md bg-slate-950 px-2.5 py-1 text-slate-300 border border-slate-800 font-mono">
                    Keyboard & Touchpad
                  </span>
                  <span className="rounded-md bg-slate-950 px-2.5 py-1 text-slate-300 border border-slate-800 font-mono">
                    Baterai Mandiri (DC)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
              "Itulah yang membuat laptop bisa dibawa kemana saja yang kita inginkan."
            </div>
          </div>

        </div>
      </div>

      {/* 2. Interactive Hardware Anatomy & Real Photographic Components */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <span>Materi Pembelajaran 02</span>
              <span aria-hidden="true">·</span>
              <span>Galeri Unit Komponen Hardware Asli</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mt-1">
              Komponen Komputer & Bagian Dalam CPU
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Klik kartu komponen untuk melihat foto perangkat asli, spesifikasi detail, serta penjelasan suara.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons adhering to zero-pill rule) */}
          <div className="flex items-center flex-wrap gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                sounds.playClick();
                setActiveModalItem(item);
              }}
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
            >
              <div>
                {/* Real Hardware Photo Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Category text tag */}
                  <div className="absolute bottom-2 left-2 text-[11px] font-mono text-cyan-300 font-semibold drop-shadow-sm">
                    {item.categoryLabel}
                  </div>

                  {item.isInternal && (
                    <div className="absolute top-2 right-2 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-slate-800">
                      Internal CPU
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    voiceEngine.speak(`${item.name}. ${item.summary}`);
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Dengarkan</span>
                </button>

                <div className="flex items-center gap-1 text-cyan-400 font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>Lihat Detail</span>
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 3. Deep Dive: Port Hardware & Port Logis Visual Guide */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Materi Pembelajaran 03 · Konektivitas
            </div>
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl mt-0.5">
              Mengenal Port Hardware (Fisik) & Port Logis (Jaringan)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Berdasarkan catatan halaman 1: Port adalah titik koneksi atau antarmuka penghubung perangkat.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              voiceEngine.speak(
                'Port adalah titik koneksi atau antarmuka yang berfungsi menghubungkan perangkat, baik secara fisik colokan kabel maupun secara logis melalui jaringan internet.'
              );
            }}
            className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-4 w-4" />
            <span>Dengarkan Audio Port</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          
          {/* Real IO Panel Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <img
                src={HARDWARE_IMAGES.portsIOPanel}
                alt="Panel Belakang Port I/O Komputer Asli"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200">
                <span className="font-bold text-cyan-400">Foto Nyata:</span> Panel Port Belakang Motherboard Komputer Desktop
              </div>
            </div>
          </div>

          {/* Explanation Comparison */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400" />
                <h4 className="text-sm font-bold text-white font-display">
                  Port Hardware (Colokan Fisik)
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Colokan yang terdapat pada badan komputer atau laptop untuk menancapkan perangkat keras menggunakan kabel atau steker.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-slate-300">
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">USB-A & USB-C</span>
                  Flashdisk, Keyboard, Mouse
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">HDMI Port</span>
                  Layar Monitor & Proyektor
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">RJ-45 LAN Port</span>
                  Kabel Jaringan Internet
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">Audio 3.5mm</span>
                  Headset & Speaker Suara
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                <h4 className="text-sm font-bold text-white font-display">
                  Port Logis (Saluran Virtual Sistem Operasi)
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Saluran virtual di dalam sistem operasi yang digunakan saat perangkat terhubung ke internet. Mengarahkan data lalu lintas web, email, atau file transfer secara aman.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                <span>Contoh: Port 80 / 443 (Web HTTPS)</span>
                <span aria-hidden="true">·</span>
                <span>Port 21 (FTP File)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modal viewer */}
      {activeModalItem && (
        <ComponentDetailModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}

    </section>
  );
};
