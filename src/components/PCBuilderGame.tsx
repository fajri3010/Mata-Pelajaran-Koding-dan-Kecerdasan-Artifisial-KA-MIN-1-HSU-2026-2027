import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  RotateCcw, 
  Power, 
  Sparkles, 
  Cpu, 
  HardDrive, 
  Zap, 
  Layers, 
  Monitor, 
  Cable,
  Volume2
} from 'lucide-react';
import { HARDWARE_IMAGES } from '../data/learningData';
import { sounds } from '../utils/soundEffects';
import { voiceEngine } from '../utils/speechVoice';

interface PartToInstall {
  id: string;
  name: string;
  categoryName: string;
  slotTarget: string;
  icon: React.ReactNode;
  specs: string;
  educationalRole: string;
}

const AVAILABLE_PARTS: PartToInstall[] = [
  {
    id: 'processor',
    name: 'Processor (CPU Intel / AMD)',
    categoryName: 'Pusat Pemrosesan',
    slotTarget: 'socket_cpu',
    icon: <Cpu className="h-4 w-4" />,
    specs: 'Otak Utama Pemrosesan Sistem',
    educationalRole: 'Mengambil perintah dari memori, kalkulasi logika, dan mengontrol komponen.'
  },
  {
    id: 'ram',
    name: 'RAM DDR4 / DDR5',
    categoryName: 'Memori Sementara',
    slotTarget: 'slot_ram',
    icon: <Layers className="h-4 w-4" />,
    specs: 'Penyimpanan Data Aplikasi Aktif',
    educationalRole: 'Menyimpan data sementara aplikasi agar akses cepat & multitasking bebas lag.'
  },
  {
    id: 'vga',
    name: 'VGA Card (GPU GeForce RTX)',
    categoryName: 'Pengolah Grafis',
    slotTarget: 'slot_pcie',
    icon: <Monitor className="h-4 w-4" />,
    specs: 'Render Visual & Grafik Layar',
    educationalRole: 'Mengolah data visual dan animasi untuk monitor resolusi tinggi.'
  },
  {
    id: 'psu',
    name: 'PSU (Power Supply Unit)',
    categoryName: 'Catu Daya Listrik',
    slotTarget: 'bay_psu',
    icon: <Zap className="h-4 w-4" />,
    specs: 'Konversi Arus Listrik AC ke DC',
    educationalRole: 'Mengubah arus AC stopkontak menjadi arus DC stabil ke seluruh sirkuit.'
  },
  {
    id: 'harddisk',
    name: 'Harddisk HDD 2TB / SSD',
    categoryName: 'Penyimpanan Permanen',
    slotTarget: 'bay_storage',
    icon: <HardDrive className="h-4 w-4" />,
    specs: 'Penyimpanan Jangka Panjang',
    educationalRole: 'Menyimpan Sistem Operasi dan file tugas selamanya walau listrik mati.'
  },
  {
    id: 'port_cables',
    name: 'Kabel Port & I/O Belakang',
    categoryName: 'Antarmuka Koneksi',
    slotTarget: 'panel_io',
    icon: <Cable className="h-4 w-4" />,
    specs: 'HDMI, USB, Audio & LAN',
    educationalRole: 'Menghubungkan monitor, keyboard, mouse, dan kabel internet.'
  }
];

