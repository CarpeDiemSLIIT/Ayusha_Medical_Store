import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 4100,
    proxy: {
      "/assets": {
        target: "http://localhost:4101",
      },
    },
  },
});