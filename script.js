/* ====================================================
   CatatUang – Script Utama
   Fitur: CRUD transaksi, localStorage, Chart.js, filter/search
   ==================================================== */

'use strict';

/* ───────────────────────────────────────────────────
   KONSTANTA & KONFIGURASI
─────────────────────────────────────────────────── */
const STORAGE_KEY = 'catatuang_transactions';
const THEME_KEY   = 'catatuang_theme';

// Daftar kategori berdasarkan tipe transaksi
const CATEGORIES = {
  income:  ['Gaji', 'Freelance', 'Investasi', 'Bonus', 'Lainnya'],
  expense: [
    'Makanan & Minuman', 'Transportasi', 'Belanja', 'Tagihan & Utilitas',
    'Kesehatan', 'Hiburan', 'Pendidikan', 'Tabungan', 'Lainnya'
  ]
};

// Warna chart per kategori pengeluaran (urutan sama dengan CATEGORIES.expense)
const CHART_COLORS = [
  '#f97316','#3b82f6','#8b5cf6','#ef4444',
  '#10b981','#f59e0b','#06b6d4','#ec4899','#6b7280'
];

/* ───────────────────────────────────────────────────
   DATA DUMMY (~25 transaksi realistis dalam Rupiah)
─────────────────────────────────────────────────── */
function getDummyData() {
  // Menggunakan tahun dan bulan saat ini serta beberapa bulan lalu
  const now   = new Date();
  const y     = now.getFullYear();
  const m     = now.getMonth(); // 0-based

  // Helper: format tanggal "YYYY-MM-DD"
  const d = (monthOffset, day) => {
    const dt = new Date(y, m + monthOffset, day);
    return dt.toISOString().slice(0, 10);
  };

  return [
    // ── Bulan ini ──
    { id: uid(), date: d(0,  2), type: 'income',  category: 'Gaji',               amount: 8500000,  note: 'Gaji pokok Oktober' },
    { id: uid(), date: d(0,  3), type: 'expense', category: 'Makanan & Minuman',  amount: 75000,    note: 'Makan siang kantor' },
    { id: uid(), date: d(0,  5), type: 'expense', category: 'Transportasi',        amount: 50000,    note: 'Bensin motor' },
    { id: uid(), date: d(0,  7), type: 'expense', category: 'Belanja',             amount: 320000,   note: 'Belanja bulanan supermarket' },
    { id: uid(), date: d(0,  8), type: 'income',  category: 'Freelance',           amount: 1200000,  note: 'Desain logo klien' },
    { id: uid(), date: d(0, 10), type: 'expense', category: 'Tagihan & Utilitas',  amount: 250000,   note: 'Tagihan listrik' },
    { id: uid(), date: d(0, 10), type: 'expense', category: 'Tagihan & Utilitas',  amount: 150000,   note: 'Tagihan internet' },
    { id: uid(), date: d(0, 12), type: 'expense', category: 'Hiburan',             amount: 120000,   note: 'Nonton bioskop' },
    { id: uid(), date: d(0, 14), type: 'expense', category: 'Makanan & Minuman',   amount: 95000,    note: 'Dinner keluarga' },
    { id: uid(), date: d(0, 15), type: 'expense', category: 'Kesehatan',           amount: 180000,   note: 'Vitamin & suplemen' },
    { id: uid(), date: d(0, 17), type: 'expense', category: 'Transportasi',        amount: 35000,    note: 'Ojek online' },
    { id: uid(), date: d(0, 20), type: 'income',  category: 'Investasi',           amount: 450000,   note: 'Dividen reksa dana' },
    { id: uid(), date: d(0, 22), type: 'expense', category: 'Pendidikan',          amount: 200000,   note: 'Kursus online Udemy' },
    { id: uid(), date: d(0, 25), type: 'expense', category: 'Tabungan',            amount: 500000,   note: 'Transfer ke rekening tabungan' },
    { id: uid(), date: d(0, 27), type: 'expense', category: 'Belanja',             amount: 85000,    note: 'Baju diskon' },

    // ── Bulan lalu ──
    { id: uid(), date: d(-1,  1), type: 'income',  category: 'Gaji',              amount: 8500000,  note: 'Gaji pokok September' },
    { id: uid(), date: d(-1,  4), type: 'expense', category: 'Makanan & Minuman', amount: 88000,    note: 'Sarapan & makan siang' },
    { id: uid(), date: d(-1,  9), type: 'expense', category: 'Belanja',           amount: 410000,   note: 'Belanja bulanan' },
    { id: uid(), date: d(-1, 12), type: 'income',  category: 'Bonus',             amount: 2000000,  note: 'Bonus proyek Q3' },
    { id: uid(), date: d(-1, 15), type: 'expense', category: 'Hiburan',           amount: 250000,   note: 'Spotify + Netflix' },
    { id: uid(), date: d(-1, 18), type: 'expense', category: 'Transportasi',      amount: 65000,    note: 'Parkir & tol' },
    { id: uid(), date: d(-1, 20), type: 'expense', category: 'Kesehatan',         amount: 350000,   note: 'Kunjungan dokter gigi' },
    { id: uid(), date: d(-1, 25), type: 'expense', category: 'Tabungan',          amount: 500000,   note: 'Transfer tabungan' },

    // ── Dua bulan lalu ──
    { id: uid(), date: d(-2,  1), type: 'income',  category: 'Gaji',              amount: 8500000,  note: 'Gaji pokok Agustus' },
    { id: uid(), date: d(-2,  5), type: 'expense', category: 'Pendidikan',        amount: 750000,   note: 'Buku & modul kuliah' },
    { id: uid(), date: d(-2, 14), type: 'income',  category: 'Freelance',         amount: 1800000,  note: 'Pembuatan website UMKM' },
    { id: uid(), date: d(-2, 20), type: 'expense', category: 'Belanja',           amount: 1200000,  note: 'Gadget aksesoris' },
    { id: uid(), date: d(-2, 28), type: 'expense', category: 'Lainnya',           amount: 75000,    note: 'Kado ulang tahun teman' },
  ];
}

