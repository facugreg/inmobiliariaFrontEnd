import React, { useState } from "react";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CAlert,
  CCol,
  CRow,
  CCard,
  CCardTitle,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import axios from 'axios';
import { ModalNecesitaLogueo } from "../modals/ModalNecesitaLogueo.jsx";

export function FormConsulta({idInmueble}) {
  const [formData, setFormData] = useState({
    descripcion: "",  
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar errores al cambiar
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.descripcion.trim()) tempErrors.descripcion = "El mensaje es requerido.";
    return tempErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const PATH = 'http://localhost:3000/api/consultas';
    const idUsuario =  localStorage.getItem('userId');
    
    if (!idUsuario) {
      setShowModal(true);
      return;
    }
    //validacion solo si esta logueado
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length === 0) {
      try {
        const payload = {
          descripcion: formData.descripcion,
          inmueble: Number(idInmueble),
          usuario:Number(idUsuario),
        };
        await axios.post(PATH, payload);
        setSubmitSuccess(true);
        setFormData({descripcion: "" });
        setTimeout(() => setSubmitSuccess(false), 3000);
      } catch (error) {
        setErrors({ submit: "Error al enviar la consulta" });
        console.error('Error:', error);
      }
    } else {
      setErrors(tempErrors);
    }
};

  return (
    <CCard className="p-3 bg-light">
      <CCardBody> 
      <CForm onSubmit={handleSubmit}>
      <CRow >
      </CRow>
      <CRow className="mb-3">
        <p>Dejanos tu opinión o dudas sobre este inmueble</p>
        <CFormTextarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={4}
          invalid={!!errors.descripcion}
          className="bg-light"
        />
        {errors.descripcion && <div className="text-danger">{errors.descripcion}</div>}
      </CRow>
      <CRow className="mb-1 mt-3 justify-content-center">
        <CButton type="submit" color="primary" style= {{maxWidth: "300px",  width: '100%' }}>
          Compartir
        </CButton>

      </CRow>

      {submitSuccess && (
        <CAlert color="success" className="mt-3">
          ¡Mensaje enviado con éxito!
        </CAlert>
      )}
      
    {/*Modal por si no inicio sesion*/}
    <ModalNecesitaLogueo  showModal={showModal} setShowModal={setShowModal}/>
    </CForm>
    </CCardBody>
    </CCard>


  );
}