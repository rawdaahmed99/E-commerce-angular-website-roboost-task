# E-commerce Angular Website (Roboost)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd E-commerce-angular-website-roboost
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve -o
   ```
   The app will be available at `http://localhost:4200/`.

4. **API Setup**
   - The app expects a backend API for products, authentication, and cart operations.
   - Update `environment.ts` with your API base URL if needed.

---

## Assumptions Made

- The backend API follows REST conventions and provides endpoints for products, search, authentication, and cart.
- Product search is performed via a `/products/search?q=...` endpoint.
- User authentication and cart management are handled via separate endpoints.
- The project uses Angular 19+ with standalone components and feature modules.

---

## Additional Features Implemented

- **Dark Mode:** Toggle for dark/light theme with CSS adjustments.
- **Feature-based Structure:** Code is organized into `features` (auth, products, cart, home) for scalability.
- **Lazy Loading:** Feature modules are lazy-loaded for performance.
- **Responsive Design:** Layout adapts to mobile and desktop screens.
- **Search Integration:** Product search uses query params and updates results via API.
- **Pagination:** "عرض المزيد" (Load More) button for paginated product loading.

---

## Approach

- **Modularization:** The app is divided into feature modules (`auth`, `products`, `cart`, `home`) to keep code organized and maintainable.
- **Routing:** Angular Router is used with lazy loading for each feature module. Query parameters are used for search functionality.
- **Standalone Components:** Angular standalone components are used for reusability and simplicity.
- **API Integration:** Services handle all HTTP requests. Components subscribe to route changes and update their data accordingly.
- **Dark Mode:** CSS selectors are used to apply dark mode styles globally and to specific components.
- **Best Practices:** Unused imports and variables are removed, and TypeScript types are used for clarity and safety.

