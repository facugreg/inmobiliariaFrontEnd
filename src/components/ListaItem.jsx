import { CContainer } from '@coreui/react';
export default function ListaItem({ children }) {
  return (
    <CContainer
      style={{
        borderBottom: '1px solid #eee',
        height: '50px',
      }}
    >
      {children}
    </CContainer>
  );
}
