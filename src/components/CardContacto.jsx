import { cibGmail, cilClock, cilHome, cilPhone, cibInstagram, cibFacebook, cibTwitter } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCard, CCardTitle, CCardBody, CCardText, CButton } from "@coreui/react";

export function CardContacto() {
  return (
    <CCard className= "p-3 w-100" >
      <CCardTitle className= "p-3 justify-content-center align-items-center">
        Datos de contacto
      </CCardTitle>
      <CCardBody>
        <CCardText>
          <CIcon icon = {cilPhone} className="me-2 text-primary"/>
          Teléfono: (123) 456-7890
        </CCardText>
        <p>
          <CIcon icon = {cibGmail} className="me-2 text-primary"/> 
          Email: inmobiliaria@gmail.com
        </p>
        <p>
          <CIcon icon= {cilHome} className="me-2 text-primary" />
          Dirección: Calle Falsa 123, Ciudad, País
          </p>
      </CCardBody>

      <CCardTitle className= "p-3 justify-content-center align-items-center">
        Horarios de atención
      </CCardTitle>
      <CCardBody>
        <CCardText>
          <CIcon icon = {cilClock} className="me-2 text-primary"/>
          Lunes a Viernes: 9:00 AM - 6:00 PM
        </CCardText>
        <CCardText>
          <CIcon icon = {cilClock} className="me-2 text-primary"/>
          Sábados: 10:00 AM - 2:00 PM
        </CCardText>
        <CCardText>
        <CIcon icon = {cilClock} className="me-2 text-primary"/>
          Domingos: Cerrado
        </CCardText>
      </CCardBody>

      <CCardBody>
        <CCardText>
          <CButton>
            <CIcon icon={cibInstagram} className="me-2"/>
          </CButton>
          <CButton>
            <CIcon icon={cibFacebook} className="me-2" />
          </CButton>
          <CButton>
            <CIcon icon={cibTwitter} className="me-2" />
          </CButton>
        </CCardText>
      </CCardBody>

    </CCard>
  );
}