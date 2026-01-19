import { CCol, CButton, CContainer, CRow } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Buscador } from '../../../components/Buscador';
import Lista from '../../../components/partsLists/Lista';
import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista';
import { useState } from 'react';
import useInmuebles from './getInmuebles';
import { Filtro } from '../../../components/Filtro';
import { useLocalidades } from '../../../hooks/localidades.hooks';

export default function Inmuebles() {
  const navigate = useNavigate();
  const [tipoInmueble, setTipoInmueble] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [search, setCalleFiltro] = useState('');
  const searcher = (e) => setCalleFiltro(e.target.value);
  const [query, setQuery] = useState('');
  const handleSearchClick = () => setQuery(search);
  const onChangeEstado = (e) => setTipoInmueble(e.target.value);
  const onChangeLocalidad = (e) => setLocalidad(e.target.value);
  const { inmuebles, isLoading, isError, error } = useInmuebles({
    tipoInmueble,
    localidad,
    query,
  });
  const { localidades } = useLocalidades();

  const opcionesLocalidades = localidades
    ? [
      { value: '', label: 'Todas' },
      ...localidades
        .map((loc) => ({
          value: loc.id,
          label: loc.nombre,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ]
  : [];

  const opcionesTipoInmueble = [
    { value: 'casa', label: 'Casa' },
    { value: 'cochera', label: 'Cochera' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'terreno', label: 'Terreno' },
    { value: '', label: 'Todos' },
  ];

  const handleAgregar = () => {
    console.log('por agregar nuevo inmueble');
    navigate('/addInmueble');
  };
  const updateInmueble = (id) => {
    console.log('por modificar inmueble');
    navigate(`/updateInmueble/${id}`);
  };

  const deleteInmueble = (id) => {
    console.log('por modificar Inmueble');
    navigate(`/deleteInmueble/${id}`);
  };

  if (isLoading) {
    return <p>Cargando Inmuebles...</p>;
  }

  if (isError) {
    return <p>Error al cargar inmuebles: {error.message}</p>;
  }

  return (
    <>
      <CContainer className="pb-4">
        <CRow className="mt-3 d-flex justify-content-center align-items-center">
          <h2>Inmuebles</h2>
        </CRow>
        <CRow className="mt-3  d-flex justify-content-center align-items-center">
          <CCol lg={4} sm={12}>
            <Buscador
              placeholder="Buscar por calle de inmueble"
              searcher={searcher}
              search={search}
              handleSearchClick={handleSearchClick}
            />
          </CCol>
          <CCol lg={3} sm={12}>
            <Filtro
              label="Tipo de inmueble"
              opciones={opcionesTipoInmueble}
              onChange={onChangeEstado}
              value={tipoInmueble}
            />
          </CCol>
          <CCol lg={3} sm={12}>
            <Filtro
              label="Localidad"
              opciones={opcionesLocalidades}
              onChange={onChangeLocalidad}
              value={localidad}
            />
          </CCol>
          <CCol lg={2} sm={12} className="d-flex justify-content-end">
            <CButton color="primary" onClick={handleAgregar}>
              Agregar inmueble
            </CButton>
          </CCol>
        </CRow>

        <EncabezadoLista
          columns={[
            { key: 'id', size: '1' },
            { key: 'Calle', size: '2' },
            { key: 'Número', size: '2' },
            { key: 'localidad', size: '3' },
            { key: 'Acciones', size: '2' },
          ]}
        />

        <Lista
          items={inmuebles}
          onDelete={deleteInmueble}
          onEdit={updateInmueble}
          columns={[
            { key: 'id', size: '1' },
            { key: 'direccionCalle', size: '2' },
            { key: 'direccionNumero', size: '2' },
            { key: 'localidad', size: '3' },
          ]}
        ></Lista>
      </CContainer>
    </>
  );
}
