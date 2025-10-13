import { CCol, CButton, CContainer, CRow, CCard, CCardBody } from '@coreui/react';
import { CardConsulta } from '../../../components/cards/CardConsulta';
import useConsultas from './getConsultas';
import { useNavigate } from 'react-router-dom';

export default function Consultas() {
  const { consultas, isLoading, isError, error } = useConsultas();
  const navigate = useNavigate();
  if (isLoading) {
    return <p>Cargando consultas...</p>;
  }

  if (isError) {
    return <p>Error al cargar consultas: {error.message}</p>;
  }
const handleVerMas = (unInmuebleid) => {
    navigate(`/uninmueble/${unInmuebleid}`);
  };
  return (
    <>
      <CContainer className='pb-4'>
        <CRow className="mt-3 d-flex justify-content-center align-items-center">
          <h2>Consultas sin responder</h2>
        </CRow>
        <CContainer className="mt-4">
          <CRow className="justify-content-center">
            <CCol sm={12} md={10} lg={10} xl={9}>
            {
              consultas?.length > 0 ?(
                consultas.map(consulta => (
                <div key={consulta.id} className="mb-3">
                    <CardConsulta props={consulta} />
                    <CButton 
                    onClick={() => handleVerMas(consulta.inmueble)} 
                    color="primary" 
                    size="sm" 
                    className="mt-2"
                    >
                    ver mas del inmueble
                    </CButton>
                </div>
                ))
              ) : (
                <CCard>
                  <CCardBody>
                  <p>Aún no hay consultas sin responder</p>
                  </CCardBody>
                </CCard>
              )
                }
            </CCol>
          </CRow>
        </CContainer>
      </CContainer>
    </>
  );
}

