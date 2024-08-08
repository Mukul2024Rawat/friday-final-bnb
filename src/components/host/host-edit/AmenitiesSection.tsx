import React from 'react';
import { MdEdit } from 'react-icons/md';
import { amenitiesList } from './amenitiesList';

interface AmenitiesProps {
  selectedAmenities: Set<number>;
  isEditing: boolean;
  onEdit: () => void;
  onToggleAmenity: (amenityId: number) => void;
  onCancel: () => void;
  onSave: () => void;
}

const AmenitiesSection: React.FC<AmenitiesProps> = ({
  selectedAmenities,
  isEditing,
  onEdit,
  onToggleAmenity,
  onCancel,
  onSave,
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Amenities</h3>
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-600">
          <MdEdit size={24} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {amenitiesList.map((amenity) => {
          const isSelected = selectedAmenities.has(Number(amenity.id));
          return (
            <div
              key={amenity.id}
              className={`flex items-center px-3 py-2 rounded-full text-sm ${
                isEditing ? 'cursor-pointer' : ''
              } ${
                isSelected ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => {
                if (isEditing) {
                  onToggleAmenity(Number(amenity.id));
                }
              }}
            >
              {amenity.icon}
              <span className="ml-2">{amenity.name}</span>
            </div>
          );
        })}
      </div>
      {isEditing && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Save Amenities
          </button>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;