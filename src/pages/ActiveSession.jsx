import React from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, ShoppingBag, ArrowRight, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useMenu } from "../context/MenuContext";
import VegBadge from "../components/VegBadge";

export const ActiveSession = () => {
  const navigate = useNavigate();
  const { activeOrder, orderStatus, tableNumber } = useMenu();

  const handleAddMore = () => {
    navigate("/menu");
  };

  const handleTrackLive = () => {
    navigate("/order-status");
  };

  const handleFeedback = () => {
    navigate("/feedback");
  };

  if (!activeOrder) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fade-in bg-white">
        <div className="w-16 h-16 rounded-full bg-card-neutral flex items-center justify-center text-muted-text">
          <ShoppingBag size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-serif text-primary-dark">No Active Session</h3>
          <p className="text-xs text-muted-text max-w-[240px]">
            You don't have any placed orders for this table session yet.
          </p>
        </div>
        <button
          onClick={() => navigate("/menu")}
          className="bg-accent hover:bg-accent/90 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all duration-200 shadow-md cursor-pointer"
        >
          View Menu
        </button>
      </div>
    );
  }

  const isServed = orderStatus === "Served";

  return (
    <div className="flex-1 flex flex-col pb-12 animate-fade-in bg-white max-w-2xl mx-auto w-full p-4 space-y-6">
      {/* Session Title */}
      <div className="text-center space-y-1">
        <span className="bg-secondary-teal/10 text-secondary-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Active Table Session
        </span>
        <h2 className="text-2xl font-bold font-serif text-primary-dark pt-2">
          Table {tableNumber || activeOrder.table} Order Summary
        </h2>
        <p className="text-xs text-muted-text">
          Order ID: {activeOrder.id} • Placed at {activeOrder.time}
        </p>
      </div>

      {/* Current Status Banner */}
      <div className="bg-card-neutral rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <ChefHat size={20} className={orderStatus === "Preparing" ? "animate-bounce" : ""} />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-text font-medium">Order Status</p>
            <p className="text-sm font-bold text-primary-dark">{orderStatus}</p>
          </div>
        </div>

        <button
          onClick={handleTrackLive}
          className="text-xs font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer"
        >
          Track Live
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Placed Items List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-text text-left pl-1">
          Items in this session
        </h3>
        
        <div className="space-y-2">
          {activeOrder.items.map((item) => (
            <div
              key={item.id}
              className="bg-card-neutral border border-gray-100 rounded-xl p-3 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <VegBadge isVeg={item.isVeg} className="scale-75" />
                  <span className="text-sm font-bold text-primary-dark">
                    {item.name} <span className="text-muted-text font-normal">x{item.quantity}</span>
                  </span>
                </div>
                <span className="text-xs font-bold text-primary-dark">
                  ₹{item.price * item.quantity}
                </span>
              </div>
              
              {item.instructions && (
                <div className="flex items-center gap-1 text-[11px] text-muted-text italic pl-5">
                  <MessageSquare size={10} />
                  <span>Note: "{item.instructions}"</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bill Breakdown summary */}
      <div className="bg-card-warm/40 border border-accent/10 rounded-2xl p-4 text-xs space-y-2">
        <div className="flex justify-between text-muted-text">
          <span>Subtotal</span>
          <span className="font-semibold text-primary-dark">₹{activeOrder.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-text">
          <span>Taxes (5%)</span>
          <span className="font-semibold text-primary-dark">₹{activeOrder.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-text flex-row">
          <span>Service Charge (5%)</span>
          <span className="font-semibold text-primary-dark">₹{activeOrder.serviceCharge.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200/50 my-1" />
        <div className="flex justify-between text-sm font-extrabold text-primary-dark">
          <span>Session Total</span>
          <span>₹{activeOrder.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="space-y-2">
        <button
          onClick={handleAddMore}
          className="w-full bg-primary-dark hover:bg-primary-dark/95 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm"
        >
          Add More Items / Order More
        </button>

        {isServed ? (
          <button
            onClick={handleFeedback}
            className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-accent/15 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm"
          >
            <CheckCircle size={16} />
            Complete Session & Give Feedback
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 bg-secondary-teal/5 p-3 rounded-xl border border-secondary-teal/15 text-[11px] text-secondary-teal font-medium">
            <Clock size={14} className="animate-spin" />
            Once your order is fully served, you can pay and submit your feedback here.
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveSession;
