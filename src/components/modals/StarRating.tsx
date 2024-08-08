import React from "react";
import StarRatings from "react-star-ratings";

interface StarRatingProps {
  ratingName: string;
  ratingValue: number;
  onChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ ratingName, ratingValue, onChange }) => {
  return (
    <div className="mb-4 w-1/2">
      <label className="block mb-1 capitalize">{ratingName}:</label>
      <StarRatings
        rating={ratingValue}
        starRatedColor="green"
        changeRating={onChange}
        numberOfStars={5}
        name={ratingName}
        starDimension="20px"
        starSpacing="2px"
      />
    </div>
  );
};

export default StarRating;
