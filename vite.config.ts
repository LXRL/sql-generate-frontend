import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; // 确保这一行正常

export default defineConfig({
  plugins: [vue()],
 
});