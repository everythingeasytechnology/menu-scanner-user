import React from "react";

export const VegBadge = ({ isVeg, className = "" }) => {
  return (
    <div
      className={`inline-flex items-center justify-center border-2 w-5 h-5 p-[2px] rounded ${
        isVeg ? "border-green-600 bg-green-50" : "border-red-600 bg-red-50"
      } ${className}`}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full ${
          isVeg ? "bg-green-600" : "bg-red-600"
        }`}
      />
    </div>
  );
};

export default VegBadge;
