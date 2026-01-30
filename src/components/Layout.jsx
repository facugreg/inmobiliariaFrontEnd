import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx'; // Asumiendo que existe; si no, créalo similar al tuyo
import { CContainer } from '@coreui/react';

export default function Layout({ userType, onLogout }) {
  return (
    <CContainer fluid className="p-0 min-vh-100 d-flex flex-column">
      <Header userType={userType} onLogout={onLogout} />
      <main className="flex-grow-1">
        <Outlet /> {/* Aquí se renderiza el contenido de cada ruta */}
      </main>
      <Footer />
    </CContainer>
  );
}