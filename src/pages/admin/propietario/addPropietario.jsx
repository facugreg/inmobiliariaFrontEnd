import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import { FormCrearPropietario } from "../../../components/forms/FormCrearPropietario.jsx";

export default function AddPropietario(){

  const handleVolver = () => {
    window.history.back(); 
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