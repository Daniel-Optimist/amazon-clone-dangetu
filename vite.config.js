import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: ".",
  // publicDir:"public"
})

// rm -rf node_modules/.vite
// npm install
// npm run dev
