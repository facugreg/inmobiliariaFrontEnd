import {
  CRow,
  CCard,
  CCol,
  CImage,
  CCardBody,
  CCardTitle,
  CButton,
} from '@coreui/react';
import agente from '../../assets/agente.png';

export default function Card({ title, text, button }) {
  return (
    <CCol lg={3} sm={3}>
      <CCard>
        <CRow>
          <CImage src={agente} />
        </CRow>
        <CRow className="mt-1">
          <CCardTitle className="text-center">{title}</CCardTitle>
        </CRow>
        <CRow>
          <CCardBody className="d-flex flex-column justify-content-between text-center">
            <p>{text}</p>
            <CButton color="primary">{button} </CButton>
          </CCardBody>
        </CRow>
      </CCard>
    </CCol>
  );
}
