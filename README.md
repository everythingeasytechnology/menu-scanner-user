# EverythingEasy Technology Smart Menu System (Customer Panel)

This is a responsive, mobile-first React (Vite) Progressive Web App (PWA) client menu interface built for guests scanning QR codes at tables.

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

---

## 🏷️ Brand Single Source of Truth Configuration

The business name, tagline, and logo are driven by a single configuration file at `src/config/brand.js`.

### How to Change the Brand Name

Open [src/config/brand.js](file:///Users/akhil_golu/Desktop/menu/src/config/brand.js) and update the values:

```javascript
export const BRAND = {
  companyName: "Gourmet Bistro", // <-- Change this to update the business name instantly across the app
  tagline: "Good Food, Great Mood", // <-- Change this to update the tagline
  logoUrl: "/assets/logo.svg",
};
```

*   **Dynamic Document Title & Meta Tags**: The page title `<title>` and HTML meta descriptions are updated programmatically in `src/App.jsx` on boot using these configurations.
*   **Automatic Propagation**: Every screen header, footer copyright, and descriptive label imports this object dynamically. There are no hardcoded string literals of the brand in any of the UI code.

---

## 📂 Project Structure

```
/src
  /assets           - SVGs and images
  /components       - Reusable UI elements:
    - VegBadge.jsx      - Standard Veg/Non-Veg indicators
    - DishTag.jsx       - Styled badges ("Best Seller", "Recommended", etc.)
    - RatingStars.jsx   - Static & interactive star ratings
    - Header.jsx        - Dynamic navbar rendering brand title, logo, and active table session
    - Footer.jsx        - Dynamic footer rendering brand copyright details
  /config
    - brand.js          - SINGLE BRAND CONFIGURATION VARIABLE (companyName, tagline, etc.)
  /context
    - MenuContext.jsx   - Global state managing table session, cart, checkout, and live order tracking
  /data
    - mockMenu.js       - Local database of menu dishes, categories, and table sessions
  /pages            - Application Screens:
    - QRLanding.jsx     - QR Entry point, Location Permission check, and Out-of-Range handling
    - MenuHome.jsx      - Dish categories tab list, Search bar, and floating bottom Cart preview
    - ItemDetail.jsx    - Full screen dish detail, quantity stepper, and customization instructions
    - Cart.jsx          - Line items, inline note editors, and billing receipt breakdown
    - ActiveSession.jsx - Session items summary for tables with already placed orders
    - OrderStatus.jsx   - Step-by-step progress timeline of order status from kitchen to table
    - Feedback.jsx      - Multiple criteria star-ratings and textual suggestions
    - ThankYou.jsx      - Confirmation screen after completing session and feedback submission
  App.jsx           - Route mappings (React Router v7) and dynamic meta updates
  index.css         - Tailwind CSS v4 directives, custom font imports, and micro-animations
```

---

## 🛠️ Simulation & Evaluation Tools (Built-in)

To simplify testing and code evaluation without requiring a backend database, several simulation tools are directly built into the UI:

1.  **Table Selector & Geolocation Override** (on [QRLanding.jsx](file:///Users/akhil_golu/Desktop/menu/src/pages/QRLanding.jsx)):
    *   Requests browser geolocation. If denied, or if you are out of range, it triggers the **"Access Denied - Out of Range"** screen.
    *   Provides quick buttons to bypass location check and load **Table 3** (new empty session) or **Table 5** (simulates scanning a table that has an active ongoing order).
2.  **Ongoing Session Orders** (on [ActiveSession.jsx](file:///Users/akhil_golu/Desktop/menu/src/pages/ActiveSession.jsx)):
    *   Loading Table 5 automatically populates the session with existing orders (Veg Burger, Pancakes, and Cold Coffee) to demonstrate the layout.
    *   Lets you add more items to the table session seamlessly from the checkout screen.
3.  **Live Status Tracker** (on [OrderStatus.jsx](file:///Users/akhil_golu/Desktop/menu/src/pages/OrderStatus.jsx)):
    *   An auto-simulator automatically transitions the order state (`Pending` ➔ `Accepted` ➔ `Preparing` ➔ `Ready` ➔ `Served`) every 12 seconds.
    *   Includes a **"Demo Control Center"** console at the bottom of the page allowing you to fast-forward status steps or reset the timeline instantly.
