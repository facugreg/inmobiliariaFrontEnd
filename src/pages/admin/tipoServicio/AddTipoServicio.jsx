import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTipoServicio } from "../../../hooks/tipoServicio.hooks.js";
import { CContainer, CRow, CButton, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import FormTipoServicio from "../../../components/forms/FormTipoServicio.jsx";

export function AddTipoServicio(){
  
  const [formData, setFormData] = useState({ nombreTipoServicio: '', descripcionTipoServicio: '' });
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [savedData, setSavedData] = useState(null); // Estado para los datos guardados
  const [error, setError] = useState(''); //estado para manejar errores
  const {mutate: createTipoServicio} = useCreateTipoServicio();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {  
    setIsSubmitting(true);
    createTipoServicio(data, {
      onSuccess: (response) => {
        const newTipoServicio = response.data.data || { ...formData, id: response.data.id };
        setTimeout(() => { 
          setSavedData(newTipoServicio); // Guardar datos para mostrar en el modal
          setShowModal(true); // Mostrar modal
          setFormData({ nombreTipoServicio: '', descripcionTipoServicio: '' });
          setIsSubmitting(false); 
        }, 1000);
      },
      onError: (error) => {
        setError('Error al guardar el tipo de servicio. Intente de nuevo.');
        console.error('Error al crear tipo de servicio:', error);
        setIsSubmitting(false);
      }
    })
  };

  const handleVolver = () => {
    navigate('/tiposervicios'); 
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
      <FormTipoServicio onSubmit={onSubmit} onCancel={handleVolver} isSubmitting={isSubmitting} error={error} setError={setError} formData={formData} setFormData={setFormData} titulo="Nuevo tipo de servicio" />
      </CRow>
    </CContainer>
    <CModal visible={showModal} onClose={handleCloseModal}>
      <CModalHeader>
        <CModalTitle>Guardado exitoso</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Datos del nuevo tipo de servicio</p>
        <p><strong>• Nombre:</strong> {savedData?.nombreTipoServicio}</p>
        <p><strong>• Descripción:</strong> {savedData?.descripcionTipoServicio}</p>
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