/* ───────────────────────────────────────────────────
   UTILITAS
─────────────────────────────────────────────────── */
// Membuat ID unik sederhana berbasis waktu + random
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Format angka ke format Rupiah (Rp 1.500.000)
function formatRupiah(amount) {
  return 'Rp ' + Math.abs(amount).toLocaleString('id-ID');
}

// Format tanggal ke "dd MMM yyyy" (misal: 15 Okt 2024)
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${String(d).padStart(2,'0')} ${months[m-1]} ${y}`;
}

// Mendapatkan string "YYYY-MM" dari objek Date
function toMonthStr(date) {
  return date.toISOString().slice(0, 7);
}

/* ───────────────────────────────────────────────────
   STATE APLIKASI
─────────────────────────────────────────────────── */
let transactions = [];   // array utama semua transaksi
let editingId    = null; // ID transaksi yang sedang diedit
let deleteId     = null; // ID transaksi yang akan dihapus
let chartInstance = null; // instance Chart.js

/* ───────────────────────────────────────────────────
   PERSISTENSI: localStorage
─────────────────────────────────────────────────── */
// Menyimpan data ke localStorage
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// Memuat data dari localStorage; jika kosong, muat dummy
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    transactions = JSON.parse(raw);
  } else {
    transactions = getDummyData();
    saveToStorage();
  }
}

/* ───────────────────────────────────────────────────
   DARK MODE
─────────────────────────────────────────────────── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ───────────────────────────────────────────────────
   KALKULASI RINGKASAN
─────────────────────────────────────────────────── */
// Menghitung total pemasukan, pengeluaran, dan saldo untuk bulan aktif
function calcSummary(monthStr) {
  const filtered = transactions.filter(t => t.date.startsWith(monthStr));
  const income  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
}

// Menghitung total per kategori pengeluaran bulan aktif (untuk chart)
function calcExpenseByCategory(monthStr) {
  const result = {};
  transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(monthStr))
    .forEach(t => {
      result[t.category] = (result[t.category] || 0) + t.amount;
    });
  return result;
}

/* ───────────────────────────────────────────────────
   RENDER: DASHBOARD
─────────────────────────────────────────────────── */
function renderDashboard() {
  const monthStr = document.getElementById('active-month').value;
  const { income, expense, balance } = calcSummary(monthStr);

  document.getElementById('total-income').textContent  = formatRupiah(income);
  document.getElementById('total-expense').textContent = formatRupiah(expense);

  const balEl = document.getElementById('total-balance');
  balEl.textContent = formatRupiah(balance);
  // Warna saldo: merah jika negatif
  balEl.style.color = balance < 0 ? 'var(--expense)' : '';
}

/* ───────────────────────────────────────────────────
   RENDER: CHART (Doughnut) + LEGEND
─────────────────────────────────────────────────── */
function renderChart() {
  const monthStr   = document.getElementById('active-month').value;
  const byCategory = calcExpenseByCategory(monthStr);
  const labels     = Object.keys(byCategory);
  const data       = Object.values(byCategory);

  const chartEmpty  = document.getElementById('chart-empty');
  const legendEl    = document.getElementById('category-legend');
  const canvas      = document.getElementById('expense-chart');

  if (labels.length === 0) {
    // Tidak ada data pengeluaran bulan ini
    chartEmpty.classList.remove('hidden');
    canvas.classList.add('hidden');
    legendEl.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem">Tidak ada data.</p>';
    if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
    return;
  }

  chartEmpty.classList.add('hidden');
  canvas.classList.remove('hidden');

  // Warna: cocokkan dengan CATEGORIES.expense, fallback ke gray
  const colors = labels.map(lbl => {
    const idx = CATEGORIES.expense.indexOf(lbl);
    return idx >= 0 ? CHART_COLORS[idx] : '#9ca3af';
  });

  // Deteksi dark mode untuk warna teks chart
  const isDark    = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#e8eaf0' : '#1a1d23';

  if (chartInstance) {
    // Update data chart yang sudah ada (lebih efisien)
    chartInstance.data.labels               = labels;
    chartInstance.data.datasets[0].data     = data;
    chartInstance.data.datasets[0].backgroundColor = colors;
    chartInstance.options.plugins.legend.labels.color = textColor;
    chartInstance.update();
  } else {
    // Buat chart baru
    chartInstance = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: isDark ? '#1a1d2e' : '#ffffff',
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            display: false // legend kustom kita sendiri
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${formatRupiah(ctx.parsed)}`
            }
          }
        }
      }
    });
  }

  // Render legend kategori teks di bawah chart
  const total = data.reduce((s, v) => s + v, 0);
  legendEl.innerHTML = labels.map((lbl, i) => {
    const pct = total > 0 ? ((data[i] / total) * 100).toFixed(1) : 0;
    return `
      <div class="legend-item">
        <span class="legend-dot" style="background:${colors[i]}"></span>
        <span class="legend-name">${lbl}</span>
        <span class="legend-amount">${pct}%</span>
      </div>`;
  }).join('');
}

