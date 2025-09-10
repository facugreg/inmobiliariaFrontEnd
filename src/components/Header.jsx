import transparent2 from '../assets/transparent2.png';
import { useNavigate } from 'react-router-dom';
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

//el header tendria que cambiar segun el tipo de usuario, no segun los navItems que le pasemos 
export default function Header({ navItems }) { 
  const navigate = useNavigate();
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
            {navItems.map((item, index) => (
              <CNavItem key={index} href={item.direccion}>
                {item.nombre}
              </CNavItem>
            ))}
          </CNav>
        </CCol>
        <CCol xs={3} className="d-flex justify-content-end">
          <CButton onClick={() => navigate('/login')} color="primary">
            Iniciar sesion
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
}
