💰 Keuangan IBM — Pencatat Keuangan Pribadi

Aplikasi web sederhana untuk mencatat pemasukan dan pengeluaran harian. Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework dan tanpa backend), dengan bantuan IBM Bob.

✨ Fitur
Kelola transaksi: tambah, edit, dan hapus pemasukan maupun pengeluaran (tanggal, kategori, jumlah, catatan).
Dashboard ringkasan: total pemasukan, total pengeluaran, dan saldo bulan ini.
Grafik pengeluaran per kategori: pie/doughnut chart menggunakan Chart.js.
Filter dan pencarian: saring berdasarkan bulan dan kategori, cari berdasarkan catatan.
Penyimpanan lokal: data tersimpan di localStorage, jadi tidak hilang saat browser ditutup.
Data dummy: 20-30 transaksi contoh dalam Rupiah dimuat otomatis saat pertama kali dibuka, plus tombol Reset ke data dummy.
Tampilan responsif: nyaman dipakai di HP maupun laptop, mendukung dark mode.
Format Rupiah: contoh Rp 1.500.000.
🛠️ Teknologi
HTML5
CSS3
JavaScript (Vanilla)
Chart.js (via CDN)
📁 Struktur Proyek
keunganIBM/
├── index.html   # Struktur halaman
├── style.css    # Tampilan dan tema (termasuk dark mode)
├── script.js    # Logika aplikasi, localStorage, dan grafik
└── README.md    # Dokumentasi
🚀 Cara Menjalankan
Download atau clone repositori ini:
bash
   git clone https://github.com/stellarlogiic/keungan-ibm.git
Buka folder keungan-ibm.
Klik dua kali index.html (atau klik kanan → Open with → browser).
Selesai, aplikasi langsung bisa dipakai. Pastikan ada koneksi internet agar Chart.js (CDN) termuat.

Tips: di VS Code/IBM Bob, kamu juga bisa memakai ekstensi Live Server untuk menjalankannya.

🌐 Demo Online (GitHub Pages)
Buka repositori di GitHub → Settings → Pages.
Pada Branch, pilih main dan folder / (root), lalu Save.
Tunggu beberapa menit, aplikasi bisa dibuka di: https://stellarlogiic.github.io/keungan-ibm/
📝 Catatan
Semua data tersimpan di browser masing-masing pengguna (tidak dikirim ke server).
Menghapus data situs/cache browser akan menghapus transaksi. Gunakan tombol Reset ke data dummy untuk mengembalikan data contoh.
Data awal hanyalah contoh dan bukan data keuangan sebenarnya.
📄 Lisensi

Bebas digunakan untuk belajar dan pengembangan pribadi.

Readme
MD
Uploads
1793419575521_image.png, 1793419471921_image.png
+6
