import React, { createContext, useContext, useState, useEffect } from "react";
import { DISHES, MOCK_ACTIVE_SESSION_ORDERS } from "../data/mockMenu";

const MenuContext = createContext(null);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [tableNumber, setTableNumber] = useState(null);
  const [locationState, setLocationState] = useState({
    requested: false,
    loading: false,
    validated: false,
    denied: false,
    latitude: null,
    longitude: null
  });

  const [cart, setCart] = useState([]);
  
  // Active session orders - if scanned table is 5, we can pre-populate with mock active order
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Pending"); // Pending -> Accepted -> Preparing -> Ready -> Served
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Auto simulate order status progression when order is active
  useEffect(() => {
    let interval;
    if (activeOrder && orderStatus !== "Served") {
      const statusFlow = ["Pending", "Accepted", "Preparing", "Ready", "Served"];
      interval = setInterval(() => {
        setOrderStatus((current) => {
          const currentIndex = statusFlow.indexOf(current);
          if (currentIndex < statusFlow.length - 1) {
            const nextStatus = statusFlow[currentIndex + 1];
            // Update order status in the active order too
            setActiveOrder(prev => prev ? { ...prev, status: nextStatus } : null);
            return nextStatus;
          }
          clearInterval(interval);
          return current;
        });
      }, 12000); // Transitions every 12 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeOrder, orderStatus]);

  // Handle mock location verification
  const verifyLocation = (latitude, longitude, override = false) => {
    setLocationState(prev => ({ ...prev, loading: true, requested: true }));
    
    // Simulate API verification delay
    setTimeout(() => {
      if (override) {
        // Force valid location
        setLocationState({
          requested: true,
          loading: false,
          validated: true,
          denied: false,
          latitude: 12.9716,
          longitude: 77.5946
        });
        return;
      }

      // Check coordinates (Mock range: e.g. within Bangalore city region or random range)
      // For demo, if coordinates exist, we validate it.
      if (latitude && longitude) {
        // Simulate checking restaurant coords (12.9716, 77.5946)
        const distance = getDistance(latitude, longitude, 12.9716, 77.5946);
        
        if (distance <= 0.1) { // within 100 meters
          setLocationState({
            requested: true,
            loading: false,
            validated: true,
            denied: false,
            latitude,
            longitude
          });
        } else {
          // Out of range
          setLocationState({
            requested: true,
            loading: false,
            validated: false,
            denied: true,
            latitude,
            longitude
          });
        }
      } else {
        // Location permission denied by browser
        setLocationState({
          requested: true,
          loading: false,
          validated: false,
          denied: true,
          latitude: null,
          longitude: null
        });
      }
    }, 1500);
  };

  // Simple haversine distance helper (in kilometers)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Cart operations
  const addToCart = (dishId, quantity, instructions) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === dishId);
      const dish = DISHES.find((d) => d.id === dishId);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
          instructions: instructions || updatedCart[existingItemIndex].instructions
        };
        return updatedCart;
      } else {
        return [...prevCart, {
          id: dishId,
          name: dish.name,
          price: dish.price,
          isVeg: dish.isVeg,
          image: dish.image,
          quantity,
          instructions: instructions || ""
        }];
      }
    });
  };

  const updateCartQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartInstructions = (dishId, instructions) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === dishId ? { ...item, instructions } : item
      )
    );
  };

  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const serviceCharge = Math.round(subtotal * 0.05 * 100) / 100;
    const total = Math.round((subtotal + tax + serviceCharge) * 100) / 100;

    const newOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      table: tableNumber || "Guest",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      status: "Pending",
      subtotal,
      tax,
      serviceCharge,
      total
    };

    setActiveOrder(newOrder);
    setOrderStatus("Pending");
    setFeedbackSubmitted(false);
    clearCart();
    return newOrder;
  };

  // Add more items to existing session order
  const addMoreToOrder = () => {
    if (cart.length === 0 || !activeOrder) return;

    const newItems = [...activeOrder.items];
    cart.forEach(cartItem => {
      const existingIndex = newItems.findIndex(item => item.id === cartItem.id);
      if (existingIndex > -1) {
        newItems[existingIndex].quantity += cartItem.quantity;
        if (cartItem.instructions) {
          newItems[existingIndex].instructions += `; ${cartItem.instructions}`;
        }
      } else {
        newItems.push({ ...cartItem });
      }
    });

    const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const serviceCharge = Math.round(subtotal * 0.05 * 100) / 100;
    const total = Math.round((subtotal + tax + serviceCharge) * 100) / 100;

    setActiveOrder(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      tax,
      serviceCharge,
      total,
      status: "Pending" // Reset status back to pending or keep processing
    }));
    setOrderStatus("Pending");
    clearCart();
  };

  // Simulate scanning a table with an active session (Table 5)
  const initializeTableSession = (tableNum) => {
    setTableNumber(tableNum);
    if (tableNum === "5") {
      const mockOrder = MOCK_ACTIVE_SESSION_ORDERS[0];
      setActiveOrder({
        ...mockOrder,
        table: "5"
      });
      setOrderStatus(mockOrder.status);
    } else {
      setActiveOrder(null);
      setOrderStatus("Pending");
    }
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MenuContext.Provider
      value={{
        tableNumber,
        setTableNumber,
        initializeTableSession,
        locationState,
        setLocationState,
        verifyLocation,
        cart,
        addToCart,
        updateCartQuantity,
        updateCartInstructions,
        removeFromCart,
        clearCart,
        activeOrder,
        setActiveOrder,
        orderStatus,
        setOrderStatus,
        placeOrder,
        addMoreToOrder,
        feedbackSubmitted,
        setFeedbackSubmitted,
        getCartCount,
        getCartTotal
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
