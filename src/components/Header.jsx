import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Info, HelpCircle } from "lucide-react";
import { BRAND } from "../config/brand";
import { useMenu } from "../context/MenuContext";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableNumber } = useMenu();

  const isHome = location.pathname === "/" || location.pathname === "/menu";
  const isLanding = location.pathname === "/landing";

  const handleBack = () => {
    if (location.pathname.startsWith("/item/")) {
      navigate("/menu");
    } else {
      navigate(-1);
    }
  };

  if (isLanding) return null; // No header on landing page

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-soft">
      <div className="flex items-center gap-3">
        {!isHome && (
          <button
            onClick={handleBack}
            className="p-1.5 rounded-full hover:bg-card-neutral text-primary-dark transition-colors duration-200"
            aria-label="Go back"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        
        <div className="flex items-center gap-2">
          {/* Mock Logo or Initial */}
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm shadow-accent/20">
            {BRAND.companyName ? BRAND.companyName.charAt(0) : "E"}
          </div>
          <div>
            <h1 className="text-base font-bold leading-none font-serif text-primary-dark tracking-tight">
              {BRAND.companyName}
            </h1>
            <p className="text-[10px] text-muted-text mt-0.5 font-sans font-medium tracking-wider uppercase">
              {BRAND.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {tableNumber && (
          <div className="bg-card-warm border border-accent/20 px-3 py-1 rounded-full text-xs font-semibold text-accent flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Table {tableNumber}
          </div>
        )}
        <button 
          onClick={() => navigate("/active-session")}
          className="p-1.5 rounded-full hover:bg-card-neutral text-primary-dark transition-colors duration-200"
          title="Session Info"
        >
          <Info size={20} className="text-secondary-teal" />
        </button>
      </div>
    </header>
  );
};

export default Header;
