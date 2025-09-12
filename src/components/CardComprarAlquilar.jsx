import React from 'react';
import {
  CRow,
  CCard,
  CCol,
  CImage,
  CCardBody,
  CButton,
  CCardText,
  CModalFooter, CModal, CModalHeader, CModalTitle, CModalBody
} from '@coreui/react';
import casa from '../assets/casa.jpg';
import CIcon from '@coreui/icons-react';
import { cilBorderOuter, cilCalendar, cilList } from '@coreui/icons';
import { useState } from 'react';
import { FormSolicitudVisita } from './FormSolicitudVisita';

export function CardComprarAlquilar({ precio, direccion, mts2, descripcion, antiguedad, requisitos }) {
    const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setModalVisible(false); 
  };
  return (
    <>
    <CCard className ="mb-3">
        <CRow className= "g-0">
          {/* Imagen a la izquierda */}
          <CCol xs={12} md={4}>
            <CImage
              src={casa}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </CCol>
          {/* Contenido a la derecha */}
          <CCol xs={12} md={8}>
          <CCardBody className="d-flex flex-column justify-content-between text-center">
          <CCardText align="left">
            <h3 className="fw-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px' }}>{precio}</h3>
            <p className="mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}>{direccion}</p>
            <p className="mb-1">
              <CIcon icon ={cilBorderOuter} className="me-2 text-primary" ></CIcon>
              <strong>Metros²:</strong> {mts2}   
              <CIcon icon={cilCalendar} className="ms-4 me-2 text-primary"></CIcon>
              <strong>Antigüedad: </strong>{  antiguedad}</p>
            <p>{descripcion}</p>
            <small className="text-muted">
              <CIcon icon= {cilList} className="me-2 text-primary" ></CIcon>
              <strong>Requisitos:</strong> {requisitos}</small><br />
          </CCardText>
            <CButton color="primary" onClick={() => setModalVisible(true)}> Solicitar visita </CButton>
          </CCardBody>  
          </CCol>
        </CRow>
      </CCard>

      {/* Modal with Form */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Solicitar Visita</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormSolicitudVisita onSubmit = {handleSubmit}/>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" type="submit" form="visita-form">
            Enviar Solicitud
          </CButton>
        </CModalFooter>
      </CModal>

  </>
  );
}