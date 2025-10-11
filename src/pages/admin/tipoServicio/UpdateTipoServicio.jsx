import { CContainer, CRow, CButton, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter} from "@coreui/react";
import FormTipoServicio from "../../../components/forms/FormTipoServicio.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateTipoServicio, useOneTipoServicio } from "../../../hooks/tipoServicio.hooks.js";

export function UpdateTipoServicio(){

  const { id } = useParams();
  const {data: tiposervicio, isLoading, error} = useOneTipoServicio(id);
  console.log('tipo servicio a modificar', tiposervicio);
  const [formData, setFormData] = useState({ nombreTipoServicio: '', descripcionTipoServicio: '' });
  const [errorForm, setErrorForm] = useState(''); //estado para manejar errores
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [savedData, setSavedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  if (tiposervicio) {
    setFormData({
      nombreTipoServicio: tiposervicio.nombreTipoServicio || '',
      descripcionTipoServicio: tiposervicio.descripcionTipoServicio || ''
    });
  }
}, [tiposervicio]);
  
  const {mutate: updateTipoServicio} = useUpdateTipoServicio();

  if (isLoading) return <div>Cargando...</div>;
  if (error) {
    console.log(error);
    return <div>Error al cargar el tipo de servicio.</div>;
  } 

  const handleUpdate = (updatedTipoServicio) => {
    setIsSubmitting(true);
    const updatedTipoServicioComplete = { ...updatedTipoServicio, id: tiposervicio.id };
    updateTipoServicio(updatedTipoServicioComplete, {
      onSuccess: (response) => {
        const newTipoServicio = response.data.data || { ...formData, id: response.data.id };
        setTimeout(() => { 
          setSavedData(newTipoServicio);
          setShowModal(true); 
          setFormData({ nombreTipoServicio: newTipoServicio.nombreTipoServicio, descripcionTipoServicio: newTipoServicio.descripcionTipoServicio   });
          setIsSubmitting(false); 
        }, 1000);
      },
      onError: (error) => {
        setErrorForm('Error al guardar el tipo de servicio. Intente de nuevo.');
        console.error('Error al modificar tipo de servicio:', error);
        setIsSubmitting(false);
      }
    });
  };

  const handleVolver = () =>{
    navigate('/tiposervicios'); 
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
      <FormTipoServicio onSubmit={handleUpdate} onCancel={handleVolver} isSubmitting={isSubmitting} error={errorForm} setErrorForm={setErrorForm} formData={formData} setFormData={setFormData} titulo="Modificar Tipo de Servicio" />
      </CRow>
    </CContainer>
    <CModal visible={showModal} onClose={handleCloseModal}>
      <CModalHeader>
        <CModalTitle>Guardado exitoso</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Datos actualizados del tipo de servicio</p>
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