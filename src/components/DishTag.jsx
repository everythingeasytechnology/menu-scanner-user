import React from "react";

export const DishTag = ({ tag, className = "" }) => {
  const getTagStyles = () => {
    switch (tag.toLowerCase()) {
      case "best seller":
        return "bg-secondary-teal/10 text-secondary-teal border border-secondary-teal/20";
      case "recommended":
        return "bg-card-warm text-accent border border-accent/20";
      case "today's special":
      case "todays special":
        return "bg-accent text-white shadow-sm shadow-accent/20";
      default:
        return "bg-card-neutral text-muted-text border border-gray-200";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full inline-block ${getTagStyles()} ${className}`}
    >
      {tag}
    </span>
  );
};

export default DishTag;
