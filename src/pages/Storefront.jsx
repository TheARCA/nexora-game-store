import { useI18n } from "../context/useI18n";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useStore } from "../context/useStore";
import { genres, gameImage, gamePrice } from "../data/games";
import GameCard from "../components/GameCard";
export default function Storefront({ query, setQuery, page, onSelect }) {
  const { t, money } = useI18n();
  const { games, wishlist } = useStore();
  const [category, setCategory] = useState("Semua game");
  const [sort, setSort] = useState("popular");
  const featured =
    games.find((game) => game.id === 1091500) ||
    games.find((game) => game.discount > 0);
  const filtered = useMemo(
    () =>
      games
        .filter(
          (game) =>
            (category === "Semua game" || game.genre === category) &&
            `${game.title} ${game.developer} ${game.tags.join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (page !== "sale" || game.discount > 0) &&
            (page !== "wishlist" || wishlist.includes(game.id)),
        )
        .sort((a, b) =>
          sort === "low"
            ? gamePrice(a) - gamePrice(b)
            : sort === "high"
              ? gamePrice(b) - gamePrice(a)
              : sort === "new"
                ? b.year - a.year
                : b.rating - a.rating,
        ),
    [games, category, query, page, wishlist, sort],
  );
  return (
    <>
      <div className="catalog-heading">
        <h1>
          {page === "wishlist"
            ? "Wishlist"
            : page === "sale"
              ? t("Game Diskon")
              : t("Daftar Game")}
        </h1>
        <p>
          {page === "wishlist"
            ? t("Game yang kamu simpan untuk dibeli nanti.")
            : page === "sale"
              ? t("Daftar game yang sedang diskon.")
              : t("Pilih game yang kamu suka, lalu tambahkan ke keranjang.")}
        </p>
      </div>
      <div className="catalog-filters">
        <div className="filter-search">
          <label htmlFor="game-search">{t("Cari game")}</label>
          <div className="search-box">
            <Search size={16} />
            <input
              id="game-search"
              placeholder={t("Nama game...")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                aria-label={t("Hapus pencarian")}
                onClick={() => setQuery("")}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
        <div className="filter-field">
          <label htmlFor="game-category">{t("Kategori")}</label>
          <select
            id="game-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {t(genre)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="game-sort">{t("Urutkan game")}</label>
          <select
            id="game-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="popular">{t("Paling populer")}</option>
            <option value="new">{t("Rilis terbaru")}</option>
            <option value="low">{t("Harga terendah")}</option>
            <option value="high">{t("Harga tertinggi")}</option>
          </select>
        </div>
      </div>
      {page === "store" && !query && category === "Semua game" && featured && (
        <section className="featured-game" aria-label={t("Game sorotan")}>
          <button
            className="featured-image"
            aria-label={t("Lihat game sorotan {title}", {
              title: featured.title,
            })}
            onClick={() => onSelect(featured)}
          >
            <img src={gameImage(featured)} alt={featured.title} />
          </button>
          <div className="featured-text">
            <span>
              {featured.discount > 0
                ? `${t("Diskon")} ${featured.discount}%`
                : t("Game sorotan")}
            </span>
            <h2>{featured.title}</h2>
            <div className="featured-price">
              {featured.discount > 0 && <del>{money(featured.price)}</del>}
              <strong>{money(gamePrice(featured))}</strong>
            </div>
          </div>
          <button
            className="button secondary"
            onClick={() => onSelect(featured)}
          >
            {" "}
            {t("Lihat detail")}{" "}
          </button>
        </section>
      )}
      <section className="catalog" aria-label={t("Katalog game")}>
        <p className="catalog-count">
          {t("Menampilkan {count} game", { count: filtered.length })}
        </p>
        {filtered.length ? (
          <div className="game-grid">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} onSelect={onSelect} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>
              {page === "wishlist" && !wishlist.length
                ? t("Wishlist masih kosong")
                : t("Game tidak ditemukan")}
            </h2>
            <p>
              {page === "wishlist" && !wishlist.length
                ? t("Klik ikon hati pada game untuk menyimpannya.")
                : t("Coba nama game lain atau ubah kategorinya.")}
            </p>
            <button
              className="button secondary"
              onClick={() => {
                setQuery("");
                setCategory("Semua game");
              }}
            >
              {" "}
              {t("Reset filter")}{" "}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
