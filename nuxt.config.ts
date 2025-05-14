import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
compatibilityDate: "2024-11-01",
  plugins: [
    '~/plugins/axios.global.ts',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
