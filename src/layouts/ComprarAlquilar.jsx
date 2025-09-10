import { Buscador } from '../components/Buscador.jsx';
import { CardComprarAlquilar } from '../components/CardComprarAlquilar.jsx';
import { Filtro } from '../components/Filtro.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { CCol, CContainer, CRow } from '@coreui/react';
import { useState } from 'react';
import { Paginacion } from '../components/Paginacion.jsx';

export const ComprarAlquilar = () => {
  const [tipoInmueble, setTipoInmueble] = useState('');
  const [rangoPrecio, setRangoPrecio] = useState('');
  const [antiguedad, setAntiguedad] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = 3;

  const navItems = [
    {
      direccion: '#',
      nombre: 'Comprar',
    },
    { direccion: '#', nombre: 'Alquilar' },
    {
      direccion: '#',
      nombre: 'Contacto',
    },
  ];
  // Opciones para los filtros
  const opcionesInmueble = [
    { value: 'Departamento', label: 'Departamento' },
    { value: 'Casa', label: 'Casa' },
    { value: 'Cochera', label: 'Cochera' },
    { value: 'Terreno', label: 'Terreno' },
  ];

  const opcionesPrecio = [
    { value: '0-50000', label: 'Hasta $50,000' },
    { value: '50000-100000', label: '$50,000 - $100,000' },
    { value: '100000-200000', label: '$100,000 - $200,000' },
    { value: '200000+', label: 'Más de $200,000' },
  ];

  const opcionesAntiguedad = [
    { value: '0-5', label: 'Hasta 5 años' },
    { value: '5-10', label: '5-10 años' },
    { value: '10-20', label: '10-20 años' },
    { value: '+20', label: '+20 años' },
  ];

  // Manejo de cambios
  const handleTipoInmuebleChange = (e) => {
    setTipoInmueble(e.target.value);
    console.log('Filtro tipo inmueble:', e.target.value);
  };

  const handleRangoPrecioChange = (e) => {
    setRangoPrecio(e.target.value);
    console.log('Filtro rango precio:', e.target.value);
  };

  const handleAntiguedadChange = (e) => {
    setAntiguedad(e.target.value);
    console.log('Filtro antiguedad:', e.target.value);
  };

  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    console.log('Página cambiada a:', nuevaPagina);
    // Aquí podrías actualizar la lista de inmuebles según la página
  };

  //const inmueblesPorPagina = 4; // Supongamos que muestras 4 inmuebles por página
  //const indiceInicio = (paginaActual - 1) * inmueblesPorPagina;
  return (
    <>
      <CContainer fluid className="p-0">
        <Header navItems={navItems} />
        <CContainer
          fluid
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <CRow className="mt-3  d-flex align-items-center">
            <CCol lg={6} md={12}>
              <Buscador onSearch={() => alert('Buscar inmueble')} />
            </CCol>
            <CCol lg={2} md={12} sm={12}>
              <Filtro
                label="Tipo"
                opciones={opcionesInmueble}
                value={tipoInmueble}
                onChange={handleTipoInmuebleChange}
                className="me-2"
              />
            </CCol>{' '}
            {/* Espaciador */}
            <CCol lg={2} md={12} sm={12}>
              <Filtro
                label="Precio"
                opciones={opcionesPrecio}
                value={rangoPrecio}
                onChange={handleRangoPrecioChange}
              />
            </CCol>{' '}
            {/* Espaciador */}
            <CCol lg={2} md={12} sm={12}>
              <Filtro
                label="Antigüedad"
                opciones={opcionesAntiguedad}
                value={antiguedad}
                onChange={handleAntiguedadChange}
              />
            </CCol>{' '}
            {/* Espaciador */}
          </CRow>
        </CContainer>
        <CContainer
          fluid
          className="d-flex flex-column justify-content-center align-items-center p-5"
        >
          <CCol lg={12} md={12} sm={6} className="d-flex flex-wrap justify-content-center">

          <CardComprarAlquilar
            precio="$150.000"
            direccion="Calle Falsa 123"
            mts2="85"
            descripcion="Departamento luminoso con vista al parque"
            antiguedad="5 años"
            requisitos="Comprobante de ingresos y referencias"
          />
          <CardComprarAlquilar
            precio="$200.000"
            direccion="Avenida Siempre Viva 742"
            mts2="120"
            descripcion="Casa familiar con jardín y piscina"
            antiguedad="10 años"
            requisitos="Comprobante de ingresos y referencias"
          />
          <CardComprarAlquilar
            precio="$100.000"
            direccion="Boulevard de los Sueños Rotos 456"
            mts2="60"
            descripcion="Departamento moderno en el centro de la ciudad"
            antiguedad="2 años"
            requisitos="Comprobante de ingresos y referencias"
          />
          <CardComprarAlquilar
            precio="$250.000"
            direccion="Calle del Sol 789"
            mts2="150"
            descripcion="Casa espaciosa con vista al mar"
            antiguedad="8 años"
            requisitos="Comprobante de ingresos y referencias"
          />
          </CCol>
        </CContainer>
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={handleCambiarPagina}
        />

        <Footer />
      </CContainer>
    </>
  );
};
