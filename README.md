# Nexora Game Store

Prototipe storefront game PC dengan React, Vite, Tailwind CSS, dan React Context. Terinspirasi alur toko game seperti Steam, dengan identitas visual Nexora. Proyek ini belum dihosting dan belum mencakup laporan tugas.

Tampilan terinspirasi Windows XP Luna: desktop biru, bilah judul, panel tugas Explorer, tombol klasik, taskbar, dan menu Start. Jendela dapat diminimalkan, dibuka kembali dari taskbar, serta dimaksimalkan. Katalog tetap memakai pencarian, dropdown kategori/sorting, game sorotan, dan kartu game. Tersedia mode terang klasik dan mode gelap. Semua komponen memakai variabel `--font-ui` untuk Tahoma regular/bold dari font lokal perangkat, dengan Verdana/Arial/sans-serif sebagai fallback. File font sistem tidak disalin ke proyek.

Gaya retro menggunakan bingkai jendela 5px, border kartu/tombol 3px, sudut kotak, bayangan tanpa blur, serta efek tombol timbul dan ditekan. Border menyesuaikan mode terang/gelap; fokus keyboard tetap terlihat.

## Menjalankan secara lokal

Gunakan Node.js 22.12+ atau 24 LTS.

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite. Build produksi: `npm run build`. Preview build: `npm run preview`.

## Konfigurasi GitHub Pages

Workflow `.github/workflows/deploy.yml` sudah disiapkan untuk menginstal dependency dengan `npm ci`, build memakai Node.js 24, dan menerbitkan hanya hasil folder `dist/`. Konfigurasi ini belum dijalankan di GitHub dan belum menghasilkan URL publik.

Saat sudah ingin menerbitkan aplikasi:

1. Buat repository GitHub, lalu upload/push kode sumber ke branch `main`. Sertakan folder `.github/`, `src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `README.md`, dan `.gitignore`. `public/games/` diperlukan untuk seluruh sampul game. Upload isi proyek di root repository, bukan di dalam folder tambahan.
2. Buka **Settings → Pages → Build and deployment → Source**, lalu pilih **GitHub Actions**. Repository public dapat memakai GitHub Pages pada akun GitHub Free.
3. Buka tab **Actions → Deploy Nexora to GitHub Pages → Run workflow**, pilih `main`, dan jalankan. Push berikutnya ke `main` juga akan memperbarui website secara otomatis.
4. Setelah berhasil, ambil URL dari hasil job `deploy` atau **Settings → Pages**. Tambahkan URL tersebut ke portofolio saat siap.

Tidak perlu meng-upload `node_modules/`, `dist/`, `.sites-runtime/`, `.git/`, atau `.env`. Jika upload melalui browser, pastikan file `.github/workflows/deploy.yml` ikut terunggah; folder bertitik dapat tersembunyi di file explorer. Tidak perlu membuat branch `gh-pages` untuk workflow ini, dan tidak diperlukan token pribadi atau secret tambahan.

Workflow membaca `base_path` dari konfigurasi GitHub Pages dan meneruskannya sebagai `VITE_BASE_PATH`. Repository biasa otomatis memakai `/<nama-repository>/`, sedangkan repository `username.github.io` atau custom domain memakai `/`. Nama repository tidak perlu ditulis manual dalam kode. Build lokal tanpa variabel ini tetap memakai `./`. Navigasi hash seperti `/#library` mendukung refresh tanpa rewrite server.

Untuk mencoba base path repository secara lokal di PowerShell:

```powershell
$env:VITE_BASE_PATH = "/nexora-game-store/"
npm run build
npm run preview -- --base=/nexora-game-store/
```

Buka `http://127.0.0.1:4173/nexora-game-store/`. Setelah selesai mencoba, jalankan `Remove-Item Env:VITE_BASE_PATH` di terminal yang sama untuk kembali ke konfigurasi build lokal.

Jika branch utama repository bernama selain `main`, sesuaikan `on.push.branches` pada workflow. Bila workflow gagal sebelum build, periksa bahwa Pages memakai sumber GitHub Actions; log lengkap tersedia di tab Actions.

