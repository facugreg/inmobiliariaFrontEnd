import { CAlert, CButton, CForm, CFormTextarea, CInputGroup } from "@coreui/react";
import React, { useState } from "react";
import axios from 'axios';
import CIcon from "@coreui/icons-react";
import { cilSend } from "@coreui/icons";
import { ModalNecesitaLogueo } from "../modals/ModalNecesitaLogueo.jsx";


export function FormRtaConsulta({props}) {
  const [formData, setFormData] = useState({
    respuesta: "",
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
      if (!formData.respuesta.trim()) tempErrors.respuesta = "La respuesta es requerida.";
      return tempErrors;
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const PATH = `http://localhost:3000/api/consultas/${props.id}`;

      // {/*Esto es para cuando veamos bien como hacerlo*/}
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
            descripcion: props.descripcion,
            inmueble: props.inmueble,
            usuario:props.usuario.id,
            respuesta: formData.respuesta,
          };
          console.log('Payload a enviar:', payload);
          await axios.put(PATH, payload, {withCredentials: true});
          setSubmitSuccess(true);
          setFormData({respuesta: "" });
          setTimeout(() => setSubmitSuccess(false), 3000);
        } catch (error) {
          setErrors({ submit: "Error al enviar la respuesta" });
          console.error('Error:', error);
        }
      } else {
        setErrors(tempErrors);
      }
  };
  return (
      <CForm onSubmit={handleSubmit}>
        <CInputGroup>
          <CFormTextarea
            placeholder="Escribe tu respuesta..."
            value={formData.respuesta}
            onChange={handleChange}
            rows={2}
            className="mt-2"
            name="respuesta"
            invalid={!!errors.respuesta} //para ver el error
          />
          {errors.respuesta && <div className="text-danger">{errors.respuesta}</div>}
          <CButton type="submit" color="primary" size="sm" className="mt-2">
            <CIcon icon= {cilSend}></CIcon>
          </CButton>
        </CInputGroup>
         {submitSuccess && (
                <CAlert color="success" className="mt-3">
                  ¡Respuesta enviada con éxito!
                </CAlert>
              )}
         {/*Modal por si no inicio sesion*/}
            <ModalNecesitaLogueo  showModal={showModal} setShowModal={setShowModal}/>
      </CForm>
  );
}