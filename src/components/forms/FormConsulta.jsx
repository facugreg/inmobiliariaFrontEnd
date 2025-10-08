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

export function FormConsulta() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",  
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
    if (!formData.descripcion.trim()) tempErrors.mensaje = "El mensaje es requerido.";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length === 0) {
      // Simulación de envío (puedes reemplazar con una llamada a API)
      console.log("Datos enviados:", formData);
      setSubmitSuccess(true);
      setFormData({ nombre: "",apellido:"", descripcion: "" }); // Resetear formulario
      setTimeout(() => setSubmitSuccess(false), 3000); // Ocultar mensaje después de 3 segundos
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <CCard className="p-3 bg-light">
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
      <CRow >
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="descripcion">Opinion*</CFormLabel>
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
    </CForm>
    </CCardBody>
    </CCard>

  );
}