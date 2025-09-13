import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../../../components/Buscador.jsx';
import Lista from '../../../components/partsLists/Lista.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista.jsx';
import { useNavigate } from 'react-router-dom';

export function TipoServicio() {

  const PATH= 'http://localhost:3000/api/tipoServicios';
  const [tipoServicios, setTipoServicios] = useState([]);

    useEffect(() => {
    const getTipoServicios = async () => {
      try {
        const response = await axios.get(PATH);
        setTipoServicios(response.data.data);
      } catch (error) {
        console.error('Error fetching tipoServicios:', error);
      }
    };
    getTipoServicios();
  }, []);

  const deleteTipoServicio = async (id) => {
    try {
      await axios.delete(`${PATH}/${id}`);
      setTipoServicios((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting tipoServicio:', error);
    }
  };
  const navigate = useNavigate();
  const updateTipoServicio = (id) => {
    console.log('por modificar tiposervicio');
    navigate(`/updatetiposervicio/${id}`);
  };

  const handleAgregar= () =>{
    console.log('por agregar nuevo tiposervicio')
    navigate('/addtiposervicio')
  }

  return (
    <>
     <CContainer>
      <CRow className="mt-3  d-flex justify-content-center align-items-center">
        <CCol lg={6} sm={12}>
          <Buscador placeholder="Buscar por tipo de servicio" />
        </CCol>
        <CCol lg={2} sm={12} className="d-flex justify-content-end">
          <CButton color="primary" onClick={handleAgregar}>Agregar tipo de servicio</CButton>
        </CCol>
      </CRow>
      <EncabezadoLista columns={[
          { key: 'id', size: 1 },
          { key: 'nombre', size: 3 },
          { key: 'descripcion', size: 5 },
        ]}/>
      <Lista
        items={tipoServicios}
        onDelete={deleteTipoServicio}
        onEdit={updateTipoServicio}
        columns={[
          { key: 'id', size: 1 },
          { key: 'nombreTipoServicio', size: 3 },
          { key: 'descripcionTipoServicio', size: 5 },
        ]}
      />
    </CContainer>
    </>
  )
}
