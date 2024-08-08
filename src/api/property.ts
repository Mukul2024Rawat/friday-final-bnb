import { BookProperty, PropertyBookingRequestData } from "@/types/bookingSlice";
import { api } from "./index";
import { PropertyData } from "@/types/property";
import {  SearchParams} from "@/types/standardSearch";


// get property data by it's id
export const fetchPropertyDetails = async (id: string) => {
  try {
    const response = await api.get(`/property/${id}/list-one`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//book the property
export const bookPropertyApi = async ({
  bookingData,
  property_id = "58",
}: BookProperty) => {
  try {
    const response = await api.post(
      `/property/${property_id}/booking`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// fetch reviews by property id
export const fetchReviews = async (propertyId: number,currentPage:number) => {
  try {
    const response = await api.get(`/guest-review?propertyId=${propertyId}&offset=5&page=${currentPage}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};


// calling the search function
export const fetchPropertyList = async ({
  viewportCorners,
  startDate,
  endDate,
  guestCounts,
  currentPage,
}: SearchParams) => {
  try {
    const response = await api.get("/property/list", {
      params: {
        offset: 5,
        page: currentPage,
        boundingBox: JSON.stringify(viewportCorners),
        checkIn: startDate,
        checkOut: endDate,
        guestCount: JSON.stringify(guestCounts),
      },
    });
    const PropertyData: PropertyData[] = response.data.items;

    const extractedData = PropertyData.map((property) => ({
      id: property.id,
      title: property.title,
      subtitle: property.subtitle,
      capacity: property.capacity,
      lat: property.property_address.latitude,
      lng: property.property_address.longitude,
      imageUrl: property.property_images.map((image) => image.image),
      price: property.property_price.price,
      property_amenities: property.property_amenities.map(
        (amenity) => amenity.amenity.name
      ),
    }));

    return {
      extractedData,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
