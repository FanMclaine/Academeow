import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: { fontFamily: { pixel: ['Press Start 2P', 'monospace'] } } },
  plugins: [react(),tailwindcss()],
})
