import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // SPA fallback so /<project-slug> serves index.html
  appType: 'spa',
  plugins: [react()],
})