/* ───────────────────────────────────────────────────
   RENDER: FILTER SELECT KATEGORI
─────────────────────────────────────────────────── */
function renderFilterCategories() {
  const sel     = document.getElementById('filter-category');
  const current = sel.value;

  // Kumpulkan semua kategori unik yang ada di data
  const allCats = [...new Set(transactions.map(t => t.category))].sort();

  sel.innerHTML = '<option value="all">Semua</option>';
  allCats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (cat === current) opt.selected = true;
    sel.appendChild(opt);
  });
}

/* ───────────────────────────────────────────────────
   RENDER: TABEL TRANSAKSI
─────────────────────────────────────────────────── */
function renderTransactions() {
  const monthStr   = document.getElementById('active-month').value;
  const typeFilter = document.getElementById('filter-type').value;
  const catFilter  = document.getElementById('filter-category').value;
  const search     = document.getElementById('filter-search').value.toLowerCase().trim();

  // Terapkan semua filter
  let list = transactions.filter(t => {
    const matchMonth = t.date.startsWith(monthStr);
    const matchType  = typeFilter === 'all' || t.type === typeFilter;
    const matchCat   = catFilter  === 'all' || t.category === catFilter;
    const matchSearch = !search || t.note.toLowerCase().includes(search) ||
                        t.category.toLowerCase().includes(search);
    return matchMonth && matchType && matchCat && matchSearch;
  });

  // Urutkan dari terbaru
  list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  const tbody      = document.getElementById('transactions-body');
  const emptyState = document.getElementById('empty-state');

  if (list.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  tbody.innerHTML = list.map(t => {
    const isIncome  = t.type === 'income';
    const amountStr = (isIncome ? '+' : '−') + ' ' + formatRupiah(t.amount);
    const amountCls = isIncome ? 'text-income' : 'text-expense';
    return `
      <tr data-id="${t.id}">
        <td>${formatDate(t.date)}</td>
        <td><span class="badge-category">${t.category}</span></td>
        <td>${t.note || '<em style="color:var(--text-muted)">—</em>'}</td>
        <td class="text-right ${amountCls}">${amountStr}</td>
        <td class="text-center">
          <button class="btn-table edit" onclick="openEditModal('${t.id}')" title="Edit">✏️</button>
          <button class="btn-table delete" onclick="openDeleteConfirm('${t.id}')" title="Hapus">🗑️</button>
        </td>
      </tr>`;
  }).join('');
}

/* ───────────────────────────────────────────────────
   RENDER LENGKAP (dipanggil setiap perubahan data/filter)
─────────────────────────────────────────────────── */
function renderAll() {
  renderDashboard();
  renderChart();
  renderFilterCategories();
  renderTransactions();
}

/* ───────────────────────────────────────────────────
   MODAL FORM: TAMBAH & EDIT
─────────────────────────────────────────────────── */
// Mengisi dropdown kategori di form sesuai tipe yang dipilih
function updateFormCategories(type) {
  const sel = document.getElementById('form-category');
  const cats = CATEGORIES[type] || [];
  sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

// Membuka modal untuk tambah transaksi baru
function openAddModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Tambah Transaksi';
  document.getElementById('btn-save').textContent    = 'Simpan';

  // Reset form ke nilai default
  document.querySelector('input[name="type"][value="expense"]').checked = true;
  document.getElementById('form-date').value   = new Date().toISOString().slice(0, 10);
  document.getElementById('form-amount').value = '';
  document.getElementById('form-note').value   = '';
  updateFormCategories('expense');
  hideFormError();

  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('form-amount').focus();
}

// Membuka modal edit dengan data transaksi yang sudah ada
function openEditModal(id) {
  const t = transactions.find(x => x.id === id);
  if (!t) return;

  editingId = id;
  document.getElementById('modal-title').textContent = 'Edit Transaksi';
  document.getElementById('btn-save').textContent    = 'Perbarui';

  // Isi field form dengan data yang ada
  document.querySelector(`input[name="type"][value="${t.type}"]`).checked = true;
  document.getElementById('form-date').value   = t.date;
  document.getElementById('form-amount').value = t.amount;
  document.getElementById('form-note').value   = t.note || '';
  updateFormCategories(t.type);
  document.getElementById('form-category').value = t.category;
  hideFormError();

  document.getElementById('modal-overlay').classList.remove('hidden');
}

// Menutup modal form
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  editingId = null;
}

