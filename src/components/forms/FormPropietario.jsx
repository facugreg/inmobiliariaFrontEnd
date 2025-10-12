import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { CCard, CCardTitle, CCardBody, CRow, CCol, CForm, CButton } from "@coreui/react";
import InputPropietario from "../inputs/inputPropietario";

const schema = z.object({
  nombrePropietario: z.string("El nombre debe tener al menos 2 caracteres").min(2, "El nombre debe tener al menos 2 caracteres").max(20, "El nombre debe tener como maximo 20 caracteres"),
  apellidoPropietario: z.string("El apellido debe tener al menos 2 caracteres").min(2, "El apellido debe tener al menos 2 caracteres").max(20, "El apellido debe tener como maximo 20 caracteres"),
  mailPropietario: z.string("Formato de email inválido").email("Formato de email inválido"),
  telefonoPropietario: z.string("Teléfono inválido").regex(/^\d{10}$/, "Teléfono inválido"),
});


const FormPropietario = ({onSubmit,  onCancel, isSubmitting, errorMail, nombrePropietario, apellidoPropietario, mailPropietario, telefonoPropietario, titulo}) => {
  const {control, handleSubmit, reset, formState: {errors}} = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
      nombrePropietario,
      apellidoPropietario,
      mailPropietario,
      telefonoPropietario,
    },
  });

  const internalSubmit = (data) => {
    onSubmit(data, reset);
  }

  return(
    <CCard className= "p-3 w-100 bg-light">
      <CCardBody>
      <CCardTitle>
        {titulo}
      </CCardTitle>
        <CForm onSubmit={handleSubmit(internalSubmit)} className= "mt-3">
        <CRow className="mb-3">
          <InputPropietario nombre="nombrePropietario" control={control} label="Nombre*" type="text" error={errors.nombrePropietario} />
        </CRow>
        <CRow className="mb-3">
          <InputPropietario nombre="apellidoPropietario" control={control} label="Apellido*" type="text" error={errors.apellidoPropietario} />
        </CRow>
        <CRow className="mb-3">
          <InputPropietario nombre="mailPropietario" control={control} label="Email*" type="email" error={errors.mailPropietario} />
        </CRow>
        <CRow className="mb-3">
          <InputPropietario nombre="telefonoPropietario" control={control} label="Teléfono*" type="text" error={errors.telefonoPropietario} />
        </CRow>
        {errorMail && <div className="text-danger mb-3">{errorMail}</div>}
        <CRow className='justify-content-end'>
          <CCol lg={1}>
          <CButton type='button' color='secondary' className='mt-3 mx-3' onClick={onCancel}>Cancelar</CButton>
          </CCol>
          <CCol lg={1}>
          <CButton type='submit' color='primary'className='mt-3 mx-3' disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar'}</CButton>
          </CCol>
        </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default FormPropietario;