export const PCBuilderGame: React.FC = () => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [installedParts, setInstalledParts] = useState<{ [slot: string]: string }>({});
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    'Pilih satu komponen di rak sebelah kiri, lalu klik slot yang sesuai di dalam casing komputer!'
  );

  const slots = [
    { id: 'socket_cpu', label: 'Socket Processor (LGA/AM5)', icon: 'cpu', x: '50%', y: '28%' },
    { id: 'slot_ram', label: 'Slot RAM DIMM (Kanan CPU)', icon: 'ram', x: '68%', y: '28%' },
    { id: 'slot_pcie', label: 'Slot PCIe x16 (Bawah CPU)', icon: 'vga', x: '45%', y: '56%' },
    { id: 'bay_storage', label: 'Drive Bay Harddisk (Samping)', icon: 'storage', x: '82%', y: '60%' },
    { id: 'bay_psu', label: 'Kompartemen Bawah PSU Listrik', icon: 'psu', x: '45%', y: '84%' },
    { id: 'panel_io', label: 'Panel Belakang Port I/O Luar', icon: 'ports', x: '16%', y: '32%' },
  ];

  const totalParts = AVAILABLE_PARTS.length;
  const installedCount = Object.keys(installedParts).length;
  const isAssemblyComplete = installedCount === totalParts;

  const handleSelectPart = (partId: string) => {
    sounds.playClick();
    setSelectedPartId(partId);
    const part = AVAILABLE_PARTS.find((p) => p.id === partId);
    if (part) {
      setFeedbackMessage(`Komponen "${part.name}" dipilih! Pasang ke slot yang tepat di casing.`);
    }
  };

  const handleSlotClick = (slotId: string) => {
    if (!selectedPartId) {
      sounds.playError();
      setFeedbackMessage('Pilih komponen terlebih dahulu dari rak sebelah kiri!');
      return;
    }

    const currentPart = AVAILABLE_PARTS.find((p) => p.id === selectedPartId);
    if (!currentPart) return;

    if (currentPart.slotTarget === slotId) {
      // Correct installation
      sounds.playInstallPart();
      setInstalledParts((prev) => ({ ...prev, [slotId]: currentPart.id }));
      setSelectedPartId(null);
      setFeedbackMessage(`Hebat! ${currentPart.name} berhasil terpasang dengan benar di ${slotId}!`);

      if (installedCount + 1 === totalParts) {
        sounds.playSuccess();
        setFeedbackMessage('Luar biasa! Semua komponen telah terakit sempurna! Tekan tombol "Nyalakan Komputer"!');
      }
    } else {
      // Incorrect installation
      sounds.playError();
      setFeedbackMessage(`Oops! ${currentPart.name} tidak cocok dipasang di slot tersebut. Coba periksa petunjuk.`);
    }
  };

  const handlePowerOn = () => {
    if (!isAssemblyComplete) return;
    sounds.playComputerBoot();
    setIsPoweredOn(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const celebration = 'Komputer menyala dengan sempurna! Sistem AC telah diubah ke DC oleh PSU, prosesor aktif bekerja, RAM siap multitasking, dan gambar visual keluar melalui VGA Card ke monitor!';
    voiceEngine.speak(celebration);
    setFeedbackMessage('🎉 ' + celebration);
  };

  const handleReset = () => {
    sounds.playClick();
    setInstalledParts({});
    setSelectedPartId(null);
    setIsPoweredOn(false);
    setFeedbackMessage('Simulasi diriset. Silakan rakit kembali komponen komputer.');
  };

  return (
    <section className="py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>Permainan Edukasi 01</span>
            <span aria-hidden="true">·</span>
            <span>Simulasi Lab Hardware</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mt-1">
            Game Rakit Komputer Impian (PC Builder)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Tantangan untuk peserta didik: Rakit 6 komponen esensial ke dalam wadah casing komputer agar sistem bisa menyala!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Rakit Ulang</span>
          </button>
        </div>
      </div>

      {/* Progress & Live Guidance Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-cyan-400 font-semibold">
              Progres Rakit: {installedCount} / {totalParts} Komponen
            </div>
            <div className="text-xs text-slate-200 mt-0.5">
              {feedbackMessage}
            </div>
          </div>
        </div>

        {/* Big Power Button */}
        <button
          onClick={handlePowerOn}
          disabled={!isAssemblyComplete}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-md ${
            isPoweredOn
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
              : isAssemblyComplete
              ? 'bg-cyan-500 text-slate-950 animate-bounce hover:bg-cyan-400 shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
          }`}
        >
          <Power className="h-4 w-4" />
          <span>{isPoweredOn ? 'PC MENYALA AKTIF!' : 'Nyalakan Komputer!'}</span>
        </button>
      </div>

      {/* Two Zone Game Stage */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Column: Component Inventory / Rack */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
            Rak Komponen yang Siap Dipasang:
          </div>

          <div className="space-y-2.5">
            {AVAILABLE_PARTS.map((part) => {
              const isInstalled = Object.values(installedParts).includes(part.id);
              const isSelected = selectedPartId === part.id;

              return (
                <button
                  key={part.id}
                  disabled={isInstalled}
                  onClick={() => handleSelectPart(part.id)}
                  className={`w-full text-left rounded-xl p-3.5 transition-all flex items-start gap-3 border ${
                    isInstalled
                      ? 'border-emerald-500/30 bg-emerald-950/20 opacity-60 cursor-default'
                      : isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-md ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm ${
                      isInstalled
                        ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                        : isSelected
                        ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                        : 'border-slate-800 bg-slate-950 text-cyan-400'
                    }`}
                  >
                    {isInstalled ? <CheckCircle2 className="h-5 w-5" /> : part.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-white">
                        {part.name}
                      </span>
                      <span className={`text-[10px] font-mono ${isInstalled ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {isInstalled ? 'Terpasang' : part.categoryName}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      {part.specs}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      {part.educationalRole}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Computer Chassis Interactive Layout */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <span className="font-mono text-cyan-400 uppercase tracking-wider">
                Tampak Dalam Casing PC (Motherboard & Chassis)
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {isPoweredOn ? 'Status: ONLINE & RUNNING' : 'Status: STANDBY (OFF)'}
              </span>
            </div>

            {/* Motherboard Layout Stage */}
            <div className="relative mt-4 aspect-4/3 sm:aspect-16/10 w-full overflow-hidden rounded-xl border border-slate-800 bg-radial from-slate-900 to-slate-950 p-4 flex flex-col justify-between">
              
              {/* Background realistic PC internal preview if completed */}
              {isPoweredOn && (
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen transition-opacity duration-1000">
                  <img
                    src={HARDWARE_IMAGES.internalPC}
                    alt="PC Internal Running"
                    className="h-full w-full object-cover filter brightness-125"
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse pointer-events-none" />
                </div>
              )}

              {/* Slot Target Buttons */}
              <div className="grid grid-cols-2 gap-3.5 relative z-10 h-full">
                {slots.map((slot) => {
                  const installedPartId = installedParts[slot.id];
                  const installedPart = AVAILABLE_PARTS.find((p) => p.id === installedPartId);

                  return (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotClick(slot.id)}
                      className={`relative rounded-xl border p-3.5 text-left transition-all duration-200 flex flex-col justify-between ${
                        installedPart
                          ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                          : selectedPartId
                          ? 'border-cyan-500/60 bg-cyan-950/20 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/40 animate-pulse'
                          : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono font-bold">
                            {installedPart ? '✓ SLOT TERISI' : 'SLOT TERBUKA'}
                          </span>
                          {installedPart && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                        </div>
                        <div className="font-display text-sm font-semibold text-white">
                          {slot.label}
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800 text-xs">
                        {installedPart ? (
                          <div className="text-emerald-400 font-medium">
                            {installedPart.name}
                          </div>
                        ) : (
                          <div className="text-slate-500 text-[11px]">
                            Klik untuk memasang komponen di sini
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer instruction */}
              <div className="relative z-10 pt-3 text-center text-xs text-slate-400 border-t border-slate-800/80">
                {isPoweredOn ? (
                  <span className="text-cyan-300 font-bold">
                    Komputer Berhasil Dirakit & Beroperasi Normal!
                  </span>
                ) : (
                  <span>
                    Pastikan ke-6 komponen terpasang di slot yang tepat sebelum menekan saklar daya.
                  </span>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
