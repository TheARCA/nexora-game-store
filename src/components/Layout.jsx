import { useI18n } from "../context/useI18n";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  Gamepad2,
  Library,
  Minus,
  Square,
  Copy,
  Home,
  Volume2,
  Monitor,
  Languages,
} from "lucide-react";
import { useStore } from "../context/useStore";
const links = [
  {
    id: "store",
    label: "Beranda",
  },
  {
    id: "sale",
    label: "Diskon",
  },
  {
    id: "library",
    label: "Library",
  },
  {
    id: "wishlist",
    label: "Wishlist",
  },
  {
    id: "dashboard",
    label: "Dashboard",
  },
];
const pageNames = {
  store: "Daftar Game",
  sale: "Game Diskon",
  library: "Library",
  wishlist: "Wishlist",
  dashboard: "Dashboard",
  cart: "Keranjang",
  checkout: "Checkout",
};
function XPMark() {
  return (
    <span className="xp-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <Gamepad2 size={20} />
      <span>Nexora Game Store</span>
    </span>
  );
}
export default function Layout({ page, navigate, children }) {
  const { locale, t, language, setLanguage } = useI18n();
  const { games, cart, theme, toggleTheme } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const contentRef = useRef(null);
  useEffect(() => {
    contentRef.current?.scrollTo({
      top: 0,
    });
  }, [page]);
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setStartOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function go(next) {
    navigate(next);
    setMobileOpen(false);
    setStartOpen(false);
    setMinimized(false);
  }
  const navItems = links.map((link) => (
    <button
      key={link.id}
      className={page === link.id ? "active" : ""}
      aria-current={page === link.id ? "page" : undefined}
      onClick={() => go(link.id)}
    >
      {t(link.label)}
    </button>
  ));
  const time = clock.toLocaleTimeString(locale, {
    timeZone: "Asia/Makassar",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className={`xp-desktop ${maximized ? "is-maximized" : ""}`}>
      <div className="desktop-shortcuts">
        <button onClick={() => go("store")}>
          <Gamepad2 size={34} />
          <span>Nexora</span>
        </button>
        <button onClick={() => go("library")}>
          <Library size={32} />
          <span>Library</span>
        </button>
        <button onClick={() => go("cart")}>
          <ShoppingBag size={32} />
          <span>{t("Keranjang")}</span>
        </button>
      </div>
      <section
        className="xp-window"
        aria-label={t("Jendela Nexora Game Store")}
        hidden={minimized}
      >
        <header className="xp-titlebar">
          <button
            className="brand-button"
            onClick={() => go("store")}
            aria-label={t("Nexora beranda")}
          >
            <Brand />
          </button>
          <div className="window-controls">
            <button
              aria-label={t("Minimalkan jendela")}
              onClick={() => {
                setMinimized(true);
                setStartOpen(false);
              }}
            >
              <Minus size={16} />
            </button>
            <button
              aria-label={
                maximized
                  ? t("Kembalikan ukuran jendela")
                  : t("Maksimalkan jendela")
              }
              onClick={() => setMaximized(!maximized)}
            >
              {maximized ? <Copy size={14} /> : <Square size={15} />}
            </button>
          </div>
        </header>
        <nav className="desktop-nav" aria-label={t("Navigasi utama")}>
          {navItems}
        </nav>
        <div className="xp-toolbar">
          <button onClick={() => go("store")}>
            <Home size={18} />
            <span>{t("Beranda")}</span>
          </button>
          <span className="toolbar-divider" />
          <button
            className="cart-nav"
            onClick={() => go("cart")}
            aria-label={t("Keranjang, {count} game", {
              count: cart.length,
            })}
          >
            <ShoppingBag size={18} />
            <span>{t("Keranjang ({count})", { count: cart.length })}</span>
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={t(
              theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap",
            )}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>{t(theme === "dark" ? "Mode terang" : "Mode gelap")}</span>
          </button>
          <label className="language-control" htmlFor="store-language">
            <Languages size={18} />
            <span>{t("Bahasa")}</span>
            <select
              id="store-language"
              aria-label={t("Bahasa")}
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </label>
          <button
            className="mobile-menu"
            aria-label={mobileOpen ? t("Tutup menu") : t("Buka menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={19} />
          </button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label={t("Navigasi mobile")}>
            {navItems}
          </nav>
        )}
        <div className="xp-location">
          <span>{t("Lokasi")}</span>
          <div>
            <Gamepad2 size={16} />
            <span>Nexora / {t(pageNames[page])}</span>
          </div>
        </div>
        <div className="app-shell">
          <aside className="xp-sidebar">
            <div className="xp-task-panel">
              <h2>{t("Tugas toko")}</h2>
              <button onClick={() => go("store")}>
                <Gamepad2 size={16} /> {t("Lihat semua game")}{" "}
              </button>
              <button onClick={() => go("cart")}>
                <ShoppingBag size={16} /> {t("Buka keranjang")}{" "}
              </button>
              <button onClick={() => go("library")}>
                <Library size={16} /> {t("Library saya")}{" "}
              </button>
            </div>
            <div className="xp-task-panel">
              <h2>{t("Informasi")}</h2>
              <p>{t("{count} game di katalog", { count: games.length })}</p>
              <p>{t("{count} game di keranjang", { count: cart.length })}</p>
              <p>{t("Pembayaran simulasi")}</p>
            </div>
          </aside>
          <main ref={contentRef} className="main-content">
            {children}
          </main>
        </div>
        <footer className="xp-statusbar">
          <span>{t(pageNames[page])}</span>
          <span>{t("Pembayaran simulasi")}</span>
          <span>© {clock.getFullYear()} Nexora</span>
        </footer>
      </section>
      {minimized && (
        <div className="minimized-hint">
          <Gamepad2 size={40} />
          <p>{t("Nexora sedang diminimalkan.")}</p>
          <button
            className="button secondary"
            onClick={() => setMinimized(false)}
          >
            {" "}
            {t("Buka Nexora")}{" "}
          </button>
        </div>
      )}
      {startOpen && (
        <>
          <button
            className="start-dismiss"
            aria-label={t("Tutup menu Start")}
            onClick={() => setStartOpen(false)}
          />
          <nav className="xp-start-menu" aria-label={t("Menu Start")}>
            <div className="start-menu-heading">
              <Gamepad2 size={27} />
              Nexora Game Store
            </div>
            <div className="start-menu-links">
              {navItems}
              <button onClick={() => go("cart")}>
                {t("Keranjang ({count})", { count: cart.length })}
              </button>
            </div>
            <div className="start-menu-footer">Game Store · React</div>
          </nav>
        </>
      )}
      <div className="xp-taskbar">
        <button
          className="xp-start"
          aria-expanded={startOpen}
          onClick={() => setStartOpen(!startOpen)}
        >
          <XPMark />
          start
        </button>
        <button
          className={`xp-task-button ${minimized ? "" : "active"}`}
          onClick={() => {
            setMinimized(false);
            setStartOpen(false);
          }}
        >
          <Gamepad2 size={18} />
          <span>Nexora Game Store</span>
        </button>
        <div className="xp-tray">
          <Monitor size={15} />
          <Volume2 size={15} />
          <time dateTime={clock.toISOString()}>{time}</time>
        </div>
      </div>
    </div>
  );
}
