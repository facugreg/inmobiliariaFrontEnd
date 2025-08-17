import transparent2 from '../assets/transparent2.png';
import {
  CContainer,
  CRow,
  CCol,
  CHeaderBrand,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react';
export default function Header() {
  return (
    <CContainer fluid className="p-3 bg-light">
      <CRow className="align-items-center">
        <CCol xs={3}>
          <CHeaderBrand>
            <CButton>
              <img
                src={transparent2}
                alt="Logo inmobiliaria"
                width="75"
                height="75"
              />
            </CButton>
          </CHeaderBrand>
        </CCol>
        <CCol xs={6}>
          <CNav className="justify-content-center">
            <CNavItem>
              <CNavLink href="#">Comprar</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Alquilar</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Contacto</CNavLink>
            </CNavItem>
          </CNav>
        </CCol>
        <CCol xs={3} className="d-flex justify-content-end">
          <CButton color="primary">Iniciar sesion</CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
}
