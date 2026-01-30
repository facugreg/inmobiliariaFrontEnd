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
//import { useState, useEffect } from 'react';
import { useAuth } from './hooks/usuarios.hooks.js';
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
import Consultas from './pages/admin/consulta/consultas.jsx';

function App() {
  //ESTOS 3 LOS VOLAMOS CUANDO ANDE EL CONTEXTO
  //const [userType, setUserType] = useState('guest'); // Estado global para userType
  //const [isLoading, setIsLoading] = useState(true); // Nueva bandera de carga
  //const [userId, setUserId] = useState(null); // Estado para userId

  //Estado y efecto para manejar userType globalmente
  const { user, loading, logout } = useAuth();

  // Carga userType de localStorage al montar la app, provisorio para testing
  // useEffect(() => {
  //   const savedUserType = localStorage.getItem('userType');
  //   const savedUserId = localStorage.getItem('userId');
  //   if (savedUserId) {
  //     setUserId(savedUserId);
  //   }
  //   console.log(
  //     'useEffect: userType inicial desde localStorage:',
  //     savedUserType
  //   );
  //   if (savedUserType) {
  //     setUserType(savedUserType);
  //   }
  //   setIsLoading(false); // Marca que la carga inicial terminó
  //   console.log(
  //     'useEffect: isLoading establecido a false, userType:',
  //     savedUserType || 'guest'
  //   );
  // }, []);

  // const handleLogin = (newUserType, newUserId) => {
  //   console.log('handleLogin: seteando userType a:', newUserType);
  //   setUserType(newUserType);
  //   localStorage.setItem('userType', newUserType);
  //   console.log('handleLogin: userType guardado en localStorage:', newUserType);
  //   setUserId(newUserId);
  //   localStorage.setItem('userId', newUserId);
  // };

  // const handleLogout = () => {
  //   console.log('handleLogout: seteando userType a guest');
  //   setUserType('guest');
  //   localStorage.removeItem('userType');
  //   localStorage.removeItem('userId');
  //   console.log('handleLogout: localStorage.userType eliminado');
  //   localStorage.removeItem('userId');
  //   setUserId(null);
  // };

  console.log(
    'Renderizando App con userType:',
    user?.rol,
    'isLoading:',
    loading
  );

  // Mientras carga, no renderizar rutas protegidas
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          element={
            <Layout
              userType={user?.rol}
              //setUserType={setUserType}
              onLogout={logout}
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
              user?.rol === 'user' ? <MisVisitas /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/visitas"
            element={user?.rol === 'admin' ? <Visitas /> : <Navigate to="/" />}
          />
          <Route
            path="/perfil"
            element={
              user?.rol === 'user' || user?.rol === 'admin' ? (
                <Perfil userId={user?.id} handleLogout={logout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/Inmuebles"
            element={user?.rol === 'admin' ? <Inmuebles /> : <Navigate to="/" />}
          />
          <Route
            path="/deleteInmueble/:id"
            element={
              user?.rol === 'admin' ? <DeleteInmueble /> : <Navigate to="/" />
            }
          />
          <Route
            path="/addInmueble"
            element={
              user?.rol === 'admin' ? <AddInmueble /> : <Navigate to="/" />
            }
          />
          <Route
            path="updateInmueble/:id"
            element={
              user?.rol === 'admin' ? <UpdateInmueble /> : <Navigate to="/" />
            }
          />
          <Route
            path="/consultas"
            element={user?.rol === 'admin' ? <Consultas /> : <Navigate to="/" />}
          />
          <Route
            path="/localidades"
            element={
              user?.rol === 'admin' ? <Localidades /> : <Navigate to="/" />
            }
          />
          <Route path="/addLocalidad" element={user?.rol === 'admin' ? <AddLocalidad /> : <Navigate to="/" />} />
          <Route
            path="updateLocalidad/:id"
            element={user?.rol === 'admin' ? <UpdateLocalidad /> : <Navigate to="/" />}
          />
          <Route
            path="/propietarios"
            element={
              user?.rol === 'admin' ? <Propietarios /> : <Navigate to="/" />
            }
          />
          <Route
            path="/addPropietario"
            element={
              user?.rol === 'admin' ? <AddPropietario /> : <Navigate to="/" />
            }
          />
          <Route
            path="/updatePropietario/:id"
            element={
              user?.rol === 'admin' ? <UpdatePropietario /> : <Navigate to="/" />
            }
          />
          <Route path="/uninmueble/:id" element={<Uninmueble />} />
          <Route
            path="/tiposervicios"
            element={
              user?.rol === 'admin' ? <TipoServicio /> : <Navigate to="/" />
            }
          />
          <Route path="/addtiposervicio" element={user?.rol === 'admin' ? <AddTipoServicio /> : <Navigate to="/" />} />
          <Route
            path="updatetiposervicio/:id"
            element={user?.rol === 'admin' ? <UpdateTipoServicio /> : <Navigate to="/" />}
          />
        </Route>

        {/* Rutas fuera del layout (ej: login no necesita Header/Footer; ajusta si quieres) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
