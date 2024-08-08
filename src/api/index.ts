import { Review } from "@/types/review";
import { HostReview, ReviewData } from "@/types/review";
import { Booking, GuestBooking } from "@/types/userAuthentication";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const getApiUrl = (endpoint: string) =>
  `${API_BASE_URL}/${API_VERSION}/${endpoint}`;

export const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (data: { email: string; password: string }) => {
  return api.post(getApiUrl("auth/login"), data);
};

export const register = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  return api.post(getApiUrl("register"), data);
};

export const fetchUserProfile = () => {
  return api.get(getApiUrl("user/profile"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchUserProfilePhoto = () => {
  return api.get(getApiUrl("user/image"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    responseType: "blob",
  });
};

export const updateUserProfile = (formData: FormData) => {
  return api.put(getApiUrl("user/profile"), formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "multipart/form-data",
    },
  });
};
export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return api.patch(getApiUrl("user/change-password"), JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const fetchUserBookings = async (
  bookingStatus: string,
  offset: number,
  page: number
): Promise<{ items: Booking[]; totalPages: number }> => {
  const response = await api.get(getApiUrl("guest/booking"), {
    params: {
      bookingStatus,
      offset,
      page,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const { items, totalPages } = response.data;

  const formattedBookings = items.map((booking: GuestBooking) => ({
    id: booking.id,
    propertyId: booking.property.id,
    placeName: booking.property.title,
    address: `${booking.property.property_address.city}, ${booking.property.property_address.state}, ${booking.property.property_address.country}`,
    checkInDate: booking.checkin_date,
    checkOutDate: booking.checkout_date,
    status: booking.booking_status,
    persons: booking.members,
    isCancellable: booking.property.is_cancellable,
    canCancel:
      booking.property.is_cancellable &&
      new Date(booking.checkin_date) > new Date() &&
      booking.booking_status !== "cancelled" &&
      booking.booking_status !== "reject",
    totalPrice: booking.total_amount,
    hostName: booking.host.name,
    imageUrl: booking.property.property_images[0]?.image,
    checkInTime: booking.property.property_rules.find(
      (rule: any) => rule.id === booking.property.property_rules[0].id
    )?.check_in_time,
    checkOutTime: booking.property.property_rules.find(
      (rule: any) => rule.id === booking.property.property_rules[0].id
    )?.check_out_time,
  }));

  return { items: formattedBookings, totalPages };
};

export const cancelBooking = (bookingId: string) => {
  return axios.patch(
    getApiUrl(`guest/booking/${bookingId}/cancel-booking`),
    { booking_status: "cancelled" },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const fetchHostProperties = () => {
  return api.get("property/host", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const submitGuestReview = (data: ReviewData) => {
  return api.post(`guest-review`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const submitHostReview = (ReviewData: HostReview) => {
  return api.post(`host-review`, ReviewData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const fetchHostReviews = async (
  guestId: number,
  page: number = 1,
  offset: number = 5
): Promise<{ data: Review[]; meta: { total_pages: number } }> => {
  const params = {
    guestId,
    page,
    offset,
  };

  return api
    .get(`/host-review`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      const { items, totalPages } = response.data;
      return { data: items, meta: { total_pages: totalPages } };
    });
};
