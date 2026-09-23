import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxies /api during `npm run dev` so the frontend can call relative paths
// (e.g. httpClient baseURL "/api") without hitting CORS on the .NET API,
// which is expected to run on https://localhost:7xxx per its launchSettings.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET || "http://localhost:5187",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
