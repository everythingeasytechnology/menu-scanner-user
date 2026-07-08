import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import { CATEGORIES, DISHES } from "../data/mockMenu";
import { useMenu } from "../context/MenuContext";
import VegBadge from "../components/VegBadge";
import DishTag from "../components/DishTag";
import RatingStars from "../components/RatingStars";

export const MenuHome = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    addToCart, 
    getCartCount, 
    getCartTotal, 
    tableNumber 
  } = useMenu();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all"); // "all", "veg", "non-veg"

  // Filters dishes based on search query, category, and dietary preference
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchesCategory = activeCategory === "all" || dish.category === activeCategory;
      const matchesSearch = 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesDiet = true;
      if (dietFilter === "veg") {
        matchesDiet = dish.isVeg === true;
      } else if (dietFilter === "non-veg") {
        matchesDiet = dish.isVeg === false;
      }

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, dietFilter]);

  const handleAddDirectly = (e, dish) => {
    e.stopPropagation(); // Avoid navigating to details page
    addToCart(dish.id, 1, "");
  };

  const handleCardClick = (dishId) => {
    navigate(`/item/${dishId}`);
  };

  return (
    <div className="flex-1 flex flex-col pb-24 animate-fade-in bg-white">
      {/* Search Header Container */}
      <div className="bg-card-neutral p-4 border-b border-gray-100 space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-body-text border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent transition-all duration-200"
          />
          <Search className="absolute left-3.5 top-3 text-muted-text" size={18} />
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === category.id
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "bg-white text-muted-text border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Dietary Preference Filter Bar */}
        <div className="flex items-center justify-between border-t border-gray-200/50 pt-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">Diet Option:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDietFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                dietFilter === "all"
                  ? "bg-primary-dark text-white border-primary-dark shadow-sm"
                  : "bg-white text-muted-text border-gray-200 hover:bg-gray-50"
              }`}
            >
              Show All
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                dietFilter === "veg"
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-green-700 border-green-200 hover:bg-green-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Veg Only
            </button>
            <button
              onClick={() => setDietFilter("non-veg")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                dietFilter === "non-veg"
                  ? "bg-red-600 text-white border-red-600 shadow-sm"
                  : "bg-white text-red-700 border-red-200 hover:bg-red-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Non-Veg Only
            </button>
          </div>
        </div>
      </div>

      {/* Dishes List */}
      <div className="flex-1 p-4 max-w-5xl mx-auto w-full">
        {filteredDishes.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-sm font-semibold text-primary-dark">No dishes found</p>
            <p className="text-xs text-muted-text">Try searching for something else or changing categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => handleCardClick(dish.id)}
                className="bg-card-neutral rounded-2xl border border-gray-100 overflow-hidden flex flex-row p-3 gap-3 cursor-pointer hover:border-accent/30 hover:shadow-soft transition-all duration-200 active:scale-[0.99]"
              >
                {/* Image Section */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <VegBadge
                    isVeg={dish.isVeg}
                    className="absolute top-2 left-2 shadow-sm bg-white"
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {dish.tags.map((tag) => (
                        <DishTag key={tag} tag={tag} />
                      ))}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold font-serif text-primary-dark leading-tight line-clamp-1">
                      {dish.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={dish.rating} size={14} />
                      <span className="text-[10px] text-muted-text">• {dish.prepTime}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-text line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100/50">
                    <span className="text-xs sm:text-sm font-bold text-primary-dark">
                      ₹{dish.price}
                    </span>

                    {/* Quantity control / Add button */}
                    <button
                      onClick={(e) => handleAddDirectly(e, dish)}
                      className="bg-white hover:bg-accent hover:text-white border border-accent text-accent font-bold text-[10px] sm:text-xs py-1 px-3 sm:px-4 rounded-lg transition-all duration-200 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent z-40">
          <div className="max-w-md mx-auto bg-primary-dark text-white rounded-2xl p-4 flex items-center justify-between shadow-soft-lg animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center relative">
                <ShoppingBag size={20} className="text-white" />
                <span className="absolute -top-1.5 -right-1.5 bg-secondary-teal text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary-dark">
                  {getCartCount()}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs text-white/70 font-medium">Cart Summary</p>
                <p className="text-sm font-bold text-white">₹{getCartTotal()}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="bg-accent hover:bg-accent/90 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-colors duration-200 shadow-md shadow-accent/15 cursor-pointer"
            >
              View Cart
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuHome;
