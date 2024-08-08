import React, { useState, useEffect } from 'react';
import { MdAcUnit, MdKitchen, MdLocalLaundryService, MdFitnessCenter, MdLocalParking, MdPool, MdOutdoorGrill, MdPets } from 'react-icons/md';
import { FaFirstAid, FaBell, FaShieldAlt } from 'react-icons/fa';
import { FiWifi, FiTv, FiHome } from 'react-icons/fi';
import AmenitiesModal from './modal/AmenitiesModal';
import { PropertyAmenity } from '@/types/property';

export const allAmenities = [
  { id: 1, name: 'Air conditioning', icon: <MdAcUnit /> },
  { id: 2, name: 'WiFi', icon: <FiWifi /> },
  { id: 3, name: 'TV', icon: <FiTv /> },
  { id: 4, name: 'Kitchen', icon: <MdKitchen /> },
  { id: 5, name: 'Washing machine', icon: <MdLocalLaundryService /> },
  { id: 6, name: 'Exercise equipment', icon: <MdFitnessCenter /> },
  { id: 7, name: 'Parking', icon: <MdLocalParking /> },
  { id: 8, name: 'Swimming pool', icon: <MdPool /> },
  { id: 9, name: 'Outdoor dining area', icon: <MdOutdoorGrill /> },
  { id: 10, name: 'First aid kit', icon: <FaFirstAid /> },
  { id: 11, name: 'Pet allowed', icon: <MdPets /> },
  { id: 12, name: 'Smoke alarm', icon: <FaBell /> },
  { id: 13, name: 'Dedicated workspace', icon: <FiHome /> },
  { id: 14, name: 'Security and monitoring', icon: <FaShieldAlt /> },
];

interface AmenitiesListProps {
  propertyAmenities: PropertyAmenity[];
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ propertyAmenities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableAmenities = propertyAmenities.map(pa => pa.amenity_id);

  const available = allAmenities.filter(amenity => availableAmenities.includes(amenity.id));
  const unavailable = allAmenities.filter(amenity => !availableAmenities.includes(amenity.id));
  const sortedAmenities = [...available, ...unavailable];

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {sortedAmenities.slice(0, 4).map(amenity => (
        <div key={amenity.id} className="flex items-center space-x-2">
          <div className="text-gray-600">{amenity.icon}</div>
          <div className={availableAmenities.includes(amenity.id) ? "text-black" : "line-through text-gray-400"}>
            {amenity.name}
          </div>
        </div>
      ))}
      </div>
      <button onClick={toggleModal} className="border border-gray-300 px-4 py-2 rounded-lg">
        Show all amenities
      </button>
      {isModalOpen && <AmenitiesModal propertyAmenities={propertyAmenities} onClose={toggleModal} />}
    </div>
  );
};

export default AmenitiesList;
