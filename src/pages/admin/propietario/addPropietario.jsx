import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePropietario } from "../../../hooks/propietarios.hooks.js";
import { CContainer, CRow, CButton, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import FormPropietario from "../../../components/forms/FormPropietario.jsx";

export default function AddPropietario(){

  const [showModal, setShowModal] = useState(false); 
  const [savedData, setSavedData] = useState(null); 
  const [errorMail, setErrorMail] = useState(null);
  const {mutate: createPropietario} = useCreatePropietario();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data, reset) => {
    setErrorMail(null); 
    console.log(data); 
    setIsSubmitting(true);
    createPropietario(data, {
      onSuccess: (response) => {
        const newPropietario = response.data.data;
        setTimeout(() => { 
          setSavedData(newPropietario); 
          setShowModal(true); 
          setIsSubmitting(false);
          reset()
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al crear propietario:', error);
        const errorBackEndMensaje = error.response?.data?.message;
        if (errorBackEndMensaje === 'El mail ya esta registrado') {
          setErrorMail(errorBackEndMensaje);
        } else {
          setErrorMail('Error al guardar el propietario. Intente de nuevo.');
        }
        setIsSubmitting(false);
      }
    })
  };

  const handleVolver = () => {
    navigate('/propietarios'); 
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
      <FormPropietario onSubmit={onSubmit} onCancel={handleVolver} isSubmitting={isSubmitting} errorMail={errorMail} setErrorMail={setErrorMail} nombrePropietario='' apellidoPropietario='' mailPropietario='' telefonoPropietario='' titulo="Nuevo propietario" />
      </CRow>
    </CContainer>
    <CModal visible={showModal} onClose={handleCloseModal}>
      <CModalHeader>
        <CModalTitle>Guardado exitoso</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Datos del nuevo propietario</p>
        <p><strong>• Nombre:</strong> {savedData?.nombrePropietario}</p>
        <p><strong>• Apellido:</strong> {savedData?.apellidoPropietario}</p>
        <p><strong>• Mail:</strong> {savedData?.mailPropietario}</p>
        <p><strong>• Teléfono:</strong> {savedData?.telefonoPropietario}</p>
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