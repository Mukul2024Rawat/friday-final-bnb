import React from 'react';
import { MdEdit, MdLocationOn } from 'react-icons/md';
interface AddressProps {
  address: {
    id: number;
    nearest_landmark: string;
    locality: string;
    city: string;
    state: string;
    country: string;
    pincode: string | number;
    latitude: number;
    longitude: number;
    property_id: number;
    created_at: string;
    updated_at: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const AddressSection: React.FC<AddressProps> = ({
  address,
  isEditing,
  onEdit,
  onInputChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <MdLocationOn className="mr-2 text-blue-500" />
          Address
        </h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            aria-label="Edit address"
          >
            <MdEdit size={28} />
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['nearest_landmark', 'locality', 'city', 'state', 'country', 'pincode'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={address[field as keyof typeof address]}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            {`${address.nearest_landmark}, ${address.locality}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressSection;