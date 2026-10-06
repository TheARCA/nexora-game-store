export function validateCheckout(form) {
  const errors = {};
  if (form.name.trim().length < 3) errors.name = "Nama minimal 3 karakter.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Masukkan alamat email yang valid.";
  if (!/^(?:\+62|0)\d{9,13}$/.test(form.phone.replace(/[\s-]/g, "")))
    errors.phone = "Gunakan nomor Indonesia yang valid, misalnya 081234567890.";
  if (!["ewallet", "virtual-account", "qris"].includes(form.method))
    errors.method = "Pilih metode pembayaran.";
  if (form.code !== "123456")
    errors.code = "Untuk simulasi ini, masukkan kode 123456.";
  if (!form.consent)
    errors.consent = "Konfirmasi bahwa ini adalah pembelian simulasi.";
  return errors;
}
