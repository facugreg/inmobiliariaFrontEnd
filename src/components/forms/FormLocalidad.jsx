import {
  CButton,
  CFormLabel,
  CFormInput,
  CModalTitle,
  CCol,
  CContainer,
  CForm,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useCreateLocalidad,
  useUpdateLocalidad,
} from '../../hooks/localidades.hooks';

export default function FormLocalidad({
  initialData,

  visible,
  setVisible,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      codPostal: '',
      nombre: '',
    },
  });
  const { mutate: createLocalidad } = useCreateLocalidad();
  const { mutate: updateLocalidad } = useUpdateLocalidad();

  const onSubmit = (data) => {
    if (initialData?.id) {
      updateLocalidad(
        { id: initialData.id, ...data },
        {
          onSuccess: () => {
            setVisible(false);
          },
          onError: (err) => {
            console.error(
              'Error al actualizar:',
              err.response?.data || err.message
            );
          },
        }
      );
    } else {
      createLocalidad(data, {
        onSuccess: () => {
          setVisible(false);
        },
        onError: (err) => {
          console.error('Error al crear:', err.response?.data || err.message);
        },
      });
    }
  };
  useEffect(() => {
    if (initialData) {
      reset({
        nombre: initialData.nombre || '',
        codPostal: initialData.codPostal || '',
      });
    } else {
      reset({
        nombre: '',
        codPostal: '',
      });
    }
  }, [initialData, reset, visible]);
  const handleCancel = () => {
    setVisible(false);
    reset({ codPostal: '', nombre: '' });
  };

  return (
    <CModal alignment="center" visible={visible} onClose={handleCancel}>
      <CModalHeader>
        <CModalTitle>
          {initialData?.id ? 'Actualizar localidad' : 'Agregar localidad'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="p-4 border rounded shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CFormLabel htmlFor="nombre">Nombre</CFormLabel>
          <CFormInput
            {...register('nombre', {
              required: 'El nombre de la localidad es requerido',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 4 caracteres',
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
            id="nombreLocalidad"
          ></CFormInput>
          {errors.nombre && (
            <p
              style={{
                color: 'red',
                fontSize: '0.8em',
                marginTop: '5px',
              }}
            >
              {errors.nombre.message}
            </p>
          )}
          <br />
          <CFormLabel htmlFor="codPostal">Codigo postal</CFormLabel>
          <CFormInput
            {...register('codPostal', {
              required: 'El código postal es obligatorio',
              pattern: {
                value: /^\d{4}$/,
                message: 'Debe tener exactamente 4 dígitos',
              },
            })}
            style={{
              border: errors.codPostal ? '1px solid red' : '1px solid #ddd',
            }}
            type="text"
            id="codPostal"
          ></CFormInput>

          {errors.codPostal && (
            <p
              style={{
                color: 'red',
                fontSize: '0.8em',
                marginTop: '5px',
              }}
            >
              {errors.codPostal.message}
            </p>
          )}
          <br />
          <CRow className="mt-3 justify-content-center">
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
                disabled={isSubmitting || !isValid}
                color="primary"
                className="w-100"
                type="submit"
              >
                {initialData?.id ? 'Actualizar' : 'Agregar'}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
    </CModal>
  );
}
