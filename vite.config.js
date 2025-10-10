import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { BASE_URL } from "./src/constants";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: `${BASE_URL}/`,
});
