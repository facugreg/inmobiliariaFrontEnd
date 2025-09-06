//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import '@coreui/coreui/dist/css/coreui.min.css';
import FormIniciarSesion from './components/InicioSesion';
import FormSignIn from './components/Registro';
import { ComprarAlquilar } from './layouts/ComprarAlquilar';
//import PageRevealEvent from './components/page'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<FormIniciarSesion />} />
        <Route path="/signin" element={<FormSignIn />} />
        <Route path="/comprar" element={<ComprarAlquilar />} />
      </Routes>
    </Router>
  );
}

export default App;
