import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Mapa() {
  return (
    <MapContainer
      center={[-32.954134094906536, -60.64379750069988]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[-32.954134094906536, -60.64379750069988]}>
        <Popup>Zeballos 1341</Popup>
      </Marker>
    </MapContainer>
  );
}
