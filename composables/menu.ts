export const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/dashboard',
  },
  {
    title: 'Empleos',
    icon: 'mdi-briefcase',
    children: [
      { title: 'Empleos', to: '/empleos/Empleos' },
    ],
  },
  {
    title: 'Admin',
    icon: 'mdi-account-group',
    children: [
      { title: 'Usuarios', to: '/Admin' }, // Tu versión
      { title: 'Lista de Usuarios', to: '/users' }, // Del remoto
      { title: 'Crear Usuario', to: '/users/create' }, // Del remoto
    ],
  },
  {
    title: 'Configuraciones',
    icon: 'mdi-cog',
    to: '/settings',
   },
]