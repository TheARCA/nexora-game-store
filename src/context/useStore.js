import { useContext } from "react";
import { StoreContext } from "./store";

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore requires StoreProvider");
  return store;
}
