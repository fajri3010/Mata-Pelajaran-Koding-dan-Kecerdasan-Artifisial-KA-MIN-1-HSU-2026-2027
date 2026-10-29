import { HardwareItem } from '../types';

export const SCHOOL_INFO = {
  schoolName: 'MIN 1 HULU SUNGAI UTARA',
  subject: 'Koding dan Kecerdasan Artifisial (KA)',
  academicYear: '2026/2027',
  teachers: [
    { name: 'Fajri, S.Kom', role: 'Guru Pengampu Koding & KA' },
    { name: 'Rima Melati, S.Kom', role: 'Guru Pengampu Koding & KA' }
  ],
  studentClasses: ['Kelas 5', 'Kelas 6A', 'Kelas 6B'] as const
};

// Generated Real Hardware Images
export const HARDWARE_IMAGES = {
  overview: '/src/assets/images/computer_setup_overview_1793283832389.jpg',
  internalPC: '/src/assets/images/pc_internal_components_1793283833700.jpg',
  processor: '/src/assets/images/processor_cpu_chip_1793283833553.jpg',
  ramAndStorage: '/src/assets/images/ram_and_storage_hardware_1793283836013.jpg',
  portsIOPanel: '/src/assets/images/computer_ports_io_panel_1793283836313.jpg'
};

export const CORE_DEFINITIONS = {
  komputer: {
    title: 'Pengertian Komputer',
    content: 'Komputer adalah serangkaian ataupun sekelompok mesin elektronik yang terdiri dari ribuan bahkan jutaan komponen yang saling bekerja sama, serta membentuk sebuah sistem kerja yang dapat menerima data (INPUT), mengelola data (PROSES), dan memberikan informasi (OUTPUT) yang terorganisasi di bawah kontrol program yang tersimpan di dalam memori.',
    highlightPoints: [
      'Menerima data masukan (INPUT)',
      'Mengelola dan menghitung data (PROSES)',
      'Memberikan hasil informasi yang berguna (OUTPUT)',
      'Bekerja di bawah kontrol instruksi program di memori'
    ],
    audioScript: 'Komputer adalah serangkaian mesin elektronik yang terdiri dari ribuan hingga jutaan komponen yang saling bekerja sama, membentuk sistem kerja terpadu untuk menerima data masukan atau input, mengelola data atau proses, dan menghasilkan informasi keluaran atau output di bawah kendali program memori.'
  },
  laptop: {
    title: 'Pengertian Laptop (Komputer Portabel)',
    content: 'Laptop adalah sebuah komputer bergerak (portable) yang dapat kita bawa kemana saja yang kita inginkan. Laptop mempersatukan CPU, keyboard, monitor, mouse (touchpad), dan juga sumber daya listrik (baterai terintegrasi). Itulah yang membuat laptop sangat praktis dan bisa dibawa kemana saja.',
    highlightPoints: [
      'Komputer bergerak yang fleksibel dan portabel',
      'Menggabungkan monitor, keyboard, touchpad, dan CPU dalam satu kesatuan',
      'Memiliki baterai mandiri sehingga tidak harus selalu dicolok stopkontak'
    ],
    audioScript: 'Laptop adalah komputer bergerak yang dapat kita bawa ke mana saja. Laptop menyatukan unit CPU, monitor, keyboard, mouse, serta baterai penyimpan daya ke dalam satu kesatuan yang ringkas.'
  }
};

