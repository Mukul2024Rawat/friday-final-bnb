// components/PropertyLocation.tsx

import React from 'react';
import Image from 'next/image';

interface PropertyLocationProps {
  location: string;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ location }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Where you&apos;ll be</h2>
      <div className="h-64 relative mb-4">
        <Image src="/map-placeholder.jpg" alt="Property location" layout="fill" objectFit="cover" className="rounded-lg" />
      </div>
      <h3 className="font-semibold mb-2">{location}</h3>
      <p className="mb-4">
        The apartment is located in the heart of {location}, close to all major attractions.
      </p>
      <button className="border border-gray-900 rounded-lg px-4 py-2 font-semibold">
        Show more
      </button>
    </div>
  );
};

export default PropertyLocation;