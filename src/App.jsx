import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Layout from "./components/Layout";
import Storefront from "./pages/Storefront";
import { useStore } from "./context/useStore";
import { useI18n } from "./context/useI18n";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";
import GameDetail from "./components/GameDetail";
const validPages = [
  "store",
  "sale",
  "wishlist",
  "cart",
  "checkout",
  "library",
  "dashboard",
];
const currentPage = () => {
  const value = window.location.hash.slice(1);
  return validPages.includes(value) ? value : "store";
};
export default function App() {
  const { t } = useI18n();
  const [page, setPage] = useState(currentPage);
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const { toast, games } = useStore();
  const navigate = (next) => {
    window.location.hash = next;
    setPage(next);
    setQuery("");
    setSelectedGame(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handler = () => {
      setPage(currentPage());
      setQuery("");
      setSelectedGame(null);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name: "search_nexora_games",
      title: "Cari game Nexora",
      description:
        "Read matching games in the local Nexora catalog. Does not change the cart or complete purchases.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: true,
      },
      execute: (input) => {
        if (typeof input?.query !== "string")
          throw new Error("query must be a string");
        return games
          .filter((game) =>
            game.title.toLowerCase().includes(input.query.toLowerCase()),
          )
          .map(({ id, title, genre, price, discount }) => ({
            id,
            title,
            genre,
            price,
            discount,
          }));
      },
    };
    try {
      Promise.resolve(
        context.registerTool(tool, {
          signal: lifecycle.signal,
        }),
      ).catch(() => {});
    } catch {
      /* Optional browser API. */
    }
    return () => lifecycle.abort();
  }, [games]);
  return (
    <>
      <Layout page={page} navigate={navigate}>
        {["store", "sale", "wishlist"].includes(page) && (
          <Storefront
            key={page}
            page={page}
            query={query}
            setQuery={setQuery}
            onSelect={setSelectedGame}
          />
        )}{" "}
        {page === "cart" && (
          <Cart navigate={navigate} onSelect={setSelectedGame} />
        )}{" "}
        {page === "checkout" && <Checkout navigate={navigate} />}{" "}
        {page === "library" && (
          <Library navigate={navigate} onSelect={setSelectedGame} />
        )}{" "}
        {page === "dashboard" && <Dashboard />}
      </Layout>
      {selectedGame && (
        <GameDetail game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}{" "}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          {typeof toast === "string" ? t(toast) : t(toast.key, toast.values)}
        </div>
      )}
    </>
  );
}
