import React from "react";
import {
  CFormSelect,
  CRow

} from "@coreui/react";

export function Filtro({ label, opciones, value, onChange, className }) {
  return (
    <CFormSelect
      className={`d-none d-md-block ${className || ''}`}
      value={value || ''} // Valor controlado, con fallback a string vacío
      onChange={onChange}
    >
      <option value="" disabled hidden>
        {label || 'Seleccionar'}
      </option>
      {opciones.map((opcion) => (
        <option key={opcion.value} value={opcion.value}>
          {opcion.label}
        </option>
      ))}
    </CFormSelect>
  );
}