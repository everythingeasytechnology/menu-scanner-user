import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowLeft, Receipt, MessageSquare, AlertCircle } from "lucide-react";
import { useMenu } from "../context/MenuContext";
import VegBadge from "../components/VegBadge";

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    updateCartInstructions,
    removeFromCart,
    getCartTotal,
    activeOrder,
    placeOrder,
    addMoreToOrder
  } = useMenu();

  const [editingItemId, setEditingItemId] = useState(null);
  const [tempInstructions, setTempInstructions] = useState("");

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const serviceCharge = Math.round(subtotal * 0.05 * 100) / 100;
  const total = Math.round((subtotal + tax + serviceCharge) * 100) / 100;

  const handleEditInstructions = (item) => {
    setEditingItemId(item.id);
    setTempInstructions(item.instructions || "");
  };

  const handleSaveInstructions = (itemId) => {
    updateCartInstructions(itemId, tempInstructions);
    setEditingItemId(null);
  };

  const handlePlaceOrder = () => {
    if (activeOrder) {
      // If there is an active session order, add these items to the table session
      addMoreToOrder();
      navigate("/active-session");
    } else {
      // Otherwise place a new order
      placeOrder();
      navigate("/order-status");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fade-in bg-white">
        <div className="w-16 h-16 rounded-full bg-card-neutral flex items-center justify-center text-muted-text">
          <Trash2 size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-serif text-primary-dark">Your cart is empty</h3>
          <p className="text-xs text-muted-text max-w-[240px]">
            Add some delicious dishes from our digital menu to get started.
          </p>
        </div>
        <button
          onClick={() => navigate("/menu")}
          className="bg-accent hover:bg-accent/90 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all duration-200 shadow-md shadow-accent/20 active:scale-95 cursor-pointer"
        >
          View Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-12 animate-fade-in bg-white max-w-2xl mx-auto w-full p-4">
      {/* Back to Menu */}
      <button
        onClick={() => navigate("/menu")}
        className="flex items-center gap-1.5 text-xs font-bold text-accent mb-4 cursor-pointer hover:underline"
      >
        <ArrowLeft size={14} />
        Add more items
      </button>

      <h2 className="text-xl font-bold font-serif text-primary-dark mb-4">
        Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
      </h2>

      {/* Warning if adding to active session */}
      {activeOrder && (
        <div className="flex gap-2.5 bg-card-warm border border-accent/25 p-3 rounded-xl mb-4 text-left">
          <AlertCircle className="text-accent shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-xs font-bold text-primary-dark">Active Session Detected</h4>
            <p className="text-[10px] text-muted-text mt-0.5">
              You already have a placed order. Placing this order will append these new items to Table {activeOrder.table}.
            </p>
          </div>
        </div>
      )}

      {/* Cart Items List */}
      <div className="space-y-3.5 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-card-neutral rounded-xl p-3 border border-gray-100 flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-3">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover bg-gray-50 border border-gray-200/50"
              />
              
              {/* Item Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <VegBadge isVeg={item.isVeg} className="scale-75" />
                  <h4 className="text-sm font-bold font-serif text-primary-dark leading-tight line-clamp-1">
                    {item.name}
                  </h4>
                </div>
                <p className="text-xs font-semibold text-primary-dark mt-0.5">
                  ₹{item.price}
                </p>
              </div>

              {/* Stepper controls */}
              <div className="flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden h-8">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="px-2.5 h-full hover:bg-gray-100 text-primary-dark flex items-center justify-center stepper-btn cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={12} />
                </button>
                <span className="px-3 text-xs font-bold text-primary-dark select-none min-w-[24px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="px-2.5 h-full hover:bg-gray-100 text-primary-dark flex items-center justify-center stepper-btn cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Delete Icon */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Special Instructions display / edit */}
            <div className="border-t border-gray-200/50 pt-2 text-left">
              {editingItemId === item.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempInstructions}
                    onChange={(e) => setTempInstructions(e.target.value)}
                    placeholder="Instructions (e.g. extra spicy)"
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-accent"
                  />
                  <button
                    onClick={() => handleSaveInstructions(item.id)}
                    className="bg-secondary-teal text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-secondary-teal/90 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-text font-medium italic">
                    <MessageSquare size={12} />
                    {item.instructions ? (
                      <span className="text-body-text not-italic">"{item.instructions}"</span>
                    ) : (
                      <span>No instructions added</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditInstructions(item)}
                    className="text-accent font-bold hover:underline cursor-pointer"
                  >
                    {item.instructions ? "Edit" : "Add Note"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bill Receipt Card */}
      <div className="bg-card-neutral rounded-2xl p-4 border border-gray-100 space-y-3.5 mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-text border-b border-gray-200/50 pb-2">
          <Receipt size={14} className="text-secondary-teal" />
          Order Summary Breakdown
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-muted-text">
            <span>Subtotal</span>
            <span className="font-semibold text-primary-dark">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-text">
            <span>GST (5% Total Tax)</span>
            <span className="font-semibold text-primary-dark">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-text">
            <span>Service Charge (5%)</span>
            <span className="font-semibold text-primary-dark">₹{serviceCharge.toFixed(2)}</span>
          </div>
          
          <div className="h-px bg-gray-200 my-2" />
          
          <div className="flex justify-between text-sm font-extrabold text-primary-dark">
            <span>Grand Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-accent/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm"
      >
        Place Order • ₹{total.toFixed(2)}
      </button>
    </div>
  );
};

export default Cart;
