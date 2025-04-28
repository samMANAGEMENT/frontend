// plugin/toas.ts
import Toast, { type ToastInterface, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
  }

  // Registrar el plugin de Toast
  nuxtApp.vueApp.use(Toast, options)

  // Proveer $toast como una propiedad global
  const toast = nuxtApp.vueApp.config.globalProperties.$toast as ToastInterface
  nuxtApp.provide('toast', toast)

  // Configurar la variable global
  globalThis.$toast = toast
})
