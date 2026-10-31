# 💰 CatatUang — Pencatat Keuangan Pribadi

Aplikasi web sederhana untuk mencatat pemasukan dan pengeluaran pribadi. Berjalan 100% di browser, tanpa instalasi, tanpa backend.

---

## 🚀 Cara Menjalankan

Karena aplikasi ini murni HTML/CSS/JS statis, cukup buka file-nya di browser:

### Cara termudah (langsung buka file)
1. Ekstrak / pastikan tiga file berada dalam **satu folder yang sama**:
   ```
   index.html
   style.css
   script.js
   ```
2. Klik dua kali `index.html` → browser akan langsung membukanya.

> **Catatan:** Chart.js dimuat dari CDN, jadi pastikan ada koneksi internet saat pertama kali membuka halaman.

### Menggunakan Live Server (opsional, untuk developer)
```bash
# Dengan VS Code + ekstensi Live Server:
# Klik kanan index.html → "Open with Live Server"

# Atau dengan Node.js:
npx serve .

# Atau dengan Python:
python -m http.server 8000
# Buka http://localhost:8000
```

---

## ✨ Daftar Fitur

| Fitur | Keterangan |
|---|---|
| **Tambah Transaksi** | Form modal dengan field: tipe, tanggal, kategori, jumlah, catatan |
| **Edit Transaksi** | Klik ✏️ pada baris tabel untuk mengedit data |
| **Hapus Transaksi** | Klik 🗑️ dengan dialog konfirmasi sebelum menghapus |
| **Dashboard Ringkasan** | Card total pemasukan, pengeluaran, dan saldo bulan aktif |
| **Grafik Doughnut** | Chart.js visualisasi pengeluaran per kategori dengan persentase |
| **Filter Tipe** | Filter semua / pemasukan / pengeluaran |
| **Filter Kategori** | Dropdown kategori yang terisi otomatis dari data |
| **Pencarian Catatan** | Cari transaksi berdasarkan teks catatan |
| **Pilih Periode** | Input bulan untuk melihat ringkasan & transaksi bulan tertentu |
| **Data Dummy** | 28 transaksi contoh realistis dalam Rupiah dimuat otomatis |
| **Reset Data** | Tombol "Reset Data" mengembalikan ke data dummy kapan saja |
| **Dark Mode** | Toggle 🌙/☀️ di navbar, preferensi tersimpan di localStorage |
| **localStorage** | Semua data tersimpan lokal, tidak hilang saat browser ditutup |
| **Responsif** | Tampilan menyesuaikan di HP (≤480px), tablet (≤768px), dan laptop |
| **Format Rupiah** | Semua angka ditampilkan dalam format `Rp 1.500.000` |

---

## 📁 Struktur File

```
keunganIBM/
├── index.html   ← Struktur HTML, layout, modal form
├── style.css    ← Tampilan, tema light/dark, responsif
├── script.js    ← Logika CRUD, localStorage, Chart.js, filter
└── README.md    ← Dokumentasi ini
```

---

## 🗂️ Kategori Transaksi

**Pemasukan:** Gaji · Freelance · Investasi · Bonus · Lainnya

**Pengeluaran:** Makanan & Minuman · Transportasi · Belanja · Tagihan & Utilitas · Kesehatan · Hiburan · Pendidikan · Tabungan · Lainnya

---

## 🛠️ Teknologi

- **HTML5** — struktur semantik
- **CSS3** — custom properties, flexbox, grid, media queries
- **JavaScript ES6+** — vanilla JS, tanpa framework
- **[Chart.js 4.4](https://www.chartjs.org/)** — grafik doughnut via CDN
- **localStorage** — penyimpanan data lokal di browser

---

## 📌 Catatan

- Data hanya tersimpan di browser yang sama. Tidak sinkron antar perangkat.
- Untuk memulai dari awal, klik **🔄 Reset Data** di navbar.
- Tidak membutuhkan koneksi internet kecuali untuk memuat Chart.js dari CDN.
