import { CContainer, CRow, CCol, CForm, CFormLabel, CFormInput, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputPerfil from '../inputs/InputPerfil.jsx';

const schema = z.object({
    nombre: z.string("El nombre debe tener al menos 2 caracteres").min(2, "El nombre debe tener al menos 2 caracteres").max(20, "El nombre debe tener como maximo 20 caracteres"),
    apellido: z.string("El apellido debe tener al menos 2 caracteres").min(2, "El apellido debe tener al menos 2 caracteres").max(20, "El apellido debe tener como maximo 20 caracteres"),
    email: z.string("Formato de email inválido").email("Formato de email inválido"),
    telefono: z.string("Teléfono inválido").regex(/^\d{10}$/, "Teléfono inválido"),
})

export default function FormPerfil({ user, onUpdate, isSubmitting, errorMail, onDelete }) {
  const {control, handleSubmit, formState: {errors}, setError} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
    telefono: user?.telefono || '',
    },
  });

  useEffect(() => {
    if (errorMail) {
      setError("email", { type: "manual", message: errorMail });
    }
  }, [errorMail, setError]);

  return (
    <CContainer className="py-5">
      <CRow className="justify-content-center">
        <CCol xs={12} md={8} lg={6}>
              <h2 className="mb-4 text-center">Mi Perfil</h2>
              <CForm onSubmit={handleSubmit(onUpdate)}>
                <InputPerfil nombre="nombre" control={control} label="Nombre" type="text" error={errors.nombre}/>
                <InputPerfil nombre="apellido" control={control} label="Apellido" type="text" error={errors.apellido}/>
                <InputPerfil nombre="email" control={control} label="Email" type="email" error={errors.email}/>
                <InputPerfil nombre="telefono" control={control} label="Teléfono" type="text" error={errors.telefono}/>

                <div className="d-flex justify-content-between mt-4">
                  <CButton type="submit" color="primary" className="d-flex align-items-center gap-2" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                  </CButton>
                  <CButton onClick={onDelete} color="danger" className="d-flex align-items-center gap-2">
                    <CIcon icon={cilTrash} /> Eliminar cuenta
                  </CButton>
                </div>
              </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
}


