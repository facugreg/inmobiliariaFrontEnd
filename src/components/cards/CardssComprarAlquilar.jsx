import { CContainer } from '@coreui/react';
import { CardComprarAlquilar } from './CardComprarAlquilar';

export default function CardssComprarAlquilar({ inmuebles }) {
  return (
    <CContainer
      className="overflow-auto mt-3 border border-gray-300 rounded-2"
      style={{ maxHeight: '400px' }}
    >
      {inmuebles.map((inmueble) => (
        <CardComprarAlquilar
          key={inmueble.id}
          precioDolar={`$${inmueble.precioDolar || 'Consultar'}`}
          direccion={`${inmueble.direccionCalle} ${inmueble.direccionNumero}`}
          mts2={inmueble.mtrs}
          descripcion={inmueble.descripcion}
          antiguedad={calcularAntiguedad(inmueble.fechaConstruccion)}
          requisitos={inmueble.requisitos || 'No especificado'}
        />
      ))}
    </CContainer>
  );
}

function calcularAntiguedad(fechaConstruccion) {
  if (!fechaConstruccion) return 'N/A';
  const anio = new Date(fechaConstruccion).getFullYear();
  const antiguedad = new Date().getFullYear() - anio;
  return `${antiguedad} años`;
}