import {
  CButton,
  CContainer,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormCheck,
  CAlert
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormIniciarSesion({ onSuccess, onCancel }) {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [error, setError] = useState(''); // Para mostrar errores
  const navigate = useNavigate(); // Si onCancel no lo usa, pero por si acaso

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene recarga
    console.log('handleSubmit disparado'); // Depuración
    const email = emailInputRef.current?.value.trim();
    const password = passwordInputRef.current?.value.trim();
    console.log('Email:', email, 'Password:', password); // Depuración

    if (!email || !password) {
      setError('Email y contraseña requeridos');
      console.log('Validación fallida: campos vacíos');
      return;
    }

    setError(error); // Limpia error anterior

    // Crea FormData con los valores
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      // Simulación si no tenés backend (comenta esto y descomenta fetch abajo)
      console.log('Simulando login...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
      const user = { rol: email.includes('@admin') ? 'admin' : 'user' }; // Hardcodeado por email
      console.log('Usuario simulado:', user);

      // Real: Fetch a tu API
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   body: formData,
      // });
      // if (!response.ok) throw new Error('Credenciales inválidas');
      // const user = await response.json();

      onSuccess(user.rol || 'user'); // Actualiza estado global
      console.log('onSuccess llamado con rol:', user.rol || 'user');
      navigate('/'); // Redirige a home después de login
      console.log('Navegando a /');
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Error en el login');
    }
  };
  return (
    <CContainer
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <CRow className="w-100 justify-content-center ">
        <CCol lg={3} md={6} sm={12} className="mx-auto">
          <CForm className="p-4 border rounded shadow" onSubmit={handleSubmit}>
            <h3 className="text-center">Iniciar sesion</h3>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              ref={emailInputRef}
              type="email"
              id="email"
            ></CFormInput>
            <br />
            <CFormLabel htmlFor="password">Contraseña</CFormLabel>
            <CFormInput
              ref={passwordInputRef}
              type="password"
              id="password"
            ></CFormInput>
            <br />
            <CFormCheck type="checkbox" label="Recordarme" />
            <p className="text-center">
              ¿No tienes cuenta?
              <br />
              <Link to="/signin">Registrarse</Link>
            </p>
            <p className="text-center">
              ¿Olvidaste tu contraseña?
              <br />
              <a href="">Recuperar contraseña</a>
            </p>
            <CRow className=" justify-content-center  mt-3">
              <CCol lg={6}>
                <CButton
                  onClick={onCancel}
                  color="secondary"
                  className="w-100"
                >
                  Cancelar
                </CButton>
              </CCol>
              <CCol lg={6}>
                <CButton type="submit" color="primary" className="w-100">
                  Iniciar sesion
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
}
export default FormIniciarSesion;
