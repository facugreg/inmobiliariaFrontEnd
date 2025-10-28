import '@coreui/coreui/dist/css/coreui.min.css';
import {
  CContainer,
  CCarousel,
  CRow,
  CCol,
  CCarouselItem,
  CCard,
  CImage,
  CButton,
  CCardBody,
} from '@coreui/react';
import { DetalleInmueble } from '../../components/detalleInmueble.jsx';
import { CardConsulta } from '../../components/cards/CardConsulta.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import agente from '../../assets/agente.png';
import  casa  from '../../assets/casa.jpg';
import useInmueble from '../admin/inmueble/getInmueble.jsx';
import { FormConsulta } from '../../components/forms/FormConsulta.jsx';


export const Uninmueble = () => {
  const {id} = useParams(); // Obtener el ID desde los parámetros de la URL
  console.log(id);
  const { inmueble, loading, error} = useInmueble(id); // Uso del hook personalizado para obtener los datos del inmueble
  console.log(inmueble);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const navigate = useNavigate();

  const imagenesCarrusel = [
  agente, casa, agente, casa];

    const handleVolver = () => {
    navigate(-1); 
  };

if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!inmueble) {
    return <div>No se encontró el inmueble</div>;
  }
  
  //Logica para mostrar solo 3 opiniones o todas
  const opinionesMostradas = mostrarTodas
    ? inmueble.consultas
    : inmueble.consultas?.slice(0, 3);

  return (
    <>
    `<CContainer> 
      <CRow className="mt-3 mb-3 mx-5">
        <CCol lg={3}>
        <CButton onClick={handleVolver} color='primary' >
          Volver
        </CButton>
        </CCol>
      </CRow>
        {/*Carrusel imagenes del inmueble*/}
        <CRow className="justify-content-center">
          <CCol lg={11} md={11} sm={12}>
            <CCard className="mb-4">
            <CCarousel
              controls
              indicators
              interval={4000}
              style={{ height: '300px' }}
            >
              {imagenesCarrusel.map((imagen, index) => (
                <CCarouselItem key={index} style={{ height: '300px' }}>
                  <CImage
                    className="d-block w-100 h-100"
                    src={imagen}
                    style={{ objectFit: 'cover', height: '300px' }}
                  />
                </CCarouselItem>
              ))}
            </CCarousel>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

    {/*Detalle del inmueble*/}
        <CContainer className="mt-4">
          <CRow className="justify-content-center">
            <CCol lg={11} md={11} sm={12}>  
              <CRow>
                <DetalleInmueble 
                  inmueble={inmueble}
                />
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
          
        {/*Reseñas*/}
        <CContainer className="mt-4">
          <CRow className="justify-content-center">
            <CCol lg={8} md={8} sm={12}>
            <h4 className="mb-3">Opiniones</h4>
            {
              opinionesMostradas?.length > 0 ?(
                opinionesMostradas?.map(consulta => (
                  <CardConsulta key={consulta.id} props={consulta} />
                ))
              ) : (
                <CCard>
                  <CCardBody>
                  <p>Aún no hay opiniones sobre este inmueble</p>
                  </CCardBody>
                </CCard>
              )
                }
                {inmueble.consultas?.length > 3 && (
                  <CButton
                    color="secondary"
                    className="mt-2 mb-4"
                    onClick={() => setMostrarTodas(!mostrarTodas)}
                  >
                    {mostrarTodas ? 'Ver menos' : 'Ver todas las opiniones'}
                  </CButton>
                
            )}
            </CCol>
            
            {/*Formulario para dejar una consulta*/}
            <CCol lg={3} md={4} sm={12} className='mb-4'>
              <h5 className="mb-3">Comparti tu experiencia</h5>
              <FormConsulta 
              idInmueble = {inmueble.id}
              />
            </CCol>
          </CRow>
        </CContainer>
    </>
  );
};
