// components/MapSearch.tsx
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

interface MapSearchProps {
  onSelectLocation: (location: { lat: number; lng: number; name: string }) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ onSelectLocation }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'Enter your location'
    }) as typeof GeoSearchControl & L.Control;

    map.addControl(searchControl);

    // Handle the result
    map.on('geosearch/showlocation', (e: any) => {
      const { x, y, label } = e.location;
      onSelectLocation({ lat: y, lng: x, name: label });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onSelectLocation]);

  return null;
};

export default MapSearch;