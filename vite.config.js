import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { APP_CONFIG } from './src/app-config';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: APP_CONFIG.name, // Name should be coming from app-config.js
        short_name: APP_CONFIG.short_name,
        description: APP_CONFIG.description,
        start_url: "/",
        display: "standalone",
        background_color: APP_CONFIG.background_color,
        theme_color: APP_CONFIG.theme_color,
        icons: APP_CONFIG.icons
      }
    })
  ]
});