function showFormError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}
function hideFormError() {
  document.getElementById('form-error').classList.add('hidden');
}

/* ───────────────────────────────────────────────────
   CRUD: SIMPAN (Tambah / Edit)
─────────────────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();

  const type     = document.querySelector('input[name="type"]:checked').value;
  const date     = document.getElementById('form-date').value;
  const category = document.getElementById('form-category').value;
  const amountRaw = document.getElementById('form-amount').value;
  const note     = document.getElementById('form-note').value.trim();

  // Validasi sederhana
  if (!date) { showFormError('Tanggal wajib diisi.'); return; }
  const amount = parseFloat(amountRaw);
  if (!amountRaw || isNaN(amount) || amount <= 0) {
    showFormError('Jumlah harus berupa angka lebih dari 0.'); return;
  }

  if (editingId) {
    // Mode edit: update transaksi yang ada
    const idx = transactions.findIndex(t => t.id === editingId);
    if (idx !== -1) {
      transactions[idx] = { ...transactions[idx], type, date, category, amount, note };
    }
  } else {
    // Mode tambah: buat transaksi baru
    transactions.push({ id: uid(), type, date, category, amount, note });
  }

  saveToStorage();
  closeModal();
  renderAll();
}

/* ───────────────────────────────────────────────────
   CRUD: HAPUS
─────────────────────────────────────────────────── */
function openDeleteConfirm(id) {
  deleteId = id;
  document.getElementById('confirm-overlay').classList.remove('hidden');
}

