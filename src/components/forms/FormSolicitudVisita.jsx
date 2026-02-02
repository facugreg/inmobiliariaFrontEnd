import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CFormLabel,
} from '@coreui/react';
import { useAuth } from '../../hooks/usuarios.hooks.js';
import { useCreateVisita, useUpdateVisita } from '../../hooks/visita.hooks';
export default function FormSolicitudVisita({
  modalVisible,
  setModalVisible,
  idInmueble,
  initialData,
}) {
  const {user} = useAuth();
  const { mutate: createVisita } = useCreateVisita();
  const { mutate: updateVisita } = useUpdateVisita();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      datevisita: '',
      descriptionvisita: '',
      usuario: user?.id,
      inmueble: idInmueble,
      telefonoContacto: '',
      estado: 'Pendiente',
    },
  });
  useEffect(() => {
    if (initialData?.id) {
      reset({
        datevisita: initialData.datevisita,
        descriptionvisita: initialData.descriptionvisita,
        usuario: user?.id,
        inmueble: idInmueble,
        telefonoContacto: initialData.telefonoContacto,
      });
    } else {
      reset({
        datevisita: '',
        descriptionvisita: '',
        usuario: user?.id,
        inmueble: idInmueble,
        telefonoContacto: '',
      });
    }
  }, [initialData, user?.id, idInmueble, reset]);
  //Handlers
  const onSubmit = async (data) => {
    if (initialData && initialData.id) {
      data.usuario = Number(user?.id);
      await updateVisita({ id: initialData.id, ...data });
    } else {
      data.usuario = Number(user?.id);
      data.inmueble = Number(idInmueble);
      data.estado = 'Pendiente';
      console.log('Enviando visita:', data);
      await createVisita(data);
    }

    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <CModal visible={modalVisible} onClose={handleCancel}>
      <CModalHeader>
        <CModalTitle>
          {initialData?.id
            ? 'Actualizar solicitud de visita'
            : 'Solicitar visita'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm id="visita-form" onSubmit={handleSubmit(onSubmit)}>
          <CFormLabel htmlFor="datevisita">Fecha de la visita</CFormLabel>
          <CFormInput
            type="date"
            {...register('datevisita', {
              required: 'La fecha de visita es requerida',
            })}
            style={{
              border: errors.datevisita ? '1px solid red' : '1px solid #ddd',
            }}
            id="datevisita"
          />
          {errors.datevisita && (
            <p
              style={{
                color: 'red',
                fontSize: '0.8em',
                marginTop: '5px',
              }}
            >
              {errors.datevisita.message}
            </p>
          )}
          <CFormLabel htmlFor="telefonoContacto">
            Telefono de contacto
          </CFormLabel>
          <CFormInput
            type="text"
            {...register('telefonoContacto', {
              required: 'El telefono de contacto es requerido',
            })}
            style={{
              border: errors.telefonoContacto
                ? '1px solid red'
                : '1px solid #ddd',
            }}
            id="telefonoContacto"
          />
          {errors.telefonoContacto && (
            <p
              style={{
                color: 'red',
                fontSize: '0.8em',
                marginTop: '5px',
              }}
            >
              {errors.telefonoContacto.message}
            </p>
          )}
          <CFormLabel htmlFor="descriptionvisita">Descripcion</CFormLabel>
          <CFormTextarea
            type="text"
            {...register('descriptionvisita', { required: false })}
            style={{
              border: errors.descriptionvisita
                ? '1px solid red'
                : '1px solid #ddd',
            }}
            id="descriptionvisita"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleCancel}>
          Cancelar
        </CButton>
        <CButton
          //disabled={!isValid}
          color="primary"
          type="submit"
          form="visita-form"
        >
          {initialData?.id ? 'Actualizar solicitud ' : 'Solicitar visita'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
