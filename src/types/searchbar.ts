export interface LocationValue {
  
  name: string;
  display_name: string;
  lat: string;
  lon: string;
}

export interface GuestCount {
  
  Members: number;
  Infants: number;
  Pets: number;
}
  
  
export interface SearchState {
    locationValue: LocationValue;
    startDate: string;
    endDate: string;
    guestCount: GuestCount;
  }

