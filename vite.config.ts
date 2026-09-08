import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Avoid Linux inotify exhaustion on workspaces with many active tools.
      usePolling: true,
      interval: 300,
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
