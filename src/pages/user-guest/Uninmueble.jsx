import '@coreui/coreui/dist/css/coreui.min.css';
import {
  CContainer,
  CCarousel,
  CRow,
  CCol,
  CCarouselItem,
  CCard,
  CImage,
  CCardBody,
  CCardTitle,
} from '@coreui/react';
import { DetalleInmueble } from '../../components/detalleInmueble.jsx';
import { CardConsulta } from '../../components/cards/CardConsulta.jsx';
import { useParams } from 'react-router-dom';
import agente from '../../assets/agente.png';
import  casa  from '../../assets/casa.jpg';
import useInmueble from '../admin/inmueble/getInmueble.jsx';
import { FormConsulta } from '../../components/forms/FormConsulta.jsx';
//import { cibGmail, cilPhone, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export const Uninmueble = () => {
  const {id} = useParams(); // Obtener el ID desde los parámetros de la URL
  console.log(id);
  const { inmueble, loading, error} = useInmueble(id); // Usar el hook personalizado para obtener los datos del inmueble
  console.log(inmueble);

const imagenesCarrusel = [
  agente, casa, agente, casa];

if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!inmueble) {
    return <div>No se encontró el inmueble</div>;
  }

  return (
    <>
        <CContainer> 
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
            {inmueble.consultas?.map(consulta => (<CardConsulta key={consulta.id} props={consulta}>
            </CardConsulta>))}
            </CCol>
            <CCol lg={3} md={4} sm={12}>
              <h5 className="mb-3">Comparti tu experiencia</h5>
              <FormConsulta />

            </CCol>
          </CRow>
        </CContainer>
    </>
  );
};
