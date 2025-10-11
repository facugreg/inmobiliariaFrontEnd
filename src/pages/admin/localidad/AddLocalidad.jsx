import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateLocalidad } from "../../../hooks/localidades.hooks.js";
import { CContainer, CRow, CButton, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import FormLocalidad from "../../../components/forms/FormLocalidad.jsx";

export function AddLocalidad(){

  const [formData, setFormData] = useState({ nombre: '', codPostal: '' });
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [savedData, setSavedData] = useState(null); // Estado para los datos guardados
  const [error, setError] = useState(''); //estado para manejar errores
  const {mutate: createLocalidad} = useCreateLocalidad();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {  
    setIsSubmitting(true);
    createLocalidad(data, {
      onSuccess: (response) => {
        const newLocalidad = response.data.data || { ...formData, id: response.data.id };
        setTimeout(() => { 
          setSavedData(newLocalidad); // Guardar datos para mostrar en el modal
          setShowModal(true); // Mostrar modal
          setFormData({ nombre: '', codPostal: '' });
          setIsSubmitting(false); 
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al crear localidad:', error);
        const errorBackEndMensaje = error.response?.data?.message;
        if (errorBackEndMensaje === 'El codigo postal ya esta registrado') {
          setError(errorBackEndMensaje);
        } else {
          setError('Error al guardar la localidad. Intente de nuevo.');
        }
        setIsSubmitting(false);
      }
    })
  };

  const handleVolver = () => {
    navigate('/localidades'); 
  };
  
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
      <FormLocalidad onSubmit={onSubmit} onCancel={handleVolver} isSubmitting={isSubmitting} error={error} setError={setError} formData={formData} setFormData={setFormData} titulo="Nueva localidad" />
      </CRow>
    </CContainer>
    <CModal visible={showModal} onClose={handleCloseModal}>
      <CModalHeader>
        <CModalTitle>Guardado exitoso</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Datos de la nueva localidad</p>
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