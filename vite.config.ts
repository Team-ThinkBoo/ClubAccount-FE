import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // 👈 외부에서 접근 가능하게!
    port: 5173 // 포트는 그대로 둬도 돼
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "띵부",
        short_name: "띵부",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/logo.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "/logo.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any"
          },
          {
            src: "/logo.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          },
          {
            src: "/logo.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any"
          }
        ]
      }
    })
  ]
});
