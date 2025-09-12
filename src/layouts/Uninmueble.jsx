import '@coreui/coreui/dist/css/coreui.min.css';
import { CardComprarAlquilar } from '../components/CardComprarAlquilar.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import {
  CContainer,
  CCarousel,
  CRow,
  CCol,
  CCarouselItem,
  CCard,
  CImage,
} from '@coreui/react';
import { Resenas } from '../components/resenas.jsx'; 
import { DetalleInmueble } from '../components/detalleInmueble.jsx';
import { useState } from 'react';
import { Paginacion } from '../components/Paginacion.jsx';
import agente from '../assets/agente.png';
import  casa  from '../assets/casa.jpg';

export const Uninmueble = () => {
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

  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    console.log('Página cambiada a:', nuevaPagina);
  };

  return (
    <>
      <CContainer fluid className="p-0">
        <Header userType='guest' />
        <CContainer
          fluid
          className="d-flex flex-column justify-content-center align-items-center p-5"
        >
          <CCol lg={9} md={10} sm={12} className="d-flex flex-wrap justify-content-center">
            <CardComprarAlquilar
              precio="$150.000"
              direccion="Calle Falsa 123"
              mts2="85"
              descripcion="Departamento luminoso con vista al parque"
              antiguedad="5 años"
              requisitos="Comprobante de ingresos y referencias"
            />
          </CCol>
        </CContainer>
        <CContainer> 
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
          
        <CContainer className="mt-4">
          <CRow className="justify-content-center">
            <CCol lg={11} md={11} sm={12}>  
              <CRow>
                <DetalleInmueble 
                  textoDescripcion="acá va la descripción completaaa del inmueble...." 
                  tituloDescripcion="DESCRIPCIÓN DETALLADA"
                  nombrePropietario="Juan Pérez"
                  telefonoPropietario="3482609045"
                  emailPropietario="pepe@gmail.com"
                />
              </CRow>
            </CCol>
          </CRow>
        </CContainer>

        <CContainer className="mt-4">
          <CRow className="justify-content-center">
            <CCol lg={11} md={11} sm={12}>
            {resenas.map(resena => (<Resenas key={resena.id} props={resena}>
            </Resenas>))}
            </CCol>
          </CRow>
        </CContainer>

        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={handleCambiarPagina}
        />

        <Footer />
      </CContainer>
    </>
  );
};
