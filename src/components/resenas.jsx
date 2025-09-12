import { CIcon } from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';
import { CCard, CCardBody } from '@coreui/react';
export function Resenas ( {props} ){
    const { nombreUsuario, descripcionResena, ResenaOConsulta= "Reseña" } = props;
    // agregué resenaOConsulta para que en cada resena haya que indicar si es una resena o una consulta general
    return(
    <>
    <h4 className="mb-3">{ResenaOConsulta}</h4>
    <CCard className="mb-3">
        <CCardBody>
        <div className="d-flex align-items-center mb-2">
            <CIcon icon={cilUser} className="me-2" />
            <strong>{nombreUsuario}</strong>
        </div>
        <p>{descripcionResena}</p>
        </CCardBody>
    </CCard>
    </>
    )
}