import React from 'react';
import { PropertyData } from '@/types/property';
import { FaHome, FaDoorOpen, FaCalendarAlt } from 'react-icons/fa';
import { FaHandSparkles } from 'react-icons/fa6';

interface PropertyDetailsProps {
  property: PropertyData;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const propertyRule = property?.property_rules?.[0];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Entire rental unit hosted by {property?.host?.name}</h2>
      <div className="flex flex-col mb-4">
      <span className="underline">
        {property?.capacity} {property?.capacity === 1 ? 'guest' : 'guests'}
      </span>
        <div className="border-t border-gray-200 my-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
        <div className="flex items-center">
          <FaHome className="mr-3 text-gray-600" size={25} />
          <div>
            <h3 className="font-semibold">Entire home</h3>
            <p className="text-sm text-gray-600">You&apos;ll have the apartment to yourself</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaHandSparkles className="mr-3 text-gray-600" size={25}/>
          <div>
            <h3 className="font-semibold">Enhanced Clean</h3>
            <p className="text-sm text-gray-600">This Host committed to Airnb&apos;s 5-step enhanced cleaning process.</p>
          </div>
        </div>
        {propertyRule?.self_check_in && (
          <div className="flex items-center">
            <FaDoorOpen className="mr-3 text-gray-600" size={25}/>
            <div>
              <h3 className="font-semibold">Self check-in</h3>
              <p className="text-sm text-gray-600">Check yourself in with the keypad.</p>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 my-4"></div>
      </div>
      <h3 className="mb-4 font-semibold">{property.subtitle}</h3>
      <p className="mb-4">{property.description}</p>

    </div>
  );
};

export default PropertyDetails;
