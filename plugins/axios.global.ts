import axios from 'axios'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  })

  nuxtApp.provide('axios', instance)

  globalThis.$axios = instance
})
