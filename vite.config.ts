import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'TUNEET',
        short_name: 'TUNEET',
        description: '음악으로 연결되는 TUNEET',
        lang: 'ko',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#F2EBF2',
        background_color: '#F2EBF2',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // 앱 셸(JS/CSS/HTML/폰트/아이콘)만 프리캐시
        globPatterns: ['**/*.{js,css,html,ico}', '*.{svg,png}'],
        // assets/ 안의 무거운 이미지는 사용 시점에 캐싱
        runtimeCaching: [
          {
            // Pretendard dynamic subset 폰트 조각은 필요한 것만 캐싱
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
        navigateFallback: '/index.html',
        // API 요청은 SPA fallback 대상에서 제외
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
