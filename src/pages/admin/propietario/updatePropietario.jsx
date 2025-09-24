import { useParams } from "react-router-dom";
import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import { FormUpdatePropietario } from "../../../components/forms/FormUpdatePropietario.jsx";

export default function UpdatePropietario(){
  const { id } = useParams();
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
     <FormUpdatePropietario id={id} />
      </CRow>
    </CContainer>
  );
}