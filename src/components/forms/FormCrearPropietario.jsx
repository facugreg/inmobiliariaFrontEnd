
import { CButton, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


  const addPropietarioApi = async ({ formData }) => {
  const response = await axios.post(`http://localhost:3000/api/propietarios`, formData);
  return response.data.data;
  };

  export function FormCrearPropietario() {   
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({nombrePropietario: '', apellidoPropietario: '', mailPropietario: '', telefonoPropietario: '' });
  const [showModal, setShowModal] = useState(false);
  const [savedData, setSavedData] = useState({nombrePropietario: '', apellidoPropietario: '', mailPropietario: '', telefonoPropietario: '' })
  const { mutate, error } = useMutation({
    mutationFn: addPropietarioApi,
    onSuccess: ( data ) => {
      queryClient.invalidateQueries(['propietarios']);
      setSavedData(data);
      setShowModal(true);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ formData }); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCloseModal = () => {
    setShowModal(false)
    navigate('/propietarios'); 
  };
   const handleCancelar = () => {
    window.history.back();
  };


  return (
    <CCard className= "p-3 w-100 bg-light">
      <CCardBody>
      <CCardTitle>
        Nuevo Propietario
      </CCardTitle>
        <CForm onSubmit={handleSubmit} className= "mt-3">
        <CRow>
          <CFormLabel>
            Nombre*
          </CFormLabel>
          <CFormInput
            name="nombrePropietario"
            placeholder="Nombre del propietario"
            value={formData.nombrePropietario}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel>
            Apellido*
          </CFormLabel>
          <CFormInput
            name="apellidoPropietario"
            placeholder="Apellido del propietario"
            value={formData.apellidoPropietario}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel>
            Mail*
          </CFormLabel>
          <CFormInput
            name="mailPropietario"
            placeholder="Mail del propietario"
            value={formData.mailPropietario}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel>
            Teléfono*
          </CFormLabel>
          <CFormInput
            name="telefonoPropietario"
            placeholder="Teléfono del propietario"
            value={formData.telefonoPropietario}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        {error && (
            <div className="text-danger mb-3">
              {error.response?.data?.message || error.message}
            </div>
          )}
        <CRow className='justify-content-end'>
          <CCol lg={1}>
          <CButton type='button' color='secondary' className='mt-3 mx-3' onClick={handleCancelar}>Cancelar</CButton>
          </CCol>
          <CCol lg={1}>
          <CButton type='submit' color='primary'className='mt-3 mx-3'>Guardar</CButton>
          </CCol>
        </CRow>
        </CForm>
        <CModal visible={showModal} onClose={handleCloseModal}>
          <CModalHeader>
            <CModalTitle>Guardado exitoso</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Datos del nuevo Propietario</p>
            <p><strong>• Nombre:</strong> {savedData?.nombrePropietario}</p>
            <p><strong>• Apellido:</strong> {savedData?.apellidoPropietario}</p>
            <p><strong>• Email:</strong> {savedData?.mailPropietario}</p>
            <p><strong>• Telefono:</strong> {savedData?.telefonoPropietario}</p>
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





