import React from "react";
import { BRAND } from "../config/brand";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-primary-dark text-white/90 py-8 px-6 text-center border-t border-white/10">
      <div className="max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center text-white font-serif font-bold text-sm">
            {BRAND.companyName ? BRAND.companyName.charAt(0) : "E"}
          </div>
          <span className="font-serif font-semibold text-white tracking-wide">
            {BRAND.companyName}
          </span>
        </div>
        <p className="text-xs text-white/60">
          {BRAND.tagline}
        </p>
        <div className="h-px bg-white/10 my-4" />
        <p className="text-[10px] text-white/40 tracking-wider">
          © {new Date().getFullYear()} {BRAND.companyName}. All rights reserved.
        </p>
        <p className="text-[9px] text-white/30 italic">
          Powered by {BRAND.companyName} Technology {BRAND.tagline}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
