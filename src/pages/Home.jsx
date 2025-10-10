import '@coreui/coreui/dist/css/coreui.min.css';
import im from '../assets/im.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Buscador } from '../components/Buscador.jsx';

const opcionesInmueble = [
  { value: 'Departamento', label: 'Departamento' },
  { value: 'Casa', label: 'Casa' },
  { value: 'Cochera', label: 'Cochera' },
  { value: 'Terreno', label: 'Terreno' },
];

const Home = () => {
  const navigate = useNavigate();
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
            minHeight: '300px',
          }}
        >
          <CRow className=" d-flex justify-content-center w-100">
            <CCol sm={3} lg={'auto'} className="text-center mb-2">
              <CButton color="light" onClick={() => navigate('/comprar')}>Comprar</CButton>
            </CCol>
            <CCol lg={'auto'} sm={3} className="text-center mb-2">
              <CButton color="light" onClick={() => navigate('/alquilar')}>Alquilar</CButton>
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

        <CContainer fluid className="bg-violet-500 bg-opacity-90"
        style={{
          backgroundColor: 'rgba(72, 10, 72, 0.1)', // Color violeta con opacidad del 10%
        }}
        >
          <CRow className="justify-content-center">
            <CCol lg={9} sm={9}>
              <h2 className="mt-2 text-center">¿Quiénes somos?</h2>
              <div>
                <p className="text-center">
                  Somos <span className="text-primary"><b>Hogar Urbano Servicios Inmobiliarios</b></span> y hace 5 años 
                  trabajamos con un claro objetivo: brindarle a todos y 
                  cada uno de nuestros clientes un servicio integral de asesoramiento 
                  en materia de operaciones inmobiliarias con la intención de que éstas 
                  sean sólidas, rentables y con proyección de futuro. 
                  </p>
                  <p className="text-center">
                  Sabemos que los grandes proyectos se alcanzan solo con un buen trabajo en equipo. 
                  Bienvenido a ser parte de nuestra amplia red de profesionales y 
                  amigos que hacemos de esta experiencia algo más que un negocio inmobiliario. 
                </p>
                <p className="text-center font-italic text-primary">
                 <b>«Juntos hacemos la diferencia»</b>
                </p>
              </div>
      
              <hr className="border-black my-4" />
      
              <h2 className="mt-2 text-center">¿Por qué elegirnos?</h2>
              <CRow>
                <p className="text-center">Te acompañamos en el proceso de tu inversión inmobiliaria</p>
              </CRow>
              <CRow>
                <CCol lg={4} sm={12} className="text-center mb-3">
                  <CCard className='h-100 bg-light' >
                    <CCardTitle className='mt-2'>Te asesoramos en tu elección</CCardTitle>
                    <CCardBody> <p>Atendemos tu consulta, 
                    te ayudamos a encontrar lo que buscás 
                    ¡Queremos que disfrutes todo el proceso de búsqueda y concreción!
                  </p></CCardBody>
                  </CCard>
                </CCol>
                <CCol lg={4} sm={12} className="text-center mb-3">
                  <CCard className='h-100 bg-light'>
                    <CCardTitle className='mt-2'>
                      Te acompañamos en el proceso
                      </CCardTitle>
                      <CCardBody>
                  <p>Te cuidamos en aspectos legales, te
                  asesoramos en el mercado, te
                  acompañamos desde el inicio hasta
                  la posventa.</p>
                      </CCardBody>
                    </CCard>

                </CCol>
                <CCol lg={4} sm={12} className="text-center mb-3">
                  <CCard className='h-100 bg-light'>
                  <CCardTitle className='mt-2'>Seguimos con vos</CCardTitle>
                  <CCardBody>
                  <p>Administramos tu inmueble con
                    nuestros departamentos de alquiler
                    anual y temporario y administración de consorcio 
                    para cuidar tu inversión.</p>
                  </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow className="d-flex justify-content-center mb-3">
                <CCol className="text-center">
                  <CButton color="primary" onClick={() => navigate('/comprar')}>Ver todas las propiedades</CButton>
                </CCol>
                
                
              </CRow>
              </CCol>
          </CRow>
        </CContainer>
    </>
  );
};

export default Home;
