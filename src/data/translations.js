import { initialGames } from "./games.js";

// Indonesian text is the stable key; identifiers and user data are not translated.
export const english = {
  Beranda: "Home",
  "Katalog game": "Game catalog",
  Diskon: "Discount",
  "Daftar Game": "Games",
  "Game Diskon": "On Sale",
  Keranjang: "Cart",
  Bahasa: "Language",
  Lokasi: "Location",
  "Tugas toko": "Store Tasks",
  "Lihat semua game": "Browse all games",
  "Buka keranjang": "Open cart",
  "Library saya": "My Library",
  Informasi: "Information",
  "Pembayaran simulasi": "Simulated payment",
  "Jendela Nexora Game Store": "Nexora Game Store window",
  "Nexora beranda": "Nexora home",
  "Minimalkan jendela": "Minimize window",
  "Maksimalkan jendela": "Maximize window",
  "Kembalikan ukuran jendela": "Restore window size",
  "Navigasi utama": "Main navigation",
  "Navigasi mobile": "Mobile navigation",
  "Tutup menu": "Close menu",
  "Buka menu": "Open menu",
  "Tutup menu Start": "Close Start menu",
  "Menu Start": "Start menu",
  "Nexora sedang diminimalkan.": "Nexora is minimized.",
  "Buka Nexora": "Open Nexora",
  "Mode terang": "Light mode",
  "Mode gelap": "Dark mode",
  "Aktifkan mode terang": "Switch to light mode",
  "Aktifkan mode gelap": "Switch to dark mode",
  "Keranjang ({count})": "Cart ({count})",
  "{count} game": "{count} {gameWord}",
  "Keranjang, {count} game": "Cart, {count} {gameWord}",
  "{count} game di katalog": "{count} {gameWord} in the catalog",
  "{count} game di keranjang": "{count} {gameWord} in your cart",
  "Pilih game yang kamu suka, lalu tambahkan ke keranjang.":
    "Choose a game you like and add it to your cart.",
  "Game yang kamu simpan untuk dibeli nanti.": "Games you saved for later.",
  "Daftar game yang sedang diskon.": "Games currently on sale.",
  "Cari game": "Search games",
  "Nama game...": "Game name...",
  "Hapus pencarian": "Clear search",
  Kategori: "Category",
  "Urutkan game": "Sort games",
  "Semua game": "All games",
  "Paling populer": "Most popular",
  "Rilis terbaru": "Newest releases",
  "Harga terendah": "Price: low to high",
  "Harga tertinggi": "Price: high to low",
  "Game sorotan": "Featured game",
  "Lihat detail": "View details",
  "Lihat detail {title}": "View details for {title}",
  "Lihat game sorotan {title}": "View featured game {title}",
  "Menampilkan {count} game": "Showing {count} {gameWord}",
  "Wishlist masih kosong": "Your wishlist is empty",
  "Game tidak ditemukan": "No games found",
  "Klik ikon hati pada game untuk menyimpannya.":
    "Click the heart on a game to save it.",
  "Coba nama game lain atau ubah kategorinya.":
    "Try another game name or change the category.",
  "Reset filter": "Reset filters",
  Dimiliki: "Owned",
  "Di keranjang": "In cart",
  "Tambah ke keranjang": "Add to cart",
  "Tambah {title} ke keranjang": "Add {title} to cart",
  "{title} di keranjang": "{title} is in your cart",
  "{title} dimiliki": "You own {title}",
  "Tambah {title} ke wishlist": "Add {title} to wishlist",
  "Hapus {title} dari wishlist": "Remove {title} from wishlist",
  "Tutup dialog": "Close dialog",
  "Rating contoh": "Sample rating",
  "Tentang game ini": "About this game",
  "Spesifikasi minimum (referensi)": "Minimum requirements (reference)",
  "Simpan ke wishlist": "Save to wishlist",
  "Ada di library": "In your library",
  "Ringkasan pesanan": "Order Summary",
  "Harga {count} game": "Price for {count} {gameWord}",
  "Hemat diskon": "Discount savings",
  "Biaya layanan": "Service fee",
  Gratis: "Free",
  "Pembayaran simulasi. Tidak ada tagihan nyata.":
    "Simulated payment. No real charges.",
  "Keranjang kamu": "Your Cart",
  "Game digital, satu pembelian untuk setiap game.":
    "Digital games. One purchase per game.",
  "Detail {title}": "Details for {title}",
  Hapus: "Remove",
  "Hapus {title} dari keranjang": "Remove {title} from cart",
  "Lanjut jelajahi game": "Continue browsing",
  "Lanjut ke checkout": "Proceed to checkout",
  "Keranjangmu masih kosong": "Your cart is empty",
  "Petualangan berikutnya tinggal satu klik. Temukan game yang ingin kamu mainkan.":
    "Browse the store to find a game you want to play.",
  "Jelajahi game": "Browse games",
  "Pembelian selesai": "Purchase complete",
  "Sip, gamenya masuk library!": "Your games are in your library!",
  "Pembelian simulasi berhasil. {count} game sudah ditambahkan ke library kamu.":
    "Simulated purchase complete. {count} {gameWord} added to your library.",
  "ID pesanan": "Order ID",
  Nama: "Name",
  "Total simulasi": "Simulated total",
  "Buka library saya": "Open my library",
  "Kembali ke store": "Back to store",
  "Tidak ada game untuk checkout": "There are no games to check out",
  "Kembali ke keranjang": "Back to cart",
  "Lengkapi data pembeli untuk menambahkan game ke library.":
    "Enter your details to add games to your library.",
  "Data pembeli": "Customer Details",
  "Nama lengkap": "Full name",
  "Nama kamu": "Your name",
  "Alamat email": "Email address",
  "kamu@email.com": "you@example.com",
  "Nomor telepon": "Phone number",
  "Metode pembayaran": "Payment Method",
  "Pilih metode pembayaran simulasi": "Choose a simulated payment method",
  "Transfer bank": "Bank transfer",
  "Pembayaran QR": "QR payment",
  "Mode simulasi aktif. Tidak ada pembayaran nyata atau pengiriman email. Gunakan kode":
    "Simulation mode. No real payments or emails. Use code",
  "untuk mencoba alur checkout.": "to try the checkout flow.",
  "Kode pembayaran simulasi": "Simulated payment code",
  "Saya memahami bahwa pembelian ini hanya simulasi.":
    "I understand this purchase is a simulation.",
  "Selesaikan pembelian simulasi": "Complete simulated purchase",
  "Nama minimal 3 karakter.": "Name must be at least 3 characters.",
  "Masukkan alamat email yang valid.": "Enter a valid email address.",
  "Gunakan nomor Indonesia yang valid, misalnya 081234567890.":
    "Enter a valid Indonesian phone number, such as 081234567890.",
  "Pilih metode pembayaran.": "Choose a payment method.",
  "Untuk simulasi ini, masukkan kode 123456.":
    "Enter 123456 for this simulation.",
  "Konfirmasi bahwa ini adalah pembelian simulasi.":
    "Confirm that this is a simulated purchase.",
  "{count} game dalam koleksimu. Pilih game untuk melihat detailnya.":
    "{count} {gameWord} in your collection. Select a game to view its details.",
  "Dalam koleksi": "Owned",
  "Lihat detail game": "View game details",
  "Riwayat pembelian": "Purchase History",
  "Selesai · Simulasi": "Completed · Simulation",
  "Library kamu masih kosong": "Your library is empty",
  "Game yang kamu beli melalui checkout simulasi akan muncul di library ini.":
    "Games purchased through simulated checkout will appear here.",
  "Temukan game pertama": "Find your first game",
  game: "games",
  "Kelola katalog dan lihat transaksi dari toko lokalmu.":
    "Manage your catalog and view local store transactions.",
  "Demo merchant": "Merchant demo",
  "Total pendapatan simulasi": "Simulated revenue",
  "Pesanan selesai": "Completed orders",
  "Game terjual": "Games sold",
  "Game di katalog": "Games in catalog",
  "Data tersimpan di browser ini": "Data saved in this browser",
  "Katalog produk": "Product Catalog",
  Transaksi: "Transactions",
  "Cari produk merchant": "Search merchant products",
  "Cari produk...": "Search products...",
  "Tambah game": "Add game",
  "Edit game": "Edit game",
  "Harga jual": "Sale price",
  Aksi: "Actions",
  "Edit {title}": "Edit {title}",
  "Hapus {title}": "Delete {title}",
  "Tidak ada produk yang cocok dengan pencarian.":
    "No products match your search.",
  Pesanan: "Order",
  Pembeli: "Customer",
  "Simulasi selesai": "Simulation complete",
  "Belum ada transaksi": "No transactions yet",
  "Transaksi dari checkout simulasi akan tercatat di sini.":
    "Simulated checkout transactions will appear here.",
  "Nama game": "Game name",
  "Harga awal (Rp)": "Original price (IDR)",
  "Diskon (%)": "Discount (%)",
  "Artwork contoh": "Sample artwork",
  Deskripsi: "Description",
  Batal: "Cancel",
  "Simpan game": "Save game",
  "Hapus game": "Delete game",
  "Hapus game dari katalog?": "Delete game from catalog?",
  "akan dihapus dari katalog, keranjang, dan wishlist lokal. Riwayat pembelian tetap tersimpan.":
    "will be removed from the local catalog, cart, and wishlist. Purchase history will be kept.",
  "Nama game minimal 3 karakter.": "Game name must be at least 3 characters.",
  "Developer wajib diisi.": "Developer is required.",
  "Masukkan harga antara 0 dan 100.000.000.":
    "Enter a price between 0 and 100,000,000.",
  "Diskon harus antara 0 dan 100.": "Discount must be between 0 and 100.",
  "Deskripsi minimal 20 karakter.":
    "Description must be at least 20 characters.",
  "Lihat rekomendasi spesifikasi dari developer.":
    "See the developer’s recommended requirements.",
  "{title} ditambahkan ke keranjang": "{title} added to cart",
  "Katalog berhasil diperbarui": "Catalog updated",
  "Game dihapus dari katalog": "Game removed from catalog",
};

