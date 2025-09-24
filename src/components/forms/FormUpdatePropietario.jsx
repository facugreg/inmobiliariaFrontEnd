// src/components/forms/FormUpdatePropietario.jsx
import { CButton, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePropietario from '../../pages/admin/propietario/getPropietario';


const updatePropietarioApi = async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:3000/api/propietarios/${id}`, formData);
  return response.data.data;
};

export function FormUpdatePropietario({ id }) {   
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ mailPropietario: '', telefonoPropietario: '' });
  const [showModal, setShowModal] = useState(false);

  const { propietario, isLoading } = usePropietario(id);

  useEffect(() => {
    if (propietario) {
      setFormData({
        mailPropietario: propietario.mailPropietario,
        telefonoPropietario: propietario.telefonoPropietario
      });
    }
  }, [propietario]);

  const { mutate, isError, error } = useMutation({
    mutationFn: updatePropietarioApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['propietarios']);
      setShowModal(true);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ id, formData }); 
  };

  if (isLoading) return <p>Cargando datos...</p>;

  return (
    <CCard className="p-3 w-100 bg-light">
      <CCardBody>
        <CCardTitle>Modificar Propietario</CCardTitle>
        <CForm onSubmit={handleSubmit} className="mt-3">
          <CRow>
            <CFormLabel>Mail</CFormLabel>
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
            <CFormLabel>Teléfono</CFormLabel>
            <CFormInput
              name="telefonoPropietario"
              placeholder="Teléfono del propietario"
              value={formData.telefonoPropietario}
              onChange={handleChange}
              className="mb-3"
              required
            />
          </CRow>
          {isError && <div className="text-danger mb-3">{error.message}</div>}
          <CRow className="justify-content-end">
            <CCol lg={1}>
              <CButton type="button" color="secondary" className="mt-3 mx-3" onClick={() => navigate('/propietarios')}>
                Cancelar
              </CButton>
            </CCol>
            <CCol lg={1}>
              <CButton type="submit" color="primary" className="mt-3 mx-3">
                Guardar
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader>
            <CModalTitle>Guardado exitoso</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="primary" onClick={() => navigate('/propietarios')}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
}
