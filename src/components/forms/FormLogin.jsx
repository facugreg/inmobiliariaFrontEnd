import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { CContainer, CRow, CCol, CForm, CButton, CFormLabel, CFormInput, CFormCheck } from "@coreui/react";
import { Link } from 'react-router-dom';


const loginSchema = z.object({
  email: z.string("Email Requerido").min(1, "Email Requerido"),
  password: z.string("Contraseña Requerida").min(1, "Contraseña Requerida"),
});

function FormLogin({ onSubmit, onCancel, loading, error }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return(
    <CContainer
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <CRow className="w-100 justify-content-center ">
        <CCol lg={3} md={6} sm={12} className="mx-auto">
          <CForm
            className="p-4 border rounded shadow"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-center">Iniciar sesión</h3>

            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              type="text"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-danger">Campo obligatorio</span>
            )}
            <br />
            
            <CFormLabel htmlFor="password">Contraseña</CFormLabel>
            <CFormInput
              type="password"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-danger">Campo obligatorio</span>
            )}
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

            {/* Botones */}
            <CRow className="justify-content-center mt-3">
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
                <CButton
                  type="submit"
                  color="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "Iniciar sesión"}
                </CButton>
              </CCol>
            </CRow>

            {error && (
              <p className="text-danger text-center mt-3">
                Usuario o contraseña incorrectos
              </p>
            )}
          </CForm>
        </CCol>
      </CRow>
    </CContainer>

  )

}
export default FormLogin;