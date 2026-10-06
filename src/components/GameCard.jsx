import { useI18n } from "../context/useI18n";
import { Heart, Plus, Check } from "lucide-react";
import { useStore } from "../context/useStore";
import { gameImage, gamePrice } from "../data/games";
export default function GameCard({ game, onSelect }) {
  const { t, money } = useI18n();
  const { cart, wishlist, ownedIds, addToCart, toggleWishlist } = useStore();
  const owned = ownedIds.includes(game.id);
  const inCart = cart.some((item) => item.id === game.id);
  const liked = wishlist.includes(game.id);
  return (
    <article className="game-card">
      <div className="game-art">
        <button
          className="art-button"
          onClick={() => onSelect(game)}
          aria-label={t("Lihat detail {title}", {
            title: game.title,
          })}
        >
          <img
            src={gameImage(game)}
            alt={game.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
          <span className="art-fallback">{game.title}</span>
        </button>
        {game.discount > 0 && (
          <span className="discount-badge">
            {t("Diskon")} {game.discount}%
          </span>
        )}
      </div>
      <div className="game-info">
        <button className="game-title" onClick={() => onSelect(game)}>
          {game.title}
        </button>
        <p className="game-category">{game.genre}</p>
        <div className="game-bottom">
          <div className="price-stack">
            {game.discount > 0 && <del>{money(game.price)}</del>}
            <strong>{money(gamePrice(game))}</strong>
          </div>
          <button
            className={`wish-button ${liked ? "liked" : ""}`}
            aria-label={t(
              liked
                ? "Hapus {title} dari wishlist"
                : "Tambah {title} ke wishlist",
              { title: game.title },
            )}
            aria-pressed={liked}
            onClick={() => toggleWishlist(game.id)}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
        <button
          className={`add-button ${inCart || owned ? "added" : ""}`}
          aria-label={
            owned
              ? t("{title} dimiliki", {
                  title: game.title,
                })
              : inCart
                ? t("{title} di keranjang", {
                    title: game.title,
                  })
                : t("Tambah {title} ke keranjang", {
                    title: game.title,
                  })
          }
          disabled={inCart || owned}
          onClick={() => addToCart(game.id)}
        >
          {inCart || owned ? <Check size={16} /> : <Plus size={16} />}{" "}
          {owned
            ? t("Dimiliki")
            : inCart
              ? t("Di keranjang")
              : t("Tambah ke keranjang")}
        </button>
      </div>
    </article>
  );
}
