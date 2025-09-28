import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import  FormCrearInmueble  from "../../../components/forms/FormCrearInmueble.jsx";

export default function AddInmueble(){

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
      <FormCrearInmueble />
      </CRow>
    </CContainer>
  );
}