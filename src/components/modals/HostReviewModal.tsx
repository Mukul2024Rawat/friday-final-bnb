import React, { useState, useEffect, FormEvent, useCallback } from "react";
import { AiFillStar } from "react-icons/ai";
import { timeDifference } from "@/utils/dateUtils";
import Loader from "@/components/modals/Loader";
import { fetchHostReviews, submitHostReview } from "@/api";
import toast from "react-hot-toast";
import StarRating from "@/components/modals/StarRating";
import { Review } from "@/types/review";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import PaginationItems from "@/components/ui/paginationItems";

const HostReview = ({
  isOpen,
  onClose,
  guestId,
  booking_id,
  booking_status,
  checkout_date,
}: {
  isOpen: boolean;
  onClose: () => void;
  guestId: number;
  booking_id: number;
  booking_status: string;
  checkout_date: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [guestRating, setGuestRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const { data, meta } = await fetchHostReviews(guestId, page);
      setReviews(data);
      setTotalPages(meta.total_pages);
    } catch (error: any) {
      setErrors(
        error?.response?.data?.message?.map((msg: { property: string; message: string }) => `${msg.message}`) ||
          ["An unexpected error occurred. Please try again later."]
      );
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  useEffect(() => {
    if (isOpen) {
      fetchReviews(currentPage);
    }
  }, [isOpen, fetchReviews, currentPage]);

  const handleRatingChange = (newRating: number) => {
    setGuestRating(newRating);
    clearErrors();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    clearErrors();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!booking_id) return;

    setLoading(true);
    try {
      const reviewData = {
        guest_rating: guestRating,
        comments: comment,
        booking_id,
      };
      await submitHostReview(reviewData);
      resetForm();
      onClose();
      toast.success("Review submitted successfully!");
    } catch (error: any) {
      setErrors(
        error?.response?.data?.message?.map((msg: { property: string; message: string }) => `${msg.message}`) ||
          ["An unexpected error occurred. Please try again later."]
      );
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const resetForm = () => {
    setGuestRating(0);
    setComment("");
    setErrors([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isPastCheckoutDate = (checkoutDate: string) => {
    const today = new Date();
    const checkout = new Date(checkoutDate);
    return today > checkout;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal relative bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] flex flex-col">
        <button
          className="absolute text-2xl top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-6">Host Reviews</h2>

        {loading ? (
          <Loader />
        ) : reviews.length > 0 ? (
          <div className="flex-1 overflow-y-auto mb-4">
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="mb-4 border p-2 px-4 rounded-lg">
                  <h2 className="text-xl font-bold font-sans">
                    {review.host.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {timeDifference(review.created_at)}
                  </p>
                  <div className="flex items-center">
                    {[...Array(review.guest_rating)].map((_, index) => (
                      <AiFillStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="mt-2">{review.comments}</p>
                </li>
              ))}
            </ul>
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
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="pl-[8px] cursor-pointer"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        ) : (
          <p>No reviews available.</p>
        )}

        {booking_status === "confirm" && isPastCheckoutDate(checkout_date) && (
          <div className="p-2 bg-gray-100 rounded-lg mt-auto">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4 mt-2">Post Your Review</h2>
              {errors.length > 0 && (
                <div className="bg-red-500 text-white p-3 mb-2 rounded">
                  <p>Error Occurred:</p>
                  <ul className="list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mb-2">
                <StarRating
                  ratingName="Guest Rating"
                  ratingValue={guestRating}
                  onChange={handleRatingChange}
                />
              </div>
              <label className="block mb-4">
                Comment:
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  className="block w-full mt-1 border border-blue-900 rounded-lg p-1"
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className={`bg-rose-500 text-white px-4 py-2 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostReview;