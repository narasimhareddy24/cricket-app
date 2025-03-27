import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW', // Changed from injectManifest
      workbox: {
        clientsClaim: true,
        skipWaiting: true, // Users always get the latest version
      },
      manifest: {
        name: 'My React App',
        short_name: 'ReactApp',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});