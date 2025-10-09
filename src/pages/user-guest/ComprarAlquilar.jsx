import { Buscador } from '../../components/Buscador.jsx';
import { Filtro } from '../../components/Filtro.jsx';
import { CCol, CContainer, CRow } from '@coreui/react';
import { useState } from 'react';
import CardssComprarAlquilar from '../../components/cards/CardssComprarAlquilar.jsx';
import useInmuebles from '../admin/inmueble/getInmuebles.jsx';
import { useLocalidades } from '../../hooks/localidades.hooks.js';

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
  console.log('ComprarAlquilar: tipoServicio recibido:', tipoServicio);
  const [tipoInmueble, setTipoInmueble] = useState('');
  const [precioDolar, setPrecio] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [search, setCalleFiltro] = useState('');
  const [query, setQuery] = useState('');
  
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
      
      <CardssComprarAlquilar inmuebles={inmuebles} />
      
      <CContainer>
        {/* acá falta que terminemos lo de paginación lo saqué */}
      </CContainer>
    </>
  );
}