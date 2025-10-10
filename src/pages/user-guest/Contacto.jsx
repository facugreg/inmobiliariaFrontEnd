import { CContainer, CCol, CRow } from "@coreui/react";
import { FormContacto } from "../../components/forms/FormContacto.jsx";
import { CardContacto } from "../../components/cards/CardContacto.jsx";

export const Contacto = () => {

  return (
    <>
    <CContainer className="d-flex justify-content-center align-items-center p-4">
      <CRow className="w-100">
      <CCol lg={7} className="mb-4">
    <FormContacto />
      </CCol>
      <CCol lg={5}>
        <CardContacto className="mb-4" />
      </CCol>
      </CRow>
    </CContainer>
    </>
  );
}