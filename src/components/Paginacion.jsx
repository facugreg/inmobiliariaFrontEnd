import React from "react";
import { CButton, CRow, CCol } from "@coreui/react";

export function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  const generarNumerosPagina = () => {
    const paginas = [];
    const maxPaginasVisibles = 5; // Número máximo de páginas visibles
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, paginaActual + 2);

    if (fin - inicio < maxPaginasVisibles - 1) {
      if (inicio === 1) {
        fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);
      } else if (fin === totalPaginas) {
        inicio = Math.max(1, fin - maxPaginasVisibles + 1);
      }
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  };

  return (
    <CRow className="mt-3 justify-content-center align-items-center">
      <CCol className="text-center">
        <CButton
          color="secondary"
          disabled={paginaActual === 1}
          onClick={() => onCambiarPagina(paginaActual - 1)}
          className="me-2"
        >
          Anterior
        </CButton>
        {generarNumerosPagina().map((numero) => (
          <CButton
            key={numero}
            color={paginaActual === numero ? "primary" : "secondary"}
            onClick={() => onCambiarPagina(numero)}
            className="me-2"
            style={{ minWidth: "40px" }}
          >
            {numero}
          </CButton>
        ))}
        <CButton
          color="secondary"
          disabled={paginaActual === totalPaginas}
          onClick={() => onCambiarPagina(paginaActual + 1)}
          className="ms-2"
        >
          Siguiente
        </CButton>
      </CCol>
    </CRow>
  );
}