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

export function Buscador({ searcher, search,handleSearchClick, mostrarFiltro = false,
  filtroLabel = "Seleccionar",
  filtroOpciones = [],
  filtroValue = "",
  filtroOnChange = () => {},
  placeholder = "Ciudad, provincia, país",
 }) {
  return (
        <CInputGroup>
          {/* Campo de búsqueda */}
          <CFormInput
            type="text"
            name="buscar"
            placeholder={placeholder}
            className="w-50"
            onChange={ searcher}
            value={search}
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
            onClick={handleSearchClick}
          >
            <CIcon icon={cilSearch} />
          </CButton>
        </CInputGroup>
  );
}
