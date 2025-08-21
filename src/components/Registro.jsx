import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormCheck,
} from '@coreui/react';
function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      apellido: '',
      mail: '',
      contraseña: '',
      confirmaContraseña: '',
      terminos: false,
    },
  });
  const password = watch('contraseña');
  const navigate = useNavigate();
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate('/');
  };
  const onError = () => {
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
          <CForm
            className="p-4 border rounded shadow"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <h3 className="text-center">Registrarse</h3>
            <CFormLabel htmlFor="nombre">Nombre</CFormLabel>
            <CFormInput
              {...register('nombre', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 4,
                  message: 'El nombre debe tener al menos 4 caracters',
                },
                maxLength: {
                  value: 20,
                  message: 'El nombre debe tener como maximo 20 caracteres',
                },
              })}
              style={{
                border: errors.nombre ? '1px solid red' : '1px solid #ddd',
              }}
              type="text"
              id="nombre"
            ></CFormInput>
            {errors.nombre && (
              <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
                {errors.nombre.message}
              </p>
            )}
            <br />
            <CFormLabel htmlFor="apellido">Apellido</CFormLabel>
            <CFormInput
              {...register('apellido', {
                required: 'El apellido es requerido',
                minLength: {
                  value: 4,
                  message: 'El apellido debe tener al menos 4 caracteres',
                },
                maxLength: {
                  value: 20,
                  message: 'El apellido debe tener como maximo 20 caracteres',
                },
              })}
              style={{
                border: errors.apellido ? '1px solid red' : '1px solid #ddd',
              }}
              type="text"
              id="apellido"
            ></CFormInput>
            {errors.apellido && (
              <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
                {errors.apellido.message}
              </p>
            )}
            <br />
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              {...register('mail', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, //expresión regular para validar mail
                  message: 'Formato de email inválido',
                },
              })}
              type="email"
              id="mail"
              style={{
                border: errors.mail ? '1px solid red' : '1px solid #ddd',
              }}
            ></CFormInput>
            {errors.mail && (
              <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
                {errors.mail.message}
              </p>
            )}
            <br />
            <CFormLabel htmlFor="contraseña">Contraseña</CFormLabel>
            <CFormInput
              {...register('contraseña', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 4,
                  message: 'La contraseña debe tener al menos 4 caracteres',
                },
              })}
              type="password"
              id="contraseña"
              style={{
                border: errors.contraseña ? '1px solid red' : '1px solid #ddd',
              }}
            ></CFormInput>
            {errors.contraseña && (
              <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
                {errors.contraseña.message}
              </p>
            )}
            <br />
            <CFormLabel htmlFor="confirmaContraseña">
              Confirmar contraseña
            </CFormLabel>
            <CFormInput
              {...register('confirmaContraseña', {
                required: 'La confirmacion de la contraseña es obligatoria',
                validate: (value) =>
                  value === password || 'Las contraseñas no coinciden',
              })}
              type="password"
              id="confirmaContraseña"
              style={{
                border: errors.confirmaContraseña
                  ? '1px solid red'
                  : '1px solid #ddd',
              }}
            ></CFormInput>
            {errors.confirmaContraseña && (
              <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
                {errors.confirmaContraseña.message}
              </p>
            )}
            <br />
            <CFormCheck
              type="checkbox"
              id="terminos"
              {...register('terminos', {
                required: 'Debes aceptar los terminos y condiciones',
              })}
              style={{ marginRight: '5px' }}
            />
            <CFormLabel htmlFor="terminos">
              Acepto los terminos y condiciones
            </CFormLabel>
            {errors.terminos && (
              <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
                {errors.terminos.message}
              </p>
            )}
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
                <CButton
                  type="submit"
                  disabled={isSubmitting || !isDirty || !isValid}
                  color="primary"
                  className="w-100"
                >
                  {isSubmitting ? 'Enviando...' : 'Registrar'}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
}
export default FormSignIn;
