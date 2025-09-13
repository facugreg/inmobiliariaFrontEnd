import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import { FormModiTipoServicio } from "../../../components/forms/FormModiTipoServicio.jsx";

export function UpdateTipoServicio(){

  const handleVolver = () =>{
    window.history.back(); // Regresa a la página anterior
  }

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
      <FormModiTipoServicio />
      </CRow>
    </CContainer>
  );
}