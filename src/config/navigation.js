export const guestItems = [
  { direccion: '#', nombre: 'horarios' },
  { direccion: '/comprar', nombre: 'Comprar' },
  { direccion: '/alquilar', nombre: 'Alquilar' },
  { direccion: '/contacto', nombre: 'Contacto' },
];

// Navegacion para usuarios registrados (logueados)
export const userItems = [
  { direccion: '/misvisitas', nombre: 'Mis Visitas' },
  { direccion: '/comprar', nombre: 'Comprar' },
  { direccion: '/alquilar', nombre: 'Alquilar' },
  { direccion: '/contacto', nombre: 'Contacto' },
];

// Navegación para administradores
export const adminItems = [
  { direccion: '#', nombre: 'solicitudes visitas' },
  { direccion: '/inmuebles', nombre: 'inmuebles' },
  { direccion: '#', nombre: 'tipos servicios' },
  { direccion: '#', nombre: 'localidades' },
  { direccion: '#', nombre: 'propietarios' },
];

// obtener la navegación según el tipo de usuario
export const getNavigationItems = (userType) => {
  switch (userType) {
    case 'admin':
      return adminItems;
    case 'user':
      return userItems;
    case 'guest':
    default:
      return guestItems;
  }
};
