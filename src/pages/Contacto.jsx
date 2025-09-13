import { CContainer, CCol, CRow } from "@coreui/react";
import { FormContacto } from "../components/forms/FormContacto.jsx";
import oficina from '../assets/oficina.webp';
import { CardContacto } from "../components/cards/CardContacto.jsx";

export const Contacto = () => {

  return (
    <>
    <CContainer
          fluid
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{
            backgroundImage: `url(${oficina})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '200px',
          }}
        >
          <h1>Contáctenos</h1>
        </CContainer>
    <CContainer className="d-flex justify-content-center align-items-center p-5">
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