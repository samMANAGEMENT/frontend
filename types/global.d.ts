import type { AxiosInstance } from 'axios'
import type { ToastInterface } from 'vue-toastification'

declare global {
  var $axios: AxiosInstance
  var $toast: ToastInterface
}

export {}