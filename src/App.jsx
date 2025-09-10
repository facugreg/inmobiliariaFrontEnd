//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import '@coreui/coreui/dist/css/coreui.min.css';
import FormIniciarSesion from './components/InicioSesion';
import FormSignIn from './components/Registro';
import { ComprarAlquilar } from './layouts/ComprarAlquilar';
import { Contacto } from './layouts/Contacto';
import Inmuebles from './layouts/Inmuebles';
import { MisVisitas } from './layouts/MisVisitas';
//import PageRevealEvent from './components/page'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<FormIniciarSesion />} />
        <Route path="/signin" element={<FormSignIn />} />
        <Route path="/comprar" element={<ComprarAlquilar />} />
        <Route path="/alquilar" element={<ComprarAlquilar />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inmuebles" element={<Inmuebles />} />
        <Route path="/misvisitas" element={<MisVisitas />} />
      </Routes>
    </Router>
  );
}

export default App;
