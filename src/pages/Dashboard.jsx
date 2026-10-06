import { useI18n } from "../context/useI18n";
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  ShoppingBag,
  Wallet,
  TrendingUp,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { useStore } from "../context/useStore";
import { genres, initialGames, gameImage, gamePrice } from "../data/games";
import { PageHeading } from "./Cart";
import Modal from "../components/Modal";
const emptyForm = {
  title: "",
  developer: "",
  genre: "Action",
  price: "",
  discount: "0",
  description: "",
  image: `${import.meta.env.BASE_URL}games/2358720.jpg`,
};
export default function Dashboard() {
  const { t, money, locale } = useI18n();
  const { games, orders, saveGame, deleteGame } = useStore();
  const [tab, setTab] = useState("products");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [deleting, setDeleting] = useState(null);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const sold = orders.reduce((sum, order) => sum + order.games.length, 0);
  const filtered = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase()),
  );
  function openForm(game) {
    setEditing(game || "new");
    setForm(
      game
        ? {
            ...game,
            image: gameImage(game),
          }
        : {
            ...emptyForm,
          },
    );
    setErrors({});
  }
  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (form.title.trim().length < 3)
      nextErrors.title = "Nama game minimal 3 karakter.";
    if (!form.developer.trim()) nextErrors.developer = "Developer wajib diisi.";
    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0 ||
      Number(form.price) > 100000000
    )
      nextErrors.price = "Masukkan harga antara 0 dan 100.000.000.";
    if (
      form.discount === "" ||
      !Number.isFinite(Number(form.discount)) ||
      Number(form.discount) < 0 ||
      Number(form.discount) > 100
    )
      nextErrors.discount = "Diskon harus antara 0 dan 100.";
    if (form.description.trim().length < 20)
      nextErrors.description = "Deskripsi minimal 20 karakter.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    saveGame({
      ...form,
      id: editing === "new" ? Date.now() : editing.id,
      title: form.title.trim(),
      developer: form.developer.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      discount: Number(form.discount),
      rating: editing === "new" ? 4.5 : editing.rating,
      year: editing === "new" ? new Date().getFullYear() : editing.year,
      tags: editing === "new" ? [form.genre, "PC"] : editing.tags,
      specs:
        editing === "new"
          ? t("Lihat rekomendasi spesifikasi dari developer.")
          : editing.specs,
    });
    setEditing(null);
  }
  const field = (name, label, type = "text") => (
    <div className="form-field">
      <label htmlFor={`merchant-${name}`}>{label}</label>
      <input
        id={`merchant-${name}`}
        type={type}
        min={type === "number" ? 0 : undefined}
        max={name === "discount" ? 100 : undefined}
        value={form[name]}
        onChange={(event) =>
          setForm({
            ...form,
            [name]: event.target.value,
          })
        }
        aria-invalid={!!errors[name]}
      />
      {errors[name] && <span className="field-error">{t(errors[name])}</span>}
    </div>
  );
  return (
    <>
      <div className="dashboard-heading">
        <PageHeading
          eyebrow="Nexora / Kelola toko"
          title="Dashboard"
          description={t(
            "Kelola katalog dan lihat transaksi dari toko lokalmu.",
          )}
        />
        <span className="local-badge">
          <LayoutDashboard size={14} /> {t("Demo merchant")}{" "}
        </span>
      </div>
      <div className="stats-grid">
        {[
          {
            label: t("Total pendapatan simulasi"),
            value: money(revenue),
            icon: Wallet,
          },
          {
            label: t("Pesanan selesai"),
            value: orders.length,
            icon: ShoppingBag,
          },
          {
            label: t("Game terjual"),
            value: sold,
            icon: TrendingUp,
          },
          {
            label: t("Game di katalog"),
            value: games.length,
            icon: Package,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="stat-card">
            <span className="stat-icon">
              <Icon size={20} />
            </span>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{t("Data tersimpan di browser ini")}</small>
          </div>
        ))}
      </div>
      <div className="dashboard-tabs">
        <button
          className={tab === "products" ? "selected" : ""}
          onClick={() => setTab("products")}
        >
          {" "}
          {t("Katalog produk")}{" "}
        </button>
        <button
          className={tab === "orders" ? "selected" : ""}
          onClick={() => setTab("orders")}
        >
          {t("Transaksi")} ({orders.length})
        </button>
      </div>
      {tab === "products" ? (
        <section className="dashboard-panel">
          <div className="dashboard-toolbar">
            <label className="search-box">
              <Search size={17} />
              <input
                aria-label={t("Cari produk merchant")}
                placeholder={t("Cari produk...")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button className="button primary" onClick={() => openForm(null)}>
              <Plus size={17} /> {t("Tambah game")}{" "}
            </button>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Game</th>
                  <th>{t("Kategori")}</th>
                  <th>{t("Harga jual")}</th>
                  <th>{t("Diskon")}</th>
                  <th>{t("Aksi")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((game) => (
                  <tr key={game.id}>
                    <td>
                      <div className="table-game">
                        <img src={gameImage(game)} alt="" />
                        <div>
                          <strong>{game.title}</strong>
                          <small>{game.developer}</small>
                        </div>
                      </div>
                    </td>
                    <td>{game.genre}</td>
                    <td>{money(gamePrice(game))}</td>
                    <td>{game.discount}%</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="icon-button"
                          aria-label={t("Edit {title}", {
                            title: game.title,
                          })}
                          onClick={() => openForm(game)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="icon-button delete-icon"
                          aria-label={t("Hapus {title}", {
                            title: game.title,
                          })}
                          disabled={games.length <= 1}
                          onClick={() => setDeleting(game)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <div className="table-empty">
                {" "}
                {t("Tidak ada produk yang cocok dengan pencarian.")}{" "}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="dashboard-panel">
          {orders.length ? (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>{t("Pesanan")}</th>
                    <th>{t("Pembeli")}</th>
                    <th>Game</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                        <small className="table-date">
                          {new Date(order.date).toLocaleDateString(locale)}
                        </small>
                      </td>
                      <td>{order.customer.name}</td>
                      <td>
                        {t("{count} game", { count: order.games.length })}
                      </td>
                      <td>{money(order.total)}</td>
                      <td>
                        <span className="status-pill">
                          {t("Simulasi selesai")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <ShoppingBag size={38} />
              <h3>{t("Belum ada transaksi")}</h3>
              <p>
                {t("Transaksi dari checkout simulasi akan tercatat di sini.")}
              </p>
            </div>
          )}
        </section>
      )}
      {editing && (
        <Modal
          title={editing === "new" ? t("Tambah game") : t("Edit game")}
          onClose={() => setEditing(null)}
          className="merchant-modal"
        >
          <form onSubmit={submit} noValidate className="merchant-form">
            {field("title", t("Nama game"))}
            {field("developer", "Developer")}
            <div className="form-field">
              <label htmlFor="merchant-genre">{t("Kategori")}</label>
              <select
                id="merchant-genre"
                value={form.genre}
                onChange={(event) =>
                  setForm({
                    ...form,
                    genre: event.target.value,
                  })
                }
              >
                {genres
                  .filter((g) => g !== "Semua game")
                  .map((genre) => (
                    <option key={genre}>{genre}</option>
                  ))}
              </select>
            </div>
            <div className="form-row">
              {field("price", t("Harga awal (Rp)"), "number")}
              {field("discount", t("Diskon (%)"), "number")}
            </div>
            <div className="form-field">
              <label htmlFor="merchant-image">{t("Artwork contoh")}</label>
              <select
                id="merchant-image"
                value={form.image}
                onChange={(event) =>
                  setForm({
                    ...form,
                    image: event.target.value,
                  })
                }
              >
                {initialGames.map((game) => (
                  <option key={game.id} value={gameImage(game)}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="merchant-description">{t("Deskripsi")}</label>
              <textarea
                id="merchant-description"
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description: event.target.value,
                  })
                }
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <span className="field-error">{t(errors.description)}</span>
              )}
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="button secondary"
                onClick={() => setEditing(null)}
              >
                {" "}
                {t("Batal")}{" "}
              </button>
              <button className="button primary" type="submit">
                {" "}
                {t("Simpan game")}{" "}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {deleting && (
        <Modal
          title={t("Hapus game dari katalog?")}
          onClose={() => setDeleting(null)}
        >
          <div className="confirm-body">
            <p>
              <strong>{deleting.title}</strong>{" "}
              {t(
                "akan dihapus dari katalog, keranjang, dan wishlist lokal. Riwayat pembelian tetap tersimpan.",
              )}{" "}
            </p>
            <div className="modal-actions">
              <button
                className="button secondary"
                onClick={() => setDeleting(null)}
              >
                {" "}
                {t("Batal")}{" "}
              </button>
              <button
                className="button danger"
                onClick={() => {
                  deleteGame(deleting.id);
                  setDeleting(null);
                }}
              >
                {" "}
                {t("Hapus game")}{" "}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
