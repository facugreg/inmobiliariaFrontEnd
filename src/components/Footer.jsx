import { cibFacebook, cibInstagram, cibTwitter } from '@coreui/icons';
import { CButton, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
export default function Footer() {
  return (
    <>
      <CRow
        className="d-flex justify-content-center gx-0"
        style={{ backgroundColor: 'lightgray' }}
      >
        <CCol xs={2} className="d-flex justify-content-center">
          <CButton>
            <CIcon icon={cibInstagram} />
          </CButton>
          <CButton>
            <CIcon icon={cibFacebook} />
          </CButton>

          <CButton>
            <CIcon icon={cibTwitter} />
          </CButton>
        </CCol>
      </CRow>
      <CRow
        className=" d-flex justify-content-center gx-0"
        style={{ backgroundColor: 'lightgray' }}
      >
        <CCol xs={12} className="text-center">
          <small>©2025 Nombre - Todos los derechos reservados</small>
        </CCol>
        <CCol xs={12} className="text-center">
          <small>Terminos y condiciones</small>
        </CCol>
      </CRow>
    </>
  );
}
