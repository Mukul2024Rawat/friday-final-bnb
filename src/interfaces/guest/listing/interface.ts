// interfaces.ts

export interface PropertyDetail {
    id: string;
    name: string;
    location: string;
    host: Host;
    rating: number;
    reviewCount: number;
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
    description: string;
    amenities: string[];
    pricePerNight: number;
    images: string[];
  }
  
  export interface Host {
    id: string;
    name: string;
    image: string;
    joinDate: string;
    reviewCount: number;
    isVerified: boolean;
    description: string;
  }
  
  export interface Review {
    id: string;
    authorName: string;
    date: string;
    content: string;
  }
  
  export interface BookingDetails {
    checkIn: Date;
    checkOut: Date;
    guests: number;
  }