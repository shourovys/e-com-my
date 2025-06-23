**Instructions for the Development Team:**

- **Goal:** Implement the Minimum Viable Product (MVP) frontend features as detailed below.
- **Tech Stack:** React, Next.js (App Router preferred, adapt if using Pages Router), TypeScript, Shadcn UI, Tailwind CSS.
- **API:** All API calls should be directed towards a local `json-server` instance. Define necessary data structures in a `db.json` file and API endpoints as needed per task. Use the provided `lib/api.ts` utility for making calls.
- **Styling:** Adhere strictly to Shadcn UI component usage and Tailwind CSS utilities for styling. Aim for a clean, modern look blending efficiency (Ref: Foodpanda) and aesthetics (Ref: Shop.app), prioritizing mobile-first responsiveness. Use the specified color palette and typography guidelines (if provided separately, otherwise infer from PRD Section 4.3).
- **State Management:** Use React Context API (`AuthContext`, `CartContext`) as outlined in the PRD (Section 5.4).
- **Code Quality:** Follow provided ESLint/Prettier rules. Write clean, maintainable TypeScript code with appropriate types.
- **Task Format:** Each numbered item represents a small, actionable task (roughly 1 story point). Mark the checkbox `[ ]` upon completion.
- **Collaboration:** Ask questions if any task is unclear. Assume standard web development practices unless otherwise specified.

---

**Markdown File: SynergyMart Frontend MVP Tasks**

**Epic: Initial Setup & Foundation**

- **Story: Project Initialization & Core Dependencies**

  1.  `- [x] FE Task:` Initialize Next.js project (App Router preferred) with TypeScript template (`npx create-next-app@latest --typescript`).
  2.  `- [x] FE Task:` Install core dependencies: `tailwindcss`, `shadcn-ui` (follow `shadcn-ui init` steps), `axios` (or use built-in `fetch`).
  3.  `- [x] FE Task:` Configure Tailwind CSS (`tailwind.config.js`, `postcss.config.js`, `globals.css`) as per Shadcn UI documentation. Define primary/accent colors based on PRD Section 4.3.
  4.  `- [x] FE Task:` Set up ESLint and Prettier with recommended configurations for Next.js, TypeScript, and Tailwind CSS (`eslint-plugin-tailwindcss`).
  5.  `- [x] FE Task:` Define base project folder structure (`/src/app`, `/src/components`, `/src/lib`, `/src/contexts`, `/src/hooks`, `/src/styles`) as per PRD Section 5.6.
  6.  `- [x] FE Task:` Create basic `AuthContext` (`/src/contexts/AuthContext.tsx`) with placeholder state (e.g., `isAuthenticated: false`, `user: null`) and provider structure. Include stub functions for `login`, `logout`, `signup`.
  7.  `- [x] FE Task:` Create basic `CartContext` (`/src/contexts/CartContext.tsx`) with placeholder state (e.g., `items: []`, `total: 0`) and provider structure. Include stub functions for `addToCart`, `removeFromCart`, `updateQuantity`.
  8.  `- [x] FE Task:` Create API client utility (`/src/lib/api.ts`) using `axios` or `fetch`. Configure base URL to point to the `json-server` address (e.g., `http://localhost:3010`). Include basic error handling.
  9.  `- [x] FE Task:` Wrap the root layout (`/src/app/layout.tsx`) with `AuthProvider` and `CartProvider`.

- **Story: Mock API Setup (`json-server`)**

