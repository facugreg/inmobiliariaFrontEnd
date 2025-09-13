import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../components/Buscador.jsx';
import { Filtro } from '../components/Filtro.jsx';
import Lista from '../components/Lista.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function TipoServicio() {
  const PATH= 'http://localhost:3000/api/tipoServicios';
  const [tipoServicios, setTipoServicios] = useState([]);

    useEffect(() => {
    const getTipoServicios = async () => {
      const response = await axios.get(PATH);
      setTipoServicios(response.data.data);
    };
    getTipoServicios();
  }, []);

  const deleteTipoServicio = async (id) => {
    await axios.delete(`${PATH}/${id}`);
    setTipoServicios((prev) => prev.filter((item) => item.id !== id));
  };
  const updateTipoServicio = () => {};

  return (
    <>
     <CContainer>
      <CRow className="mt-3  d-flex justify-content-center align-items-center">
        <CCol lg={6} sm={12}>
          <Buscador placeholder="Buscar por tipo de servicio" />
        </CCol>
        <CCol lg={2} sm={12} className="d-flex justify-content-end">
          <CButton color="primary">Agregar tipo de servicio</CButton>
        </CCol>
      </CRow>
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
