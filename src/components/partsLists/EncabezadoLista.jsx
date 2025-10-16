import { CContainer, CCol, CRow } from '@coreui/react';

export function EncabezadoLista({ columns }) {
  console.log(columns);
  return (
    <>
      <CContainer className="mt-3 border-top border-gray-300 rounded-2">
        <CRow className="fw-bold text-left align-items-center justify-content-center gx-1">
          {columns.map((col, index) => (
            <CCol key={index} lg={col.size || 3} className="mt-2 text-break">
              {col.key.toUpperCase() || 'N/A'}
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </>
  );
}
