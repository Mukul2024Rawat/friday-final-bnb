import { NewPropertyData } from "./property";
import { GuestCount } from "@/types/searchbar";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ViewportCorners {
  northEast: Coordinates;
  southWest: Coordinates;
}

// map component props interface
export interface MapComponentProps {
  setViewportCorners: (corners: ViewportCorners) => void;
  hotelData: NewPropertyData[];
}

//property card
export interface HotelData {
  imageUrl: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  price: number | string;
  currency?: string;
  dates?: string;
  capacity?:string;
  amenities?:string[];
  lat?: number | undefined;
  lng?: number | undefined;
}


export interface SearchParams {
  viewportCorners: ViewportCorners;
  startDate: string;
  endDate: string;
  guestCounts: GuestCount;
  currentPage: number;
}


export interface PaginationItemProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}






