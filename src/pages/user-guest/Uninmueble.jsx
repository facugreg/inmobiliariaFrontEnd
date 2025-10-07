import '@coreui/coreui/dist/css/coreui.min.css';
import { CardComprarAlquilar } from '../../components/cards/CardComprarAlquilar.jsx';
import {
  CContainer,
  CCarousel,
  CRow,
  CCol,
  CCarouselItem,
  CCard,
  CImage,
} from '@coreui/react';
import { Resenas } from '../../components/resenas.jsx'; 
import { DetalleInmueble } from '../../components/detalleInmueble.jsx';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paginacion } from '../../components/Paginacion.jsx';
import agente from '../../assets/agente.png';
import  casa  from '../../assets/casa.jpg';
import useInmueble from '../admin/inmueble/getInmueble.jsx';

export const Uninmueble = () => {
  const {id} = useParams(); // Obtener el ID desde los parámetros de la URL
  console.log(id);
  const { inmueble, loading, error} = useInmueble(id); // Usar el hook personalizado para obtener los datos del inmueble
  console.log(inmueble);
  
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = 3;

const imagenesCarrusel = [
  agente, casa, agente, casa];

const resenas = [
  {
    id: 1,
    nombreUsuario: "bruno",
    descripcionResena:"el departamento está mal ubicado y no posee los los elementos de cocina necesarios"
  },
  {
    id: 2,
    nombreUsuario: "pepe",
    descripcionResena:"el departamento está BIEN ubicado y tiene los los elementos de cocina necesarios"
  },
  {
    id: 3,
    nombreUsuario: "Lucas",
    ResenaOConsulta: "Consulta",
    descripcionResena:"¿Los pagos mensuales pueden ser por transferencia virtual?"
  }
  ];
if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!inmueble) {
    return <div>No se encontró el inmueble</div>;
  }
  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    console.log('Página cambiada a:', nuevaPagina);
  };

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
            <CCol lg={11} md={11} sm={12}>
            {resenas.map(resena => (<Resenas key={resena.id} props={resena}>
            </Resenas>))}
            </CCol>
          </CRow>
        </CContainer>

        <CContainer>
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={handleCambiarPagina}
        />
        </CContainer>
    </>
  );
};
