import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import { ComprarAlquilar } from './pages/user-guest/ComprarAlquilar';
import { Contacto } from './pages/user-guest/Contacto';
import { MisVisitas } from './pages/user-guest/MisVisitas';
import { Uninmueble } from './pages/user-guest/Uninmueble';
import Home from './pages/Home';
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import { TipoServicio } from './pages/admin/tipoServicio/TipoServicio';
import { AddTipoServicio } from './pages/admin/tipoServicio/AddTipoServicio.jsx';
import { UpdateTipoServicio } from './pages/admin/tipoServicio/UpdateTipoServicio.jsx';
import Inmuebles from './pages/admin/inmueble/Inmuebles.jsx';
import DeleteInmueble from './pages/admin/inmueble/deleteInmueble.jsx';
import AddInmueble from './pages/admin/inmueble/addInmueble.jsx';
import UpdateInmueble from './pages/admin/inmueble/updateInmueble.jsx';
import Propietarios from './pages/admin/propietario/Propietarios.jsx';
import { UpdatePropietario } from './pages/admin/propietario/updatePropietario.jsx';
import AddPropietario from './pages/admin/propietario/addPropietario.jsx';
import Localidades from './pages/admin/localidad/Localidades.jsx';
import Perfil from './pages/Perfil.jsx';
import Visitas from './pages/admin/visita/Visitas.jsx';
import { AddLocalidad } from './pages/admin/localidad/AddLocalidad.jsx';
import { UpdateLocalidad } from './pages/admin/localidad/UpdateLocalidad.jsx';

function App() {
  const [userType, setUserType] = useState('guest'); // Estado global para userType
  const [isLoading, setIsLoading] = useState(true); // Nueva bandera de carga
  const [userId, setUserId] = useState(null); // Estado para userId

  // Carga userType de localStorage al montar la app, provisorio para testing
  useEffect(() => {
    const savedUserType = localStorage.getItem('userType');
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    }
    console.log(
      'useEffect: userType inicial desde localStorage:',
      savedUserType
    );
    if (savedUserType) {
      setUserType(savedUserType);
    }
    setIsLoading(false); // Marca que la carga inicial terminó
    console.log(
      'useEffect: isLoading establecido a false, userType:',
      savedUserType || 'guest'
    );
  }, []);

  const handleLogin = (newUserType, newUserId) => {
    console.log('handleLogin: seteando userType a:', newUserType);
    setUserType(newUserType);
    localStorage.setItem('userType', newUserType);
    console.log('handleLogin: userType guardado en localStorage:', newUserType);
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
  };

  const handleLogout = () => {
    console.log('handleLogout: seteando userType a guest');
    setUserType('guest');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    console.log('handleLogout: localStorage.userType eliminado');
    localStorage.removeItem('userId');
    setUserId(null);
  };

  console.log(
    'Renderizando App con userType:',
    userType,
    'isLoading:',
    isLoading
  );

  // Mientras carga, no renderizar rutas protegidas
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          element={
            <Layout
              userType={userType}
              setUserType={setUserType}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="/comprar" element={<ComprarAlquilar tipoServicio = "Comprar" />} />
          <Route path="/alquilar" element={<ComprarAlquilar tipoServicio = "Alquilar" />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* Rutas protegidas: Redirige si no logueado */}
          <Route
            path="/misvisitas"
            element={
              userType === 'user' ? <MisVisitas /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/visitas"
            element={userType === 'admin' ? <Visitas /> : <Navigate to="/" />}
          />
          <Route
            path="/perfil"
            element={
              userType === 'user' || userType === 'admin' ? (
                <Perfil userId={userId} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/Inmuebles"
            element={userType === 'admin' ? <Inmuebles /> : <Navigate to="/" />}
          />
          <Route
            path="/deleteInmueble/:id"
            element={
              userType === 'admin' ? <DeleteInmueble /> : <Navigate to="/" />
            }
          />
          <Route
            path="/addInmueble"
            element={
              userType === 'admin' ? <AddInmueble /> : <Navigate to="/" />
            }
          />
          <Route
            path="updateInmueble/:id"
            element={
              userType === 'admin' ? <UpdateInmueble /> : <Navigate to="/" />
            }
          />
          <Route
            path="/localidades"
            element={
              userType === 'admin' ? <Localidades /> : <Navigate to="/" />
            }
          />
          <Route path="/addLocalidad" element={userType === 'admin' ? <AddLocalidad /> : <Navigate to="/" />} />
          <Route
            path="updateLocalidad/:id"
            element={userType === 'admin' ? <UpdateLocalidad /> : <Navigate to="/" />}
          />
          <Route
            path="/propietarios"
            element={
              userType === 'admin' ? <Propietarios /> : <Navigate to="/" />
            }
          />
          <Route
            path="/addPropietario"
            element={
              userType === 'admin' ? <AddPropietario /> : <Navigate to="/" />
            }
          />
          <Route
            path="/updatePropietario/:id"
            element={
              userType === 'admin' ? <UpdatePropietario /> : <Navigate to="/" />
            }
          />
          <Route path="/uninmueble/:id" element={<Uninmueble />} />
          <Route
            path="/tiposervicios"
            element={
              userType === 'admin' ? <TipoServicio /> : <Navigate to="/" />
            }
          />
          <Route path="/addtiposervicio" element={userType === 'admin' ? <AddTipoServicio /> : <Navigate to="/" />} />
          <Route
            path="updatetiposervicio/:id"
            element={userType === 'admin' ? <UpdateTipoServicio /> : <Navigate to="/" />}
          />
        </Route>

        {/* Rutas fuera del layout (ej: login no necesita Header/Footer; ajusta si quieres) */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signin" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
