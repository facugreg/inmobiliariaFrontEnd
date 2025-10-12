import { useParams } from "react-router-dom";
import { CContainer, CRow, CButton, CCol } from "@coreui/react";
import { FormUpdateInmueble } from "../../../components/forms/FormUpdateInmueble";

export default function UpdateInmueble(){
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
      <CRow className="pb-4">
     <FormUpdateInmueble id={id} />
      </CRow>
    </CContainer>
  );
}