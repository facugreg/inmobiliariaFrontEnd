import { CContainer } from '@coreui/react';
import { CardComprarAlquilar } from './CardComprarAlquilar';

export default function CardssComprarAlquilar({ inmuebles }) {
  return (
    <>
      {inmuebles.map((inmueble) => (
    <CardComprarAlquilar
          key={inmueble.id}
          inmueble={inmueble}
        />
      ))}
    </>
      );
}


