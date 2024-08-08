import PropertyModal from "@/components/modals/PropertyReviews";
import { Review } from "@/types/property";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";

interface ReviewsProps {
  reviews: Review[];
  propertyId: number;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const maxStars = 5; 

  return (
    <div className="p-4 border rounded relative">
      <div className="flex items-center mb-2">
        <Image
          src={'/profile.jpg'}
          alt={review.guest.name}
          width={48}
          height={48}
          className="rounded-full mr-3"
        />
        <div>
          <h4 className="text-lg font-semibold">{review.guest.name}</h4>
          <p className="text-sm text-gray-600">
            {new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="absolute right-4 top-4 flex">
          {[...Array(maxStars)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-xl ${i < review.overall ? 'text-yellow-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{review.comments}</p>
    </div>
  );
};

const Reviews: React.FC<ReviewsProps> = ({ reviews, propertyId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="review">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
        {reviews.slice(0, 4).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      <button 
        className="border border-gray-300 px-4 py-2 rounded-lg mt-2"
        onClick={() => setIsModalOpen(true)}
      >
        Show all reviews
      </button>

     { isModalOpen && <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={propertyId}
      />}
    </div>
  );
};

export default Reviews;
