import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy:{
        '/api': 'https://web-kappa-beryl.vercel.app/'
    }
  },
  plugins: [react(),tailwindcss()],
})
