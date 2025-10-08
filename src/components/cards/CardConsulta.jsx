import { CIcon } from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';
import { CCard, CCardBody } from '@coreui/react';
export function CardConsulta ( {props} ){
    // const { nombreUsuario, descripcionResena, ResenaOConsulta= "Reseña" } = props;
    // agregué resenaOConsulta para que en cada resena haya que indicar si es una resena o una consulta general
    return(
    <>
    <CCard className="mb-3">
        <CCardBody>
        <div className="d-flex align-items-center mb-2">
            <CIcon size={'lg'} icon={cilUser} className="me-2 text-primary" />
            <strong>{props.usuario.nombre} {props.usuario.apellido}</strong>
        </div>
        <p>{props.descripcion}</p>
        </CCardBody>
    </CCard>
    </>
    )
}