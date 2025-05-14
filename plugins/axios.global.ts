import axios from 'axios';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Asegúrate de que esta URL sea correcta
  });

  // Interceptor para agregar el token en cada solicitud
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Verifica que 'token' sea la clave correcta
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  nuxtApp.provide('apiClient', instance); // Usa 'apiClient' en lugar de 'axios'
});