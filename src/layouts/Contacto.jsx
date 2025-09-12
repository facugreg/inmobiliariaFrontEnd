import { CContainer } from "@coreui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { FormContacto } from "../components/FormContacto.jsx";

export const Contacto = () => {
  const navItems = [
    { nombre: "Comprar", direccion: "/comprar" },
    { nombre: "Alquilar", direccion: "/alquilar" },
    { nombre: "Contacto", direccion: "/contacto" },
  ]
  return (
    <>
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
    </>
  );
}