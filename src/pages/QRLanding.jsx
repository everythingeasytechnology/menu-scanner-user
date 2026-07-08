import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Navigation, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { BRAND } from "../config/brand";
import { useMenu } from "../context/MenuContext";

export const QRLanding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { 
    locationState, 
    verifyLocation, 
    initializeTableSession,
    tableNumber 
  } = useMenu();

  const [localTable, setLocalTable] = useState("3");

  // Read table number from query parameter (e.g. ?table=5)
  useEffect(() => {
    const queryTable = searchParams.get("table") || searchParams.get("t");
    if (queryTable) {
      setLocalTable(queryTable);
      initializeTableSession(queryTable);
    } else {
      initializeTableSession(localTable);
    }
  }, [searchParams]);

  const handleVerify = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          verifyLocation(position.coords.latitude, position.coords.longitude, false);
        },
        (error) => {
          // If Geolocation fails or is blocked, simulate out-of-range/blocked
          verifyLocation(null, null, false);
        }
      );
    } else {
      // Browser doesn't support geolocation
      verifyLocation(null, null, false);
    }
  };

  const handleDemoOverride = () => {
    // Force validation for demo purposes
    verifyLocation(12.9716, 77.5946, true);
  };

  useEffect(() => {
    if (locationState.validated) {
      // Store session and navigate to home menu
      const timer = setTimeout(() => {
        navigate("/menu");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [locationState.validated, navigate]);

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col justify-between p-6 text-white animate-fade-in">
      {/* Top Section */}
      <div className="flex flex-col items-center text-center mt-12 space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-white font-serif font-bold text-4xl shadow-lg shadow-accent/25">
          {BRAND.companyName ? BRAND.companyName.charAt(0) : "E"}
        </div>
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight text-white">
            {BRAND.companyName}
          </h1>
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mt-1">
            {BRAND.tagline}
          </p>
        </div>
      </div>

      {/* Middle Interactive State Card */}
      <div className="my-auto max-w-sm w-full mx-auto bg-white text-body-text rounded-2xl p-6 shadow-soft-lg space-y-6">
        <div className="text-center">
          <span className="bg-card-warm text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Table Connection
          </span>
          <h2 className="text-xl font-bold mt-3 font-serif text-primary-dark">
            Welcome to Table {tableNumber || localTable}
          </h2>
          <p className="text-xs text-muted-text mt-1">
            To view the digital menu and place orders, we need to verify you are at the table.
          </p>
        </div>

        {/* State Display */}
        {locationState.loading && (
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-sm font-medium text-muted-text">Verifying your location...</p>
          </div>
        )}

        {!locationState.loading && !locationState.requested && (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-3 bg-card-neutral p-4 rounded-xl border border-gray-100">
              <MapPin className="text-secondary-teal shrink-0 animate-pulse-subtle" size={28} />
              <div className="text-left">
                <h4 className="text-xs font-bold text-primary-dark">Location Access Required</h4>
                <p className="text-[10px] text-muted-text mt-0.5">
                  We check your location to match you with Table {tableNumber || localTable}.
                </p>
              </div>
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-primary-dark hover:bg-primary-dark/90 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-95"
            >
              <Navigation size={18} />
              Verify Table Location
            </button>
          </div>
        )}

        {locationState.validated && (
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-green-600">Location Verified!</p>
              <p className="text-xs text-muted-text mt-1">Opening digital menu...</p>
            </div>
          </div>
        )}

        {locationState.denied && (
          <div className="space-y-4 py-2 animate-slide-up">
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 rounded-xl">
              <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={24} />
              <div className="text-left">
                <h4 className="text-xs font-bold text-red-700">Access Denied - Out of Range</h4>
                <p className="text-[10px] text-red-600 mt-1 leading-relaxed">
                  You appear to be away from the premises. Please scan the QR code at your table to access the menu.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleVerify}
                className="flex-1 border border-gray-300 hover:bg-card-neutral font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95"
              >
                Retry Scan
              </button>
              <button
                onClick={handleDemoOverride}
                className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md shadow-accent/15 active:scale-95"
              >
                Demo Override
              </button>
            </div>
          </div>
        )}

        {/* Demo Assistant helper inside the card */}
        {!locationState.validated && !locationState.loading && (
          <div className="border-t border-gray-100 pt-4 flex flex-col items-center space-y-2">
            <p className="text-[10px] text-muted-text text-center">
              Testing locally? Force access by scanning Table 5 (with an active session) or Table 3:
            </p>
            <div className="flex gap-1.5 w-full">
              <button
                onClick={() => {
                  setLocalTable("3");
                  initializeTableSession("3");
                  handleDemoOverride();
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-colors ${
                  localTable === "3" 
                    ? "bg-primary-dark text-white border-primary-dark" 
                    : "bg-white text-muted-text border-gray-200 hover:bg-card-neutral"
                }`}
              >
                Table 3 (New)
              </button>
              <button
                onClick={() => {
                  setLocalTable("5");
                  initializeTableSession("5");
                  handleDemoOverride();
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-colors ${
                  localTable === "5" 
                    ? "bg-primary-dark text-white border-primary-dark" 
                    : "bg-white text-muted-text border-gray-200 hover:bg-card-neutral"
                }`}
              >
                Table 5 (Active)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="text-center mb-4 space-y-1">
        <p className="text-xs text-white/40">
          Powered by {BRAND.companyName} Technology
        </p>
        <p className="text-[10px] text-white/30 font-light">
          No sign-in required. Secure end-to-end local session ordering.
        </p>
      </div>
    </div>
  );
};

export default QRLanding;
