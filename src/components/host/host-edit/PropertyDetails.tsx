import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Property, PropertyAddress, PropertyPrice } from '@/types/PropertyDetails';
import { hostApi } from '@/api/host';
import GeneralDetailsSection from './GeneralDetails';
import AddressSection from './AddressSection';
import PriceSection from './PriceSection';
import AmenitiesSection from './AmenitiesSection';
import ImagesSection from './ImagesSection';

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [localProperty, setLocalProperty] = useState<Property>(property);
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState<'general' | 'address' | 'price' | 'amenities' | 'images' | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setLocalProperty(prev => {
      if (editSection === 'general') {
        return {
          ...prev,
          [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        };
      } else if (editSection === 'address') {
        return {
          ...prev,
          property_address: { ...prev.property_address, [name]: value },
        };
      } else if (editSection === 'price') {
        return {
          ...prev,
          property_price: { ...prev.property_price, [name]: value },
        };
      }
      return prev;
    });
  };

  const toggleAmenity = (amenityId: number) => {
    setLocalProperty(prev => {
      const updatedAmenities = prev.property_amenities.some(a => a.amenity_id === amenityId)
        ? prev.property_amenities.filter(a => a.amenity_id !== amenityId)
        : [...prev.property_amenities, { amenity_id: amenityId }];
      return { ...prev, property_amenities: updatedAmenities };
    });
  };

  const handleImageUpload = async (files: File[]) => {
    try {
      await hostApi.uploadImages(localProperty.id, files);
      const updatedProperty = await hostApi.getPropertyDetails(localProperty.id);
      setLocalProperty(prev => ({ ...prev, property_images: updatedProperty.property_images }));
      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload images. Please try again.');
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await hostApi.deleteImage(localProperty.id, imageId);
      setLocalProperty(prev => ({
        ...prev,
        property_images: prev.property_images.filter(img => img.id !== imageId)
      }));
      toast.success('Image deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete image. Please try again.');
    }
  };

  const validateGeneralDetails = () => {
    const newErrors: { [key: string]: string } = {};
    const capacity = Number(localProperty.capacity);
    const cancellationDays = Number(localProperty.cancellation_days);

    if (capacity <= 0) {
      newErrors.capacity = 'Capacity must be greater than zero';
    }
    if (!Number.isInteger(cancellationDays)) {
      newErrors.cancellation_days = 'Cancellation days must be an integer number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    try {
      if (editSection === 'general') {
        if (!validateGeneralDetails()) {
          return;
        }
        await hostApi.updateGeneralDetails(localProperty.id, {
          title: localProperty.title,
          subtitle: localProperty.subtitle,
          description: localProperty.description,
          capacity: Number(localProperty.capacity),
          is_available: localProperty.is_available,
          is_cancellable: localProperty.is_cancellable,
          cancellation_days: Number(localProperty.cancellation_days),
        });
      } else if (editSection === 'address') {
        const { nearest_landmark, locality } = localProperty.property_address;
        await hostApi.updateAddress(localProperty.id, localProperty.property_address.id, { nearest_landmark, locality });
      } else if (editSection === 'price') {
        await hostApi.updatePrice(localProperty.id, localProperty.property_price.id, localProperty.property_price);
      } else if (editSection === 'amenities') {
        await hostApi.updateAmenities(localProperty.id, localProperty.property_amenities.map(a => a.amenity_id));
      }

      setIsEditing(false);
      setEditSection(null);
      onUpdate();
      toast.success('Property updated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update property. Please try again.');
      }
    }
  };
  useEffect(() => {
    setLocalProperty(property);
  }, [property]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{localProperty.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <GeneralDetailsSection
            generalDetails={localProperty}
            isEditing={isEditing && editSection === 'general'}
            errors={errors}
            onEdit={() => { setIsEditing(true); setEditSection('general'); }}
            onInputChange={handleInputChange}
            onCancel={() => { setIsEditing(false); setEditSection(null); }}
            onSave={handleUpdate}
          />

          <AddressSection
            address={localProperty.property_address}
            isEditing={isEditing && editSection === 'address'}
            onEdit={() => { setIsEditing(true); setEditSection('address'); }}
            onInputChange={handleInputChange}
            onCancel={() => { setIsEditing(false); setEditSection(null); }}
            onSave={handleUpdate}
          />

          <PriceSection
            priceDetails={localProperty.property_price}
            isEditing={isEditing && editSection === 'price'}
            onEdit={() => { setIsEditing(true); setEditSection('price'); }}
            onInputChange={handleInputChange}
            onCancel={() => { setIsEditing(false); setEditSection(null); }}
            onSave={handleUpdate}
          />

          <AmenitiesSection
            selectedAmenities={new Set(localProperty.property_amenities.map(a => a.amenity_id))}
            isEditing={isEditing && editSection === 'amenities'}
            onEdit={() => { setIsEditing(true); setEditSection('amenities'); }}
            onToggleAmenity={toggleAmenity}
            onCancel={() => { setIsEditing(false); setEditSection(null); }}
            onSave={handleUpdate}
          />

          <ImagesSection
            images={localProperty.property_images}
            onImageUpload={handleImageUpload}
            onDeleteImage={handleDeleteImage}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;


