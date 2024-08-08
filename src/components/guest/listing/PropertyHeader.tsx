// components/PropertyHeader.tsx


import { PropertyData } from '@/types/property';
import React from 'react';


interface PropertyHeaderProps {
  property: PropertyData;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <div className="flex items-center mt-2">
        {/* <span className="mr-2">★ {property.rating}</span>
        <span className="mr-2">·</span>
        <span className="underline mr-2">{property.reviewCount} reviews</span> */}
        <span className='underline'>{property?.property_address?.city}</span>
        <span className="mr-2">·</span>
        <span className='underline'>{property?.property_address?.country}</span>
      </div>
    </div>
  );
};

export default PropertyHeader;