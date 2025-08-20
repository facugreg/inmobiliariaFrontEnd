import {
  CButton,
  CContainer,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormCheck,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function FormIniciarSesion() {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };
  const handleCancel = () => navigate('/');
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
                  onClick={handleCancel}
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
