"use client";
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  MapContainerProps,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {  LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { setLocationValue } from "@/store/slices/searchSlice";
import { LocationValue } from "@/types/searchbar";
import { RootState } from "@/store/store";
import { MapComponentProps } from "@/types/standardSearch";
import { Icon } from "leaflet";

interface MapEventsProps {
  onMoveEnd: (lat: number, lng: number) => void;
  onViewportChange: (bounds: LatLngBounds) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({
  onMoveEnd,
  onViewportChange,
}) => {
  const map = useMapEvents({
    moveend() {
      const center = map.getCenter();
      onMoveEnd(center.lat, center.lng);
      onViewportChange(map.getBounds());
    },
  });
  return null;
};

//set map center when center changes handle side effect
const SetMapCenter: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
};

// custom icon
const customIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});

const MapComponent: React.FC<MapComponentProps> = ({ setViewportCorners ,hotelData}) => {
  const dispatch = useDispatch();
  const locationValue = useSelector<RootState, LocationValue>(
    (state) => state.search.locationValue
  );
  const [viewport, setViewport] = useState<LatLngBounds | null>(null);
  const handleMoveEnd = (lat: number, lng: number) => {
    
    // dispatch(setLocationValue({ lat: lat.toString(), lon: lng.toString() }));
  };
  const handleViewportChange = (bounds: LatLngBounds) => {
    setViewport(bounds);
  };

  useEffect(() => {
    if (viewport) {
      const northEast = viewport.getNorthEast();
      const southWest = viewport.getSouthWest();
      

      setViewportCorners({
        northEast: { lat: northEast.lat, lng: northEast.lng },
       
        southWest: { lat: southWest.lat, lng: southWest.lng },
       
      });
    }
  }, [viewport ,setViewportCorners]);

   const mapProps: MapContainerProps = {
    zoom: 13,
    style: { height: "100%", width: "100%" },
  };
  return (
    <div className="h-[100%]">
      <MapContainer
        {...mapProps}
        center={[
          parseFloat(locationValue.lat) ||  29.9384473,
          parseFloat(locationValue.lon) ||  78.1452985,
        ]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents
          onMoveEnd={handleMoveEnd}
          onViewportChange={handleViewportChange}
        />
        <SetMapCenter
          lat={parseFloat(locationValue.lat) || 29.9384473}
          lon={parseFloat(locationValue.lon) || 78.1452985}
        />
        {hotelData && hotelData.map((hotel) => (
          <Marker
            key={hotel.title}
            position={[hotel.lat ?? 0, hotel.lng ?? 0]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3>{hotel.title}</h3>
                <p>
                 $ {hotel.price}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
