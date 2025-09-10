import { CContainer, CRow, CCol, CButton } from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css';
import Lista from '../components/Lista.jsx';
import Header from '../components/Header.jsx';
import { Buscador } from '../components/Buscador.jsx';
import { Filtro } from '../components/Filtro.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const Inmuebles = () => {
  const [tipoInmueble, setTipoInmueble] = useState('');
  const onChangeEstado = (e) => {
    setTipoInmueble(e.target.value);
  };
  const opcionesTipoInmueble = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Cochera', label: 'Cochera' },
    { value: 'Departamento', label: 'Departamento' },
    { value: 'Terreno', label: 'Terreno' },
  ];
  /*const items = [
    { direccion: 'Mendoza 1492', servicio: 'Alquiler', estado: 'Activo' },
    { direccion: 'Mendoza 1492', servicio: 'Alquiler', estado: 'Activo' },
  ];*/
  const navItems = [
    {
      direccion: '#',
      nombre: 'Solicitudes de visitas',
    },
    { direccion: '#', nombre: 'Inmuebles' },
  ];

  const [inmuebles, setInmuebles] = useState([]);
  const deleteInmueble = async (id) => {
    await axios.delete(`http://localhost:3000/api/inmuebles/${id}`);
    setInmuebles((prev) => prev.filter((item) => item.id !== id));
  };
  const updateInmueble = () => {};

  useEffect(() => {
    const getInmuebles = async () => {
      const response = await axios.get('http://localhost:3000/api/inmuebles');
      setInmuebles(response.data.data);
    };
    getInmuebles();
  }, []);

  return (
    <>
      <CContainer fluid className="p-0">
        <Header navItems={navItems} />
        <CContainer>
          <CRow className="mt-3  d-flex justify-content-center align-items-center">
            <CCol lg={6} sm={12}>
              <Buscador placeholder="Buscar por direccion de inmueble" />
            </CCol>
            <CCol lg={4} sm={12}>
              <Filtro
                label="Tipo de inmueble"
                opciones={opcionesTipoInmueble}
                onChange={onChangeEstado}
                value={tipoInmueble}
              />
            </CCol>
            <CCol lg={2} sm={12} className="d-flex justify-content-end">
              <CButton color="primary">Agregar inmueble</CButton>
            </CCol>
          </CRow>
          <Lista
            items={inmuebles}
            onDelete={deleteInmueble}
            onEdit={updateInmueble}
          />
        </CContainer>
      </CContainer>
    </>
  );
};
export default Inmuebles;
