import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berdasarkan catatan materi, apakah definisi yang tepat dari komputer?',
    options: [
      'Alat ketik manual untuk mencetak huruf di lembaran kertas putih',
      'Serangkaian mesin elektronik yang menerima data (INPUT), mengelola (PROSES), dan memberikan informasi (OUTPUT) di bawah kontrol program memori',
      'Hanya sebuah layar kaca untuk menonton video dan bermain game tanpa proses komputasi',
      'Papan tombol elektronik yang hanya berfungsi menyimpan baterai portable'
    ],
    correctIndex: 1,
    explanation: 'Komputer adalah serangkaian mesin elektronik yang saling bekerja sama untuk menerima data (Input), mengelola data (Proses), dan memberikan informasi (Output) yang terkontrol program di dalam memori.',
    targetCategory: 'Konsep Dasar'
  },
  {
    id: 2,
    question: 'Mengapa laptop disebut sebagai komputer bergerak (portable)?',
    options: [
      'Karena tidak memiliki layar dan hanya bisa disambungkan ke proyektor',
      'Karena harus selalu dicolokkan ke stopkontak dinding PLN setiap saat',
      'Karena mempersatukan CPU, keyboard, monitor, mouse (touchpad), dan sumber daya listrik baterai dalam satu perangkat yang praktis dibawa',
      'Karena ukurannya sangat besar dan membutuhkan ruangan khusus'
    ],
    correctIndex: 2,
    explanation: 'Laptop adalah komputer bergerak yang mempersatukan CPU, keyboard, monitor, mouse, dan baterai mandiri sehingga mudah dibawa ke mana saja.',
    targetCategory: 'Hardware Portabel'
  },
  {
    id: 3,
    question: 'Komponen apakah yang sering disebut sebagai "Kepala atau Otak Komputer" yang memproses semua perintah dan data?',
    options: [
      'CPU (Central Processing Unit / Processor)',
      'Printer InkJet',
      'Kabel Daya Stopkontak',
      'Cakram DVD Kepingan'
    ],
    correctIndex: 0,
    explanation: 'CPU (Central Processing Unit) berfungsi sebagai otak seluruh sistem komputer, mengambil perintah dari memori, melakukan perhitungan logika & matematika, serta mengoordinasikan seluruh komponen.',
    targetCategory: 'Komponen Internal'
  },
  {
    id: 4,
    question: 'Apakah fungsi utama dari PSU (Power Supply Unit) pada bagian dalam komputer?',
    options: [
      'Menampilkan gambar resolusi 4K ke monitor',
      'Mengubah arus listrik AC dari stopkontak menjadi arus DC stabil untuk menyuplai daya ke seluruh komponen internal',
      'Menyimpan file dokumen dan foto secara permanen',
      'Mencetak dokumen tugas ke lembaran kertas HVS'
    ],
    correctIndex: 1,
    explanation: 'PSU bertugas mengubah arus listrik bolak-balik AC dari stopkontak menjadi arus searah DC yang stabil dan aman untuk seluruh komponen internal komputer.',
    targetCategory: 'Komponen Internal'
  },
  {
    id: 5,
    question: 'Apakah perbedaan mendasar antara RAM (Random Access Memory) dengan Harddisk (HDD)?',
    options: [
      'RAM menyimpan data sementara untuk aplikasi yang sedang aktif, sedangkan Harddisk menyimpan data secara permanen atau jangka panjang',
      'RAM berfungsi mencetak gambar, sedangkan Harddisk menampilkan teks ke layar',
      'RAM berukuran sangat besar berputar mekanik, sedangkan Harddisk hanya berupa chip tombol keyboard',
      'Tidak ada perbedaan, keduanya sama-sama menyimpan data permanen selamanya'
    ],
    correctIndex: 0,
    explanation: 'RAM adalah memori sementara (volatile) untuk mempercepat multitasking aplikasi yang sedang dibuka, sedangkan Harddisk adalah tempat penyimpanan data jangka panjang/permanen.',
    targetCategory: 'Memori & Penyimpanan'
  },
  {
    id: 6,
    question: 'Komponen perangkat keras yang bertugas mengolah data digital menjadi tampilan visual, gambar, serta menentukan kecepatan render game dan video adalah...',
    options: [
      'DVD-ROM',
      'VGA Card (Kartu Grafis / GPU)',
      'Mouse Optik',
      'Kabel Stopkontak'
    ],
    correctIndex: 1,
    explanation: 'VGA Card (Video Graphics Array / GPU) mengolah data visual dan grafis dari prosesor untuk ditampilkan ke layar monitor dengan resolusi tajam dan lancar.',
    targetCategory: 'Komponen Internal'
  },
  {
    id: 7,
    question: 'Di bawah ini yang seluruhnya termasuk ke dalam Perangkat Masukan (Input) adalah...',
    options: [
      'Monitor dan Speaker',
      'Printer dan Proyektor',
      'Keyboard dan Mouse',
      'VGA Card dan Power Supply'
    ],
    correctIndex: 2,
    explanation: 'Keyboard (papan ketik huruf/angka) dan Mouse (pengendali kursor penunjuk) merupakan contoh perangkat masukan (input) yang mengirim data/perintah ke dalam komputer.',
    targetCategory: 'Perangkat Input'
  },
  {
    id: 8,
    question: 'Apa fungsi dari titik koneksi yang disebut Port Hardware pada komputer atau laptop?',
    options: [
      'Colokan fisik untuk menghubungkan perangkat luar seperti USB flashdisk, kabel HDMI monitor, dan kabel LAN internet',
      'Tombol untuk merusak komponen komputer',
      'Kaca transparan pada layar monitor LCD',
      'Baterai penyimpan energi matahari'
    ],
    correctIndex: 0,
    explanation: 'Port Hardware adalah colokan fisik pada komputer/laptop yang menghubungkan periferal luar seperti flashdisk (USB), layar (HDMI), jaringan kabel (LAN), dan headset audio.',
    targetCategory: 'Konektivitas'
  },
  {
    id: 9,
    question: 'Berikut adalah jenis-jenis merek / arsitektur processor yang dicatat dalam materi pelajaran, KECUALI...',
    options: [
      'Intel',
      'AMD',
      'ARM',
      'Kertas HVS'
    ],
    correctIndex: 3,
    explanation: 'Tiga jenis prosesor utama yang tertulis di catatan adalah Intel, AMD, dan ARM. Kertas HVS adalah media cetak printer.',
    targetCategory: 'Komponen Internal'
  },
  {
    id: 10,
    question: 'Salah satu fungsi utama Gemini AI yang memanfaatkan teknologi Natural Language Processing (NLP) untuk menerjemahkan teks lintas bahasa secara akurat adalah...',
    options: [
      'Penerjemahan Bahasa (Language Translation)',
      'Penggantian Kabel Listrik Otomatis',
      'Pembersihan Kaca Monitor CRT',
      'Penyimpanan Cakram DVD Fisik'
    ],
    correctIndex: 0,
    explanation: 'Gemini AI unggul dalam Penerjemahan Bahasa dengan memanfaatkan Pemrosesan Bahasa Alami (NLP) sehingga dapat menerjemahkan teks lintas budaya dan bahasa secara tepat.',
    targetCategory: 'Kecerdasan Artifisial'
  }
];
