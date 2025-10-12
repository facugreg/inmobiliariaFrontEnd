import { CIcon } from '@coreui/icons-react';
import { cilOptions, cilUser } from '@coreui/icons';
import { CButton, CCard, CCardBody, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormTextarea, CInputGroup } from '@coreui/react';
import React, { useState } from 'react';
import { FormRtaConsulta } from '../forms/FormRtaConsulta.jsx';
export function CardConsulta ( {props} ){
    // const { nombreUsuario, descripcionResena, ResenaOConsulta= "Reseña" } = props;
    // agregué resenaOConsulta para que en cada resena haya que indicar si es una resena o una consulta general
    console.log('Props en CardConsulta:', props);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescripcion, setEditedDescripcion] = useState(props.descripcion);
    // const [respuesta, setRespuesta] = useState('');
    // const [respuestaError, setRespuestaError] = useState('');

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
    // Aquí iría la lógica para guardar la edición (ej: axios.patch)
    console.log('Guardando edición:', editedDescripcion);
    setIsEditing(false);
  };

//   const handleRespuestaChange = (e) => {
//     setRespuesta(e.target.value);
//     if (respuestaError) setRespuestaError(''); // Limpiar error al escribir
//   };

//   const handleRespuestaSubmit = (e) => {
//     e.preventDefault();
//     if (!respuesta.trim()) {
//       setRespuestaError('La respuesta no puede estar vacía.');
//       return;
//     }
//     // Aquí iría la lógica para enviar la respuesta (ej: axios.post)
//     console.log('Enviando respuesta:', respuesta);
//     setRespuesta('');
//   };

    return(
    <>
    <CCard className="mb-3">
        <CCardBody>
         <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <CIcon size={'lg'} icon={cilUser} className="me-2 text-primary" />
            <strong>{props.usuario.nombre} {props.usuario.apellido}</strong>
          </div>
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
            {/* Formulario para responder la consulta */}
        <FormRtaConsulta props={props}/>
        </CCardBody>
    </CCard>
    </>
    )
}