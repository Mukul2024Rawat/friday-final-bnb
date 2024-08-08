"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { fetchUserBookings, cancelBooking } from "../api/index";
import WithAuth from "./withAuth";
import { Booking } from "@/types/userAuthentication";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaUsers,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "../components/modals/Loader";
import toast from "react-hot-toast";
import ReviewModal from "../components/modals/ReviewModal";
import { useRouter } from "next/navigation";
import PaginationItems from "./ui/paginationItems";

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirm":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    case "cancelled":
      return "text-red-500";
    case "reject":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  const timeMeridian = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minutes} ${timeMeridian}`;
};

const MyBookings: React.FC = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setErrorMessages([]);
    try {
      const response = await fetchUserBookings(statusFilter, 9, currentPage);
      setBookings(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError("Failed to fetch bookings");
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleCancelBooking = async (id: string) => {
    setIsLoading(true);
    setError("");
    setErrorMessages([]);
    try {
      await cancelBooking(id);
      await fetchBookings();
      toast.success("Booking cancelled successfully!");
    } catch (error: any) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.status === 500) {
          setErrorMessages([error.response.data.message]);
        } else {
          setErrorMessages(
            error.response.data.message.map((msg: any) => msg.message)
          );
        }
      }
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenProperty = (propertyId: string) => {
    router.push(`/guest/property/${propertyId}`);
  };

  const openReviewModal = (bookingId: string) => {
    const currentBooking = bookings.find((booking) => booking.id === bookingId);
    if (currentBooking && currentBooking.status === "confirm" && new Date(currentBooking.checkOutDate) < new Date()) {
      setSelectedBookingId(bookingId);
      setIsReviewModalOpen(true);
    } else {
      toast.error("You can only review after checkout and when the status is confirmed.");
    }
  };

  const closeReviewModal = () => {
    setSelectedBookingId(null);
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {errorMessages.length > 0 && (
        <div
          className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <ul className="list-disc list-inside">
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center">
          <label
            htmlFor="status-filter"
            className="mr-2 text-gray-700 font-semibold"
          >
            Filter:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Default</option>
            <option value="pending">Pending</option>
            <option value="confirm">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="reject">Rejected</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-white p-4 lg:p-6 rounded-lg shadow-md">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : bookings.length === 0 && statusFilter !== "" ? (
          <div className="text-gray-500 text-lg">
            No <span className="capitalize">{statusFilter}</span> Bookings
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500 text-lg">No Bookings Yet</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-300 hover:bg-gray-50 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full md:w-92"
              >
                <div onClick={() => handleOpenProperty(booking.propertyId)}>
                  <Image
                    src={booking.imageUrl}
                    alt={booking.placeName}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{booking.placeName}</h3>
                    <p className="flex items-center mt-2">
                      <FaMapMarkerAlt className="mr-2" />
                      {booking.address}
                    </p>
                    <p
                      className={`flex capitalize items-center mt-2 ${getStatusColor(
                        booking.status
                      )} font-semibold`}
                    >
                      <FaCalendarAlt className="mr-2" />
                      {booking.status}
                    </p>
                    <p className="flex items-center mt-2">
                      <FaUser className="mr-2" />
                      Host: {booking.hostName}
                    </p>
                    <p className="flex items-center mt-2">
                      <FaDollarSign className="mr-2" />
                      {booking.totalPrice}
                    </p>
                    <p className="flex items-center mt-2">
                      <FaCalendarAlt className="mr-2" />
                      Check-In: {formatDate(booking.checkInDate)} at{" "}
                      {formatTime(booking.checkInTime)}
                    </p>
                    <p className="flex items-center mt-2">
                      <FaCalendarAlt className="mr-2" />
                      Check-Out: {formatDate(booking.checkOutDate)} at{" "}
                      {formatTime(booking.checkOutTime)}
                    </p>
                    <p className="flex items-center mt-2">
                      <FaUsers className="mr-2" />
                      No. of Persons: {booking.persons}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between items-center border-t">
                  <button
                    onClick={(e) => {
                      openReviewModal(booking.id);
                    }}
                    className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center ${
                      booking.status !== "confirm" ||
                      new Date(booking.checkOutDate) >= new Date()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      booking.status !== "confirm" ||
                      new Date(booking.checkOutDate) >= new Date()
                    }
                  >
                    <FaStar className="mr-2" />
                    Review Property
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className={`mt-4 bg-rose-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center ${
                      !booking.canCancel && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!booking.canCancel}
                  >
                    <FaTimesCircle className="mr-2" />
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination pt-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="pr-[8px] cursor-pointer"
                  />
                )}
                <PaginationItems
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
                {currentPage < totalPages && (
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="pl-[8px] cursor-pointer"
                  />
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        booking_id={selectedBookingId}
      />
    </>
  );
};

export default WithAuth(MyBookings);
