import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import FormCrearPropietario from "../../../components/forms/FormCrearPropietario.jsx";

export function addPropietario(){

  const handleVolver = () => {
    window.history.back(); // Regresa a la página anterior
  };
  
  return(
    <CContainer>
      <CRow className="mt-3 mb-3">
        <CCol lg={3}>
        <CButton onClick={handleVolver} color='primary' >
          Volver
        </CButton>
        </CCol>
      </CRow>
      <CRow>
      <FormCrearPropietario />
      </CRow>

    </CContainer>
  );
}