// amenitiesList.ts

import React from 'react';
import {
  MdAcUnit, MdKitchen, MdLocalLaundryService, MdFitnessCenter, MdLocalParking,
  MdPool, MdOutdoorGrill, MdPets
} from 'react-icons/md';
import { FiWifi, FiTv, FiHome } from 'react-icons/fi';
import { FaFirstAid, FaBell, FaShieldAlt } from 'react-icons/fa';

export const amenitiesList = [
  { id: '1', name: 'WiFi', icon: <FiWifi /> },
  { id: '2', name: 'Air conditioning', icon: <MdAcUnit /> },
  { id: '3', name: 'Swimming pool', icon: <MdPool /> },
  { id: '4', name: 'Washing machine', icon: <MdLocalLaundryService /> },
  { id: '5', name: 'TV', icon: <FiTv /> },
  { id: '6', name: 'Pet allowed', icon: <MdPets /> },
  { id: '7', name: 'Smoke alarm', icon: <FaBell /> },
  { id: '8', name: 'Security and monitoring', icon: <FaShieldAlt /> },
  { id: '9', name: 'Outdoor dining area', icon: <MdOutdoorGrill /> },
  { id: '10', name: 'Kitchen', icon: <MdKitchen /> },
  { id: '11', name: 'First aid kit', icon: <FaFirstAid /> },
  { id: '12', name: 'Dedicated workspace', icon: <FiHome /> },
  { id: '13', name: 'Parking', icon: <MdLocalParking /> },
  { id: '14', name: 'Exercise equipment', icon: <MdFitnessCenter /> },
];