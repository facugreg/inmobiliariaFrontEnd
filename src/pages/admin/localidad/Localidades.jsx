import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../../../components/Buscador.jsx';
import Lista from '../../../components/partsLists/Lista.jsx';
import { useState } from 'react';
import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocalidades, useDeleteLocalidad } from '../../../hooks/localidades.hooks.js';
import { toast, ToastContainer } from 'react-toastify';
import ModalEliminar from '../../../components/ModalEliminar.jsx';
import 'react-toastify/dist/ReactToastify.css';

export default function Localidades() {

  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const [idLocalidad, setIdLocalidad] = useState(null);
  const { localidades, isLoading, isError, error } = useLocalidades();
  const {mutate: deleteLocalidad} = useDeleteLocalidad();
  const navigate = useNavigate();

  if (isLoading) return <div>Cargando...</div>;
  if (isError) {
    console.log(error);
    return <div>Error al cargar las localidades.</div>;
  }

  const updateLocalidad = (id) => {
    console.log('por modificar localidad');
    navigate(`/updatelocalidad/${id}`);
  };

  const handleAgregar = () => {
    console.log('por agregar nueva localidad');
    navigate('/addlocalidad');
  };

  const handleDelete = (idLocalidad) => {
    setVisibleEliminar(true);
    setIdLocalidad(idLocalidad);
  }

  const handleConfirm = () => {
    deleteLocalidad(idLocalidad, {
      onSuccess: () => {
        setVisibleEliminar(false);
      },
      onError: (error) => {
        console.error('Error al eliminar la localidad:', error);
        toast.error('No se pudo eliminar la localidad');
      },
    });
  };

  return (
  <>
    <CContainer>
      <CRow className="mt-3 d-flex justify-content-center align-items-center">
        <h2>Localidades</h2>
      </CRow>
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
        onEdit={updateLocalidad}
        columns={[
          { key: 'id', size: '2' },
          { key: 'nombre', size: '3' },
          { key: 'codPostal', size: '3' },
        ]}
      ></Lista>
      <ModalEliminar
        visibleEliminar={visibleEliminar}
        setVisibleEliminar={setVisibleEliminar}
        handleConfirm={handleConfirm}
        titulo = "localidad"
      />
      <ToastContainer
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
    </CContainer>
  </>
  );
};
