import React, { useState } from "react";
import { Star } from "lucide-react";

export const RatingStars = ({
  rating,
  onChange,
  maxStars = 5,
  size = 20,
  className = "",
  readOnly = true
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readOnly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;
        
        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-150 ${
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            }`}
          >
            <Star
              size={size}
              className={`${
                isFilled
                  ? "fill-accent text-accent"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
      {readOnly && rating > 0 && (
        <span className="text-xs font-semibold text-muted-text ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
