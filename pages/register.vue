<template>
  <div class="auth-container">
    <div class="registro-container">
      <h2 class="form-title">Registro de Usuario</h2>
      <form @submit.prevent="registrarUsuario" class="form-content">
        <div class="form-grid">

          <div class="input-group">
            <label for="dni">DNI</label>
            <input id="dni" v-model="dni" type="text" required />
          </div>

          <div class="input-group">
            <label for="nombre">Nombre completo</label>
            <input id="nombre" v-model="nombre" type="text" required />
          </div>

          <div class="input-group">
            <label for="email">Correo electrónico</label>
            <input id="email" v-model="email" type="email" required />
          </div>

          <div class="input-group">
            <label for="telefono">Teléfono</label>
            <input id="telefono" v-model="telefono" type="tel" required />
          </div>

          <div class="input-group">
            <label for="direccion">Dirección</label>
            <input id="direccion" v-model="direccion" type="text" required />
          </div>

          <div class="input-group">
            <label for="tipoUsuario">Tipo de usuario</label>
            <select id="tipoUsuario" v-model="tipoUsuario" required>
              <option value="" disabled selected>Seleccione tipo de usuario</option>
              <option value="1">Agricultor</option>
              <option value="2">Minorista</option>
              <option value="3">Conductor</option>
            </select>
          </div>

          <div class="input-group">
            <label for="fechaRegistro">Fecha de registro</label>
            <input id="fechaRegistro" v-model="fechaRegistro" type="date" required />
          </div>

          <div class="input-group">
            <label for="password">Contraseña</label>
            <input id="password" v-model="password" type="password" required />
          </div>
        </div>

        <div class="form-actions">
          <div class="checkbox-group">
            <input type="checkbox" id="aceptaTerminos" v-model="aceptaTerminos" required />
            <label for="aceptaTerminos">Acepto los términos y condiciones</label>
          </div>

          <button type="submit" class="submit-btn">Registrarse</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios.global'

const router = useRouter()

const dni = ref('')
const nombre = ref('')
const email = ref('')
const telefono = ref('')
const direccion = ref('')
const tipoUsuario = ref('')
const fechaRegistro = ref('')
const password = ref('')
const aceptaTerminos = ref(false)

const registrarUsuario = async () => {
  if (!aceptaTerminos.value) {
    alert('Debes aceptar los términos y condiciones')
    return
  }

  try {
    await $axios.post('/auth/register', {
      dni: dni.value,
      nombre: nombre.value,
      email: email.value,
      telefono: telefono.value,
      direccion: direccion.value,
      tipo_id: Number(tipoUsuario.value),
      fecha_registro: fechaRegistro.value,
      password: password.value
    })

    alert('Registro exitoso')
  } catch (error) {
    alert('Error al registrar usuario')
    console.error(error)
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 2rem;
}

.registro-container {
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 3rem;
}

.form-title {
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 600;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}

.input-group input,
.input-group select {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  background-color: #fff;
  width: 100%;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group input {
  width: 1rem;
  height: 1rem;
}

.checkbox-group label {
  font-size: 0.875rem;
  color: #4a5568;
}

.submit-btn {
  background-color: #4299e1;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.submit-btn:hover {
  background-color: #3182ce;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .registro-container {
    padding: 2rem;
    max-width: 100%;
  }
}
</style>
