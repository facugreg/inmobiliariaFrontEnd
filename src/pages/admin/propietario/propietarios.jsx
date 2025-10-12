import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../../../components/Buscador.jsx';
import Lista from '../../../components/partsLists/Lista.jsx';
import { useState } from 'react';
import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista.jsx';
import { useNavigate } from 'react-router-dom';
import { usePropietarios, useDeletePropietario } from '../../../hooks/propietarios.hooks.js';
import { toast, ToastContainer } from 'react-toastify';
import ModalEliminar from '../../../components/modals/ModalEliminar.jsx';
import 'react-toastify/dist/ReactToastify.css';

export default function Propietarios() {

  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const [idPropietario, setIdPropietario] = useState(null);
  const { propietarios, isLoading, isError, error } = usePropietarios();
  const {mutate: deletePropietario} = useDeletePropietario();
  const navigate = useNavigate();

  if (isLoading) return <div>Cargando...</div>;
  if (isError) {
    console.log(error);
    return <div>Error al cargar los propietarios.</div>;
  }

  const updatePropietario = (id) => {
    console.log('por modificar propietario');
    navigate(`/updatepropietario/${id}`);
  };

  const handleAgregar = () => {
    console.log('por agregar nuevo propietario');
    navigate('/addpropietario');
  };

  const handleDelete = (idPropietario) => {
    setVisibleEliminar(true);
    setIdPropietario(idPropietario);
  }

  const handleConfirm = () => {
    deletePropietario(idPropietario, {
      onSuccess: () => {
        setVisibleEliminar(false);
      },
      onError: (error) => {
        console.error('Error al eliminar el propietario:', error);
        toast.error('No se pudo eliminar el propietario');
      },
    });
  };

  return (
  <>
    <CContainer>
      <CRow className="mt-3 d-flex justify-content-center align-items-center">
        <h2>Propietarios</h2>
      </CRow>
      <CRow className="mt-3 d-flex justify-content-center align-items-center">
        <CCol lg={10} sm={12}>
          <Buscador placeholder="Buscar por nombre de propietario" />
        </CCol>
        <CCol lg={2} sm={12}>
          <CButton
            color="primary"
            className="d-flex justify-content-end"
            onClick={handleAgregar}
          >
            Agregar propietario
          </CButton>
        </CCol>
      </CRow>
      <EncabezadoLista
        columns={[
          { key: 'id', size: '1' },
          { key: 'Nombre', size: '2' },
          { key: 'Apellido', size: '2' },
          { key: 'Mail', size: '3' },
          { key: 'Telefono', size: '2' },
        ]}
      />
      <Lista
        items={propietarios}
        onDelete={handleDelete}
        onEdit={updatePropietario}
        columns={[
          { key: 'id', size: '1' },
          { key: 'nombrePropietario', size: '2' },
          { key: 'apellidoPropietario', size: '2' },
          { key: 'mailPropietario', size: '3' },
          { key: 'telefonoPropietario', size: '2' },

        ]}
      ></Lista>
      <ModalEliminar
        visibleEliminar={visibleEliminar}
        setVisibleEliminar={setVisibleEliminar}
        handleConfirm={handleConfirm}
        titulo = "propietario"
        />
    </CContainer>
    <ToastContainer
      position="top-right"
      autoClose={3000} 
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
    />
  </>
  );
};
