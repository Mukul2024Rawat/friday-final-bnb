export interface ReviewData {
    cleaning: number;
    accuracy: number;
    checkin: number;
    communication: number;
    location: number;
    value_for_money: number;
    comments: string;
    booking_id: string;
  }
  export interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking_id: string | null;
  }
  
  export interface Ratings {
    cleaning: number;
    accuracy: number;
    checkin: number;
    communication: number;
    location: number;
    value_for_money: number;
  }
  export interface Error {
    property: string;
    message: string;
  }
export interface Review {
  id: number;
  guest_rating: number;
  comments: string;
  is_reviewed_by_guest: boolean;
  created_at: string;
  updated_at: string;
  host: {
    id: number;
    name: string;
    email: string;
    phone: string;
    image_url: string;
    is_email_verified: boolean;
    created_at: string;
    updated_at: string;
  };
}

  export interface HostReview {
    guest_rating: number;
    comments: string;
    booking_id: number;
  }
  export interface HostReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking_id: number;
  }
  