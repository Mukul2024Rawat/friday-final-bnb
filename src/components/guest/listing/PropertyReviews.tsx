// components/PropertyReviews.tsx

import React from 'react';
import { PropertyDetail } from '../../../interfaces/guest/listing/interface';
import { sampleReviews } from '../../../utils/staticData'

interface PropertyReviewsProps {
  property: PropertyDetail;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ property }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">★ {property.rating} · {property.reviewCount} reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleReviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">{review.authorName}</span>
              <span className="text-gray-500">{review.date}</span>
            </div>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 border border-gray-900 rounded-lg px-4 py-2 font-semibold">
        Show all {property.reviewCount} reviews
      </button>
    </div>
  );
};

export default PropertyReviews;