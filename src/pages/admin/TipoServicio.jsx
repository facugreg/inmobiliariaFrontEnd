import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import { Buscador } from '../../components/Buscador.jsx';
import { Filtro } from '../../components/Filtro.jsx';
import Lista from '../../components/partsLists/Lista.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { EncabezadoLista } from '../../components/partsLists/EncabezadoLista.jsx';

export function TipoServicio() {

  const PATH= 'http://localhost:3000/api/tipoServicios';
  const [tipoServicios, setTipoServicios] = useState([]);

  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
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
  const updateTipoServicio = () => {};

  // const navigate = useNavigate();
  const handleAgregar= () =>{
    console.log('por agregar nuevo tiposervicio')
    setShowForm(true); //Muestra el form al hacer click
  }
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(PATH, data); // Enviar datos al backend
      setTipoServicios((prev) => [...prev, response.data.data]); // Actualizar lista
      setShowForm(false); // Ocultar formulario después de guardar
    } catch (error) {
      console.error('Error creating tipoServicio:', error);
    }
  };

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
      {showForm && (
        <FormCrearTipoServicio onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
      )}
    </CContainer>
    </>
  )
}
