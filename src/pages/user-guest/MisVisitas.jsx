import { CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../../components/Buscador.jsx';
import { Filtro } from '../../components/Filtro.jsx';
import Lista from '../../components/partsLists/Lista.jsx';
import { EncabezadoLista } from '../../components/partsLists/EncabezadoLista.jsx';
import { useState } from 'react';
import { useDeleteVisita, useVisitas } from '../../hooks/visita.hooks.js';
import ModalEliminar from '../../components/ModalEliminar.jsx';
import FormSolicitudVisita from '../../components/forms/FormSolicitudVisita.jsx';

const opcionesEstado = [
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'Confirmada', label: 'Confirmada' },
  { value: 'Cancelada', label: 'Cancelada' },
];

export function MisVisitas() {
  const [visitaAEliminar, setVisitaAEliminar] = useState();
  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const [selectedVisita, setSelectedVisita] = useState(null);
  const [valorEstado, setValorEstado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { visitas } = useVisitas();
  const handleEstadoChange = (e) => {
    setValorEstado(e.target.value);
    console.log('Filtro estado:', e.target.value);
  };
  const { mutate: deleteVisita } = useDeleteVisita();
  const handleDelete = (id) => {
    const visita = visitas.find((visita) => visita.id === id);
    setVisitaAEliminar(visita);
    setVisibleEliminar(true);
  };
  const handleConfirm = () => {
    if (visitaAEliminar) {
      deleteVisita(visitaAEliminar.id);
      setVisibleEliminar(false);
    }
  };
  const handleEdit = (id) => {
    const visita = visitas.find((visita) => visita.id === id);
    setSelectedVisita(visita);
    setModalVisible(true);
  };

  return (
    <>
      <CContainer>
        <CRow className="mt-3  d-flex align-items-center">
          <CCol lg={6} md={12}>
            <Buscador onSearch={() => alert('Buscar inmueble')} />
          </CCol>
          <CCol lg={6} md={12} sm={12}>
            <Filtro
              label="Estado"
              opciones={opcionesEstado}
              value={valorEstado}
              onChange={handleEstadoChange}
            />
          </CCol>
        </CRow>

        <EncabezadoLista
          columns={[
            { key: 'Direccion del inmueble', size: '2' },
            { key: 'Fecha visita', size: '2' },
            { key: 'Descripcion', size: '2' },
            { key: 'Estado', size: '2' },
          ]}
        />
        <Lista
          items={visitas}
          onDelete={handleDelete}
          onEdit={handleEdit}
          columns={[
            { key: 'direccion', size: '2' },
            { key: 'datevisita', size: '2' },
            { key: 'descriptionvisita', size: '2' },
            { key: 'estado', size: '2' },
          ]}
        />

        <ModalEliminar
          visibleEliminar={visibleEliminar}
          setVisibleEliminar={setVisibleEliminar}
          handleConfirm={handleConfirm}
          titulo="visita"
        />
        <FormSolicitudVisita
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          idInmueble={
            selectedVisita
              ? selectedVisita.inmuebleId || selectedVisita.inmueble?.id
              : null
          }
          initialData={selectedVisita}
        />
      </CContainer>
    </>
  );
}
