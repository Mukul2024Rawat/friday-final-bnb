import React, { useState, FormEvent } from "react";
import Modal from "./Modal";
import { submitGuestReview } from "@/api/index";
import toast from "react-hot-toast";
import { Ratings, ReviewModalProps } from "@/types/review";
import StarRating from "./StarRating";

const ratingNames = {
  cleaning: "Cleaning",
  accuracy: "Accuracy",
  checkin: "Check-in",
  communication: "Communication",
  location: "Location",
  value_for_money: "Value for Money",
};

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, booking_id }) => {
  const [ratings, setRatings] = useState<Ratings>({
    cleaning: 0,
    accuracy: 0,
    checkin: 0,
    communication: 0,
    location: 0,
    value_for_money: 0,
  });
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleRatingChange = (ratingName: keyof Ratings, newRating: number) => {
    setRatings((prevRatings) => ({ ...prevRatings, [ratingName]: newRating }));
    clearErrors();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    clearErrors();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!booking_id) return;

    setIsLoading(true);
    try {
      const reviewData = {
        ...ratings,
        comments: comment,
        booking_id,
      };
      await submitGuestReview(reviewData);
      resetForm();
      onClose();
      toast.success("Review submitted successfully!");
    } catch (error: any) {
      const errorMessages = error?.response?.data?.message?.map(
        (msg: any) => msg.message
      ) || ["Failed to submit review. Please try again."];
      setErrors(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const resetForm = () => {
    setRatings({
      cleaning: 0,
      accuracy: 0,
      checkin: 0,
      communication: 0,
      location: 0,
      value_for_money: 0,
    });
    setComment("");
    setErrors([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Review Property"
      body={
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div
              className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap">
            {Object.keys(ratingNames).map((ratingKey) => (
              <StarRating
                key={ratingKey}
                ratingName={ratingNames[ratingKey as keyof typeof ratingNames]}
                ratingValue={ratings[ratingKey as keyof Ratings]}
                onChange={(newRating) =>
                  handleRatingChange(ratingKey as keyof Ratings, newRating)
                }
              />
            ))}
          </div>
          <label className="block mb-4">
            Comment:
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="block w-full mt-1 border border-blue-900 rounded-lg p-1"
            />
          </label>
        </form>
      }
      actionLabel="Submit Review"
      disabled={isLoading}
    />
  );
};

export default ReviewModal;
