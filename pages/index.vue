<template>
  <v-container grid-list-xs>
    <div>
      <v-row align="center" justify="center" class="my-6">
        <v-col cols="auto" class="d-flex align-center">
          <v-avatar size="50">
            <v-img
              src="https://media.licdn.com/dms/image/v2/D4E0BAQFpqbbyvfZxEw/company-logo_100_100/B4EZYwKRHmHUAQ-/0/1744564720601?e=1751500800&v=beta&t=gYvWZUyyeKfVbE6rQ9cJufTC7fBgOEVua4FKEqlk-UM"
              alt="Logo AgricultorUI" />
          </v-avatar>
          <v-text class="ml-4 font-weight-bold text-h6">AgricultorUI</v-text>
        </v-col>
      </v-row>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-high-emphasis font-weight-bold">Cuenta</div>

        <v-text-field density="compact" placeholder="Correo electrónico" autocomplete="off"
          prepend-icon="mdi-email-outline" variant="outlined" v-model="form.email"></v-text-field>

        <div class="text-high-emphasis font-weight-bold d-flex align-center justify-space-between">
          Contraseña

          <a class="text-caption text-decoration-none text-blue-800" href="#" rel="noopener noreferrer" target="_blank">
            ¿Olvidaste tu contraseña?</a>
        </div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          density="compact" placeholder="Ingresa tu contraseña" prepend-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible" autocomplete="off" v-model="form.password"></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-high-emphasis text-caption">
            Advertencia: Después de 3 intentos fallidos consecutivos de inicio de sesión, tu cuenta será bloqueada
            temporalmente por tres horas. Si necesitas iniciar sesión ahora, también puedes hacer clic en "¿Olvidaste tu
            contraseña?" para restablecerla.
          </v-card-text>
        </v-card>

        <v-btn small class="mb-8" color="blue-darken-4" size="large" variant="tonal" block :loading="loading"
          :disabled="loading" @click="iniciarSesion">
          Iniciar sesión
        </v-btn>

        <v-card-text class="text-center">
          <NuxtLink class="text-blue-800 text-decoration-none" to="/register">
            Regístrate ahora <v-icon icon="mdi-chevron-right"></v-icon>
          </NuxtLink>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toast = useToast()
const visible = ref(false)
const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

definePageMeta({
  layout: 'login',
})

const iniciarSesion = async () => {
  try {
    loading.value = true

    const response = await $axios.post('/login', form)
    const token = response.data.access_token

    localStorage.setItem('token', token)
    toast.success('Inicio de sesión exitoso')
    
    await navigateTo('/home')
  } catch (error: any) {
    const msg = error.response?.data?.error || error.response?.data?.message || 'Error desconocido.'
    toast.error(msg)
  } finally {
    loading.value = false
  }
}
</script>
