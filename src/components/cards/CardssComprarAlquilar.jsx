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
          inmueble={inmueble}
        />
      ))}
    </CContainer>
  );
}


