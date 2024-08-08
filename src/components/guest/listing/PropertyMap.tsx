"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { PropertyAddress } from "@/types/property";

const customIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  property_address: PropertyAddress;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  latitude,
  longitude,
  title,
  property_address,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Where you&apos;ll be</h2>
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]} icon={customIcon}>
            <Popup>Exact location provided after booking</Popup>
          </Marker>
        </MapContainer>
      </div>
      <h3 className="text-xl font-medium mt-4">
        {property_address?.city}, {property_address?.state}, {property_address?.country}
      </h3>
    </div>
  );
};

export default PropertyMap;
