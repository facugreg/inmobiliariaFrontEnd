import { CIcon } from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';
import { CCard, CCardBody, CCardTitle, CCol } from '@coreui/react';
export function DetalleInmueble ({textoDescripcion, tituloDescripcion="DESCRIPCIÓN DETALLADA",
         nombrePropietario, telefonoPropietario, emailPropietario}){
    return(
        <>
    <CCol lg={8} md={7}>
    <CCard className="h-100">
    <CCardBody>
    <CCardTitle>{tituloDescripcion}</CCardTitle>
    <p>{textoDescripcion}</p>
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
    <strong>Nombre:</strong> {nombrePropietario}<br/>
    <strong>Teléfono:</strong> {telefonoPropietario}<br/>
    <strong>Email:</strong> {emailPropietario}
    </div>
    </CCardBody>
    </CCard>
    </CCol>
    </>
    )
}