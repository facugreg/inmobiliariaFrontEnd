import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import FormCrearTipoServicio from "../../../components/forms/FormCrearTipoServicio.jsx";

export function AddTipoServicio(){

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
      <FormCrearTipoServicio />
      </CRow>

    </CContainer>
  );
}