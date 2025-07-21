# Mable.ai E-Commerce App

This project is a modern E-Commerce web application built using [Remix](https://remix.run/), [Tailwind CSS](https://tailwindcss.com/), [Zustand](https://github.com/pmndrs/zustand) for global state management, and `pnpm` as the package manager. The application also includes detailed event tracking to a Go backend with ClickHouse using `navigator.sendBeacon` and `fetch` as fallback.

---

## 🧱 Tech Stack

- **Frontend Framework**: [Remix](https://remix.run/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Event Tracking**: Custom analytics using Beacon + Fetch

---

## 📁 Project Structure

```
app/
├── components/           # Shared UI components
├── routes/               # Route handlers (e.g. login, signup, products)
├── services/             # API service files (auth, tracking, etc)
├── stores/               # Zustand stores
├── utils/                # Utility functions, constants, session helpers
├── assets/               # Static assets like images, logos
public/
.env
README.md
```

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
pnpm install
```

### 2. Setup Environment Variables

Create a `.env` file at the root:

```env
VITE_API_BASE_URL=https://your-ngrok-url/api
```

### 3. Start Dev Server

```bash
pnpm dev
```

---

## 🧠 Event Tracking

Tracking is performed using `trackEvent(eventName, eventData)` from `app/utils/tracking.ts`. It collects analytics and pushes to:

- GTM's `dataLayer`
- Custom Go backend via `sendBeacon` or `fetch`

### ✅ Available Event Names (`EventNames`):

```ts
export const EventNames = {
  Login: "login",
  Signup: "signup",
  Logout: "logout",
  ViewProductList: "view_product_list",
  ViewProductDetails: "view_product_details",
  AddToCart: "add_to_cart",
  RemoveFromCart: "remove_from_cart",
  ViewCart: "view_cart",
  Checkout: "checkout",
  AddPaymentInfo: "add_payment_info",
  Purchase: "purchase",
  SearchProduct: "search_product",
  SelectItem: "select_product",
  ViewProfile: "view_profile",
  LogoClick: "click_logo",
  Begin_Checkout: "begin_checkout",
  ProfilePage: "profile_page",
};
```

### 📦 Tracked Events Format

Payloads sent match this backend struct:

```go
type AnalyticsEvent struct {
  EventID    string          `json:"eventId"`
  EventType  string          `json:"eventType"`
  UserID     string          `json:"userId"`
  SessionID  string          `json:"sessionId"`
  Timestamp  time.Time       `json:"timestamp"`
  PagePath   string          `json:"pagePath"`
  Referrer   string          `json:"referrer"`
  UserAgent  string          `json:"userAgent"`
  IPAddress  string          `json:"ipAddress"`
  DurationMs int64           `json:"durationMs"`
  Products   json.RawMessage `json:"products,omitempty"`
  Location   string          `json:"location,omitempty"`
  EventData  json.RawMessage `json:"eventData,omitempty"`
}
```

---

## 🛒 Example Routes (`ROUTES`)

```ts
export const ROUTES = {
  Login: "/login",
  Signup: "/signup",
  Logout: "/logout",
  Products: "/products",
  Product: "/products/{id}",
  Cart: "/cart",
  Checkout: "/checkout",
  CheckoutSuccess: "/checkout/success",
};
```

---

## 🧼 Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Build app for production
pnpm lint       # Lint code
pnpm format     # Prettify codebase
```

---

## 📊 Deployment

> Coming soon — Docker + Fly.io deployment instructions.

---

## ✍️ Author

Built with ❤️ by the Mable.ai team.

---

## 📃 License

MIT
