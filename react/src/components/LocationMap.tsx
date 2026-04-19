import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude, city }) => {
  const position: [number, number] = [latitude, longitude];
  const [isMounted, setIsMounted] = React.useState(false);
  const isReactSnap = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent === 'ReactSnap';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 빌드 시점이나 마운트 전에는 지도를 렌더링하지 않음 (하이드레이션 불일치 방지)
  if (isReactSnap || !isMounted) {
    return (
      <div className="h-[400px] w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center border border-gray-200 dark:border-gray-700">
        <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-sm font-medium text-gray-900">
              {city || 'Your Location'}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap; 