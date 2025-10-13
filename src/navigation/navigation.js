export const guestItems = [
  { direccion: '/comprar', nombre: 'Comprar' },
  { direccion: '/alquilar', nombre: 'Alquilar' },
  { direccion: '/contacto', nombre: 'Contacto|Horarios' },
];

// Navegacion para usuarios registrados (logueados)
export const userItems = [
  { direccion: '/misvisitas', nombre: 'Mis Visitas' },
  { direccion: '/comprar', nombre: 'Comprar' },
  { direccion: '/alquilar', nombre: 'Alquilar' },
  { direccion: '/contacto', nombre: 'Contacto|Horarios' },
];

// Navegación para administradores
export const adminItems = [
  { direccion: '/visitas', nombre: 'Solicitudes visitas' },
  { direccion: '/inmuebles', nombre: 'Inmuebles' },
  { direccion: '/tiposervicios', nombre: 'Tipos servicios' },
  { direccion: '/localidades', nombre: 'Localidades' },
  { direccion: '/propietarios', nombre: 'Propietarios' },
  { direccion: '/consultas', nombre: 'consultas' },
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
