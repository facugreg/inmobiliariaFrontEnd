import { CContainer, CCol, CRow, CButton } from '@coreui/react';
//import { useState } from 'react';
import ListaItem from './ListaItem';

export default function Lista({ items, onDelete, onEdit }) {
  //const [inmuebles, setInmuebles] = useState([]);
  return (
    <>
      <CContainer
        className="overflow-auto mt-3"
        style={{
          maxHeight: '400px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        {items.map((item) => (
          <ListaItem key={item.id}>
            <CRow className="mt-2">
              <CCol lg={3}>{item.id}</CCol>
              <CCol lg={3}>{item.mtrs}</CCol>
              <CCol lg={2}>{item.descripcion}</CCol>
              <CCol lg={2}>
                <CButton onClick={() => onEdit(item.id)} color="primary">
                  Editar
                </CButton>
              </CCol>
              <CCol>
                <CButton onClick={() => onDelete(item.id)} color="secondary">
                  Eliminar
                </CButton>
              </CCol>
            </CRow>
          </ListaItem>
        ))}
      </CContainer>
    </>
  );
}
