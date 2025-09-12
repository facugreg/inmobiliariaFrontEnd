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
import { getNavigationItems, } from '../config/navigation';

//el header tendria que cambiar segun el tipo de usuario, no segun los navItems que le pasemos 
export default function Header({ userType = 'guest', onLogout }) { 

  const navigate = useNavigate();
  const navItems = getNavigationItems(userType);

  const handleLogoutClick = () => {
    onLogout(); // Llama al handler de App
    navigate('/');
  };

  const isLoggedIn = userType !== 'guest';

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
          {isLoggedIn ? (
            <CButton onClick={handleLogoutClick} color="secondary">
              Cerrar sesión
            </CButton>
          ) : (
            <CButton onClick={() => navigate('/login')} color="primary">
              Iniciar sesión
            </CButton>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
}
