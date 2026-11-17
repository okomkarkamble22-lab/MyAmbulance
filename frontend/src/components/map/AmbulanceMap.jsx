// Provides the initial React-Leaflet map component structure.
import { MapContainer, TileLayer } from 'react-leaflet';

const AmbulanceMap = ({ center = [20.5937, 78.9629], zoom = 5 }) => (
  <MapContainer center={center} zoom={zoom} className="h-64 w-full" aria-label="Ambulance map">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
);

export default AmbulanceMap;
