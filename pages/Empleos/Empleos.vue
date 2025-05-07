<template>
    <v-container>
      <v-row class="d-flex justify-space-between align-center mb-4">
        <v-col>
          <h2 class="text-h5 font-weight-bold">Empleos</h2>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary">Nuevo empleo</v-btn>
        </v-col>
      </v-row>
  
      <v-data-table
        :headers="headers"
        :items="jobs"
        :items-per-page="5"
        class="elevation-1 rounded"
        :loading="loading"
        loading-text="Cargando empleos..."
      >
        <template #item.actions="{ item }">
          <v-btn icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Título', key: 'title' },
    { title: 'Empresa', key: 'company' },
    { title: 'Ubicación', key: 'location' },
    { title: 'Acciones', key: 'actions', sortable: false },
  ];
  
  const jobs = ref([]);
  const loading = ref(true);
  const dialog = ref(false);
  const editedItem = ref(null);
  
const cargarTrabajos = async () => {
    try {
        loading.value = true;
        const response = await $axios.get('/empleos/obtener-empleo');
        jobs.value = response.data;
    } catch (error) {
        console.error("Error al cargar los trabajos:", error);
    } finally {
        loading.value = false;
    }
};
  
//   const openDialog = (item = null) => {
//     editedItem.value = item;
//     dialog.value = true;
//   };
  
//   const saveJob = async (job: any) => {
//     if (job.id) {
//       await jobService.updateJob(job);
//     } else {
//       await jobService.createJob(job);
//     }
//     loadJobs();
//   };
  
//   const deleteJob = async (id: number) => {
//     await jobService.deleteJob(id);
//     loadJobs();
//   };
  
  onMounted(cargarTrabajos);

  </script>
  