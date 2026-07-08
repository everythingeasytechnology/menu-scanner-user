import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, AlertCircle, ChefHat, Sparkles, Navigation, ArrowRight } from "lucide-react";
import { useMenu } from "../context/MenuContext";

export const OrderStatus = () => {
  const navigate = useNavigate();
  const { activeOrder, orderStatus, setOrderStatus } = useMenu();

  const statuses = [
    {
      name: "Pending",
      title: "Order Placed",
      description: "Waiting for kitchen confirmation",
      icon: Clock
    },
    {
      name: "Accepted",
      title: "Accepted",
      description: "Kitchen has confirmed your order",
      icon: CheckCircle2
    },
    {
      name: "Preparing",
      title: "Preparing",
      description: "Chef is preparing your delicious meal",
      icon: ChefHat
    },
    {
      name: "Ready",
      title: "Ready to Serve",
      description: "Food is ready and on its way to your table",
      icon: Sparkles
    },
    {
      name: "Served",
      title: "Served",
      description: "Enjoy your meal!",
      icon: Navigation
    }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.name === orderStatus);

  const handleFastForward = () => {
    const currentIndex = statuses.findIndex(s => s.name === orderStatus);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1].name;
      setOrderStatus(nextStatus);
    }
  };

  const handleReset = () => {
    setOrderStatus("Pending");
  };

  if (!activeOrder) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fade-in bg-white">
        <div className="w-16 h-16 rounded-full bg-card-neutral flex items-center justify-center text-muted-text">
          <AlertCircle size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-serif text-primary-dark">No Active Order</h3>
          <p className="text-xs text-muted-text max-w-[240px]">
            Please add items to your cart and place an order to track status.
          </p>
        </div>
        <button
          onClick={() => navigate("/menu")}
          className="bg-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md cursor-pointer"
        >
          View Menu
        </button>
      </div>
    );
  }

  const isServed = orderStatus === "Served";

  return (
    <div className="flex-1 flex flex-col pb-12 animate-fade-in bg-white max-w-2xl mx-auto w-full p-4 space-y-6">
      {/* Page Title */}
      <div className="text-center space-y-1">
        <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Live Tracker
        </span>
        <h2 className="text-2xl font-bold font-serif text-primary-dark pt-2">
          Tracking Order {activeOrder.id}
        </h2>
        <p className="text-xs text-muted-text">
          Table {activeOrder.table} • Live status updates automatically
        </p>
      </div>

      {/* Tracker Visual (Vertical Timeline) */}
      <div className="bg-card-neutral rounded-2xl p-6 border border-gray-100 space-y-6 text-left relative">
        <div className="absolute left-[39px] top-9 bottom-9 w-0.5 bg-gray-200" />
        
        {statuses.map((status, index) => {
          const StatusIcon = status.icon;
          const isCompleted = index < currentStatusIndex;
          const isActive = index === currentStatusIndex;
          const isPending = index > currentStatusIndex;

          return (
            <div key={status.name} className="flex gap-4 items-start relative z-10">
              {/* Status Circle indicator */}
              <div
                className={`w-[34px] h-[34px] rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-accent border-accent text-white shadow-md shadow-accent/25 scale-110"
                    : isCompleted
                    ? "bg-secondary-teal border-secondary-teal text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                <StatusIcon size={16} className={isActive && status.name === "Preparing" ? "animate-spin" : ""} />
              </div>

              {/* Status details */}
              <div className="flex-1">
                <h4
                  className={`text-sm font-bold transition-colors duration-300 ${
                    isActive
                      ? "text-accent"
                      : isCompleted
                      ? "text-secondary-teal"
                      : "text-muted-text"
                  }`}
                >
                  {status.title}
                </h4>
                <p className="text-xs text-muted-text mt-0.5">
                  {status.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Controls inside Order Status page */}
      <div className="bg-card-warm/50 border border-accent/15 p-4 rounded-2xl text-left space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            Demo Control Center
          </span>
          <span className="text-[10px] text-muted-text bg-white px-2 py-0.5 rounded border">
            Simulating 12s/Step
          </span>
        </div>
        <p className="text-[10px] text-muted-text leading-relaxed">
          The order advances states automatically, but you can fast-forward or reset it here to test different user flows instantly.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleFastForward}
            disabled={isServed}
            className={`flex-1 font-bold py-2 px-3 rounded-lg text-xs transition-all ${
              isServed
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary-dark hover:bg-primary-dark/90 text-white active:scale-95 cursor-pointer"
            }`}
          >
            Advance Status
          </button>
          <button
            onClick={handleReset}
            className="border border-gray-300 bg-white hover:bg-card-neutral text-primary-dark font-semibold py-2 px-3 rounded-lg text-xs transition-all active:scale-95 cursor-pointer"
          >
            Reset to Pending
          </button>
        </div>
      </div>

      {/* Action CTA */}
      <div className="space-y-2">
        {isServed ? (
          <button
            onClick={() => navigate("/feedback")}
            className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-accent/15 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm"
          >
            Give Feedback & Pay
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/active-session")}
            className="w-full bg-secondary-teal hover:bg-secondary-teal/95 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-sm"
          >
            Go to Session Summary
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
