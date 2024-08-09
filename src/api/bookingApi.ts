// src/api/bookingApi.ts
import { api } from "@/api";
import { ApiResponse } from "@/types/bookingTable";

export const fetchBookings = async (bookingStatus?: string, currentPage = 1): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>("/host/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: { bookingStatus, offset: 15, page: currentPage },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const updateBookingStatus = async (
  bookingId: number,
  status: "confirm" | "reject"
): Promise<void> => {
  try {
    await api.patch(
      `/host/booking/${bookingId}/status`,
      { booking_status: status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};
