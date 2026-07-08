import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MessageSquare, ShieldAlert, Award } from "lucide-react";
import { useMenu } from "../context/MenuContext";
import RatingStars from "../components/RatingStars";

export const Feedback = () => {
  const navigate = useNavigate();
  const { activeOrder, orderStatus, setFeedbackSubmitted, setActiveOrder, setOrderStatus } = useMenu();

  const [ratings, setRatings] = useState({
    overall: 5,
    food: 5,
    service: 5,
    staff: 5,
    cleanliness: 5
  });
  
  const [comment, setComment] = useState("");

  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set feedback submitted in context
    setFeedbackSubmitted(true);
    
    // Clear the active session/order now that feedback is submitted and meal is finished
    setActiveOrder(null);
    setOrderStatus("Pending");

    // Redirect to Thank You page
    navigate("/thank-you");
  };

  // Check if they have an active order or if it's served
  // For demo convenience, we allow entering even if not served but display a warning banner.
  const isServed = orderStatus === "Served";

  return (
    <div className="flex-1 flex flex-col pb-12 animate-fade-in bg-white max-w-2xl mx-auto w-full p-4 space-y-6">
      {/* Page Title */}
      <div className="text-center space-y-1">
        <span className="bg-secondary-teal/10 text-secondary-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Dining Experience
        </span>
        <h2 className="text-2xl font-bold font-serif text-primary-dark pt-2">
          Share Your Feedback
        </h2>
        <p className="text-xs text-muted-text">
          Help us improve your next visit. We appreciate your honest review!
        </p>
      </div>

      {!isServed && (
        <div className="flex gap-2.5 bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-left text-xs text-yellow-800">
          <ShieldAlert className="text-yellow-600 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="font-bold">Meal in Progress</h4>
            <p className="text-[10px] text-yellow-700 mt-0.5">
              Normally, feedback is submitted after your meal is served. We are showing this screen now for evaluation purposes.
            </p>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card-neutral rounded-2xl p-5 border border-gray-100 space-y-5">
          {/* Ratings Grid */}
          <div className="space-y-4">
            {/* Criteria 1: Overall */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/50 pb-3">
              <span className="text-sm font-bold text-primary-dark">Overall Experience</span>
              <RatingStars
                rating={ratings.overall}
                readOnly={false}
                onChange={(val) => handleRatingChange("overall", val)}
                size={24}
              />
            </div>

            {/* Criteria 2: Food Quality */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/50 pb-3">
              <span className="text-sm font-bold text-primary-dark">Food & Beverage Quality</span>
              <RatingStars
                rating={ratings.food}
                readOnly={false}
                onChange={(val) => handleRatingChange("food", val)}
                size={24}
              />
            </div>

            {/* Criteria 3: Service Speed */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/50 pb-3">
              <span className="text-sm font-bold text-primary-dark">Speed of Service</span>
              <RatingStars
                rating={ratings.service}
                readOnly={false}
                onChange={(val) => handleRatingChange("service", val)}
                size={24}
              />
            </div>

            {/* Criteria 4: Staff Friendliness */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/50 pb-3">
              <span className="text-sm font-bold text-primary-dark">Staff Friendliness</span>
              <RatingStars
                rating={ratings.staff}
                readOnly={false}
                onChange={(val) => handleRatingChange("staff", val)}
                size={24}
              />
            </div>

            {/* Criteria 5: Cleanliness */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <span className="text-sm font-bold text-primary-dark">Ambience & Cleanliness</span>
              <RatingStars
                rating={ratings.cleanliness}
                readOnly={false}
                onChange={(val) => handleRatingChange("cleanliness", val)}
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Comment Box */}
        <div className="space-y-2 text-left">
          <label
            htmlFor="comment"
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-text"
          >
            <MessageSquare size={14} className="text-secondary-teal" />
            Comments or Suggestions
          </label>
          <textarea
            id="comment"
            rows="4"
            placeholder="Tell us what you liked, or where we can improve..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-sm text-body-text border border-gray-200 rounded-xl p-3 bg-card-neutral focus:outline-none focus:border-accent transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-accent/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm font-sans"
        >
          <Award size={16} />
          Submit Feedback & Close Session
        </button>
      </form>
    </div>
  );
};

export default Feedback;
