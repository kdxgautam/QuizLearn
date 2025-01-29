import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  
  define: {
    'process.env.REACT_APP_YOUTUBE_API_KEY': JSON.stringify(process.env.REACT_APP_YOUTUBE_API_KEY)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
