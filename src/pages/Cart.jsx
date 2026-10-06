import { useI18n } from "../context/useI18n";
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Tag,
  ChevronLeft,
} from "lucide-react";
import { useStore } from "../context/useStore";
import { gameImage, gamePrice } from "../data/games";
export function PageHeading({ title, description }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function OrderSummary({ children }) {
  const { t, money } = useI18n();
  const { cart, total } = useStore();
  const original = cart.reduce((sum, game) => sum + game.price, 0);
  return (
    <aside className="order-summary">
      <h2>{t("Ringkasan pesanan")}</h2>
      <div className="summary-line">
        <span>{t("Harga {count} game", { count: cart.length })}</span>
        <span>{money(original)}</span>
      </div>
      <div className="summary-line savings">
        <span>
          <Tag size={14} /> {t("Hemat diskon")}{" "}
        </span>
        <span>−{money(original - total)}</span>
      </div>
      <div className="summary-line">
        <span>{t("Biaya layanan")}</span>
        <span>{t("Gratis")}</span>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <strong>{money(total)}</strong>
      </div>
      {children}
      <p className="summary-note">
        <ShieldCheck size={16} />{" "}
        {t("Pembayaran simulasi. Tidak ada tagihan nyata.")}{" "}
      </p>
    </aside>
  );
}
export default function Cart({ navigate, onSelect }) {
  const { t, money } = useI18n();
  const { cart, removeFromCart } = useStore();
  return (
    <>
      <PageHeading
        eyebrow="Nexora / Keranjang"
        title={t("Keranjang kamu")}
        description={t("Game digital, satu pembelian untuk setiap game.")}
      />
      {cart.length ? (
        <div className="checkout-layout">
          <div className="cart-items">
            {cart.map((game) => (
              <article key={game.id} className="cart-item">
                <button
                  className="cart-image"
                  onClick={() => onSelect(game)}
                  aria-label={t("Detail {title}", {
                    title: game.title,
                  })}
                >
                  <img src={gameImage(game)} alt={game.title} />
                </button>
                <div className="cart-item-info">
                  <button onClick={() => onSelect(game)}>{game.title}</button>
                  <span>{game.genre} · PC / Windows</span>
                  {game.discount > 0 && (
                    <span className="inline-discount">
                      {" "}
                      {t("Diskon")} {game.discount}%
                    </span>
                  )}
                </div>
                <div className="cart-item-price">
                  <strong>{money(gamePrice(game))}</strong>
                  {game.discount > 0 && <del>{money(game.price)}</del>}
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(game.id)}
                    aria-label={t("Hapus {title} dari keranjang", {
                      title: game.title,
                    })}
                  >
                    <Trash2 size={15} /> {t("Hapus")}{" "}
                  </button>
                </div>
              </article>
            ))}
            <button className="text-button" onClick={() => navigate("store")}>
              <ChevronLeft size={16} /> {t("Lanjut jelajahi game")}{" "}
            </button>
          </div>
          <OrderSummary>
            <button
              className="button primary w-full"
              onClick={() => navigate("checkout")}
            >
              {" "}
              {t("Lanjut ke checkout")}{" "}
            </button>
          </OrderSummary>
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={44} />
          <h3>{t("Keranjangmu masih kosong")}</h3>
          <p>
            {" "}
            {t(
              "Petualangan berikutnya tinggal satu klik. Temukan game yang ingin kamu mainkan.",
            )}{" "}
          </p>
          <button className="button primary" onClick={() => navigate("store")}>
            {" "}
            {t("Jelajahi game")}{" "}
          </button>
        </div>
      )}
    </>
  );
}
