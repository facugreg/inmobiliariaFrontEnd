import { CContainer, CCol, CRow, CButton } from '@coreui/react';
//import { useState } from 'react';
import ListaItem from './ListaItem.jsx';

export default function Lista({ items, onDelete, onEdit, columns }) {
  return (
    <>
      <CContainer className="overflow-auto mt-3 border border-gray-300 rounded-2" style={{ maxHeight: '400px' }}>
      {items.map((item) => (
        <ListaItem key={item.id}>
          <CRow className="mt-2 text-left">
            {columns.map((col, index) => (
              <CCol key={index} lg={col.size || 3}>
                {item[col.key] || 'N/A'}
              </CCol>
            ))}
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
