import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// React handles JSX; the Tailwind plugin scans your source files for class names.
// The server that answers /api. Defaults to the hosted one; set API_TARGET to point
// at your own Express server, e.g. http://localhost:3001 when running Application-01-server.
const apiTarget = process.env.API_TARGET || "https://application-01-server.vercel.app";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // In development, send /api requests to the Express server so the browser
  // never talks to labd directly and no CORS setup is needed.
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
});
