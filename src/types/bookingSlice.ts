export interface GuestCount {
  Adults: number;
  Children: number;
  Infants: number;
  Pets: number;
}
export interface BookingRequestData {
  checkin_date: string;
  checkout_date: string;
  property_price: number;
  daily_discount: number;
  weekly_discount: number;
  cleaning_fee: number;
  service_fee: number;
  members: number;
  total_amount: number;
}
export interface BookingState {
  bookingRequestData: BookingRequestData;
  guestCount: GuestCount;
}

export interface PropertyBookingRequestData {
  booking_date: string;
  checkin_date: string;
  checkout_date: string;
  cleaning_fee: number;
  daily_discount: number;
  members: number;
  property_price: number;
  service_fee: number;
  total_amount: number;
  weekly_discount: number;
}

export interface BookProperty {
  bookingData: PropertyBookingRequestData;
  property_id?: string;
}
