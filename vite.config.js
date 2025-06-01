import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Amazon-Clone/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001/clone-c5a71/us-central1'
    }
  }
})





// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   base: "/Amazon-Clone/",
//   plugins: [react()]
// })

