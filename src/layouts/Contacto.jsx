import { CContainer } from "@coreui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Form } from "react-router-dom";
import { FormContacto } from "../components/FormContacto.jsx";

export const Contacto = () => {
  return (
  <CContainer fluid className="p-0">
    <Header userType="guest"/>
    <CContainer className="d-flex justify-content-center align-items-center p-5" style={{ minHeight: '80px' }}> 
    <h1>Contactate con nosotros</h1>
    </CContainer>
    <CContainer className="d-flex justify-content-center align-items-center p-3" style={{ minHeight: '200px' }}>
    <FormContacto />
    </CContainer>
    <Footer />
  </CContainer>  
  );
}