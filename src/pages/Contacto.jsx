import { CContainer } from "@coreui/react";
import { FormContacto } from "../components/FormContacto.jsx";

export const Contacto = () => {

  return (
    <>
    <CContainer className="d-flex justify-content-center align-items-center p-5 min-h-[80px]"> 
    <h1>Contactate con nosotros</h1>
    </CContainer>
    <CContainer className="d-flex justify-content-center align-items-center p-3 min-h-[200px]">
    <FormContacto />
    </CContainer>
    </>
  );
}