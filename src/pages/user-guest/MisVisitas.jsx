import { CCol, CContainer, CRow } from "@coreui/react";
import { Buscador } from "../../components/Buscador.jsx";
import { Filtro } from "../../components/Filtro.jsx";
import Lista from "../../components/partsLists/Lista.jsx";
import { useState } from "react";

const opcionesEstado = [
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'Confirmada', label: 'Confirmada' },
  { value: 'Cancelada', label: 'Cancelada' },
];

export function MisVisitas() {
  const [valorEstado, setValorEstado] = useState('');
  const handleEstadoChange = (e) => {
    setValorEstado(e.target.value);
    console.log('Filtro estado:', e.target.value);
  } 
  return (
    <>
    <CContainer>
      <CRow className="mt-3  d-flex align-items-center">
        <CCol lg={6} md={12}>
          <Buscador onSearch={() => alert('Buscar inmueble')}/>
        </CCol>
        <CCol lg={4} md={12} sm={12}> 
          <Filtro label="Estado"
            opciones={opcionesEstado}
            value={valorEstado}
            onChange={handleEstadoChange}/>
        </CCol>
    </CRow>
    </CContainer>
    <CContainer
      fluid
      className="justify-content-center align-items-center p-5"
    >
      <CRow className="align-items-center p-0 mt-3">
        <CCol>
          {'Falta conectar con el backend para traer las visitas del usuario y armar bien la lista'}
          <Lista items={[]} onDelete={(id) => alert(`Eliminar visita ${id}`)} onEdit={(id) => alert(`Editar visita ${id}`)}/>

        </CCol>
      </CRow>
    </CContainer>
    </>
  );
}