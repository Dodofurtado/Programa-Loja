import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Programa-Loja/', // Nome do seu repositório GitHub
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Sistema de Check-in de Convidados',
        short_name: 'Check-in',
        description: 'Sistema para controle de presença de convidados',
        theme_color: '#4a90e2',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
})