Referensi: [Deploy Vite ke GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages) dan [custom workflow GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Fitur

- Katalog 60 game, pencarian judul/developer/tag, filter 7 kategori, dan sorting. Sampul disimpan lokal agar tidak bergantung pada CDN saat aplikasi dibuka.
- Satu game sorotan dan detail game dalam dialog.
- Keranjang digital: tambah/hapus, pencegahan duplikasi, diskon, dan total dinamis.
- Wishlist dan library dari pembelian simulasi.
- Checkout dengan validasi nama, email, nomor telepon Indonesia, kode demo `123456`, serta konfirmasi simulasi. Pilihan E-Wallet, Virtual Account, dan QRIS adalah simulasi, tanpa integrasi payment gateway.
- Merchant dashboard: statistik transaksi lokal, tambah/edit/hapus katalog, dan riwayat pesanan.
- Tema terang/gelap, navigasi mobile, state persisten di localStorage, dan navigasi hash yang mendukung refresh serta tombol back/forward.
- Menu bahasa English/Bahasa Indonesia di toolbar XP, dengan English sebagai default. Pilihan disimpan di localStorage; label, validasi, notifikasi, deskripsi game bawaan, tanggal, dan format harga mengikuti bahasa. Mata uang tetap IDR dan teks yang dimasukkan merchant tetap sesuai input.

## Struktur komponen

```text
src/
├── main.jsx                    # Entry point dan StoreProvider
├── App.jsx                     # Navigasi tampilan dan conditional rendering
├── styles.css                  # Tailwind dan tema/responsive styles
├── xp.css                      # Tema Windows XP dan shell responsif
├── context/
│   ├── StoreContext.jsx         # Provider, localStorage, dan actions
│   ├── store.js                 # Identitas Context
│   ├── useStore.js              # Hook useContext bersama
│   └── useI18n.js               # Hook bahasa, terjemahan, dan format lokal
├── data/
│   ├── games.js                 # Data contoh, helper harga, gambar
│   ├── extraGames.js            # 50 game tambahan dengan deskripsi EN/ID
│   ├── catalog.js               # Migrasi katalog persisten tanpa menimpa edit
│   ├── validation.js            # Validasi checkout
│   └── translations.js          # Kamus English/Indonesia dan deskripsi bawaan
├── components/
│   ├── Layout.jsx              # Jendela XP, navigasi, taskbar, menu Start
│   ├── GameCard.jsx            # Kartu game menerima props game/onSelect
│   ├── GameDetail.jsx          # Detail dan aksi game
│   └── Modal.jsx               # Native dialog, focus trap, Escape
└── pages/
    ├── Storefront.jsx          # Katalog, filter, game sorotan, wishlist/sale
    ├── Cart.jsx                # Keranjang dan OrderSummary
    ├── Checkout.jsx            # Form, validasi, receipt sukses
    ├── Library.jsx             # Koleksi dan riwayat pembelian
    └── Dashboard.jsx           # Statistik dan CRUD katalog
public/
├── favicon.svg
└── games/                      # Artwork lokal
```

## Penerapan konsep React

| Konsep                | Implementasi                                                      |
| --------------------- | ----------------------------------------------------------------- |
| React Component       | Layout, GameCard, Modal, OrderSummary, dan page components        |
| Passing Props         | `GameCard({ game, onSelect })`, `Layout({ page, navigate })`      |
| Conditional Rendering | Tampilan sesuai page, empty state, status cart, errors, receipt   |
| useState              | Filter, pencarian, form, modal, dan state global                  |
| useContext            | Hook `useStore()` mengakses `StoreContext` di seluruh komponen    |
| useEffect             | Persistensi, tema, toast timer, hash navigation, lifecycle dialog |

## Batasan prototipe

Semua harga, diskon, rating, dan data transaksi adalah contoh untuk tugas. Data hanya tersimpan di browser/perangkat yang digunakan, tanpa backend, autentikasi, pembayaran nyata, pengiriman email, atau download game. Form merchant memakai artwork yang sudah tersedia sebagai pilihan contoh. Riwayat pembelian tetap tersimpan ketika produk dihapus dari katalog.

Ekspansi katalog versi 2 menambahkan 50 game pada data browser versi lama satu kali, sambil mempertahankan produk yang diedit, keranjang, wishlist, bahasa, dan pesanan. Produk yang dihapus setelah migrasi tidak ditambahkan kembali saat refresh. Nama, developer, tahun rilis versi Steam, artwork, serta spesifikasi game tambahan dirujuk dari metadata Steam Store; deskripsinya diringkas dalam English dan Bahasa Indonesia.

Artwork dan nama game merupakan milik pemegang hak masing-masing. Gambar diambil dari metadata publik Steam Store untuk app IDs yang tercatat dalam `src/data/games.js`; dipakai sebagai contoh akademis dan tidak menunjukkan afiliasi dengan Steam atau penerbit. Referensi latihan React: https://github.com/yaniyuna/React-Pertama.

Jika perlu mengembalikan data demo awal, hapus key berawalan `nexora-` dari localStorage melalui browser developer tools. Tidak ada URL publik atau repository remote yang dibuat pada tahap ini.
