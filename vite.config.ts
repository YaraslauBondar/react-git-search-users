import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // для GitHub Pages сборка идёт с VITE_BASE=/<имя-репозитория>/
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
