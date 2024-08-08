// components/Map.tsx
"use client"

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

interface LocationData {
  country: string;
  state: string;
  city: string;
  locality:string,
  nearest_landmark:string,
  postalCode: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  onLocationChange: (data: LocationData) => void;
}

const MapSearch = ({ onSelectLocation }: { onSelectLocation: (location: { lat: number; lng: number; name: string }) => void }) => {
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

const MapComponent: React.FC<MapComponentProps> = ({ onLocationChange }) => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const mapRef = useRef<L.Map | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        updateLocationData(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const updateLocationData = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const locationData: LocationData = {
        country: data.address.country || '',
        state: data.address.state  || data.address.province || 'N/A',
        city: data.address.city || data.address.county || data.address.town || data.address.village || 'N/A',
        locality: data.address.locality || '',
        nearest_landmark: data.nearest_landmark || '',
        postalCode: data.address.postcode || 'N/A',
        lat,
        lng,
      };
      onLocationChange(locationData);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, 13);
    }
  }, [position]);

  const handleSearchResult = (location: { lat: number; lng: number; name: string }) => {
    setPosition([location.lat, location.lng]);
    updateLocationData(location.lat, location.lng);
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <MapEvents />
      <MapSearch onSelectLocation={handleSearchResult} />
    </MapContainer>
  );
};

export default MapComponent;