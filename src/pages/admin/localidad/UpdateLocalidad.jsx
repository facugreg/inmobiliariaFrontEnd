import { CContainer, CRow, CButton, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter} from "@coreui/react";
import FormLocalidad from "../../../components/forms/FormLocalidad.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateLocalidad, useOneLocalidad } from "../../../hooks/localidades.hooks.js";

export function UpdateLocalidad(){

  const { id } = useParams();
  const {data: localidad, isLoading, error} = useOneLocalidad(id);
  console.log('localidad a modificar', localidad);
  const [formData, setFormData] = useState({ nombre: '', codPostal: '' });
  const [errorForm, setErrorForm] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [savedData, setSavedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localidad) {
      setFormData({
        nombre: localidad.nombre || '',
        codPostal: localidad.codPostal || ''
      });
    }
  }, [localidad]);
    
  const {mutate: updateLocalidad} = useUpdateLocalidad();

  if (isLoading) return <div>Cargando...</div>;
  if (error) {
    console.log(error);
    return <div>Error al cargar la localidad.</div>;
  }

  const handleUpdate = (updatedLocalidad) => {
    setIsSubmitting(true);
    const updatedLocalidadComplete = { ...updatedLocalidad, id: localidad.id };
    updateLocalidad(updatedLocalidadComplete, {
      onSuccess: (response) => {
        const newLocalidad = response.data.data || { ...formData, id: response.data.id };
        setTimeout(() => {
          setSavedData(newLocalidad);
          setShowModal(true);
          setFormData({ nombreLocalidad: newLocalidad.nombreLocalidad, codPostal: newLocalidad.codPostal });
          setIsSubmitting(false);
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al modificar tipo de servicio:', error);
        const errorBackEndMensaje = error.response?.data?.message;
        if (errorBackEndMensaje === 'El codigo postal ya esta registrado') {
          setErrorForm(errorBackEndMensaje);
        } else {
          setErrorForm('Error al guardar la localidad. Intente de nuevo.');
        }
        setIsSubmitting(false);
      }
    });
  };

  const handleVolver = () =>{
    navigate('/localidades'); 
  }
  
  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
    setSavedData(null); // Limpia los datos guardados
  };

  return(
    <>
    <CContainer>
      <CRow className="mt-3 mb-3">
        <CCol lg={3}>
        <CButton onClick={handleVolver} color='primary' >
          Volver
        </CButton>
        </CCol>
      </CRow>
      <CRow>
      <FormLocalidad onSubmit={handleUpdate} onCancel={handleVolver} isSubmitting={isSubmitting} error={errorForm} setError={setErrorForm} formData={formData} setFormData={setFormData} titulo="Nueva localidad" />
      </CRow>
    </CContainer>
    <CModal visible={showModal} onClose={handleCloseModal}>
      <CModalHeader>
        <CModalTitle>Guardado exitoso</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Datos actualizados de la localidad</p>
        <p><strong>• Nombre:</strong> {savedData?.nombre}</p>
        <p><strong>• Código Postal:</strong> {savedData?.codPostal}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleCloseModal}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  );
}

  
    