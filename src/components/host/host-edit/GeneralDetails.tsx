import React from 'react';
import { MdEdit } from 'react-icons/md';

interface GeneralDetailsProps {
  generalDetails: {
    title: string;
    subtitle: string;
    description: string;
    capacity: number;
    is_available: boolean;
    is_cancellable: boolean;
    cancellation_days: number;
  };
  isEditing: boolean;
  errors: { [key: string]: string };
  onEdit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const GeneralDetailsSection: React.FC<GeneralDetailsProps> = ({
  generalDetails,
  isEditing,
  errors,
  onEdit,
  onInputChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">General Details</h3>
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-600">
          <MdEdit size={24} />
        </button>
      </div>
      {isEditing ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={generalDetails.title}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={generalDetails.subtitle}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={generalDetails.description}
                onChange={onInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={generalDetails.capacity}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.capacity && <p className="text-red-600 text-sm">{errors.capacity}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={generalDetails.is_available}
                  onChange={onInputChange}
                  className="mr-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                Is Available
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="is_cancellable"
                  checked={generalDetails.is_cancellable}
                  onChange={onInputChange}
                  className="mr-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                Is Cancellable
              </label>
            </div>
            {(generalDetails.is_cancellable )&& <div>
              <label className="block text-sm font-medium text-gray-700">Cancellation Days</label>
              <input
                type="number"
                name="cancellation_days"
                value={generalDetails.cancellation_days}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.cancellation_days && <p className="text-red-600 text-sm">{errors.cancellation_days}</p>}
            </div>}
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
          <p className="text-gray-600"><strong>Title:</strong> {generalDetails.title}</p>
          <p className="text-gray-600"><strong>Subtitle:</strong> {generalDetails.subtitle}</p>
          <p className="text-gray-600"><strong>Description:</strong> {generalDetails.description}</p>
          <p className="text-gray-600"><strong>Capacity:</strong> {generalDetails.capacity}</p>
          <p className="text-gray-600"><strong>Available:</strong> {generalDetails.is_available ? 'Yes' : 'No'}</p>
          <p className="text-gray-600"><strong>Cancellable:</strong> {generalDetails.is_cancellable ? 'Yes' : 'No'}</p>
          <p className="text-gray-600"><strong>Cancellation Days:</strong> {generalDetails.cancellation_days}</p>
        </div>
      )}
    </div>
  );
};

export default GeneralDetailsSection;