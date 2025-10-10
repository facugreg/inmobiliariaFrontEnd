import {
  CRow,
  CCard,
  CCol,
  CImage,
  CCardBody,
  CButton,
  CCardText,
} from '@coreui/react';
import casa from '../../assets/casa.jpg';
import CIcon from '@coreui/icons-react';
import { cilBorderOuter, cilCalendar, cilList } from '@coreui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSolicitudVista from '../forms/FormSolicitudVisita';


export function CardComprarAlquilar({inmueble}) {
  //useStates
  const [modalVisible, setModalVisible] = useState(false);
  
  const navigate = useNavigate();
  
  const handleVerMas = () => {
    navigate(`/uninmueble/${inmueble.id}`);
  };
function calcularAntiguedad(fechaConstruccion) {
if (!fechaConstruccion) return 'N/A';
const anio = new Date(fechaConstruccion).getFullYear();
const antiguedad = new Date().getFullYear() - anio;
return `${antiguedad} años`;
}

return (
    <>
      <CCard className="mb-3">
        <CRow className="g-0">
          {/* Imagen a la izquierda */}
          <CCol xs={12} md={4}>
            <CImage
              src={casa}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
              onClick={handleVerMas}
              />
          </CCol>
          {/* Contenido a la derecha */}
          <CCol xs={12} md={8}>
            <CCardBody className="d-flex flex-column justify-content-between text-center">
              <CCardText align="left">
                <h3
                  className="fw-bold"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '24px',
                  }}
                  >
                  {inmueble.precioDolar}
                </h3>
                <p
                  className="mb-1"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                  }}
                  >
                {inmueble.tipo} en <strong>{inmueble.direccionCalle}{inmueble.direccionNumero}</strong>
                </p>
                <p className="mb-1">
                  <CIcon
                    icon={cilBorderOuter}
                    className="me-2 text-primary"
                    ></CIcon>
                  <strong>Metros²:</strong> {inmueble.mtrs}
                  <CIcon
                    icon={cilCalendar}
                    className="ms-4 me-2 text-primary"
                    ></CIcon>
                  <strong>Antigüedad: </strong>
                  {calcularAntiguedad(inmueble.fechaConstruccion)}
                </p>
                <p>{inmueble.descripcion}</p>
                <small className="text-muted">
                  <CIcon icon={cilList} className="me-2 text-primary"></CIcon>
                  <strong>Requisitos:</strong> {inmueble.requisitos}
                </small>
                <br />
              </CCardText>
              <CRow className="mb-3">
                <CCol lg={6} className="d-flex justify-content-center">
                  <CButton
                    color="primary"
                    onClick={() => setModalVisible(true)}
                    className="w-100 px-4 mt-2"
                    >
                    {' '}
                    Solicitar visita{' '}
                  </CButton>
                </CCol>
                <CCol lg={6} className="d-flex justify-content-center">
                  <CButton
                    color="primary"
                    className="w-100 px-4 mt-2"
                    onClick={handleVerMas}
                    >
                    {' '}
                    Ver mas{' '}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
      <FormSolicitudVista
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        idInmueble={inmueble.id}
        initialData={null}
        />
    </>
  );
}


