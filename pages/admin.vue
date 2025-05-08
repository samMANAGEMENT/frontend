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

        <v-list-item title="Admin" prepend-icon="mdi-shield-account" @click="" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue-darken-3" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Panel de Administración</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card class="mt-5">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Lista de Usuarios</span>
            <v-btn color="primary" @click="createUser">
              <v-icon start>mdi-account-plus</v-icon>
              Crear Usuario
            </v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            loading-text="Cargando usuarios..."
            class="elevation-1"
          >
            <template #item.documento="{ item }">
              {{ getTipoDocumento(item.tipo_id) }}: {{ item.dni }}
            </template>
            <template #item.tipo_usuario="{ item }">
              {{ getTipoUsuario(item.tipo_id) }}
            </template>
            <template #item.estado="{ item }">
              <v-chip :color="item.estado ? 'green' : 'red'">
                {{ item.estado ? 'Activo' : 'Inactivo' }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon color="info" @click="viewUser(item)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon color="warning" @click="editUser(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteUser(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="650px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="saveUser">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.nombre"
                    label="Nombre completo*"
                    :rules="[rules.required]"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.email"
                    label="Correo electrónico*"
                    :rules="[rules.required, rules.email]"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.telefono"
                    label="Teléfono"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.tipo_id"
                    :items="tiposUsuario"
                    item-title="text"
                    item-value="value"
                    label="Tipo de Usuario*"
                    :rules="[rules.required]"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.password"
                    label="Contraseña*"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[rules.required, rules.minLength(8)]"
                    required
                    outlined
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append="showPassword = !showPassword"
                    :disabled="editedIndex > -1"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" sm="5">
                      <v-select
                        v-model="editedItem.tipo_doc"
                        :items="tiposDocumento"
                        item-title="text"
                        item-value="value"
                        label="Tipo de documento*"
                        :rules="[rules.required]"
                        required
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-text-field
                        v-model="editedItem.dni"
                        label="Número de documento*"
                        :rules="[rules.required]"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.direccion"
                    label="Dirección"
                    outlined
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" v-if="editedIndex > -1">
                  <v-switch
                    v-model="editedItem.estado"
                    label="Usuario activo"
                    color="green"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small class="red--text">* Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="close">
            Cancelar
          </v-btn>
          <v-btn 
            color="blue darken-1" 
            dark 
            @click="saveUser" 
            :loading="saving"
            :disabled="!valid"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { useDisplay } from 'vuetify'

const toast = useToast()
const { mdAndDown } = useDisplay()
const drawer = ref(true)
const dialog = ref(false)
const showPassword = ref(false)
const valid = ref(false)
const saving = ref(false)
const form = ref(null)
const editedIndex = ref(-1)

const tiposDocumento = ref([
  { text: 'Cédula de Ciudadanía', value: 1 },
  { text: 'Tarjeta de Identidad', value: 2 },
  { text: 'Cédula de Extranjería', value: 3 },
  { text: 'Pasaporte', value: 4 },
  { text: 'Documento Nacional', value: 5 }
])

const tiposUsuario = ref([
  { text: 'Agricultor', value: 1 },
  { text: 'Minorista', value: 2 },
  { text: 'Conductor', value: 3 }
])

const defaultItem = ref({
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  dni: '',
  tipo_doc: 1,
  tipo_id: 1, // Tipo de usuario (1: Agricultor, 2: Minorista, 3: Conductor)
  direccion: '',
  estado: true
})

const editedItem = ref({ ...defaultItem.value })
const users = ref([])
const loading = ref(false)

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

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
})

const rules = {
  required: value => !!value || 'Campo obligatorio.',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Correo electrónico inválido.'
  },
  minLength: length => value => {
    return (value && value.length >= length) || `Mínimo ${length} caracteres`
  }
}

const getTipoDocumento = (tipo) => {
  const tipoDoc = tiposDocumento.value.find(t => t.value === tipo)
  return tipoDoc ? tipoDoc.text : 'Desconocido'
}

const getTipoUsuario = (tipo) => {
  const tipoUser = tiposUsuario.value.find(t => t.value === tipo)
  return tipoUser ? tipoUser.text : 'Desconocido'
}

onMounted(() => {
  if (mdAndDown.value) {
    drawer.value = false
  }
  listUser()
})

const listUser = async () => {
  try {
    loading.value = true
    const response = await $axios.get('/listUser')
    users.value = response.data.map(user => ({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      dni: user.dni,
      tipo_doc: user.tipo_doc,
      tipo_id: user.tipo_id, // Campo que viene del backend
      direccion: user.direccion,
      estado: user.estado
    }))
  } catch (error) {
    toast.error('Error al obtener usuarios: ' + (error.response?.data?.message || error.message))
    console.error('Error detallado:', error.response)
  } finally {
    loading.value = false
  }
}

const createUser = () => {
  editedItem.value = { ...defaultItem.value }
  editedIndex.value = -1
  dialog.value = true
}

const editUser = (item) => {
  editedIndex.value = users.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

const viewUser = (user) => {
  toast.info(`Ver usuario: ${user.nombre}`)
}

const deleteUser = async (user) => {
  if (confirm(`¿Estás seguro de eliminar al usuario ${user.nombre}?`)) {
    try {
      await $axios.delete(`/usuarios/${user.id}`)
      users.value = users.value.filter(u => u.id !== user.id)
      toast.success(`Usuario ${user.nombre} eliminado`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar el usuario')
    }
  }
}

const close = () => {
  dialog.value = false
  setTimeout(() => {
    editedItem.value = { ...defaultItem.value }
    editedIndex.value = -1
    form.value?.resetValidation()
  }, 300)
}

const saveUser = async () => {
  saving.value = true
  
  const { valid } = await form.value.validate()
  if (!valid) {
    saving.value = false
    toast.warning('Por favor complete todos los campos obligatorios correctamente')
    return
  }

  try {
    if (editedIndex.value > -1) {
      const response = await $axios.put(`/usuarios/${editedItem.value.id}`, editedItem.value)
      Object.assign(users.value[editedIndex.value], response.data)
      toast.success('Usuario actualizado correctamente')
    } else {
      const response = await $axios.post('/register', {
        nombre: editedItem.value.nombre,
        email: editedItem.value.email,
        password: editedItem.value.password,
        dni: editedItem.value.dni,
        telefono: editedItem.value.telefono,
        direccion: editedItem.value.direccion,
        tipo_doc: editedItem.value.tipo_doc,
        tipo_id: editedItem.value.tipo_id,
        estado: editedItem.value.estado
      })
      
      users.value.unshift(response.data)
      toast.success('Usuario creado correctamente')
    }
    close()
    await listUser();
  } catch (error) {
    console.error('Error completo:', error)
    if (error.response?.status === 422) {
      const errors = error.response.data.errors
      for (const field in errors) {
        toast.error(errors[field][0])
      }
    } else {
      toast.error(error.response?.data?.message || 'Error al guardar el usuario')
    }
  } finally {
    saving.value = false
  }
}
</script>