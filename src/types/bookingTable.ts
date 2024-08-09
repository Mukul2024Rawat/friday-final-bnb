export interface Booking {
    id: number;
    checkin_date: string;
    checkout_date: string;
    booking_date: string;
    members: number;
    booking_status: "pending" | "confirm" | "reject" | "cancelled";
    total_amount: string;
    property: {
      id: number;
      title: string;
    };
    guest: {
      id: number;
      name: string;
    };
  }
  
  export interface ApiResponse {
    offset: number;
    totalItems: number;
    totalPages: number;
    itemCount: number;
    page: number;
    items: Booking[];
  }
  