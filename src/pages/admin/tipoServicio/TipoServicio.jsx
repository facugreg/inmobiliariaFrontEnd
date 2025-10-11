import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../../../components/Buscador.jsx';
import Lista from '../../../components/partsLists/Lista.jsx';
import { useState } from 'react';
import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista.jsx';
import { useNavigate } from 'react-router-dom';
import { useTipoServicios, useDeleteTipoServicio } from '../../../hooks/tipoServicio.hooks.js';
import { toast, ToastContainer } from 'react-toastify';
import ModalEliminar from '../../../components/ModalEliminar.jsx';
import 'react-toastify/dist/ReactToastify.css';


export function TipoServicio() {

  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const [idTipo, setIdTipo] = useState(null);
  const { tiposervicios, isLoading, isError, error } = useTipoServicios();
  const {mutate: deleteTipoServicio} = useDeleteTipoServicio();
  const navigate = useNavigate();

  if (isLoading) return <div>Cargando...</div>;
  if (isError) {
    console.log(error);
    return <div>Error al cargar los tipos de servicios.</div>;
  }

  const updateTipoServicio = (id) => {
    console.log('por modificar tiposervicio');
    navigate(`/updatetiposervicio/${id}`);
  };

  const handleAgregar = () => {
    console.log('por agregar nuevo tiposervicio');
    navigate('/addtiposervicio');
  };

  const handleDelete = (idTipo) => {
    setVisibleEliminar(true);
    setIdTipo(idTipo);
  }

  const handleConfirm = () => {
    deleteTipoServicio(idTipo, {
      onSuccess: () => {
        setVisibleEliminar(false);
      },
      onError: (error) => {
        console.error('Error al eliminar el tipo de servicio:', error);
        toast.error('No se pudo eliminar el tipo de servicio');
      },
    });
  };
  
  return (
    <>
      <CContainer>
        <CRow className="mt-3  d-flex justify-content-center align-items-center">
          <h2>Tipos de servicios</h2>
        </CRow>
        <CRow className="mt-3  d-flex justify-content-center align-items-center">
          <CCol lg={10} sm={12}>
            <Buscador placeholder="Buscar por tipo de servicio" />
          </CCol>
          <CCol lg={2} sm={12} className="d-flex justify-content-end">
            <CButton color="primary" onClick={handleAgregar}>
              Agregar tipo de servicio
            </CButton>
          </CCol>
        </CRow>
        <EncabezadoLista
          columns={[
            { key: 'id', size: 1 },
            { key: 'nombre', size: 3 },
            { key: 'descripcion', size: 4 },
          ]}
        />
        <Lista
          items={tiposervicios}
          onDelete={handleDelete}
          onEdit={updateTipoServicio}
          columns={[
            { key: 'id', size: 1 },
            { key: 'nombreTipoServicio', size: 3 },
            { key: 'descripcionTipoServicio', size: 4 },
          ]}
        />
      </CContainer>
      <ModalEliminar
        visibleEliminar={visibleEliminar}
        setVisibleEliminar={setVisibleEliminar}
        handleConfirm={handleConfirm}
        titulo = "tipo de servicio"
      />
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
}
