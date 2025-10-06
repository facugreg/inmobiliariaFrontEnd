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
  CCollapse,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import { getNavigationItems } from '../navigation/navigation';
import { useState } from 'react';
import { cilHamburgerMenu, cilUser, cilAccountLogout } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export default function Header({ userType = 'guest', onLogout }) { 
  const navigate = useNavigate();
  const navItems = getNavigationItems(userType);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
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
            <CIcon icon={cilHamburgerMenu} size="2xl" />
          </CButton>
        </CCol>

        {/* Menú de navegación */}
        <CCol xs={12} lg={6} className="d-none d-lg-block">
          <CNav className="justify-content-center">
            {navItems.map((item, index) => (
              <CNavItem key={index}>
                <CNavLink href={item.direccion}>{item.nombre}</CNavLink>
              </CNavItem>
            ))}
          </CNav>
        </CCol>

        {/* Sesión: botón o menú de usuario */}
        <CCol xs={3} lg={3} className="d-flex justify-content-end">
          {isLoggedIn ? (
            <CDropdown>
              <CDropdownToggle color="light" caret={false} style={{ width: '3rem', height: '3rem', padding: 0 }}>
                <CIcon icon={cilUser} style={{ width: '100%', height: '100%' }}  />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  className="cursor-pointer"
                  onClick={() => navigate('/perfil')}
                >
                  Mi perfil
                </CDropdownItem>
                <CDropdownItem
                  className="cursor-pointer text-danger fw-bold d-flex align-items-center gap-2"
                  onClick={handleLogoutClick}
                >
                  <CIcon icon={cilAccountLogout} /> Cerrar sesión
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ) : (
            <CButton onClick={() => navigate('/perfil')} color="primary">
              Iniciar sesión
            </CButton>
          )}
        </CCol>

        {/* Menú colapsable en pantallas pequeñas */}
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
