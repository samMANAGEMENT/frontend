<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
    }
  ]
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
