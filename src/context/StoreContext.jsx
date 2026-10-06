import { useEffect, useState } from "react";
import { initialGames, gamePrice } from "../data/games";
import { catalogVersion, upgradeCatalog } from "../data/catalog";
import { StoreContext } from "./store";
function readStored(key, fallback, valid) {
  try {
    const value = JSON.parse(localStorage.getItem(`nexora-${key}`));
    return valid(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
const validIds = (value) =>
  Array.isArray(value) && value.every((id) => Number.isSafeInteger(id));
const validGames = (value) =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (game) =>
      Number.isSafeInteger(game.id) &&
      typeof game.title === "string" &&
      typeof game.genre === "string" &&
      typeof game.description === "string" &&
      Array.isArray(game.tags) &&
      game.tags.every((tag) => typeof tag === "string") &&
      Number.isFinite(game.price) &&
      game.price >= 0 &&
      Number.isFinite(game.discount) &&
      game.discount >= 0 &&
      game.discount <= 100,
  );
export function StoreProvider({ children }) {
  const [games, setGames] = useState(() =>
    upgradeCatalog(
      readStored("games", initialGames, validGames),
      readStored(
        "catalogVersion",
        1,
        (value) => Number.isInteger(value) && value >= 1,
      ),
    ),
  );
  const [cartIds, setCartIds] = useState(() =>
    readStored("cart", [], validIds),
  );
  const [wishlist, setWishlist] = useState(() =>
    readStored("wishlist", [], validIds),
  );
  const [orders, setOrders] = useState(() =>
    readStored(
      "orders",
      [],
      (v) =>
        Array.isArray(v) &&
        v.every(
          (o) =>
            typeof o.id === "string" &&
            Number.isFinite(o.total) &&
            typeof o.date === "string" &&
            typeof o.customer?.name === "string" &&
            typeof o.customer?.email === "string" &&
            Array.isArray(o.games) &&
            o.games.every(
              (g) => typeof g.title === "string" && Number.isSafeInteger(g.id),
            ),
        ),
    ),
  );
  const [theme, setTheme] = useState(() =>
    readStored("theme", "light", (v) => ["dark", "light"].includes(v)),
  );
  const [language, setLanguage] = useState(() =>
    readStored("language", "en", (value) => ["en", "id"].includes(value)),
  );
  const [toast, setToast] = useState("");
  const ownedIds = orders.flatMap((order) =>
    order.games.map((game) => game.id),
  );
  const cart = games.filter(
    (game) => cartIds.includes(game.id) && !ownedIds.includes(game.id),
  );
  const total = cart.reduce((sum, game) => sum + gamePrice(game), 0);
  useEffect(() => {
    for (const [key, value] of Object.entries({
      games,
      cart: cartIds,
      wishlist,
      orders,
      theme,
      language,
      catalogVersion,
    })) {
      try {
        localStorage.setItem(`nexora-${key}`, JSON.stringify(value));
      } catch {
        /* The app can still work when storage is unavailable. */
      }
    }
  }, [games, cartIds, wishlist, orders, theme, language]);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timeout);
  }, [toast]);
  function addToCart(id) {
    const game = games.find((g) => g.id === id);
    if (!game || ownedIds.includes(id)) return;
    setCartIds((prev) => [...new Set([...prev, id])]);
    setToast({
      key: "{title} ditambahkan ke keranjang",
      values: { title: game.title },
    });
  }
  function toggleWishlist(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }
  function placeOrder(customer) {
    if (!cart.length) return null;
    const order = {
      id: `NX-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      customer: {
        name: customer.name,
        email: customer.email,
        method: customer.method,
      },
      games: cart.map((game) => ({ ...game, paidPrice: gamePrice(game) })),
      total,
    };
    setOrders((prev) => [order, ...prev]);
    setCartIds([]);
    return order;
  }
  function saveGame(game) {
    setGames((prev) =>
      prev.some((g) => g.id === game.id)
        ? prev.map((g) => (g.id === game.id ? game : g))
        : [...prev, game],
    );
    setToast("Katalog berhasil diperbarui");
  }
  function deleteGame(id) {
    setGames((prev) => prev.filter((g) => g.id !== id));
    setCartIds((prev) => prev.filter((item) => item !== id));
    setWishlist((prev) => prev.filter((item) => item !== id));
    setToast("Game dihapus dari katalog");
  }
  return (
    <StoreContext.Provider
      value={{
        games,
        cart,
        total,
        wishlist,
        orders,
        theme,
        language,
        setLanguage: (value) => {
          if (["en", "id"].includes(value)) setLanguage(value);
        },
        toast,
        ownedIds,
        addToCart,
        removeFromCart: (id) =>
          setCartIds((prev) => prev.filter((item) => item !== id)),
        toggleWishlist,
        placeOrder,
        saveGame,
        deleteGame,
        setToast,
        toggleTheme: () =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
