//import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import FormIniciarSesion from './components/InicioSesion';
import FormSignIn from './components/Registro';
import { ComprarAlquilar } from './pages/ComprarAlquilar';
import { Contacto } from './pages/Contacto';
import Inmuebles from './pages/Inmuebles';
import { MisVisitas } from './pages/MisVisitas';
import { Uninmueble } from './pages/Uninmueble';
import Home from './pages/Home';
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import { TipoServicio } from './pages/TipoServicio';


function App() {
  const [userType, setUserType] = useState('guest'); // Estado global para userType
  const [isLoading, setIsLoading] = useState(true); // Nueva bandera de carga

  // Carga userType de localStorage al montar la app, provisorio para testing
 useEffect(() => {
    const savedUserType = localStorage.getItem('userType');
    console.log('useEffect: userType inicial desde localStorage:', savedUserType);
    if (savedUserType) {
      setUserType(savedUserType);
    }
    setIsLoading(false); // Marca que la carga inicial terminó
    console.log('useEffect: isLoading establecido a false, userType:', savedUserType || 'guest');
  }, []);

  // Función para actualizar userType después del login (pásala a FormIniciarSesion)
 const handleLogin = (newUserType) => {
    console.log('handleLogin: seteando userType a:', newUserType);
    setUserType(newUserType);
    localStorage.setItem('userType', newUserType);
    console.log('handleLogin: userType guardado en localStorage:', newUserType);
  };

  const handleLogout = () => {
    console.log('handleLogout: seteando userType a guest');
    setUserType('guest');
    localStorage.removeItem('userType');
    console.log('handleLogout: localStorage.userType eliminado');
  };

  console.log('Renderizando App con userType:', userType, 'isLoading:', isLoading);

  // Mientras carga, no renderizar rutas protegidas
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          element={
            <Layout userType={userType} setUserType={setUserType} onLogout={handleLogout} />
          }
        >
        <Route index element={<Home />} />
        <Route path="/comprar" element={<ComprarAlquilar />} />
        <Route path="/alquilar" element={<ComprarAlquilar />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Rutas protegidas: Redirige si no logueado */}
          <Route
            path="misvisitas"
            element={userType === 'user' ? <MisVisitas /> : <Navigate to="/login" />}
          />
          <Route
            path="inmuebles"
            element={userType === 'admin' ? <Inmuebles /> : <Navigate to="/" />}
          />

          <Route path="/uninmueble" element={<Uninmueble />} />
          <Route 
          path="/tiposervicios" 
          element={userType === 'admin' ? <TipoServicio /> : <Navigate to= "/" />} 
          />

      </Route>


        {/* Rutas fuera del layout (ej: login no necesita Header/Footer; ajusta si quieres) */}
        <Route path="/login" element={<LoginWrapper handleLogin={handleLogin} />} />
        <Route path="/signin" element={<FormSignIn />} />
      </Routes>
    </Router>
  );
}

// Wrapper para login: Para que pueda acceder a handleLogin
function LoginWrapper({ handleLogin }) {
  const navigate = useNavigate();
  // Asume que FormIniciarSesion acepta props onSuccess
  return <FormIniciarSesion onSuccess={handleLogin} onCancel={() => navigate('/')} />;
}

export default App;