export const HARDWARE_COMPONENTS: HardwareItem[] = [
  {
    id: 'cpu_unit',
    name: 'CPU (Central Processing Unit)',
    shortName: 'CPU / Prosesor',
    category: 'processing',
    categoryLabel: 'Pusat Pemrosesan',
    summary: 'Pusat kerja dan kepala/otak komputer yang memproses semua perintah dan data.',
    fullDefinition: 'CPU adalah singkatan dari Central Processing Unit, yaitu komponen utama pada komputer yang berfungsi sebagai otak dari seluruh sistem. Merupakan perangkat keras yang memproses semua perintah dan data agar komputer bisa bekerja.',
    functions: [
      'Mengambil perintah dari memori, menerjemahkannya, lalu menjalankannya.',
      'Melakukan perhitungan matematika dan perbandingan logika secara akurat.',
      'Mengatur serta mengoordinasikan kerja semua bagian lain di dalam komputer.'
    ],
    typesOrSpecs: ['Intel Core (i3, i5, i7, i9)', 'AMD Ryzen (Ryzen 3, 5, 7, 9)', 'ARM Architecture (Chip Hemat Daya)'],
    image: HARDWARE_IMAGES.processor,
    highlightSpecs: [
      { label: 'Peran', value: 'Otak Utama Komputer' },
      { label: 'Satuan Kecepatan', value: 'GHz (GigaHertz)' },
      { label: 'Inti Kerja', value: 'Cores & Threads' }
    ],
    isInternal: true,
    notesOrigin: 'Catatan Hal. 4 & 7: "Pusat kerja dari sebuah komputer, diartikan sebagai kepala/otak komputer."'
  },
  {
    id: 'monitor',
    name: 'Monitor Komputer',
    shortName: 'Monitor Layar',
    category: 'output',
    categoryLabel: 'Perangkat Keluaran (Output)',
    summary: 'Menampilkan teks, gambar, video, dan grafik hasil pemrosesan data ke mata pengguna.',
    fullDefinition: 'Monitor adalah perangkat keras keluaran (output) komputer yang berfungsi menampilkan teks, gambar, video, dan hasil pemrosesan data dalam bentuk tampilan visual agar bisa dilihat.',
    functions: [
      'Menampilkan teks dan hasil olah data komputer secara real-time.',
      'Menyajikan gambar, grafik, foto, dan video dengan warna yang jelas.',
      'Memperlihatkan perintah dan tampilan aplikasi agar mudah dipahami pengguna.'
    ],
    typesOrSpecs: [
      'CRT (Cathode Ray Tube) - Monitor tabung kaca cembung zaman dulu',
      'LCD / LED Monitor - Layar datar modern tipis dan jernih',
      'Resolusi Layar (Full HD, 2K, 4K)'
    ],
    image: HARDWARE_IMAGES.overview,
    highlightSpecs: [
      { label: 'Jenis Perangkat', value: 'Output Visual' },
      { label: 'Keluaran', value: 'Teks, Gambar, & Animasi' },
      { label: 'Evolusi', value: 'CRT Tabung ke LED Tipis' }
    ],
    isInternal: false,
    notesOrigin: 'Catatan Hal. 1 & 6: "Monitor berfungsi menampilkan teks, grafik, video agar bisa dilihat."'
  },
  {
    id: 'keyboard',
    name: 'Keyboard (Papan Ketik)',
    shortName: 'Keyboard',
    category: 'input',
    categoryLabel: 'Perangkat Masukan (Input)',
    summary: 'Papan berisi tombol huruf, angka, dan simbol untuk memasukkan data dan perintah.',
    fullDefinition: 'Keyboard adalah perangkat masukan komputer yang berbentuk papan berisi tombol-tombol huruf, angka, dan simbol untuk mengetik serta mengirim perintah ke sistem komputer.',
    functions: [
      'Memasukkan teks, angka, dan simbol data ke dalam komputer.',
      'Memberikan perintah langsung melalui tombol fungsi (F1–F12, Enter, Esc, Ctrl).',
      'Mengetik dan mengolah dokumen serta mengoperasikan program.'
    ],
    typesOrSpecs: ['Keyboard QWERTY Standar', 'Mechanical Keyboard', 'Keyboard Wireless / Bluetooth'],
    image: HARDWARE_IMAGES.overview,
    highlightSpecs: [
      { label: 'Jenis Perangkat', value: 'Input Perintah' },
      { label: 'Susunan Standar', value: 'QWERTY Layout' },
      { label: 'Tombol Spesial', value: 'Function Keys (F1-F12)' }
    ],
    isInternal: false,
    notesOrigin: 'Catatan Hal. 6: "Perangkat masukan komputer berbentuk papan berisi tombol huruf, angka, dan simbol."'
  },
  {
    id: 'mouse',
    name: 'Mouse Komputer',
    shortName: 'Mouse / Penunjuk',
    category: 'input',
    categoryLabel: 'Perangkat Masukan (Input)',
    summary: 'Perangkat kecil pengendali kursor untuk mengklik, memilih, dan drag & drop di layar.',
    fullDefinition: 'Mouse adalah perangkat masukan komputer berbentuk kecil yang digerakkan dengan tangan untuk mengendalikan penunjuk (kursor) di layar secara presisi.',
    functions: [
      'Menggerakkan dan mengatur arah penunjuk kursor di monitor.',
      'Memilih, membuka, dan menjalankan berkas atau aplikasi dengan klik ganda.',
      'Menarik, menyalin, serta mengatur letak objek di layar (drag and drop).'
    ],
    typesOrSpecs: ['Mouse Optik dengan Sensor Lampu', 'Mouse Laser Presisi Tinggi', 'Touchpad pada Laptop'],
    image: HARDWARE_IMAGES.overview,
    highlightSpecs: [
      { label: 'Fungsi Utama', value: 'Navigasi Kursor Layar' },
      { label: 'Aksi Kunci', value: 'Klik Kiri, Klik Kanan, Scroll' },
      { label: 'Sensor Modern', value: 'Optical LED & Laser' }
    ],
    isInternal: false,
    notesOrigin: 'Catatan Hal. 5: "Berbentuk kecil yang digerakkan tangan untuk mengendalikan penunjuk di layar."'
  },
  {
    id: 'printer',
    name: 'Printer (Pencetak Kertas)',
    shortName: 'Printer',
    category: 'output',
    categoryLabel: 'Perangkat Keluaran (Output)',
    summary: 'Mencetak data digital (teks, dokumen, foto, grafik) ke atas media fisik kertas.',
    fullDefinition: 'Printer adalah perangkat keluaran komputer yang berfungsi mencetak data dari komputer ke atas lembaran kertas menjadi bentuk fisik (hardcopy).',
    functions: [
      'Mencetak dokumen berupa teks dan tulisan laporan atau tugas sekolah.',
      'Mencetak gambar, foto, grafik, dan piagam sertifikat dengan warna jelas.',
      'Menyimpan dan mengabadikan hasil kerja digital ke dalam bentuk fisik kertas.'
    ],
    typesOrSpecs: ['Printer InkJet (Tinta Semprot)', 'Printer Laser Jet (Toner Cepat)', 'Printer Dot Matrix (Jarum Pita)'],
    image: HARDWARE_IMAGES.overview,
    highlightSpecs: [
      { label: 'Bentuk Hasil', value: 'Hardcopy Fisik Kertas' },
      { label: 'Media', value: 'Kertas HVS, Foto, Karton' },
      { label: 'Teknologi', value: 'Inkjet & Laser' }
    ],
    isInternal: false,
    notesOrigin: 'Catatan Hal. 5: "Perangkat keluaran komputer yang berfungsi mencetak data ke atas kertas."'
  },
  {
    id: 'psu',
    name: 'PSU (Power Supply Unit)',
    shortName: 'Power Supply',
    category: 'power_ports',
    categoryLabel: 'Catu Daya Listrik',
    summary: 'Mengubah arus listrik AC dari stopkontak PLN menjadi arus DC stabil untuk semua komponen.',
    fullDefinition: 'PSU (Power Supply Unit) adalah perangkat keras yang mengubah arus listrik AC (Alternating Current) dari stopkontak rumah menjadi arus DC (Direct Current) stabil dengan berbagai tegangan (+12V, +5V, +3.3V) untuk menyuplai daya ke seluruh komponen internal komputer.',
    functions: [
      'Mengonversi tegangan tinggi bolak-balik AC menjadi tegangan rendah searah DC.',
      'Menyuplai daya listrik yang aman dan stabil ke Motherboard, CPU, RAM, dan VGA.',
      'Melindungi sirkuit komputer dari lonjakan voltase mendadak.'
    ],
    typesOrSpecs: ['Modular Power Supply', 'Efisiensi 80 Plus (Bronze, Gold)', 'Daya 450W - 850W+'],
    image: HARDWARE_IMAGES.internalPC,
    highlightSpecs: [
      { label: 'Fungsi Konversi', value: 'Arus AC ke DC' },
      { label: 'Tujuan', value: 'Suplai Daya Seluruh Komponen' },
      { label: 'Fitur', value: 'Proteksi Tegangan Stabil' }
    ],
    isInternal: true,
    notesOrigin: 'Catatan Hal. 4: "Mengubah arus listrik AC dari stopkontak menjadi arus DC stabil untuk menyuplai daya ke seluruh komponen internal komputer."'
  },
  {
    id: 'ram',
    name: 'RAM (Random Access Memory)',
    shortName: 'RAM Komputer',
    category: 'storage',
    categoryLabel: 'Memori Sementara',
    summary: 'Tempat penyimpanan data sementara saat aplikasi sedang dibuka agar prosesor bekerja cepat tanpa lag.',
    fullDefinition: 'RAM adalah singkatan dari Random Access Memory, yaitu jenis memori komputer internal yang berfungsi sebagai tempat penyimpanan data sementara saat perangkat sedang dinyalakan dan digunakan. Data akan hilang ketika komputer dimatikan (volatile).',
    functions: [
      'Penyimpanan sementara: menyimpan data dari aplikasi yang sedang dibuka agar bisa diakses oleh processor dengan sangat cepat.',
      'Mendukung multitasking: menentukan seberapa banyak aplikasi atau tab browser yang bisa dibuka bersamaan tanpa membuat komputer menjadi lambat atau lag.'
    ],
    typesOrSpecs: ['DDR4 & DDR5 Desktop RAM', 'Kapasitas 8GB, 16GB, 32GB', 'Kecepatan Frekuensi MHz (3200MHz, 6000MHz)'],
    image: HARDWARE_IMAGES.ramAndStorage,
    highlightSpecs: [
      { label: 'Sifat Memori', value: 'Sementara (Volatile)' },
      { label: 'Kecepatan Akses', value: 'Sangat Cepat Nanodetik' },
      { label: 'Dampak Kinerja', value: 'Mencegah Lag Multitasking' }
    ],
    isInternal: true,
    notesOrigin: 'Catatan Hal. 2 & 1: "Tempat penyimpanan data sementara saat perangkat sedang dinyalakan. Mendukung multitasking."'
  },
  {
    id: 'harddisk',
    name: 'Harddisk (HDD) & SSD',
    shortName: 'Harddisk Drive',
    category: 'storage',
    categoryLabel: 'Penyimpanan Permanen',
    summary: 'Menyimpan sistem operasi, aplikasi, foto, dan berkas selamanya meski komputer dimatikan.',
    fullDefinition: 'Harddisk atau Hard Disk Drive (HDD) adalah perangkat keras komputer yang berfungsi untuk menyimpan data secara permanen atau jangka panjang. Data yang tersimpan tidak akan hilang walau listrik mati (non-volatile).',
    functions: [
      'Menyimpan sistem operasi (Windows, Linux, macOS) secara permanen.',
      'Menyimpan file dokumen tugas, foto, video, lagu, dan aplikasi permainan.',
      'Menyediakan ruang arsip data berkapasitas besar (500GB hingga beberapa Terabyte).'
    ],
    typesOrSpecs: ['HDD Mekanikal (Piringan Magnetik Berputar)', 'SSD NVMe PCIe (Chip Flash Super Cepat)', 'Ukuran 2.5 inci & 3.5 inci'],
    image: HARDWARE_IMAGES.ramAndStorage,
    highlightSpecs: [
      { label: 'Sifat Memori', value: 'Permanen (Non-Volatile)' },
      { label: 'Kapasitas Khas', value: '1 TB, 2 TB (1000 - 2000 GB)' },
      { label: 'Fungsi Utama', value: 'Arsip Jangka Panjang' }
    ],
    isInternal: true,
    notesOrigin: 'Catatan Hal. 4: "Perangkat keras komputer yang berfungsi untuk menyimpan data secara permanen atau jangka panjang."'
  },
  {
    id: 'vga_card',
    name: 'VGA Card (Kartu Grafis / GPU)',
    shortName: 'VGA Card / GPU',
    category: 'processing',
    categoryLabel: 'Pemrosesan Grafis',
    summary: 'Mengolah data digital menjadi gambar visual, menentukan ketajaman resolusi dan kecepatan render permainan.',
    fullDefinition: 'VGA Card adalah perangkat keras komputer yang berfungsi untuk mengolah data digital dari komputer menjadi tampilan visual atau gambar di layar monitor. Komponen ini sangat penting untuk menentukan ketajaman, resolusi, dan kecepatan render gambar.',
    functions: [
      'Mengolah data visual dan grafis dari prosesor komputer.',
      'Menampilkan gambar, video resolusi tinggi, dan animasi ke layar monitor.',
      'Mempercepat render grafik 3D untuk bermain game, editing video, dan animasi.'
    ],
    typesOrSpecs: ['NVIDIA GeForce RTX Series', 'AMD Radeon RX Series', 'Dedicated VRAM (4GB, 8GB, 16GB)'],
    image: HARDWARE_IMAGES.internalPC,
    highlightSpecs: [
      { label: 'Tugas Utama', value: 'Render Grafik & Visual' },
      { label: 'Komponen Kunci', value: 'Kipas Pendingin & VRAM' },
      { label: 'Output Port', value: 'HDMI & DisplayPort' }
    ],
    isInternal: true,
    notesOrigin: 'Catatan Hal. 3: "Mengolah data digital komputer menjadi tampilan visual di layar monitor. Menentukan ketajaman, resolusi, dan render."'
  },
  {
    id: 'dvd_rom',
    name: 'DVD-ROM (Cakram Optik)',
    shortName: 'DVD-ROM Drive',
    category: 'storage',
    categoryLabel: 'Pembaca Cakram Optik',
    summary: 'Membaca data kepingan DVD atau CD menggunakan sinar laser dan membantu instalasi program.',
    fullDefinition: 'DVD-ROM (Digital Versatile Disc Read Only Memory) adalah perangkat keras komputer atau cakram optik yang berfungsi untuk membaca data dari kepingan DVD atau CD.',
    functions: [
      'Membaca data dari berbagai file seperti video, audio, dokumen atau foto di kepingan DVD/CD.',
      'Menginstal perangkat lunak (membantu memasang aplikasi atau sistem operasi ke komputer dari piringan).'
    ],
    typesOrSpecs: ['Internal Optical Drive SATA', 'External USB DVD Writer', 'Kepingan DVD-R & DVD-RW'],
    image: HARDWARE_IMAGES.internalPC,
    highlightSpecs: [
      { label: 'Media Pembacaan', value: 'Cakram Optik DVD/CD' },
      { label: 'Metode Sensor', value: 'Sinar Laser Presisi' },
      { label: 'Aplikasi', value: 'Instalasi Software & Media' }
    ],
    isInternal: true,
    notesOrigin: 'Catatan Hal. 3: "Perangkat cakram optik untuk membaca data dari kepingan DVD/CD dan menginstal perangkat lunak."'
  },
  {
    id: 'ports',
    name: 'Port Komputer (Hardware & Logis)',
    shortName: 'Port Colokan & Jaringan',
    category: 'power_ports',
    categoryLabel: 'Antarmuka & Konektivitas',
    summary: 'Titik koneksi fisik colokan (USB, HDMI, LAN) dan jalur logis saluran virtual internet.',
    fullDefinition: 'Port adalah titik koneksi atau antarmuka yang berfungsi untuk menghubungkan satu perangkat dengan perangkat lainnya, baik secara fisik atau menggunakan kabel maupun secara logis melalui jaringan internet.',
    functions: [
      'Port Hardware: Colokan pada badan komputer/laptop untuk menancapkan flashdisk USB, kabel monitor HDMI, kabel internet LAN RJ-45, headset audio, dan charger daya.',
      'Port Logis: Saluran virtual di dalam sistem operasi yang digunakan saat perangkat terhubung ke internet untuk bertukar data (seperti port web 80/443).'
    ],
    typesOrSpecs: [
      'Port USB (Universal Serial Bus - Flashdisk, Mouse)',
      'Port HDMI (High Definition Multimedia Interface - Layar Monitor/Proyektor)',
      'Port LAN RJ-45 (Kabel Jaringan Internet)',
      'Port Audio Jack 3.5mm (Headphone & Mikrofon)'
    ],
    image: HARDWARE_IMAGES.portsIOPanel,
    highlightSpecs: [
      { label: 'Kategori Port', value: 'Port Fisik & Port Logis' },
      { label: 'Fungsi Utama', value: 'Menghubungkan Perangkat Luar' },
      { label: 'Contoh Fisik', value: 'USB-A, USB-C, HDMI, LAN' }
    ],
    isInternal: false,
    notesOrigin: 'Catatan Hal. 1: "Titik koneksi untuk menghubungkan satu perangkat dengan lainnya secara fisik maupun logis."'
  }
];

