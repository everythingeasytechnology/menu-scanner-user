import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, ArrowLeft, Clock, Star, MessageSquare } from "lucide-react";
import { DISHES } from "../data/mockMenu";
import { useMenu } from "../context/MenuContext";
import VegBadge from "../components/VegBadge";
import DishTag from "../components/DishTag";
import RatingStars from "../components/RatingStars";

export const ItemDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateCartQuantity, updateCartInstructions } = useMenu();

  const dish = DISHES.find((d) => d.id === itemId);

  // Check if item is already in the cart
  const cartItem = cart.find((item) => item.id === itemId);

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setInstructions(cartItem.instructions || "");
    }
  }, [cartItem]);

  if (!dish) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-sm font-semibold text-primary-dark">Item not found</p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-accent text-white py-2 px-4 rounded-xl text-xs font-semibold"
        >
          Go Back to Menu
        </button>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAction = () => {
    if (cartItem) {
      // Update existing item in cart
      updateCartQuantity(dish.id, quantity);
      updateCartInstructions(dish.id, instructions);
    } else {
      // Add new item to cart
      addToCart(dish.id, quantity, instructions);
    }
    navigate("/menu");
  };

  return (
    <div className="flex-1 flex flex-col pb-12 animate-fade-in bg-white">
      {/* Top Banner Image Section */}
      <div className="relative w-full h-72 md:h-96 bg-gray-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-dark p-2 rounded-full hover:bg-white shadow-md active:scale-95 transition-all duration-200"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <VegBadge
          isVeg={dish.isVeg}
          className="absolute bottom-4 left-4 shadow-md bg-white p-1"
        />
      </div>

      {/* Details container */}
      <div className="p-5 space-y-6 max-w-2xl mx-auto w-full">
        {/* Header and badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {dish.tags.map((tag) => (
              <DishTag key={tag} tag={tag} />
            ))}
          </div>
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-2xl font-bold font-serif text-primary-dark leading-tight">
              {dish.name}
            </h2>
            <span className="text-xl font-extrabold text-primary-dark">
              ₹{dish.price}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-text border-y border-gray-100 py-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-accent text-accent" />
              <span className="font-bold text-primary-dark">{dish.rating} Rating</span>
            </div>
            <div className="w-px h-3 bg-gray-200" />
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-secondary-teal" />
              <span>{dish.prepTime} Prep Time</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text">
            Description
          </h4>
          <p className="text-sm text-body-text leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Special Instructions Field */}
        <div className="space-y-2">
          <label
            htmlFor="instructions"
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-text"
          >
            <MessageSquare size={14} className="text-secondary-teal" />
            Special Instructions
          </label>
          <textarea
            id="instructions"
            rows="3"
            placeholder="E.g., No onions, extra spicy, gluten-free, keep dressing separate..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full text-sm text-body-text border border-gray-200 rounded-xl p-3 bg-card-neutral focus:outline-none focus:border-accent transition-all duration-200 resize-none"
          />
        </div>

        {/* Stepper & Action button */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
          {/* Stepper */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm h-12">
            <button
              onClick={handleDecrement}
              className="px-4 h-full bg-card-neutral hover:bg-gray-200 text-primary-dark flex items-center justify-center stepper-btn cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-5 font-bold text-sm text-primary-dark min-w-[50px] text-center select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-4 h-full bg-card-neutral hover:bg-gray-200 text-primary-dark flex items-center justify-center stepper-btn cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Action CTA Button */}
          <button
            onClick={handleAction}
            className="w-full sm:flex-1 h-12 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-accent/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm"
          >
            {cartItem ? "Update Cart Item" : `Add to Cart • ₹${dish.price * quantity}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
