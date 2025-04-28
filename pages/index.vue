<template>
    <v-card>
      <v-card-title class="text-h5 font-bold">¡Bienvenido a Agriocolaui!</v-card-title>
      <v-card-text>
        <p>Estamos encantados de tenerte aquí. Agriocolaui es tu plataforma confiable para gestionar y optimizar tus actividades agrícolas.</p>
        <p>Inicia sesión para comenzar a explorar todas las herramientas y recursos que hemos preparado para ti.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="$router.push('/login')">Iniciar Sesión</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script setup>
</script>

<style scoped>
/* Aplica la fuente solo a este componente */
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
