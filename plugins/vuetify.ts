import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6',
          },
        },
      },
    },
    defaults: {
      global: {
        style: {
          fontFamily: 'Inter, Roboto, sans-serif', // <-- Aquí se setea bonito
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
