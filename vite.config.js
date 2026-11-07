import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages repo name: https://fayemirabelsemira.github.io/portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
