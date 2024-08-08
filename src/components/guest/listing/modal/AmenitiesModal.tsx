// components/AmenitiesModal.tsx
import React from 'react';
import { PropertyAmenity } from '@/types/property';
import { allAmenities } from '../AmenitiesList';

interface AmenitiesModalProps {
  propertyAmenities: PropertyAmenity[];
  onClose: () => void;
}

const AmenitiesModal: React.FC<AmenitiesModalProps> = ({ propertyAmenities, onClose }) => {
  const availableAmenities = propertyAmenities.map(pa => pa.amenity_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">All Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {allAmenities.map(amenity => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <div className="text-gray-600">{amenity.icon}</div>
              <div className={availableAmenities.includes(amenity.id) ? "text-black" : "line-through text-gray-400"}>
                {amenity.name}
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 border border-gray-300 px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

export default AmenitiesModal;
