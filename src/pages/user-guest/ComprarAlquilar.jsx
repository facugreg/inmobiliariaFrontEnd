import { Buscador } from '../../components/Buscador.jsx';
import { Filtro } from '../../components/Filtro.jsx';
import { CCol, CContainer, CRow } from '@coreui/react';
import { useState } from 'react';
import CardssComprarAlquilar from '../../components/cards/CardssComprarAlquilar.jsx';
import useInmuebles from '../admin/inmueble/getInmuebles.jsx';
import { useLocalidades } from '../../hooks/localidades.hooks.js';
import { Paginacion } from '../../components/Paginacion.jsx';

const opcionesInmueble = [
  { value: 'departamento', label: 'Departamento' },
  { value: 'casa', label: 'Casa' },
  { value: 'cochera', label: 'Cochera' },
  { value: 'terreno', label: 'Terreno' },
];

const opcionesPrecio = [
  { value: '0-50000', label: 'Hasta $50,000' },
  { value: '50000-100000', label: '$50,000 - $100,000' },
  { value: '100000-200000', label: '$100,000 - $200,000' },
  { value: '200000+', label: 'Más de $200,000' },
];

export function ComprarAlquilar({tipoServicio}) {
  const [tipoInmueble, setTipoInmueble] = useState('');
  const [precioDolar, setPrecio] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [search, setCalleFiltro] = useState('');
  const [query, setQuery] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const inmueblesPorPagina = 6;

  
  const searcher = (e) => setCalleFiltro(e.target.value);
  const handleSearchClick = () => setQuery(search);
  const onChangeEstado = (e) => setTipoInmueble(e.target.value);
  const onChangePrecio = (e) => setPrecio(e.target.value);
  const onChangeLocalidad = (e) => setLocalidad(e.target.value);
  
  const { inmuebles, isLoading, isError, error } = useInmuebles({
    tipoInmueble,      
    localidad,
    precioDolar,
    query,
    tipoServicio,             
  });
  
  const { localidades } = useLocalidades();
  
  const opcionesLocalidades = localidades
  ? localidades
  .map((loc) => ({
    value: loc.id,
    label: loc.nombre,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))
  : [];
  
  // Filtrá los inmuebles para la página actual
 const inicio = (paginaActual - 1) * inmueblesPorPagina;
 const fin = inicio + inmueblesPorPagina;
 const inmueblesPagina = inmuebles.slice(inicio, fin);

 // Calculá el total de páginas
 const totalPaginas = Math.ceil(inmuebles.length / inmueblesPorPagina);

 // Handler para cambiar de página
 const handleCambiarPagina = (nuevaPagina) => {
   setPaginaActual(nuevaPagina);
 };

 // Mostrar estados de carga y error
  if (isLoading) {
    return <p>Cargando Inmuebles...</p>;
  }

  if (isError) {
    return <p>Error al cargar inmuebles: {error.message}</p>;
  }

  return (
    <>
      <CContainer fluid className="d-flex flex-column justify-content-center align-items-center">
        <CRow className="mt-3 d-flex align-items-center">
          <CCol lg={6} md={12}>
            <Buscador
              placeholder="Buscar por calle de inmueble"
              searcher={searcher}
              search={search}
              handleSearchClick={handleSearchClick}
            />
          </CCol>
          <CCol lg={2} md={12} sm={12} xs={12}>
            <Filtro
              label="Tipo"
              opciones={opcionesInmueble}
              value={tipoInmueble}
              onChange={onChangeEstado}
            />
          </CCol>
          <CCol lg={2} md={12} sm={12} xs={12}>
            <Filtro
              label="Precio"
              opciones={opcionesPrecio}
              value={precioDolar}
              onChange={onChangePrecio}
            />
          </CCol>
          <CCol lg={2} md={12} sm={12} xs={12}>
            <Filtro
              label="Localidad"
              opciones={opcionesLocalidades}
              value={localidad}
              onChange={onChangeLocalidad}
            />
          </CCol>
        </CRow>
      </CContainer>

      {/* Aca van las cards de los inmuebles */}
       <CContainer fluid className="d-flex flex-column justify-content-center align-items-center mt-3">
      <CardssComprarAlquilar inmuebles={inmueblesPagina} />
       </CContainer>
      
      <CContainer className='mb-4'>
        <Paginacion 
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={handleCambiarPagina}
          />
      </CContainer>
    </>
  );
}