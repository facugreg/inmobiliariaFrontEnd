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
  CCollapse
} from '@coreui/react';
import { getNavigationItems, } from '../config/navigation';
import { useState } from 'react';
import { cilHamburgerMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
//el header tendria que cambiar segun el tipo de usuario, no segun los navItems que le pasemos 
export default function Header({ userType = 'guest', onLogout }) { 

  const navigate = useNavigate();
  const navItems = getNavigationItems(userType);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú

  const handleLogoutClick = () => {
    onLogout(); // Llama al handler de App
    navigate('/');
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // Alterna el estado al hacer clic en el ícono
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
                onClick={() => navigate('/')}
              />
            </CButton>
          </CHeaderBrand>
        </CCol>

        {/* Botón hamburguesa para pantallas pequeñas */}
        <CCol xs={3} className="d-flex justify-content-end d-lg-none">
          <CButton
            onClick={handleToggleMenu}
            color='primary'
          >
            <CIcon icon={cilHamburgerMenu} size="2xl" /> {/* Ícono de hamburguesa */}
          </CButton>
        </CCol>

        {/* Menú de navegación (colapsable en pantallas pequeñas) */}
        <CCol xs={12} lg={6} className="d-none d-lg-block">
          <CNav className="justify-content-center">
            {navItems.map((item, index) => (
              <CNavItem key={index}>
                <CNavLink href={item.direccion}>{item.nombre}</CNavLink>
              </CNavItem>
            ))}
          </CNav>
        </CCol>

        {/* Botón de sesión */}
        <CCol xs={3} lg={3} className="d-flex justify-content-end">
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
        
        {/* Menú colapsable para pantallas pequeñas */}
        <CCollapse visible={isOpen} className="d-lg-none bg-light p-2">
          <CNav className="flex-column">
            {navItems.map((item, index) => (
              <CNavItem key={index}>
                <CNavLink href={item.direccion} onClick={() => setIsOpen(false)}>
                  {item.nombre}
                </CNavLink>
              </CNavItem>
            ))}
          </CNav>
        </CCollapse>
      </CRow>
    </CContainer>
  );
}
