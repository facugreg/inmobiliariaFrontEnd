import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { CContainer, CRow, CCol, CForm, CButton } from "@coreui/react";
import InputRegistro from "../inputs/inputRegistro";
import { useEffect } from "react";

const schema = z.object({
    nombre: z.string("El nombre debe tener al menos 2 caracteres").min(2, "El nombre debe tener al menos 2 caracteres").max(20, "El nombre debe tener como maximo 20 caracteres"),
    apellido: z.string("El apellido debe tener al menos 2 caracteres").min(2, "El apellido debe tener al menos 2 caracteres").max(20, "El apellido debe tener como maximo 20 caracteres"),
    email: z.string("Formato de email inválido").email("Formato de email inválido"),
    password: z.string("La contraseña debe tener al menos 8 caracteres").min(8, "La contraseña debe tener al menos 8 caracteres").max(20, "La contraseña debe tener como maximo 20 caracteres"),
    confirmarPassword: z.string("La contraseña debe tener al menos 8 caracteres").min(8, "La contraseña debe tener al menos 8 caracteres").max(20, "La contraseña debe tener como maximo 20 caracteres"),
    telefono: z.string("Teléfono inválido").regex(/^\d{10}$/, "Teléfono inválido"),
}).refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
});


const FormRegistro = ({onSubmit,  onCancel, isSubmitting, errorMail}) => {
    const {control, handleSubmit, formState: {errors}, setError} = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
    if (errorMail) {
      setError("email", { type: "manual", message: errorMail });
    }
    }, [errorMail, setError]);
    
    return(
        <CContainer fluid className="d-flex justify-content-center align-items-center vh-100">  
            <CRow className="w-100 justify-content-center ">
                <CCol lg={4} md={6} sm={12} className="mx-auto">
                    <CForm className="p-4 border rounded shadow" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="text-center">Registrarse</h3>
                        <InputRegistro nombre="nombre" control={control} label="Nombre" type="text" error={errors.nombre}/>
                        <InputRegistro nombre="apellido" control={control} label="Apellido" type="text" error={errors.apellido}/>
                        <InputRegistro nombre="email" control={control} label="Email" type="email" error={errors.email}/>
                        <InputRegistro nombre="password" control={control} label="Contraseña" type="password" error={errors.password}/>
                        <InputRegistro nombre="confirmarPassword" control={control} label="Confirmar Contraseña" type="password" error={errors.confirmarPassword}/>
                        <InputRegistro nombre="telefono" control={control} label="Teléfono" type="text" error={errors.telefono}/>
                        <br />
                        <div className="d-flex justify-content-between">
                            <CButton type="submit" color="primary" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrarse'}</CButton>
                            <CButton type="button" color="secondary" onClick={onCancel}>Cancelar</CButton>
                        </div>
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default FormRegistro;
