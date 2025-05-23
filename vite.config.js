import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 //code from Ahadu
  server:{
    host:'0.0.0.0',
    port:5173
  }
  // root: ".",
  // publicDir:"public"
})

// rm -rf node_modules/.vite
// npm install
// npm run dev
