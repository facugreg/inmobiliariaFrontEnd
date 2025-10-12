import { CContainer, CRow, CButton, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter} from "@coreui/react";
import FormPropietario from "../../../components/forms/FormPropietario.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useUpdatePropietario, useOnePropietario } from "../../../hooks/propietarios.hooks.js";

export function UpdatePropietario(){

  const { id } = useParams();
  const {data: propietario, isLoading, error} = useOnePropietario(id);
  console.log('propietario a modificar', propietario);
  const [errorMail, setErrorMail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {mutate: updatePropietario} = useUpdatePropietario();

  if (isLoading) return <div>Cargando...</div>;
  if (error) {
    console.log(error);
    return <div>Error al cargar el propietario.</div>;
  }

  const handleUpdate = (updatedPropietario) => {
    setIsSubmitting(true);
    const updatedPropietarioComplete = { ...updatedPropietario, id: propietario.id };
    updatePropietario(updatedPropietarioComplete, {
      onSuccess: (response) => {
        const newPropietario = response.data.data ;
        setTimeout(() => {
          setSavedData(newPropietario);
          setShowModal(true);
          setIsSubmitting(false);
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al modificar el Propietario:', error);
        const errorBackEndMensaje = error.response?.data?.message;
        if (errorBackEndMensaje === 'El mail ya esta registrado') {
          setErrorMail(errorBackEndMensaje);
        } else {
          setErrorMail('Error al guardar el Propietario. Intente de nuevo.');
        }
        setIsSubmitting(false);
      }
    });
  };

  const handleVolver = () =>{
    navigate('/propietarios'); 
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
      <CRow className="pb-4">
      <FormPropietario onSubmit={handleUpdate} onCancel={handleVolver} isSubmitting={isSubmitting} errorMail={errorMail} setErrorMail={setErrorMail} nombrePropietario={propietario.nombrePropietario} apellidoPropietario={propietario.apellidoPropietario} mailPropietario={propietario.mailPropietario} telefonoPropietario={propietario.telefonoPropietario} titulo="Modificar propietario" />
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