import CIcon from '@coreui/icons-react';

import { cilSearch } from '@coreui/icons';
import '@coreui/coreui/dist/css/coreui.min.css';
import im from '../assets/im.png';
import agente from '../assets/agente.png';

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
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Item from '../components/ItemCarousel';
const MainLayout = () => {
  return (
    <>
      <CContainer fluid className="p-0">
        <Header />

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
          <CRow className="mt-3 justify-content-center w-100 g-0">
            <CCol lg={9}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  name="buscar"
                  placeholder="Ciudad, provincia, pais"
                  className="w-50"
                />
                <CFormSelect className="w-30 d-none d-md-block">
                  <option disabled hidden>
                    Tipo de inmueble
                  </option>
                  <option value="Departamento">Departamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Cochera">Cochera</option>
                  <option value="Terreno">Terreno</option>
                </CFormSelect>
                <CButton type="button" color="primary" className="w-20">
                  <CIcon icon={cilSearch} />
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CContainer>
        {/* <CRow style={{ backgroundColor: 'purple', minHeight: '50px' }}>
        <CCol></CCol>
      </CRow>*/}
        <CRow className=" mt-3 justify-content-center gx-0">
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
        </CRow>
        <Footer />
      </CContainer>
    </>
  );
};

export default MainLayout;