function closeDeleteConfirm() {
  deleteId = null;
  document.getElementById('confirm-overlay').classList.add('hidden');
}

function handleDeleteConfirm() {
  if (!deleteId) return;
  transactions = transactions.filter(t => t.id !== deleteId);
  saveToStorage();
  closeDeleteConfirm();
  renderAll();
}

/* ───────────────────────────────────────────────────
   RESET KE DATA DUMMY
─────────────────────────────────────────────────── */
function resetToDummy() {
  const ok = confirm('Reset semua data ke contoh bawaan?\nSemua transaksi Anda akan dihapus.');
  if (!ok) return;
  transactions = getDummyData();
  saveToStorage();
  renderAll();
}

/* ───────────────────────────────────────────────────
   INISIALISASI
─────────────────────────────────────────────────── */
function init() {
  // 1. Terapkan tema yang tersimpan (atau light sebagai default)
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);

  // 2. Set bulan aktif ke bulan saat ini
  document.getElementById('active-month').value = toMonthStr(new Date());

  // 3. Muat data dari localStorage (atau dummy jika pertama kali)
  loadFromStorage();

  // 4. Render awal
  renderAll();

  // ── Pasang event listeners ──

  // Toggle tema
  document.getElementById('btn-theme').addEventListener('click', () => {
    toggleTheme();
    renderChart(); // Chart perlu diperbarui ulang agar warna teks sesuai tema
  });

  // Reset data dummy
  document.getElementById('btn-reset').addEventListener('click', resetToDummy);

  // Tombol tambah transaksi
  document.getElementById('btn-add').addEventListener('click', openAddModal);

  // Perubahan bulan aktif → re-render
  document.getElementById('active-month').addEventListener('change', renderAll);

  // Filter: tipe, kategori, pencarian
  document.getElementById('filter-type').addEventListener('change', renderTransactions);
  document.getElementById('filter-category').addEventListener('change', renderTransactions);
  document.getElementById('filter-search').addEventListener('input', renderTransactions);

  // Reset filter
  document.getElementById('btn-clear-filter').addEventListener('click', () => {
    document.getElementById('filter-type').value     = 'all';
    document.getElementById('filter-category').value = 'all';
    document.getElementById('filter-search').value   = '';
    renderTransactions();
  });

  // Form: perubahan tipe → update opsi kategori
  document.querySelectorAll('input[name="type"]').forEach(radio => {
    radio.addEventListener('change', e => updateFormCategories(e.target.value));
  });

  // Form: submit
  document.getElementById('transaction-form').addEventListener('submit', handleFormSubmit);

  // Modal: tutup via tombol ✕ atau Escape
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('btn-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  // Konfirmasi hapus
  document.getElementById('btn-confirm-ok').addEventListener('click', handleDeleteConfirm);
  document.getElementById('btn-confirm-cancel').addEventListener('click', closeDeleteConfirm);
  document.getElementById('confirm-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('confirm-overlay')) closeDeleteConfirm();
  });

  // Tombol Escape menutup modal mana pun
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeDeleteConfirm();
    }
  });
}

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', init);
