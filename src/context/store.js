import { createContext } from "react";

// Keep context identity stable while Vite refreshes component modules.
export const StoreContext = createContext(null);
