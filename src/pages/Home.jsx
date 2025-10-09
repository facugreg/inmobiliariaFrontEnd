import CIcon from '@coreui/icons-react';
import '@coreui/coreui/dist/css/coreui.min.css';
import im from '../assets/im.png';
//import agente from '../assets/agente.png';
import { useState } from 'react';
import {
  CContainer,
  CCarousel,
  CButton,
  CRow,
  CCol,
  CCarouselItem,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CImage,
} from '@coreui/react';
//import Card from '../components/cards/Card.jsx';
import { Buscador } from '../components/Buscador.jsx';
import { CardComprarAlquilar } from '../components/cards/CardComprarAlquilar.jsx';

const opcionesInmueble = [
  { value: 'Departamento', label: 'Departamento' },
  { value: 'Casa', label: 'Casa' },
  { value: 'Cochera', label: 'Cochera' },
  { value: 'Terreno', label: 'Terreno' },
];

const Home = () => {
  const [filtroBuscador, setFiltroBuscador] = useState('');

  const handleFiltroBuscadorChange = (e) => {
    setFiltroBuscador(e.target.value);
    console.log('Filtro del buscador:', e.target.value);
  };
  return (
    <>
        <CContainer
          fluid
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{
            backgroundImage: `url(${im})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
          }}
        >
          <CRow className=" d-flex justify-content-center w-100">
            <CCol sm={3} lg={'auto'} className="text-center mb-2">
              <CButton color="light">Comprar</CButton>
            </CCol>
            <CCol lg={'auto'} sm={3} className="text-center mb-2">
              <CButton color="light">Alquiler</CButton>
            </CCol>
            <CCol lg={'auto'} sm={3} className="text-center mb-2">
              <CButton color="light">Alquiler temporal</CButton>
            </CCol>
          </CRow>
          <CRow className="mt-3 justify-content-center w-100">
            <CCol lg={9} className="d-flex justify-content-center">
              <Buscador
                onSearch={() => alert('Buscar inmueble')}
                mostrarFiltro={true}
                placeholder="Ciudad, provincia, país"
                filtroOpciones={opcionesInmueble}
                filtroValue={filtroBuscador}
                filtroOnChange={handleFiltroBuscadorChange}
              />
            </CCol>
          </CRow>
        </CContainer>
{/* 
        <CRow className=" mt-3 justify-content-center gx-0">
          <CCol lg={9} sm={9}>
            <CCarousel
              controls
              indicators
              style={{ height: '300px' }}
            >
              <CCarouselItem>
                <CardComprarAlquilar
                            precio="$150.000"
                            direccion="Calle Falsa 123"
                            mts2="85"
                            descripcion="Departamento luminoso con vista al parque"
                            antiguedad="5 años"
                            requisitos="Comprobante de ingresos y referencias"
              />
              </CCarouselItem>
              <CCarouselItem>
                <CardComprarAlquilar
                  precio="$200.000"
                  direccion="Avenida Siempre Viva 742"
                  mts2="120"
                  descripcion="Casa familiar con jardín y piscina"
                  antiguedad="10 años"
                  requisitos="Comprobante de ingresos y referencias"
                />
              </CCarouselItem>
              <CCarouselItem>
                <CardComprarAlquilar
                  precio="$100.000"
                  direccion="Boulevard de los Sueños Rotos 456"
                  mts2="60"
                  descripcion="Departamento moderno en el centro de la ciudad"
                  antiguedad="2 años"
                  requisitos="Comprobante de ingresos y referencias"
                />
              </CCarouselItem>
            </CCarousel>
          </CCol>
        </CRow> */}

        {/* <CRow className=" mt-3 justify-content-center gx-0">
          <CCol lg={9} sm={9}>
            <CCard>
              <CRow className="g-0">
                <CCol lg={4} sm={12}>
                  <CCardBody>
                    <CCardTitle>unTitulo</CCardTitle>
                    <CCardText>
                      Este no es solo un inmueble, es una inversión en tu estilo
                      de vida. Un diseño inteligente, acabados premium y una
                      ubicación estratégica que eleva tu día a día. Descubre la
                      comodidad, la funcionalidad y la elegancia en un solo
                      lugar. La vida moderna te espera.
                    </CCardText>
                    <CButton color="primary">Ver propiedades</CButton>
                  </CCardBody>
                </CCol>
                <CCol lg={8} sm={12}>
                  <CRow>
                    <CCol>
                      <CCarousel
                        controls
                        indicators
                        style={{ height: '300px' }}
                      >
                        <CCarouselItem>
                          <CImage
                            className="d-block  w-100 "
                            src={agente}
                            style={{ objectFit: 'cover', height: '300px' }}
                          />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage
                            className="d-block w-100 "
                            src={agente}
                            style={{ objectFit: 'cover', height: '300px' }}
                          />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage
                            className="d-block w-100 "
                            src={agente}
                            style={{ objectFit: 'cover', height: '300px' }}
                          />
                        </CCarouselItem>
                      </CCarousel>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="mt-4 d-flex justify-content-center gx-0">
          <Card
            title=" Conoce nuestra ubicacion y la de nuestros inmuebles"
            text="uN TEXTO CUALQUIERA"
            button="Ver mapa"
          />
          <Card
            title=" Conoce nuestra ubicacion y la de nuestros inmuebles"
            text="uN TEXTO CUALQUIERA"
            button="Ver mapa"
          />
          <Card
            title=" Conoce nuestra ubicacion y la de nuestros inmuebles"
            text="uN TEXTO CUALQUIERA"
            button="Ver mapa"
          />
        </CRow> */}
    </>
  );
};

export default Home;
