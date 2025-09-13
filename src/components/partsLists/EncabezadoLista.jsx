import { CContainer , CCol, CRow} from "@coreui/react";

export function EncabezadoLista({columns}){
  console.log(columns)
  return(
    <>
    <CContainer className="mt-3 border-top border-gray-300 rounded-2">
      <CRow className= 'mx-1 fw-bold text-left align-items-center'>
        {columns.map((col, index) => (
          <CCol key={index} lg={col.size || 3}>
            {col.key.toUpperCase() || 'N/A'}
          </CCol>
        ))
        }
      </CRow>
    </CContainer>
    </>
  );
}