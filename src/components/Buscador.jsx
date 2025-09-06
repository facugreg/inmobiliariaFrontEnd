import React from "react";
import {
  CRow,
  CCol,
  CInputGroup,
  CFormInput,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import { Filtro } from "./Filtro";

export function Buscador({ onSearch, mostrarFiltro = false,
  filtroLabel = "Seleccionar",
  filtroOpciones = [],
  filtroValue = "",
  filtroOnChange = () => {},
  placeholder = "Ciudad, provincia, país",
 }) {
  return (
    <CCol lg={12} >
        <CInputGroup>
          {/* Campo de búsqueda */}
          <CFormInput
            type="text"
            name="buscar"
            placeholder={placeholder}
            className="w-50"
          />
          {/* Filtro condicional */}
          {mostrarFiltro && (
            <Filtro
              label={filtroLabel}
              opciones={filtroOpciones}
              value={filtroValue}
              onChange={filtroOnChange}
              className="w-30"
            />
          )}
          {/* Botón */}
          <CButton
            type="button"
            color="primary"
            className="w-20"
            onClick={onSearch}
          >
            <CIcon icon={cilSearch} />
          </CButton>
        </CInputGroup>
    </CCol>
  );
}
