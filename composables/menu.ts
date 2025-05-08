export const menuItems = [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/dashboard',
    },
    {
      title: 'Admin',
      icon: 'mdi-account-group',
      children: [
        {title: 'Usuarios', to: '/Admin' }
      ],
    },
    {
      title: 'Configuraciones',
      icon: 'mdi-cog',
      to: '/settings',
    },
  ]
  