import React from 'react';
import { MdEdit } from 'react-icons/md';

interface PriceProps {
  priceDetails: {
    price: number;
    cleaning_fee: number;
    service_fee: number;
    tax: number;
    daily_discount: number;
    weekly_discount: number;
  };
  isEditing: boolean;
  onEdit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const PriceSection: React.FC<PriceProps> = ({
  priceDetails,
  isEditing,
  onEdit,
  onInputChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Pricing</h3>
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-600">
          <MdEdit size={24} />
        </button>
      </div>
      {isEditing ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(priceDetails).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={onInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            ))}
          </div>
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
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div><strong>Price:</strong> ${priceDetails.price}</div>
            <div><strong>Cleaning Fee:</strong> {priceDetails.cleaning_fee}%</div>
            <div><strong>Service Fee:</strong> {priceDetails.service_fee}%</div>
            <div><strong>Tax:</strong> {priceDetails.tax}%</div>
            <div><strong>Daily Discount:</strong> {priceDetails.daily_discount}%</div>
            <div><strong>Weekly Discount:</strong> {priceDetails.weekly_discount}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSection;