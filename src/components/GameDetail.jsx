import { useI18n } from "../context/useI18n";
import { Heart, ShoppingBag, Monitor, Star, Check } from "lucide-react";
import Modal from "./Modal";
import { useStore } from "../context/useStore";
import { gameImage, gamePrice } from "../data/games";
export default function GameDetail({ game, onClose }) {
  const { t, money, gameDescription } = useI18n();
  const { addToCart, toggleWishlist, wishlist, cart, ownedIds } = useStore();
  const owned = ownedIds.includes(game.id),
    added = cart.some((item) => item.id === game.id);
  return (
    <Modal title={game.title} onClose={onClose} className="detail-modal">
      <img className="detail-cover" src={gameImage(game)} alt={game.title} />
      <div className="detail-body">
        <div className="detail-meta">
          <span>{game.developer}</span>
          <span>
            <Star size={15} fill="currentColor" />
            {game.rating} <small>{t("Rating contoh")}</small>
          </span>
        </div>
        <div className="hero-tags detail-tags">
          <span>{game.genre}</span>
          {game.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <span>{game.year}</span>
        </div>
        <h3>{t("Tentang game ini")}</h3>
        <p>{gameDescription(game)}</p>
        <div className="specs">
          <h4>
            <Monitor size={16} /> {t("Spesifikasi minimum (referensi)")}{" "}
          </h4>
          <p>
            {game.os ||
              (game.sourceUrl ? "PC / Windows" : "Windows 10/11 (64-bit)")}
            <br />
            {t(game.specs)}
          </p>
        </div>
        <div className="detail-buy">
          <div className="price-stack">
            {game.discount > 0 && <del>{money(game.price)}</del>}
            <strong>{money(gamePrice(game))}</strong>
          </div>
          <button
            className="button secondary"
            aria-label={t("Simpan ke wishlist")}
            aria-pressed={wishlist.includes(game.id)}
            onClick={() => toggleWishlist(game.id)}
          >
            <Heart
              size={18}
              fill={wishlist.includes(game.id) ? "currentColor" : "none"}
            />
          </button>
          <button
            className="button primary"
            disabled={added || owned}
            onClick={() => addToCart(game.id)}
          >
            {owned || added ? <Check size={17} /> : <ShoppingBag size={17} />}{" "}
            {owned
              ? t("Ada di library")
              : added
                ? t("Di keranjang")
                : t("Tambah ke keranjang")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
