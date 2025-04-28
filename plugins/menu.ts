export const menuItems = [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/dashboard',
    },
    {
      title: 'Usuarios',
      icon: 'mdi-account-group',
      children: [
        { title: 'Lista de Usuarios', to: '/users' },
        { title: 'Crear Usuario', to: '/users/create' },
      ],
    },
    {
      title: 'Configuraciones',
      icon: 'mdi-cog',
      to: '/settings',
    },
  ]

  export default defineNuxtPlugin(() => {})
  