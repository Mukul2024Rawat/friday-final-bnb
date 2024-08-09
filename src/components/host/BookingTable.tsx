// src/components/BookingTable.tsx
import React, { useEffect, useState } from "react";
import { fetchBookings, updateBookingStatus } from "@/api/bookingApi";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineRateReview } from "react-icons/md";
import HostReview from "@/components/modals/HostReviewModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginationItems from "@/components/ui/paginationItems";
import { Booking, ApiResponse } from "@/types/bookingTable";

const BookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<number | null>(null);
  const [currentGuestId, setCurrentGuestId] = useState<number | null>(null);
  const [currentBookingStatus, setCurrentBookingStatus] = useState<string>("");
  const [currentCheckoutDate, setCurrentCheckoutDate] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const openReviewModal = (booking: Booking) => {
    setCurrentBookingId(booking.id);
    setCurrentGuestId(booking.guest.id);
    setCurrentBookingStatus(booking.booking_status);
    setCurrentCheckoutDate(booking.checkout_date);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setCurrentBookingId(null);
    setCurrentGuestId(null);
    setCurrentBookingStatus("");
    setCurrentCheckoutDate("");
    setIsReviewModalOpen(false);
  };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBookings(statusFilter, currentPage);
        setBookings(data);
      } catch (error) {
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [statusFilter, currentPage]);

  const handleStatusChange = async (
    id: number,
    status: "confirm" | "reject"
  ) => {
    try {
      await updateBookingStatus(id, status);
      if (bookings) {
        const updatedBookings = bookings.items.map((booking) =>
          booking.id === id ? { ...booking, booking_status: status } : booking
        );
        setBookings({ ...bookings, items: updatedBookings });
      }
      setOpenDropdown(null);
    } catch (error: any) {
      console.error("Error updating booking status:", error);
      let errorMessage = "An error occurred while updating the booking status.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message[0].message;
      }
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setOpenDropdown(null);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return <div className="text-center py-4">Loading bookings...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="status-filter" className="text-gray-700 font-medium">
            Filter by status:
          </label>
          <div className="relative">
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleFilterChange}
              className="appearance-none p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value="">Default</option>
              <option value="pending">Pending</option>
              <option value="confirm">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="reject">Rejected</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7 7a1 1 0 011.707-.707l3.586 3.586a1 1 0 01-1.414 1.414L7 8.414A1 1 0 017 7zm0 6a1 1 0 011.707.707l3.586-3.586a1 1 0 011.414 1.414L7 12.414A1 1 0 017 13z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow mb-20">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Guest Name</th>
              <th className="py-2 px-4 border-b">Property Title</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
              <th className="py-3 px-4 border-b text-center">Review</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.items.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{booking.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {booking.guest.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {booking.property.title}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(booking.checkin_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(booking.checkout_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ${booking.total_amount}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.booking_status === "confirm"
                        ? "bg-green-100 text-green-800"
                        : booking.booking_status === "reject"
                        ? "bg-red-100 text-red-800"
                        : booking.booking_status === "cancelled"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.booking_status.charAt(0).toUpperCase() +
                      booking.booking_status.slice(1)}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === booking.id ? null : booking.id
                        )
                      }
                      className={`text-gray-500 hover:text-gray-700 focus:outline-none ${
                        booking.booking_status === "pending"
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      disabled={booking.booking_status !== "pending"}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        ></path>
                      </svg>
                    </button>
                    {openDropdown === booking.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "confirm")
                          }
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "reject")
                          }
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <MdOutlineRateReview
                    onClick={() => openReviewModal(booking)}
                    size={24}
                    className="cursor-pointer ml-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="md:hidden space-y-4">
        {bookings?.items.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">
              Booking ID: {booking.id}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Guest: {booking.guest.name}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Property: {booking.property.title}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Start Date: {new Date(booking.checkin_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              End Date: {new Date(booking.checkout_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Amount: ${booking.total_amount}
            </p>
            <p className="text-sm mb-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  booking.booking_status === "confirm"
                    ? "bg-green-100 text-green-800"
                    : booking.booking_status === "reject"
                    ? "bg-red-100 text-red-800"
                    : booking.booking_status === "cancelled"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {booking.booking_status.charAt(0).toUpperCase() +
                  booking.booking_status.slice(1)}
              </span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleStatusChange(booking.id, "confirm")}
                className="text-green-500 hover:text-green-700 focus:outline-none"
              >
                Confirm
              </button>
              <button
                onClick={() => handleStatusChange(booking.id, "reject")}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Reject
              </button>
            </div>
            <div className="text-center mt-4">
              <MdOutlineRateReview
                onClick={() => openReviewModal(booking)}
                size={24}
                className="cursor-pointer ml-4"
              />
            </div>
          </div>
        ))}
      </div>

      {isReviewModalOpen &&
        currentBookingId !== null &&
        currentGuestId !== null && (
          <HostReview
            isOpen={isReviewModalOpen}
            guestId={currentGuestId}
            booking_id={currentBookingId}
            onClose={closeReviewModal}
            booking_status={currentBookingStatus}
            checkout_date={currentCheckoutDate}
          />
        )}

      {/* Pagination */}
      {bookings && bookings.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="pr-[8px] cursor-pointer"
                />
              </PaginationItem>
            )}

            <PaginationItems
              totalPages={bookings.totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />

            {currentPage < bookings.totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="pl-[8px] cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BookingTable;
