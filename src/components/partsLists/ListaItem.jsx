import { CRow } from '@coreui/react';
export default function ListaItem({ children }) {
  return (
    // <CContainer
    //   style={{
    //     borderBottom: '1px solid #eee',
    //     height: '50px',
    //   }}
    // >
    //   {children}
    // </CContainer>
    <CRow className="border-bottom border-gray-200 py-2">
      {children}
    </CRow>
  );
}
