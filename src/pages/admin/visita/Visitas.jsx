import { EncabezadoLista } from '../../../components/partsLists/EncabezadoLista';
import Lista from '../../../components/partsLists/Lista';
import { CContainer, CRow } from '@coreui/react';
import { useUpdateVisita, useVisitas } from '../../../hooks/visita.hooks';

export default function Visitas() {
  const { visitas } = useVisitas();
  const { mutate: updateVisita } = useUpdateVisita();
  const handleAccept = (id) => {
    const visita = visitas.find((v) => v.id === id);
    updateVisita({
      ...visita,
      estado: 'Aceptada',
      datevisita: visita.datevisita.split('/').reverse().join('-'),
      usuario: visita.usuario?.id,
      inmueble: visita.inmueble?.id,
    });
  };
  const handleReject = (id) => {
    const visita = visitas.find((v) => v.id === id);
    updateVisita({
      ...visita,
      estado: 'Rechazada',
      datevisita: visita.datevisita.split('/').reverse().join('-'),
      usuario: visita.usuario?.id,
      inmueble: visita.inmueble?.id,
    });
  };
  return (
    <CContainer className="pb-4">
      <CRow className="mt-3 d-flex justify-content-center align-items-center">
        <h2>Solicitudes de visitas</h2>
      </CRow>
      <EncabezadoLista
        columns={[
          { key: 'Direc', size: '2' },
          { key: 'Fecha', size: '2' },
          { key: 'Desc', size: '1' },
          { key: 'Nombre', size: '2' },
          { key: 'Estado', size: '1' },
          { key: 'Acciones', size: '2' },
        ]}
      />
      <Lista
        items={visitas}
        onEdit={handleAccept}
        onDelete={handleReject}
        columns={[
          { key: 'direccion', size: '2' },
          { key: 'datevisita', size: '2' },
          { key: 'descriptionvisita', size: '1' },
          { key: 'nombreUsuario', size: '2' },
          { key: 'estado', size: '1' },
        ]}
        editText="Aceptar"
        deleteText="Rechazar"
      />
    </CContainer>
  );
}
