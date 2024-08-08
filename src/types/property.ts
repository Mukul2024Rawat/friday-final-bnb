export interface PropertyData {
    id: number
    title: string
    subtitle: string
    description: string
    capacity: number
    is_available: boolean
    is_cancellable: boolean
    cancellation_days: number
    host_id: number
    created_at: string
    updated_at: string
    property_address: PropertyAddress
    property_price: PropertyPrice
    property_images: PropertyImage[]
    property_amenities: PropertyAmenity[]
    host: Host
    property_rules?: PropertyRule[]
    reviews: Review[]
  }
  
  export interface PropertyAddress {
    id: number
    country: string
    state: string
    city: string
    locality: string
    pincode: string
    nearest_landmark: string
    latitude: number
    longitude: number
    property_id: number
    created_at: string
    updated_at: string
  }
  
  export interface PropertyPrice {
    id: number
    price: string
    daily_discount: string
    weekly_discount: string
    cleaning_fee: string
    service_fee: string
    tax: string
    property_id: number
    created_at: string
    updated_at: string
  }
  
  export interface PropertyImage {
    id: number
    image: string
    property_id: number
    created_at: string
    updated_at: string
  }
  
  export interface PropertyAmenity {
    id: number
    amenity_id: number
    amenity: Amenity
    created_at: string
    updated_at: string
  }
  
  export interface Amenity {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
  
  export interface Host {
    id: number
    name: string
    email: string
    phone: string
    image_url: any
    is_email_verified: boolean
    created_at: string
    updated_at: string
  }
  
  export interface PropertyRule {
    id: number
    check_in_time: string
    check_out_time: string
    self_check_in: boolean
    no_smoking: boolean
    no_parties_or_events: boolean
    carbon_monoxide_alarm: boolean
    smoke_alarm: boolean
    security_deposit: string
    property_id: number
    created_at: string
    updated_at: string
  }

  export interface NewPropertyData {
    id: number;
    title: string;
    subtitle: string;
    capacity: number;
    lat: number;
    lng: number;
    imageUrl: string[];
    price: string;
    property_amenities: string[];
  }
  

  //review
  export interface Review {
    id: number;
    accuracy: number;
    cleaning: number;
    checkin: number;
    communication: number;
    location: number;
    value_for_money: number;
    overall: number;
    comments: string;
    is_reviewed_by_host: boolean;
    created_at: string;
    updated_at: string;
    guest: Host;
  }

  //get guestside property review 
  export interface ReviewData {
    offset: number
    totalItems: number
    totalPages: number
    itemCount: number
    page: number
    items: Review[]
  }