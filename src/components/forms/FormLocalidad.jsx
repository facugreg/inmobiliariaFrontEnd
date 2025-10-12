import { CButton, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react';


export default function FormLocalidad({ onSubmit, onCancel, isSubmitting, error, setError, formData, setFormData , titulo}) {
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); //limpia el error
  };

  return (
    <CCard className= "p-3 w-100 bg-light">
      <CCardBody>
      <CCardTitle>
        {titulo}
      </CCardTitle>
        <CForm onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className= "mt-3">
        <CRow>
          <CFormLabel>
            Nombre*
          </CFormLabel>
          <CFormInput
            name="nombre"
            placeholder="Nombre de la localidad"
            value={formData.nombre}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel>
            Código Postal*
          </CFormLabel>
          <CFormInput
            name="codPostal"
            placeholder="Código Postal de la localidad"
            value={formData.codPostal}
            onChange={handleChange}
            className="mb-3"
            pattern="\d{4}"
            title="El codigo postal debe tener 4 dígitos"
            required
          />
        </CRow>
        {error && <div className="text-danger mb-3">{error}</div>}
        <CRow className='justify-content-end'>
          <CCol lg={1}>
          <CButton type='button' color='secondary' className='mt-3 mx-3' onClick={onCancel}>Cancelar</CButton>
          </CCol>
          <CCol lg={1}>
          <CButton type='submit' color='primary'className='mt-3 mx-3' disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar'}</CButton>
          </CCol>
        </CRow>
        </CForm>
        
      </CCardBody>
    </CCard>

  );
}