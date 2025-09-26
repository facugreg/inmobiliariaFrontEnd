import { CCol, CButton, CContainer, CRow } from '@coreui/react';

import { Buscador } from '../../../components/Buscador';
import Lista from '../../../components/partsLists/Lista';
import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista';
import { useState } from 'react';
import FormLocalidad from '../../../components/forms/FormLocalidad';
import {
  useDeleteLocalidad,
  useLocalidades,
} from '../../../hooks/localidades.hooks';

export default function Localidades() {
  const [visible, setVisible] = useState(false);
  const [selectedLocalidad, setSelectedLocalidad] = useState(null);
  const { localidades, isLoading, isError, error } = useLocalidades();
  const { mutate: deleteLocalidad } = useDeleteLocalidad();

  if (isLoading) {
    return <p>Cargando localidades...</p>;
  }

  if (isError) {
    return <p>Error al cargar localidades: {error.message}</p>;
  }

  if (!localidades || localidades.length === 0) {
    return <p>No se encontraron localidades.</p>;
  }
  const handleAgregar = () => {
    setSelectedLocalidad(null);
    setVisible(true);
  };
  const handleEditar = (id) => {
    const item = localidades.find((localidad) => localidad.id === id);
    console.log('Item seleccionado para editar:', item);

    setSelectedLocalidad(item);
    setVisible(true);
  };
  const handleDelete = (id) => {
    deleteLocalidad(id);
  };

  return (
    <>
      <CContainer>
        <CRow className="mt-3 d-flex justify-content-center align-items-center">
          <CCol lg={10} sm={12}>
            <Buscador placeholder="Buscar por codigo postal" />
          </CCol>
          <CCol lg={2} sm={12}>
            <CButton
              color="primary"
              className="d-flex justify-content-end"
              onClick={handleAgregar}
            >
              Agregar localidad
            </CButton>
          </CCol>
        </CRow>
        <EncabezadoLista
          columns={[
            { key: 'id', size: '2' },
            { key: 'Nombre', size: '3' },
            { key: 'Codigo postal', size: '3' },
          ]}
        />
        <Lista
          items={localidades}
          onDelete={handleDelete}
          onEdit={handleEditar}
          columns={[
            { key: 'id', size: '2' },
            { key: 'nombre', size: '3' },
            { key: 'codPostal', size: '3' },
          ]}
        ></Lista>

        <FormLocalidad
          initialData={selectedLocalidad}
          visible={visible}
          setVisible={setVisible}
        />
      </CContainer>
    </>
  );
}
