import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BRAND } from "./config/brand";

// Pages
import QRLanding from "./pages/QRLanding";
import MenuHome from "./pages/MenuHome";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import ActiveSession from "./pages/ActiveSession";
import OrderStatus from "./pages/OrderStatus";
import Feedback from "./pages/Feedback";
import ThankYou from "./pages/ThankYou";

function App() {
  // Inject document title and description dynamically on mount
  useEffect(() => {
    document.title = `${BRAND.companyName} | ${BRAND.tagline}`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = `Welcome to the ${BRAND.companyName} ${BRAND.tagline}. View our menu and place orders from your table.`;
  }, []);

  return (
    <MenuProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans antialiased text-body-text">
          {/* Main Layout Container (Centered, responsive mobile frame on mobile, expands on tablet/desktop) */}
          <div className="w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-white min-h-screen flex flex-col shadow-soft-lg border-x border-gray-100 relative">
            <Header />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/landing" element={<QRLanding />} />
                <Route path="/menu" element={<MenuHome />} />
                <Route path="/item/:itemId" element={<ItemDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/active-session" element={<ActiveSession />} />
                <Route path="/order-status" element={<OrderStatus />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/thank-you" element={<ThankYou />} />
                
                {/* Fallback routing */}
                <Route path="*" element={<Navigate to="/landing?table=3" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </MenuProvider>
  );
}

export default App;
