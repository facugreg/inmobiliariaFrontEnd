//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import FormIniciarSesion from './components/InicioSesion';
import FormSignIn from './components/Registro';
import { ComprarAlquilar } from './pages/ComprarAlquilar';
import { Contacto } from './pages/Contacto';
import Inmuebles from './pages/Inmuebles';
import { MisVisitas } from './pages/MisVisitas';
import { Uninmueble } from './pages/Uninmueble';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormIniciarSesion />} />
        <Route path="/signin" element={<FormSignIn />} />
        <Route path="/comprar" element={<ComprarAlquilar />} />
        <Route path="/alquilar" element={<ComprarAlquilar />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inmuebles" element={<Inmuebles />} />
        <Route path="/misvisitas" element={<MisVisitas />} />
        <Route path="/uninmueble" element={<Uninmueble />} />
      </Routes>
    </Router>
  );
}

export default App;
