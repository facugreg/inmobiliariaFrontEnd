import { CIcon } from '@coreui/icons-react';
import { cilUser, cilBorderOuter, cilCalendar, cilList, cilBed, cilBath, cilFlower, cilBasket, cilPhone, cibGmail, cilHome, cilCash, cilGrid, cilGlobeAlt, cilGarage, cilTruck } from '@coreui/icons';
import { CCard, CCardBody, CCardTitle, CCol } from '@coreui/react';
export function DetalleInmueble ({inmueble}){
    if (!inmueble) {
    return <div>Cargando datos del inmueble...</div>;
  }
    return(
        <>
    {/*Tengo que armarlo bien para que muestre lo que corresponda*/}
    <CCol lg={8} md={7}>
    <CCard className="h-100">
    <CCardBody>
    <CCardTitle>
      <strong>
        {inmueble.direccionCalle && inmueble.direccionNumero && inmueble.localidad?.nombre
                ? `$ ${inmueble.precioDolar} - ${inmueble.direccionCalle} ${inmueble.direccionNumero} , ${inmueble.localidad.nombre}`
                : 'Dirección no disponible'}
        </strong>
    </CCardTitle>
    <p>{inmueble.descripcion || 'Sin descripción disponible'}</p>
   <p><CIcon
          icon={cilBorderOuter}
          className="me-2 text-primary"
        ></CIcon>
        <strong>Metros²:</strong>{inmueble.mtrs}
        <CIcon
          icon={cilCalendar}
          className="ms-4 me-2 text-primary"
        ></CIcon>
        <strong>Antigüedad: </strong>{new Date().getFullYear() - new Date(inmueble.fechaConstruccion).getFullYear()}

      </p>
    <p>
      <CIcon icon={cilList} className="me-2 text-primary"></CIcon>
      <strong>Requisitos: </strong>{inmueble.requisitos}
    </p>
    {
      inmueble.tipo === 'casa' && (
        <>
        <p> <CIcon icon= {cilBed} className="me-2 text-primary" ></CIcon>
          <strong>Ambientes: </strong>{inmueble.cantAmbientes}
          <CIcon icon = {cilBath}className="ms-4 me-2 text-primary"></CIcon>
        <strong>Baños: </strong>{inmueble.cantBanios}
          <CIcon icon = {cilFlower}className="ms-4 me-2 text-primary"></CIcon>
        <strong>Patio: </strong>{inmueble.patio ? 'Si' : 'No'}
          <CIcon icon = {cilBasket}className="ms-4 me-2 text-primary"></CIcon>
        <strong>Balcon: </strong>{inmueble.balcon ? 'Si' : 'No'}
          </p>
        </>
      )}
      {
      inmueble.tipo === 'departamento' && (
        <>
        <p>
          <CIcon icon= {cilBed} className="me-2 text-primary" ></CIcon>
        <strong>Ambientes: </strong>{inmueble.cantAmbientes}
          <CIcon icon = {cilBath}className="ms-4 me-2 text-primary"></CIcon>
        <strong>Baños: </strong>{inmueble.cantBanios}
          <CIcon icon = {cilBasket}className="ms-4 me-2 text-primary"></CIcon>
        <strong>Balcon: </strong>{inmueble.balcon ? 'Si' : 'No'}
        </p>
        <p>
          <CIcon icon= {cilHome} className="me-2 text-primary" ></CIcon>
        <strong>Piso: </strong>{inmueble.piso}
        <strong className='ms-4'>Departamento: </strong>{inmueble.depto}
        <CIcon icon= {cilCash}className="ms-4 me-2 text-primary" ></CIcon>
        <strong>precioExpensas: </strong>{inmueble.precioExpensas}
        </p>
        </>
      )
    }
    { inmueble.tipo === 'terreno' && (
      <>
      <p>
        <CIcon icon={cilGrid} className='me-2 text-primary'></CIcon>
      <strong>Nro parcela: </strong>{inmueble.nroParcela}
      <CIcon icon={cilGlobeAlt} className='ms-4 me-2 text-primary'></CIcon>
      <strong>Zonificacion: </strong>{inmueble.zonificacion}</p>
      </>
    )}
    {
      inmueble.tipo === 'cochera' && (
        <>
        <p>
          <CIcon icon= {cilGarage} className='me-2 text-primary' ></CIcon>
        <strong>Techo: </strong>{inmueble.techo ? 'Si': 'No'}
        <CIcon icon={cilTruck} className='ms-4 me-2 text-primary'></CIcon>
        <strong>Tipo de vehiculo: </strong>{inmueble.tipoVehiculo}</p>
        </>
      )
    }
    </CCardBody>
    </CCard>
    </CCol>
    <CCol lg={4} md={5}>
    <CCard className="h-100">
    <CCardBody>
    <CCardTitle>
    PROPIETARIO
    </CCardTitle>
    <div>
    <CIcon icon={cilUser} className="me-2 text-primary" /> 
    {inmueble.propietario?.nombrePropietario
                ? `${inmueble.propietario.nombrePropietario} ${inmueble.propietario.apellidoPropietario || ''}`
                : 'No especificado'}<br/>
    <CIcon icon = {cilPhone} className="me-2 text-primary"></CIcon>
    {inmueble.propietario?.telefonoPropietario || 'No especificado'}<br/>
    <CIcon icon= {cibGmail} className="me-2 text-primary"></CIcon>
    {inmueble.propietario?.mailPropietario || 'No especificado'}
    </div>
    <div className='mt-4'>
      Para información más detallada, contáctese con el propietario.
    </div>
    </CCardBody>
    </CCard>
    </CCol>
    </>
    )
}