import { useI18n } from "../context/useI18n";
import { Library as LibraryIcon, CheckCircle2 } from "lucide-react";
import { useStore } from "../context/useStore";
import { gameImage } from "../data/games";
import { PageHeading } from "./Cart";
export default function Library({ navigate, onSelect }) {
  const { t, locale, money } = useI18n();
  const { orders } = useStore();
  const games = orders.flatMap((order) => order.games);
  return (
    <>
      <PageHeading
        eyebrow="Nexora / Koleksi"
        title={t("Library saya")}
        description={t(
          "{count} game dalam koleksimu. Pilih game untuk melihat detailnya.",
          {
            count: games.length,
          },
        )}
      />
      {games.length ? (
        <>
          <div className="library-grid">
            {games.map((game) => (
              <article className="library-card" key={game.id}>
                <button
                  className="library-art"
                  onClick={() => onSelect(game)}
                  aria-label={t("Lihat detail {title}", {
                    title: game.title,
                  })}
                >
                  <img src={gameImage(game)} alt={game.title} />
                </button>
                <div>
                  <span className="owned-label">
                    <CheckCircle2 size={14} /> {t("Dalam koleksi")}{" "}
                  </span>
                  <h3>{game.title}</h3>
                  <p>{game.genre} · PC / Windows</p>
                  <button
                    className="button secondary"
                    onClick={() => onSelect(game)}
                  >
                    {" "}
                    {t("Lihat detail game")}{" "}
                  </button>
                </div>
              </article>
            ))}
          </div>
          <section className="order-history">
            <h2>{t("Riwayat pembelian")}</h2>
            {orders.map((order) => (
              <div className="history-item" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <span>
                    {new Date(order.date).toLocaleDateString(locale, {
                      dateStyle: "long",
                    })}{" "}
                    · {t("{count} game", { count: order.games.length })}{" "}
                  </span>
                </div>
                <strong>{money(order.total)}</strong>
                <span className="status-pill">
                  {t("Selesai \xB7 Simulasi")}
                </span>
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="empty-state">
          <LibraryIcon size={44} />
          <h3>{t("Library kamu masih kosong")}</h3>
          <p>
            {" "}
            {t(
              "Game yang kamu beli melalui checkout simulasi akan muncul di library ini.",
            )}{" "}
          </p>
          <button className="button primary" onClick={() => navigate("store")}>
            {" "}
            {t("Temukan game pertama")}{" "}
          </button>
        </div>
      )}
    </>
  );
}
