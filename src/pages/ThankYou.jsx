import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Home, RefreshCw } from "lucide-react";
import { BRAND } from "../config/brand";
import { useMenu } from "../context/MenuContext";

export const ThankYou = () => {
  const navigate = useNavigate();
  const { setTableNumber, setFeedbackSubmitted } = useMenu();

  const handleReturnHome = () => {
    // Clear everything and return to landing page
    setTableNumber(null);
    setFeedbackSubmitted(false);
    navigate("/landing");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center animate-fade-in bg-white max-w-md mx-auto w-full space-y-6">
      {/* Heart animation icon */}
      <div className="w-20 h-20 rounded-full bg-card-warm flex items-center justify-center text-accent relative">
        <Heart size={36} className="fill-accent text-accent animate-pulse-subtle" />
        {/* Particle circles */}
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent/30 animate-ping" />
        <span className="absolute bottom-3 left-2 w-3 h-3 rounded-full bg-secondary-teal/20 animate-bounce" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-serif text-primary-dark tracking-tight">
          Thank You!
        </h2>
        <p className="text-sm font-medium text-secondary-teal">
          Your feedback has been submitted successfully
        </p>
      </div>

      <p className="text-xs text-muted-text max-w-xs leading-relaxed">
        We hope you enjoyed dining at <span className="font-semibold text-primary-dark">{BRAND.companyName}</span>. Your valuable feedback helps us refine our recipes and maintain our exceptional service standards.
      </p>

      <div className="h-px bg-gray-100 w-full my-2" />

      <div className="flex flex-col gap-2.5 w-full">
        <button
          onClick={handleReturnHome}
          className="w-full bg-primary-dark hover:bg-primary-dark/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-xs"
        >
          <Home size={14} />
          Return to Scan Screen
        </button>
        
        <button
          onClick={() => navigate("/menu")}
          className="w-full border border-gray-300 bg-white hover:bg-card-neutral text-primary-dark font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-xs"
        >
          <RefreshCw size={14} />
          Re-open Digital Menu
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