10. `- [x] Mock API Task:` Install `json-server` (`npm install -g json-server` or as a dev dependency).
11. `- [x] Mock API Task:` Create a `db.json` file at the project root.
12. `- [x] Mock API Task:` Define basic data structures in `db.json` for `/users` (include `id`, `email`, `password` hash - just store plain text for mock, `name`), `/categories` (include `id`, `name`, `slug`, `iconUrl`), and `/products` (include `id`, `name`, `description`, `price`, `originalPrice`, `imageUrl`, `categoryId`, `stockStatus: 'in_stock' | 'out_of_stock'`). Add 5-10 sample products across 2-3 categories.
13. `- [x] Mock API Task:` Define initial structure for `/cart` (e.g., `{ "userId": "mockUserId", "items": [] }` - adjust based on how you'll manage cart state).
14. `- [x] Mock API Task:` Add npm script in `package.json` to run `json-server --watch db.json --port 3010`.
15. `- [x] Mock API Task:` Test `json-server` endpoints using a tool like Postman or `curl` (e.g., `GET http://localhost:3010/products`).

**Epic: Global Components**

- **Story: Implement Header Component**

16. `- [x] FE Task:` Create a reusable `Header` component (`/src/components/common/Header.tsx`).
17. `- [x] FE Task:` Add SynergyMart logo (use placeholder text/SVG initially) aligned to the left.
18. `- [x] FE Task:` Implement centered Search Input field (`<Input>` from Shadcn) - functionality in later tasks. Style according to Ref 10/15 inspiration.
19. `- [x] FE Task:` Add User Avatar icon (`<Avatar>` from Shadcn) on the right. Link to `/account` (page TBD) if user is authenticated (use `AuthContext`). If not authenticated, show a "Login" `<Button>` linking to `/auth/login`.
20. `- [x] FE Task:` Add Cart icon (`<Button variant="ghost">` with ShoppingCart icon from `lucide-react`) on the right, next to the user avatar/login button.
21. `- [x] FE Task:` Add a Cart Item Count Badge (`<Badge>` from Shadcn) positioned near the Cart icon. Fetch count from `CartContext`. Update dynamically when cart changes.
22. `- [x] FE Task:` Ensure Header is responsive: On mobile, consider collapsing search or adjusting element spacing.
23. `- [x] FE Task:` Integrate `Header` component into the root layout (`/src/app/layout.tsx`).

- **Story: Implement Footer Component**

24. `- [x] FE Task:` Create a reusable `Footer` component (`/src/components/common/Footer.tsx`).
25. `- [x] FE Task:` Include basic copyright text (`© SynergyMart {currentYear}`).
26. `- [x] FE Task:` Add links to `/terms-and-conditions` and `/privacy-policy` static pages (pages created later). Style simply, inspired by Ref 2/10.
27. `- [x] FE Task:` Integrate `Footer` component into the root layout (`/src/app/layout.tsx`).

**Epic: Authentication**

- **Story: User Signup**

28. `- [x] FE Task:` Create Signup page (`/src/app/auth/signup/page.tsx`).
29. `- [x] FE Task:` Implement Signup form UI based on Ref 1 (clean card layout). Include fields: Name (`<Input>`), Email (`<Input type="email">`), Password (`<Input type="password">`), Confirm Password (`<Input type="password">`). Use Shadcn `Input` and `Label` components.
30. `- [x] FE Task:` Add form validation (e.g., required fields, valid email format, password match, minimum password length). Display validation errors near respective fields. (Use a library like `react-hook-form` or simple state management).
31. `- [x] FE Task:` Add "Sign up" `<Button>` (Accent color). Implement loading state for the button during submission.
32. `- [x] FE Task:` Add link below button: "Already have an account? Log in" linking to `/auth/login`.
33. `- [x] FE Task:` Implement `onSubmit` handler: Call a `signup` function (to be added in `AuthContext`). Mock the API call: `POST /users` with name, email, password to `json-server`.
34. `- [x] FE Task:` Implement `signup` function in `AuthContext`: Make the API call using `apiClient`. On successful signup (mock 201 response), optionally log the user in automatically (call `login` function) and redirect to homepage (`/`). Handle API errors (e.g., display error message).
35. `- [x] FE Task:` Add "Continue with Google" `<Button>` (visual only for MVP - functionality is separate task). Style similar to Ref 1.
36. `- [x] FE Task:` Add links to Terms & Conditions and Privacy Policy below the form (Ref 1).

- **Story: User Login**

37. `- [x] FE Task:` Create Login page (`/src/app/auth/login/page.tsx`).
38. `- [x] FE Task:` Implement Login form UI based on Ref 1. Include fields: Email (`<Input type="email">`), Password (`<Input type="password">`). Use Shadcn `Input` and `Label`.
39. `- [x] FE Task:` Add basic form validation (required fields, valid email). Display errors.
40. `- [x] FE Task:` Add "Log in" `<Button>` (Accent color). Implement loading state.
41. `- [x] FE Task:` Add link below button: "Forgot password?" (non-functional for MVP).
42. `- [x] FE Task:` Add link below button: "Don't have an account? Sign up" linking to `/auth/signup`.
43. `- [x] FE Task:` Implement `onSubmit` handler: Call `login` function (in `AuthContext`) with email and password.
44. `- [x] FE Task:` Implement `login` function in `AuthContext`: Mock the API call: `GET /users?email={email}&password={password}` to `json-server`. (Note: This is insecure, ONLY for mock API. Real API uses `POST` and password hashing).
45. `- [x] FE Task:` In `login` function: If mock API returns a user, update `AuthContext` state (`isAuthenticated: true`, `user: userData`), store mock token/user info in local storage (for persistence simulation), and redirect to homepage (`/`). Handle login errors (invalid credentials, API errors) - display message on login page.
46. `- [x] FE Task:` Add "Continue with Google" `<Button>` (visual only for MVP). Style similar to Ref 1.
47. `- [x] FE Task:` Implement basic "Remember me" `<Checkbox>` (visual only, or basic implementation storing a flag in local storage alongside mock token).

- **Story: Authentication State Management & Persistence**

48. `- [x] FE Task:` In `AuthProvider`, add effect (`useEffect`) to check local storage on initial load. If mock token/user info exists, validate it (e.g., fetch user profile `/me` - see task below) and update context state to restore session.
49. `- [x] Mock API Task:` Define a `/me` endpoint in `json-server`. It should return the user details for a hardcoded mock user ID or based on a mock token if you simulate one.
50. `- [x] FE Task:` Implement `logout` function in `AuthContext`: Clear user state, remove mock token/user info from local storage, and redirect to login page.
51. `- [x] FE Task:` Update `Header` component to correctly display Login button vs User Avatar based on `isAuthenticated` state from `AuthContext`.

**Epic: Browsing & Product Discovery (MVP)**

- **Story: Homepage Display**

52. `- [x] FE Task:` Create Homepage (`/src/app/page.tsx`).
53. `- [x] Mock API Task:` Ensure `/categories` endpoint returns data with `id`, `name`, `slug`, `iconUrl`. Add 5-8 sample categories.
54. `- [x] FE Task:` Fetch categories from mock API (`GET /categories`) on homepage load. Handle loading and error states.
55. `- [x] FE Task:` Display top categories as a horizontal scrollable list or grid below the header. Use category `iconUrl` (or placeholder icon) and `name`. Style inspired by Ref 8/15 but cleaner like Ref 10. Each category should link to its respective category page (`/category/[slug]`). Use Shadcn `<Card>` or styled divs.
56. `- [x] Mock API Task:` Add a boolean flag `isFeatured: true/false` or similar to sample products in `db.json`.
57. `- [x] FE Task:` Fetch featured products (`GET /products?isFeatured=true` or similar filter) from mock API. Handle loading/error states.
58. `- [x] FE Task:` Display fetched products in a "Featured Products" carousel/row below categories. Use a reusable `ProductCard` component (create this next). Style inspired by Ref 15/10.

- **Story: Reusable Product Card Component**

59. `- [x] FE Task:` Create a reusable `ProductCard` component (`/src/components/common/ProductCard.tsx`).
60. `- [x] FE Task:` Component should accept product data (image URL, name, price, original price, ID) as props. Define TypeScript interface for props.
61. `- [x] FE Task:` Use Shadcn `<Card>` as the base. Display product image (`<Image>` from `next/image`) prominently.
62. `- [x] FE Task:` Display product name below image (truncate if necessary).
63. `- [x] FE Task:` Display product price. If `originalPrice` is provided and different, show it struck-through next to the current price. Use `<Badge>` for savings (e.g., "Save Tk {X}"). Ref 5/12/13.
64. `- [x] FE Task:` Add a small "+" icon `<Button size="sm">` for "Add to Cart". Ref 3/5/15.
65. `- [x] FE Task:` Implement `onClick` handler for the "+" button: Call `addToCart` function from `CartContext`, passing the product ID and quantity 1. Provide visual feedback (e.g., button changes state briefly, cart icon updates).
66. `- [x] FE Task:` Make the entire card (excluding the button) clickable, linking to the Product Detail Page (`/product/[id]`).

- **Story: Category Page (Product Listing Page - PLP)**

67. `- [x] FE Task:` Create dynamic category page (`/src/app/category/[slug]/page.tsx`).
68. `- [x] FE Task:` Fetch category details based on `slug` param (`GET /categories?slug={slug}`). Display category name as page title (H1). Handle category not found.
69. `- [x] FE Task:` Fetch products belonging to this category (`GET /products?categoryId={categoryId}`). Handle loading/error states. Use category ID obtained from the previous step.
70. `- [x] FE Task:` Display fetched products in a responsive grid (2 columns mobile, 3-4 tablet/desktop) using the `ProductCard` component. Ref 3/5.
71. `- [x] FE Task:` Implement basic pagination if product list is long (e.g., "Load More" button or simple page number links). Mock API: Use `_page` and `_limit` params (`GET /products?categoryId={id}&_page=1&_limit=12`).
72. `- [x] FE Task:` Add Breadcrumb navigation below header (e.g., "Home > {Category Name}").

- **Story: Product Detail Page (PDP)**

73. `- [x] FE Task:` Create dynamic product page (`/src/app/product/[id]/page.tsx`).
74. `- [x] FE Task:` Fetch product details based on `id` param (`GET /products/{id}`). Handle loading, error, and product not found states.
75. `- [x] FE Task:` Display product images (use `next/image`). For MVP, display the single `imageUrl`. (Carousel for multiple images is Phase 2).
76. `- [x] FE Task:` Display product name (H1), price (prominently, showing savings like on Card - Ref 12/13).
77. `- [x] FE Task:` Display product description (`product.description`).
78. `- [x] FE Task:` Implement Quantity Selector component: Use Shadcn `<Input type="number">` (min 1) with adjacent "-" and "+" `<Button>` controls to adjust quantity state. Default to 1.
79. `- [x] FE Task:` Add large "Add to Cart" `<Button>` (Accent color). Ref 12.
80. `- [x] FE Task:` Implement `onClick` handler for "Add to Cart": Call `addToCart` from `CartContext` with product ID and the selected quantity state. Provide visual feedback.
81. `- [x] FE Task:` Display basic stock availability message based on `product.stockStatus` from mock API (e.g., "In Stock" or "Out of Stock"). Disable Add to Cart button if out of stock.
82. `- [x] FE Task:` Structure page layout inspired by Ref 11/12/13 (image left, details right on desktop; stacked on mobile).

Okay, continuing with the frontend task breakdown for SynergyMart MVP.

---

**Epic: Cart Functionality**

- **Story: Cart State Management**

83. `- [x] Mock API Task:` Refine `/cart` endpoint in `db.json` if necessary. Decide on cart structure (e.g., `{ "id": "userCartId", "userId": "mockUserId", "items": [{ "productId": "prod1", "quantity": 2, "price": 50 }, ...] }`). For MVP, we might manage cart state entirely client-side in Context and sync to `json-server` only on specific actions (like page load/checkout start) for persistence simulation. Let's assume client-side first for simplicity, syncing later.
84. `- [x] FE Task:` Implement `addToCart` function in `CartContext`: Takes `productId` and `quantity`. Check if product already exists in `items`. If yes, increment quantity. If no, fetch product details (`GET /products/{productId}`) to get price/name/image, then add new item object to `items` array. Update total price. Persist updated cart state to local storage (for session persistence).
85. `- [x] FE Task:` Implement `removeFromCart` function in `CartContext`: Takes `productId`. Filter item out of the `items` array. Update total price. Persist state.
86. `- [x] FE Task:` Implement `updateQuantity` function in `CartContext`: Takes `productId` and `newQuantity`. Find item, update its quantity. Prevent quantity < 1. Update total price. Persist state.
87. `- [x] FE Task:` Implement calculation logic within `CartContext` to compute `subtotal` based on `items` array (price \* quantity).
88. `- [x] FE Task:` Add effect (`useEffect`) in `CartProvider` to load initial cart state from local storage on mount.

- **Story: Cart View (Sheet Component)**

89. `- [x] FE Task:` Create a reusable `CartSheet` component (`/src/components/features/cart/CartSheet.tsx`). Use Shadcn `<Sheet>` component, triggered from the right side.
90. `- [x] FE Task:` Trigger the `CartSheet` opening when the Cart icon `<Button>` in the `Header` is clicked. Manage open/close state (potentially via `UIContext` or simple local state passed down/controlled).
91. `- [x] FE Task:` Inside the `Sheet`, display "Cart" title and a Close button (`<SheetClose>`).
92. `- [x] FE Task:` If cart is empty (check `items.length` from `CartContext`), display a message like "Your cart is empty." and maybe a button linking back to the homepage.
93. `- [x] FE Task:` If cart has items, map over `cartContext.items` and render a `CartItem` component for each (create this next).
94. `- [x] FE Task:` Below the items list, display the cost breakdown: Subtotal (`cartContext.subtotal`), Standard Delivery Fee (use a hardcoded value for MVP, e.g., Tk 37 - Ref 4), Platform Fee (hardcoded, e.g., Tk 14 - Ref 4).
95. `- [x] FE Task:` Calculate and display the Total (`subtotal + deliveryFee + platformFee`). Ensure prices are formatted correctly (e.g., "Tk 1,161").
96. `- [x] FE Task:` Add a prominent "Review payment and address" `<Button>` (Accent color, full width) at the bottom of the sheet. This button should link/navigate to the `/checkout` page. Ref 4.
97. `- [x] FE Task:` Implement the Free Delivery progress indicator (visual only for MVP). Show message "Tk XXX more to free delivery" (Ref 4). Hardcode the free delivery threshold (e.g., Tk 800). Calculate `threshold - subtotal`.

- **Story: Cart Item Component**

98. `- [x] FE Task:` Create a `CartItem` component (`/src/components/features/cart/CartItem.tsx`). Accepts cart item data (product image, name, price, quantity, productId) as props.
99. `- [x] FE Task:` Display item image, name, and individual item total price (price \* quantity). Style similar to Ref 7.
100.  `- [x] FE Task:` Include a Quantity Selector (reuse/adapt component from PDP or create new) allowing users to adjust the quantity. Connect its +/- buttons/input to the `updateQuantity` function in `CartContext`.
101.  `- [x] FE Task:` Include a "Remove" button (use trash icon `<Button variant="destructive">`). Connect it to the `removeFromCart` function in `CartContext`.

**Epic: Checkout Process (MVP)**

- **Story: Checkout Page Structure & Navigation**

102. `- [x] FE Task:` Create Checkout page (`/src/app/checkout/page.tsx`).
103. `- [x] FE Task:` Add a simple Header specific to checkout (or reuse main Header), including a "Back" button (`<Button variant="ghost">` with ArrowLeft icon) that navigates the user back (e.g., to cart or previous page). Ref 6/9.
104. `- [x] FE Task:` Implement a visual Stepper/Progress indicator at the top showing checkout stages (e.g., "1. Address", "2. Delivery & Payment", "3. Review"). Highlight the current active step. Ref 7/9 inspiration. Manage the current step state within the Checkout page.
105. `- [x] FE Task:` Protect the checkout page: If the user is not authenticated (check `AuthContext`), redirect them to the Login page. If the cart is empty (check `CartContext`), redirect them to the Cart page or Homepage.

- **Story: Checkout Step 1: Delivery Address**

106. `- [x] FE Task:` Create `DeliveryAddress` component (`/src/components/features/checkout/DeliveryAddress.tsx`).
107. `- [x] FE Task:` For MVP, assume user has one address. Fetch this address (if stored) or provide fields to enter it. Add fields: Street Address (`<Input>`), Apartment/Suite (`<Input>`), City (default/hardcoded for MVP target market, e.g., Dhaka), Area/Neighborhood (`<Input>`). Use Shadcn components.
108. `- [x] Mock API Task:` Update `/users` or add `/addresses` endpoint in `db.json` to store address fields associated with the mock user. Modify `/me` to return this address.
109. `- [x] FE Task:` Fetch user's default address via `/me` or `/addresses?userId={userId}` on checkout page load. Pre-fill form if address exists.
110. `- [x] FE Task:` Implement state management for address form fields within the Checkout page or `DeliveryAddress` component.
111. `- [x] FE Task:` Add "Delivery Instructions" `<Textarea>` field. Ref 2/9.
112. `- [x] FE Task:` Add "Leave at the door" `<Checkbox>` option. Ref 9.
113. `- [x] FE Task:` Add a "Save and Continue" `<Button>` at the end of this section. On click, save the address (mock `PUT /addresses/{id}` or `POST /addresses` if new) and advance the checkout step state. Validate required fields before proceeding.

- **Story: Checkout Step 2: Delivery Options & Payment**

114. `- [x] FE Task:` Create `DeliveryPayment` component (`/src/components/features/checkout/DeliveryPayment.tsx`).
115. `- [x] FE Task:` Display Delivery Options section. For MVP, only show "Standard Delivery" (`<RadioGroup>` with one option). Display hardcoded estimated timeframe (e.g., "25-40 mins") and cost (e.g., "Tk 37"). Ref 2/9.
116. `- [x] FE Task:` Display Payment Method section. For MVP, only integrate one method visually. Show selected method (e.g., "bKash" logo and masked identifier like "bdhf616q" - hardcoded for MVP). Add a "Change" button (non-functional for MVP). Ref 6/9.
117. `- [x] Mock API Task:` No API needed for this step in MVP, as options are hardcoded.
118. `- [x] FE Task:` Add a "Continue to Review" `<Button>`. On click, advance the checkout step state.

- **Story: Checkout Step 3: Order Review & Placement**

119. `- [x] FE Task:` Create `OrderReview` component (`/src/components/features/checkout/OrderReview.tsx`).
120. `- [x] FE Task:` Display Order Summary section. Fetch items from `CartContext`. List each item name and price (similar to Ref 6).
121. `- [x] FE Task:` Display final cost breakdown: Subtotal, Standard Delivery fee, Platform Fee, Total. Get values from `CartContext` and hardcoded fees. Ref 6.
122. `- [x] FE Task:` Display the selected Delivery Address (read-only view) from the state saved in Step 1.
123. `- [x] FE Task:` Display the selected Payment Method (read-only view) from Step 2.
124. `- [x] FE Task:` Add "By completing this order, I agree to all terms & conditions." `<Checkbox>` with a link to the T&C page. This must be checked to enable placing the order. Ref 6.
125. `- [x] FE Task:` Add a final "Place Order" `<Button>` (Accent color). Implement loading state. Button should be disabled until T&C checkbox is checked. Ref 6/9.
126. `- [x] Mock API Task:` Define `/orders` endpoint in `db.json`. Expects `POST` request with order details (userId, items, total amount, address, delivery method, payment method).
127. `- [x] FE Task:` Implement `onClick` handler for "Place Order":
     _ Gather all order details (user ID from `AuthContext`, items/total from `CartContext`, address/delivery/payment state).
     _ Make mock API call: `POST /orders` with the order payload.
     _ On success (mock 201 response):
     _ Clear the cart state in `CartContext` and local storage.
     _ Redirect user to a new Order Confirmation page (`/order-confirmation`). Pass order ID from mock response if available.
     _ On error: Display an error message to the user.

- **Story: Order Confirmation Page**

128. `- [x] FE Task:` Create Order Confirmation page (`/src/app/order-confirmation/page.tsx`).
129. `- [x] FE Task:` Display a success message (e.g., "Order Placed Successfully!").
130. `- [x] FE Task:` Display the Order Number (use ID from mock API response, or generate a mock one).
131. `- [x] FE Task:` Display estimated delivery time (can be hardcoded for MVP).
132. `- [x] FE Task:` Provide a button/link back to the Homepage.

**Epic: Static Pages & Miscellaneous**

- **Story: Basic Static Pages**

133. `- [x] FE Task:` Create Terms and Conditions page (`/src/app/terms-and-conditions/page.tsx`). Add placeholder text content. Ensure linked correctly from Footer and Checkout.
134. `- [x] FE Task:` Create Privacy Policy page (`/src/app/privacy-policy/page.tsx`). Add placeholder text content. Ensure linked correctly from Footer and Signup.

- **Story: Basic Search Functionality**

135. `- [x] Mock API Task:` Ensure `json-server` supports basic text search using the `q` parameter (e.g., `GET /products?q=milk`).
136. `- [x] FE Task:` Implement functionality for the Search Input in the `Header`. On enter/submit:
     _ Get the search query from the input field.
     _ Navigate to a Search Results page (`/search?query={query}`).
137. `- [x] FE Task:` Create Search Results page (`/src/app/search/page.tsx`).
138. `- [x] FE Task:` Read the `query` parameter from the URL.
139. `- [x] FE Task:` Fetch search results from mock API (`GET /products?q={query}`). Handle loading/error states.
140. `- [x] FE Task:` Display "Search results for: '{query}'" as the page title.
141. `- [x] FE Task:` If no results, display "No products found for your search."
142. `- [x] FE Task:` If results found, display them in a responsive grid using the `ProductCard` component (similar to Category page).

- **Story: Responsiveness & Basic Accessibility**

143. `- [x] FE Task:` Review all created pages and components on different screen sizes (Mobile S/M/L, Tablet, Desktop). Ensure layouts adapt correctly using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`). Test text wrapping, element spacing, and usability.
144. `- [x] FE Task:` Perform basic accessibility check: Ensure all interactive elements (buttons, links, inputs) are keyboard navigable (using Tab key). Ensure basic color contrast is acceptable (visual check). Add `alt` text to placeholder images if needed.
