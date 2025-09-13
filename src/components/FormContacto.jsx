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
} from "@coreui/react";

export function FormContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    if (!formData.nombre.trim()) tempErrors.nombre = "El nombre es requerido.";
        if (!formData.apellido.trim()) tempErrors.apellido = "El apellido es requerido.";
    if (!formData.email.trim()) {
      tempErrors.email = "El email es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "El email no es válido.";
    }
    if (!formData.telefono.trim()) tempErrors.telefono = "El telefono es requerido.";
    if (!formData.mensaje.trim()) tempErrors.mensaje = "El mensaje es requerido.";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length === 0) {
      // Simulación de envío (puedes reemplazar con una llamada a API)
      console.log("Datos enviados:", formData);
      setSubmitSuccess(true);
      setFormData({ nombre: "",apellido:"", email: "",telefono: "" ,mensaje: "" }); // Resetear formulario
      setTimeout(() => setSubmitSuccess(false), 3000); // Ocultar mensaje después de 3 segundos
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <CCard className="p-3 w-100 bg-light">
      <CCardTitle className="p-3">
        Contactanos para más información
      </CCardTitle>
      
      <CCardBody>
        
      <CForm onSubmit={handleSubmit}>
        <CRow className="mb-3">
          
          <CFormLabel htmlFor="nombre">Nombre*</CFormLabel>
          <CFormInput
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            invalid={!!errors.nombre}
            className="bg-light"
          />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
          
        </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="apellido">Apellido*</CFormLabel>
        <CFormInput
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          invalid={!!errors.apellido}
          className="bg-light"
        />
        {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
      </CRow>
      <CRow>
        <CFormLabel htmlFor="email">Email*</CFormLabel>
        <CFormInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          invalid={!!errors.email}
          className="bg-light"
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="telefono">Telefono*</CFormLabel>
        <CFormInput
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          invalid={!!errors.telefono}
          className="bg-light"
        />
        {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
      </CRow>

      <CRow >
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="mensaje">Consulta*</CFormLabel>
        <CFormTextarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows={4}
          invalid={!!errors.mensaje}
          className="bg-light"
        />
        {errors.mensaje && <div className="text-danger">{errors.mensaje}</div>}
      </CRow>
      <CRow className="mb-1 mt-3 justify-content-center">
       
          <CButton type="submit" color="primary" style= {{maxWidth: "300px",  width: '100%' }}>
            Enviar
          </CButton>
       
      </CRow>

      {submitSuccess && (
        <CAlert color="success" className="mt-3">
          ¡Mensaje enviado con éxito!
        </CAlert>
      )}
    </CForm>
    </CCardBody>
    </CCard>

  );
}