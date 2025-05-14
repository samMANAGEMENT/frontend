<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app :temporary="mdAndDown">
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">AgricultorUTAO</v-list-item-title>
        </v-list-item>

        <v-list-group value="Usuarios">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-group" title="Usuarios" />
          </template>
          <v-list-item title="Lista de Usuarios" @click="listUser" />
          <v-list-item title="Crear Usuario" @click="createUser" />
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue-darken-3" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Panel de Administración</v-toolbar-title>
    </v-app-bar>

   
    <v-main>
      <v-container>
        <v-card class="mt-5">
          <v-card-title>
            Lista de Usuarios
            <v-spacer />
            <v-btn color="primary" @click="createUser">
              <v-icon start>mdi-account-plus</v-icon> Crear Usuario
            </v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            loading-text="Cargando..."
          >
            <template #item.tipo_usuario="{ item }">
              {{ getTipoUsuario(item.tipo_id) }}
            </template>
            <template #item.estado="{ item }">
              <v-chip :color="item.estado ? 'green' : 'red'">{{ item.estado ? 'Activo' : 'Inactivo' }}</v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon color="info" @click="editUser(item)"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn icon color="red" @click="deleteUser(item)"><v-icon>mdi-delete</v-icon></v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>

   
    <v-dialog v-model="dialog" max-width="650px" persistent>
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <UserForm
            ref="form"
            :editedItem="editedItem"
            :editedIndex="editedIndex"
            :tiposUsuario="tiposUsuario"
            :tiposDocumento="tiposDocumento"
            @submit="saveUser"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close">Cancelar</v-btn>
          <v-btn 
            color="blue" 
            dark 
            @click="saveUser" 
            :loading="saving"
          >
            <v-icon left>mdi-content-save</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script setup>
// Importaciones
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useDisplay } from 'vuetify'
import { useNuxtApp } from '#app'

// Inicialización
const toast = useToast()
const { mdAndDown } = useDisplay()
const { $apiClient } = useNuxtApp()

// Estados reactivos
const drawer = ref(true)
const dialog = ref(false)
const saving = ref(false)
const form = ref(null)
const editedIndex = ref(-1)
const loading = ref(false)
const users = ref([])

// Datos estáticos
const tiposDocumento = ref([
  { text: 'Cédula de Ciudadanía', value: 1 }
])

const tiposUsuario = ref([
  { text: 'Agricultor', value: 1 },
  { text: 'Minorista', value: 2 },
  { text: 'Conductor', value: 3 }
])

const defaultItem = {
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  dni: '',
  tipo_doc: 1,
  tipo_id: 1,
  direccion: '',
  estado: true
}

const editedItem = ref({ ...defaultItem })

// Headers de la tabla
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Correo', key: 'email' },
  { title: 'Teléfono', key: 'telefono' },
  { title: 'Documento', key: 'dni' },
  { title: 'Dirección', key: 'direccion' },
  { title: 'Tipo de Usuario', key: 'tipo_usuario' },
  { title: 'Estado', key: 'estado' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

// Computed
const formTitle = computed(() => editedIndex.value === -1 ? 'Nuevo Usuario' : 'Editar Usuario')

// Métodos
const getTipoDocumento = tipo => tiposDocumento.value.find(t => t.value === tipo)?.text || 'Desconocido'
const getTipoUsuario = tipo => tiposUsuario.value.find(t => t.value === tipo)?.text || 'Desconocido'

// Funciones principales
const listUser = async () => {
  try {
    loading.value = true
    const { data } = await $apiClient.get('/usuarios/listUser')
    users.value = data
  } catch (error) {
    toast.error('Error al obtener usuarios')
    console.error('Error en listUser:', error.response?.data || error.message)
  } finally {
    loading.value = false
  }
}

const createUser = () => {
  editedItem.value = { ...defaultItem }
  editedIndex.value = -1
  dialog.value = true
}

const editUser = (item) => {
  editedIndex.value = users.value.findIndex(u => u.id === item.id)
  editedItem.value = { 
    ...item,
    tipo_doc: Number(item.tipo_doc = 1),
    dni: String(item.dni)
  }
  dialog.value = true
}

const deleteUser = async (user) => {
  if (confirm(`¿Eliminar al usuario ${user.nombre}?`)) {
    try {
      await $apiClient.delete(`/usuarios/${user.id}`)
      users.value = users.value.filter(u => u.id !== user.id)
      toast.success('Usuario eliminado')
    } catch (error) {
      toast.error('Error al eliminar usuario')
      console.error('Error en deleteUser:', error.response?.data || error.message)
    }
  }
}

const saveUser = async () => {
  saving.value = true
  try {
    const { valid } = await form.value.validate()
    if (!valid) {
      toast.warning('Complete todos los campos requeridos')
      return
    }

    const payload = { 
      ...editedItem.value,
      dni: String(editedItem.value.dni)
    }

    if (editedIndex.value > -1 && !payload.password) {
      delete payload.password
    }

    const response = editedIndex.value > -1
      ? await $apiClient.put(`/usuarios/${payload.id}`, payload)
      : await $apiClient.post('/register', payload)

    if (response.data) {
      toast.success(editedIndex.value > -1 ? 'Usuario actualizado' : 'Usuario creado')
      close()
      await listUser()
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || 
                     error.response?.data?.error || 
                     'Error al guardar usuario'
    toast.error(errorMsg)
    console.error('Error en saveUser:', error.response?.data || error.message)
  } finally {
    saving.value = false
  }
}

const close = () => {
  dialog.value = false
  setTimeout(() => {
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
    form.value?.resetValidation()
  }, 300)
}

// Lifecycle hooks
onMounted(() => {
  if (mdAndDown.value) drawer.value = false
  listUser()
})
</script>