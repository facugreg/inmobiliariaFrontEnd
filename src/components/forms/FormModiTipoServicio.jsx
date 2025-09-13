import { CButton, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export function FormModiTipoServicio(){
  const { id } = useParams(); // Obtiene el id de la ruta
  const [formData, setFormData] = useState({ nombreTipoServicio: '', descripcionTipoServicio: '' });
  const [error, setError] = useState(''); //estado para manejar errores
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [savedData, setSavedData] = useState(null); // Estado para los datos guardados
  console.log(error); //sino me tira error por no usarlo
  const navigate = useNavigate('');

  //carga los datos del tipo de servicio al montar el componente
  useEffect(() => {
    const fetchTipoServicio = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tipoServicios/${id}`);
        setFormData(response.data.data); // Ajusta según la estructura del backend
        console.log(response);
      } catch (error) {
        setError('Error al cargar el tipo de servicio.');
        console.error('Error:', error);
      }
    };
    fetchTipoServicio();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); //limpia el error
  };

  //conexion con el back
  const PATH= 'http://localhost:3000/api/tipoServicios';
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombreTipoServicio || !formData.descripcionTipoServicio) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await axios.put(`${PATH}/${id}`, formData);
      // Si el backend devuelve datos (ej. el nuevo id), puedes incluirlo
      const newTipoServicio = response.data.data || { ...formData, id: response.data.id };
      setSavedData(newTipoServicio); // Guardar datos para mostrar en el modal
      setShowModal(true); // Mostrar modal
      console.log('despues de guardar', newTipoServicio);
      //setFormData({ nombreTipoServicio: '', descripcionTipoServicio: '' }); // Limpiar formulario
    } catch (error) {
      setError('Error al guardar el tipo de servicio. Intente de nuevo.');
      console.error('Error:', error);
    }
  };

  const handleCancelar = () => {
    window.history.back(); // Regresa a la página anterior
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
    setSavedData(null); // Limpia los datos guardados
    navigate('/tiposervicios')
  };

  return (
    <CCard className= "p-3 w-100 bg-light">
      <CCardBody>
      <CCardTitle>
        Modificar tipo de servicio
      </CCardTitle>
        <CForm onSubmit={handleSubmit} className= "mt-3">
        <CRow>
          <CFormLabel>
            Nombre
          </CFormLabel>
          <CFormInput
            name="nombreTipoServicio"
            placeholder="Nombre del tipo de servicio"
            value={formData.nombreTipoServicio}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel>
            Descripcion
          </CFormLabel>
          <CFormInput
            name="descripcionTipoServicio"
            placeholder="Descripción del tipo de servicio"
            value={formData.descripcionTipoServicio}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        {error && <div className="text-danger mb-3">{error}</div>}
        <CRow className='justify-content-end'>
          <CCol lg={1}>
          <CButton type='button' color='secondary' className='mt-3 mx-3' onClick={handleCancelar}>Cancelar</CButton>
          </CCol>
          <CCol lg={1}>
          <CButton type='submit' color='primary'className='mt-3 mx-3'>Guardar</CButton>
          </CCol>
        </CRow>
        </CForm>
    
    {/* Modal de éxito */}
        <CModal visible={showModal} onClose={handleCloseModal}>
          <CModalHeader>
            <CModalTitle>Guardado exitoso</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Datos actualizados del tipo de servicio</p>
            <p><strong>• Nombre:</strong> {savedData?.nombreTipoServicio}</p>
            <p><strong>• Descripción:</strong> {savedData?.descripcionTipoServicio}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleCloseModal}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
}