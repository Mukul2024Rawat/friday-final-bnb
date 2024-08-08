import { FormEvent } from "react";

export interface SetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
export interface User {
  name: string;
  email: string;
  phone: string;
  file: null | string ;
}

export interface UserMenuProps {
    isAuthenticated: boolean;
    onLogin: () => void;
    onSignup: () => void;
    onRent: () => void;
  }
  
  export interface Booking {
    id: string;
    propertyId: string;
    placeName: string;
    address: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    status: string;
    persons: number;
    isCancellable: boolean;
    canCancel: boolean;
    totalPrice: number;
    hostName: string;
    imageUrl: string;
  }
  export interface BookingPropertyAddress {
    city: string;
    state: string;
    country: string;
  }
  
  export interface BookingPropertyRule {
    id: string;
    check_in_time: string;
    check_out_time: string;
  }
  
  export interface BookingPropertyImage {
    image: string;
  }
  
  export interface BookingProperty {
    id: string;
    title: string;
    property_address: BookingPropertyAddress;
    is_cancellable: boolean;
    property_images: BookingPropertyImage[];
    property_rules: BookingPropertyRule[];
  }
  
  export interface BookingHost {
    name: string;
  }
  
  export interface GuestBooking {
    id: string;
    property: BookingProperty;
    checkin_date: string;
    checkout_date: string;
    booking_status: string;
    members: number;
    total_amount: number;
    host: BookingHost;
  }