import { CIcon } from '@coreui/icons-react';
import { cilOptions, cilUser } from '@coreui/icons';
import { CButton, CCard, CCardBody, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormTextarea } from '@coreui/react';
import React, { useState } from 'react';
import { FormRtaConsulta } from '../forms/FormRtaConsulta.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/usuarios.hooks.js';
import { updateConsulta } from '../../api/consultas.api.js';


export function CardConsulta ( {props} ){
  const queryClient = useQueryClient();
    // const { nombreUsuario, descripcionResena, ResenaOConsulta= "Reseña" } = props;
    // agregué resenaOConsulta para que en cada resena haya que indicar si es una resena o una consulta general
    console.log('Props en CardConsulta:', props);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescripcion, setEditedDescripcion] = useState(props.descripcion);
    const idUserConsulta= props.usuario.id;
    const idConsulta = props.id;
    const {user} = useAuth();

    const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedDescripcion(props.descripcion); // Resetear al valor original al cancelar
  };

  const handleDescripcionChange = (e) => {
    setEditedDescripcion(e.target.value);
  };

  const handleSaveEdit = () => {
    if (!editedDescripcion.trim()) {
      alert('La descripción no puede estar vacía.');
      return;
    }
    mutate({ idConsulta, editedDescripcion }); 
    setIsEditing(false);
  };

const updateConsultaApi = async ({ idConsulta, editedDescripcion }) => {
  const consultaActualizada = {
    descripcion: editedDescripcion,
    usuario: props.usuario?.id,  
    inmueble: props.inmueble?.id,  
    respuesta: props.respuesta || "",
  };
  const response = await updateConsulta({ id: idConsulta, ...consultaActualizada });
  return response.data?.data ?? response.data;
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: updateConsultaApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['consultas']);
    },
    onError: (err) => {
      console.error('Error completo:', err);
      console.error('Respuesta del servidor:', err.response?.data);
    }
  });

    return(
    <>
    <CCard className="mb-3">
        <CCardBody>
         <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <CIcon size={'lg'} icon={cilUser} className="me-2 text-primary" />
            <strong>{props.usuario.nombre} {props.usuario.apellido}</strong>
          </div>
            {user?.id == idUserConsulta && props.respuesta === '' && 
            <CDropdown>
            <CDropdownToggle color="light" size="sm" className="border-0 bg-transparent">
              <CIcon icon={cilOptions} />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={handleEditToggle}>
                {isEditing ? 'Cancelar' : 'Editar'}
              </CDropdownItem>
            </CDropdownMenu>
            </CDropdown>
            }
        </div>
        {isEditing ? (
          <div>
            <CFormTextarea
              value={editedDescripcion}
              onChange={handleDescripcionChange}
              rows={4}
              className="mb-2"
            />
            <CButton color="primary" size="sm" onClick={handleSaveEdit}>
              Guardar
            </CButton>
          </div>
        ) : (
          <p>{props.descripcion}</p>
        )}
            {/* Respuesta a la consulta */}
        {props.respuesta && (
            <div className="mt-3 p-3 border rounded bg-light">
                <strong>Respuesta:</strong>
                <p className="mb-0">{props.respuesta}</p>
            </div>
        )}
        {isError && (
            <div className="alert alert-danger mb-3">
              Error al actualizar: {error?.response?.data?.message || error.message}
            </div>
          )}
            {/* Formulario para responder la consulta pero solo si es admin */}
        {user?.rol === 'admin' && <FormRtaConsulta props={props} user = {user} />}
        </CCardBody>
    </CCard>
    </>
    )
}