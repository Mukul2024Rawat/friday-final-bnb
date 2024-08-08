import { api } from '@/api/index';
import { Property } from '@/types/PropertyDetails';

export const hostApi = {
  updateGeneralDetails: async (propertyId: number, details: Partial<Property>) => {
    const response = await api.put(`/property/${propertyId}`, details, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  updateAddress: async (propertyId: number, addressId: number, address: any) => {
    const response = await api.put(`/property/${propertyId}/addresses/${addressId}`, address, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  updatePrice: async (propertyId: number, priceId: number, priceDetails: any) => {
    const convertedPriceDetails = Object.fromEntries(
      Object.entries(priceDetails).map(([key, value]) => [key, Number(value)])
    );
    const response = await api.put(`/property/${propertyId}/prices/${priceId}`, convertedPriceDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  updateAmenities: async (propertyId: number, amenities: number[]) => {
    const amenitiesPayload = amenities.map((amenityId) => ({ amenity_id: amenityId }));
    const response = await api.patch(`/property/${propertyId}/amenities`, { amenities: amenitiesPayload }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  uploadImages: async (propertyId: number, images: File[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('image', image);
    });
    const response = await api.post(`/property/${propertyId}/images`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response.data;
  },
  
  deleteImage: async (propertyId: number, imageId: number) => {
    const response = await api.delete(`/property/${propertyId}/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
  
  getPropertyDetails: async (propertyId: number) => {
    const response = await api.get(`/property/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
};