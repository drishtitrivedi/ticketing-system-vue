import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'  

export const plugins = [vue(), vueDevTools()]

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