export const GEMINI_AI_MATERIAL = {
  title: 'Mengenal Kecerdasan Artifisial (AI) & Gemini AI',
  subtitle: 'Kecerdasan Buatan Generasi Baru dari Google yang Mampu Berpikir & Membantu Manusia',
  introText: 'Kecerdasan Artifisial (Artificial Intelligence / AI) adalah teknologi komputer yang dirancang untuk meniru kecerdasan manusia, seperti belajar, memahami bahasa, memecahkan masalah, dan membuat karya baru. Di buku catatan Raisya, dipelajari salah satu AI tercanggih di dunia: Google Gemini AI.',
  audioScript: 'Materi Kecerdasan Artifisial dan Gemini AI. Gemini AI adalah teknologi kecerdasan buatan canggih yang memiliki lima fungsi utama: pembuatan konten, analisis data, pengembangan aplikasi dan koding, interaksi tanya jawab dengan pengguna, serta penerjemahan bahasa alami dunia.',
  fiveCoreFunctions: [
    {
      number: '1',
      title: 'Pembuatan Konten',
      summary: 'Menghasilkan berbagai karya kreatif seperti artikel, puisi, gambar, hingga ide video dan skrip cerita.',
      detail: 'Salah satu fitur unggulan dari Gemini adalah kemampuan untuk membantu dalam pembuatan konten. Teknologi ini bisa menghasilkan berbagai jenis konten, mulai dari teks, gambar, hingga video. Misalnya kamu bisa menggunakan Gemini untuk menulis artikel atau bahkan menghasilkan kode pemrograman. Tak hanya itu, Gemini juga dapat menciptakan gambar kreatif atau video yang membuka banyak kemungkinan dalam pembuatan konten kreatif.',
      tag: 'Kreativitas & Ide'
    },
    {
      number: '2',
      title: 'Analisis Data',
      summary: 'Mengolah informasi dalam jumlah besar dan memberikan rangkuman insight yang cerdas dan terarah.',
      detail: 'Selain pembuatan konten, Gemini juga memiliki kemampuan dalam menganalisis data dalam jumlah besar. Baik itu data berupa teks atau visual, Gemini AI bisa membantu menginterpretasikan informasi dan memberikan insight yang sangat berguna untuk pengambilan keputusan yang lebih tepat.',
      tag: 'Logika & Pola Data'
    },
    {
      number: '3',
      title: 'Pengembangan Aplikasi',
      summary: 'Membantu pemrogram menulis kode koding, mencari kesalahan (bug), dan merancang aplikasi.',
      detail: 'Gemini juga mendukung pengembangan aplikasi. Dengan kemampuannya dalam memahami kode pemrograman dan bahasa alami, teknologi ini bisa mempercepat proses pengembangan aplikasi, mulai dari penulisan kode hingga perbaikan bug atau masalah teknis lainnya.',
      tag: 'Koding & Algoritma'
    },
    {
      number: '4',
      title: 'Interaksi dengan Pengguna',
      summary: 'Berkomunikasi dua arah seperti teman mengobrol yang ramah, sopan, dan berpengetahuan luas.',
      detail: 'Fungsi lain yang menarik adalah kemampuannya untuk berinteraksi langsung dengan pengguna seperti halnya chatbot. Gemini dapat menjawab pertanyaan, memberikan rekomendasi, bahkan melakukan percakapan interaktif dalam berbagai bahasa yang tentunya membuat pengalaman pengguna lebih dinamis dan personal.',
      tag: 'Chatbot & Dialog'
    },
    {
      number: '5',
      title: 'Penerjemahan Bahasa',
      summary: 'Menerjemahkan bahasa dunia secara alami dan akurat dengan teknologi Natural Language Processing (NLP).',
      detail: 'Gemini AI juga unggul dalam menerjemahkan bahasa dengan memanfaatkan teknologi Pemrosesan Bahasa Alami (Natural Language Processing atau NLP). Gemini dapat mengartikan teks dalam berbagai bahasa secara akurat, memudahkan komunikasi lintas negara dan budaya.',
      tag: 'Bahasa Dunia & NLP'
    }
  ]
};
