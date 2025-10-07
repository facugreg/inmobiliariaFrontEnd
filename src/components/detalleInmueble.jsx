import { CIcon } from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';
import { CCard, CCardBody, CCardTitle, CCol } from '@coreui/react';
export function DetalleInmueble ({inmueble}){
    console.log('detalleee',inmueble);
    if (!inmueble) {
    return <div>Cargando datos del inmueble...</div>;
  }
    return(
        <>
    {/*Tengo que armarlo bien para que muestre lo que corresponda*/}
    <CCol lg={8} md={7}>
    <CCard className="h-100">
    <CCardBody>
    <CCardTitle>{inmueble.direccionCalle && inmueble.direccionNumero && inmueble.localidad?.nombre
                ? `$ ${inmueble.precioDolar} - ${inmueble.direccionCalle}, ${inmueble.direccionNumero} - ${inmueble.localidad.nombre}`
                : 'Dirección no disponible'}</CCardTitle>
    <p><strong>Descripcion: </strong>{inmueble.descripcion || 'Sin descripción disponible'}</p>
    <p><strong>Fecha de construccion: </strong>{inmueble.fechaConstruccion || 'Sin descripción disponible'}</p>
    <p><strong>mtrs2: </strong>{inmueble.mtrs}</p>
    <p><strong>Requisitos: </strong>{inmueble.requisitos}</p>
    <p><strong>Balcon: </strong>{inmueble.balcon ? 'Si' : 'No'}</p>
    <p><strong>Ambientes: </strong>{inmueble.cantAmbientes}</p>
    <p><strong>Baños: </strong>{inmueble.cantBanios}</p>
    </CCardBody>
    </CCard>
    </CCol>
    <CCol lg={4} md={5}>
    <CCard className="h-100">
    <CCardBody>
    <CCardTitle>
    <CIcon icon={cilUser} className="me-2" /> 
    PROPIETARIO
    </CCardTitle>
    <div>
    <strong>Nombre:</strong> {inmueble.propietario?.nombrePropietario
                ? `${inmueble.propietario.nombrePropietario} ${inmueble.propietario.apellidoPropietario || ''}`
                : 'No especificado'}<br/>
    <strong>Teléfono:</strong> {inmueble.propietario?.telefonoPropietario || 'No especificado'}<br/>
    <strong>Email:</strong> {inmueble.propietario?.mailPropietario || 'No especificado'}
    </div>
    </CCardBody>
    </CCard>
    </CCol>
    </>
    )
}