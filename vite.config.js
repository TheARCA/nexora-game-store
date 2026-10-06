import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Actions supplies the Pages base path; local/manual builds stay portable.
  base: process.env.VITE_BASE_PATH || "./",
});
