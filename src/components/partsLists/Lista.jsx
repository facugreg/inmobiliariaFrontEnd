import { CContainer, CCol, CRow, CButton } from '@coreui/react';
//import { useState } from 'react';
import ListaItem from './ListaItem.jsx';

export default function Lista({
  items,
  onDelete,
  onEdit,
  columns,
  editText = 'Editar',
  deleteText = 'Eliminar',
}) {
  return (
    <>
      <CContainer
        className=" mt-3 border border-gray-300 rounded-2"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {items.map((item) => (
          <ListaItem key={item.id}>
            <CRow className="mt-2 justify-content-center ">
              {columns.map((col, index) => (
                <CCol
                  key={index}
                  lg={col.size || 3}
                  className="justify-content-center"
                >
                  {/*
                  Si la propiedad es un objeto, muestra solo .nombre
                  Si es primitiva, es decir no hace referencia a otro objeto muestra normal digamos
                  Si no existe, mostramos 'N/A'
                */}
                  {typeof item[col.key] === 'object' && item[col.key] !== null
                    ? item[col.key].nombre
                    : item[col.key] || 'N/A'}
                </CCol>
              ))}
              <CCol lg={1} className=" justify-content-center ">
                <CButton
                  onClick={() => onEdit(item.id)}
                  color="primary"
                  disabled={
                    item.estado === 'Aceptada' || item.estado === 'Rechazada'
                  }
                >
                  {editText}
                </CButton>
              </CCol>
              <CCol lg={1} className=" justify-content-center ">
                <CButton
                  onClick={() => onDelete(item.id)}
                  color="danger"
                  disabled={
                    item.estado === 'Aceptada' || item.estado === 'Rechazada'
                  }
                >
                  {deleteText}
                </CButton>
              </CCol>
            </CRow>
          </ListaItem>
        ))}
      </CContainer>
    </>
  );
}
