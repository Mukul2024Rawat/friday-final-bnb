export interface PropertyAddress {
  id: number;
  country: string;
  state: string;
  city: string;
  locality: string;
  pincode: number;
  nearest_landmark: string;
  latitude: number;
  longitude: number;
  property_id: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyPrice {
  id: number;
  price: number;
  daily_discount: number;
  weekly_discount: number;
  cleaning_fee: number;
  service_fee: number;
  tax: number;
  property_id: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: number;
  image: string;
  title: string;
  property_id: number;
  created_at: string;
  updated_at: string;
}

export interface Amenity {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyAmenity {
  id?: number; 
  amenity_id: number;
  amenity?: Amenity;  
  created_at?: string;
  updated_at?: string; 
}

export interface Host {
  id: number;
  name: string;
  email: string;
  phone: string;
  image_url: string;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  is_available: boolean;
  id: number;
  title: string;
  subtitle: string;
  description: string;
  capacity: number;
  is_booked: boolean;
  is_cancellable: boolean;
  cancellation_days: number;
  host_id: number;
  created_at: string;
  updated_at: string;
  property_address: PropertyAddress;
  property_price: PropertyPrice;
  property_images: PropertyImage[];
  property_amenities: PropertyAmenity[];
  host: Host;
  is_disabled: boolean;
}