export function translate(language, key, values = {}) {
  if (typeof key !== "string") return key ?? "";
  const text = language === "en" ? english[key] || key : key;
  const params = {
    ...values,
    gameWord:
      language === "en"
        ? Number(values.count) === 1
          ? "game"
          : "games"
        : "game",
  };
  return text.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match);
}

const descriptions = {
  1091500:
    "Explore Night City, a future metropolis obsessed with power, luxury, and body modification. Play as V, a mercenary, and choose your own path through an open world full of stories.",
  1245620:
    "Rise, Tarnished. Explore the Lands Between, face legendary foes, and find your path to becoming Elden Lord in a vast fantasy adventure.",
  1086940:
    "Gather your party and return to the Forgotten Realms. Every choice shapes your story, relationships, and destiny in this Dungeons & Dragons RPG.",
  1551360:
    "Explore Mexico’s beautiful landscapes behind the wheel of hundreds of cars. Race, take on challenges, and enjoy adventures with friends.",
  2358720:
    "Become the Destined One in an adventure inspired by Chinese mythology. Master combat, transformations, and magic to uncover the legends behind Journey to the West.",
  990080:
    "Discover life as a Hogwarts student in the 19th century. Learn spells, explore the wizarding world, and uncover ancient secrets.",
  553850:
    "Join an elite galactic force. Build a team of up to four players, choose your equipment, and face threats across the stars.",
  1145360:
    "Defy the god of death and escape the Underworld. Discover weapons, receive help from the Olympian gods, and uncover new stories with every attempt.",
  413150:
    "Inherit your grandfather’s old farm and build a new life. Grow crops, fish, make friends, and discover the secrets of the valley.",
  620: "Rethink space and gravity with the portal gun. Solve puzzles in Aperture Science, on your own or in a co-op adventure.",
};
export function localizedDescription(game, language) {
  const original = initialGames.find((item) => item.id === game.id);
  return language === "en" && original?.description === game.description
    ? original.descriptionEn || descriptions[game.id] || game.description
    : game.description;
}
