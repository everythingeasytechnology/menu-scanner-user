export const CATEGORIES = [
  { id: "all", name: "All Items" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" }
];

export const DISHES = [
  {
    id: "d1",
    name: "Pancakes",
    category: "breakfast",
    price: 199,
    isVeg: true,
    description: "Fluffy pancakes served with maple syrup and fresh berries.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Recommended", "Best Seller"],
    rating: 4.8,
    prepTime: "12 mins"
  },
  {
    id: "d2",
    name: "Masala Omelette",
    category: "breakfast",
    price: 149,
    isVeg: false,
    description: "Classic omelette with onions, tomatoes and green chilies.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Today's Special"],
    rating: 4.5,
    prepTime: "10 mins"
  },
  {
    id: "d3",
    name: "Avocado Toast",
    category: "breakfast",
    price: 229,
    isVeg: true,
    description: "Smashed avocado on multigrain bread with cherry tomatoes.",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Best Seller"],
    rating: 4.7,
    prepTime: "8 mins"
  },
  {
    id: "d4",
    name: "Club Sandwich",
    category: "lunch",
    price: 249,
    isVeg: false,
    description: "Grilled sandwich with chicken, veggies and cheese, served with fries.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Recommended"],
    rating: 4.6,
    prepTime: "15 mins"
  },
  {
    id: "d5",
    name: "Veg Burger",
    category: "lunch",
    price: 249,
    isVeg: true,
    description: "Gourmet veg patty burger with cheese, lettuce and signature sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Best Seller"],
    rating: 4.9,
    prepTime: "12 mins"
  },
  {
    id: "d6",
    name: "Cold Coffee",
    category: "drinks",
    price: 129,
    isVeg: true,
    description: "Chilled brewed coffee blended with milk, ice cream and chocolate drizzle.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Today's Special"],
    rating: 4.7,
    prepTime: "5 mins"
  },
  {
    id: "d7",
    name: "Fresh Orange Juice",
    category: "drinks",
    price: 99,
    isVeg: true,
    description: "100% freshly squeezed oranges, served chilled.",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: [],
    rating: 4.4,
    prepTime: "5 mins"
  },
  {
    id: "d8",
    name: "Chocolate Lava Cake",
    category: "desserts",
    price: 179,
    isVeg: true,
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Recommended"],
    rating: 4.9,
    prepTime: "10 mins"
  }
];

export const MOCK_ACTIVE_SESSION_ORDERS = [
  {
    id: "ord-1058",
    table: "5",
    time: "10:24 AM",
    items: [
      { id: "d1", name: "Pancakes", price: 199, quantity: 1, isVeg: true, instructions: "Add maple syrup on the side" },
      { id: "d5", name: "Veg Burger", price: 249, quantity: 1, isVeg: true, instructions: "No onions, extra cheese" },
      { id: "d6", name: "Cold Coffee", price: 129, quantity: 2, isVeg: true, instructions: "Less sugar" }
    ],
    status: "Preparing", // Pending, Accepted, Preparing, Ready, Served
    subtotal: 706.00,
    tax: 35.30,
    serviceCharge: 35.30,
    total: 776.60
  }
];
