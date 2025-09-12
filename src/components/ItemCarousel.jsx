// Este componenete no lo pude usar para los carruseles, creo que deberia eliminarse
import { CCarouselItem, CImage } from '@coreui/react';

export default function Item({ src, height = '300px' }) {
  return (
    <CCarouselItem style={{ height }}>
      <CImage
        className="d-block w-100 h-100"
        src={src}
        style={{ objectFit: 'cover', height: height }} 
      />
    </CCarouselItem>
  );
}