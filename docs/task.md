# **SynergyMart Frontend: UI-Focused Development Plan**

## **Epic 1: User Account & Profile Management**

- **User Story:** As a registered user, I want a dedicated account section where I can view my profile details, see my complete order history, and manage my saved addresses for a personalized and efficient experience.

<IMPORTANT_NOTES>

1. User Information Structure:
   - Current User object from AuthContext includes: id, name, email
   - Consider adding additional standard fields in the mock data like phone number
2. Account Section Layout:
   - Follow the existing design patterns for consistency (similar to checkout page)
   - Use two-column layout for desktop: left sidebar (1/4 width) and right content area (3/4 width)
   - Use a stacked vertical layout for mobile view
   - Use existing Shadcn Card, Label, and Input components to maintain UI consistency
3. Mock Order Data Structure:
   - Each order should include: id, date, total, status, items array, shipping address
   - Order items should include: id, title, price, quantity, image
   - Status options should include: "Processing", "Shipped", "Delivered", "Cancelled"
4. Address Format for Bangladesh:

   - Follow standard Bangladesh address format (similar to Daraz):
     - Full Name
     - Phone Number
     - Street Address/House No.
     - Area/Neighborhood
     - City (dropdown with common Bangladesh cities)
     - Division (dropdown with the 8 divisions of Bangladesh)
     - Postal Code
     - Landmark (optional)
   - Use the same form fields as in the checkout process for consistency
   - The address form should include proper validation
     </IMPORTANT_NOTES>

5. `- [x] FE Task:` Create a new account section layout at `src/app/account/layout.tsx`. It must feature a two-column design on desktop (navigation sidebar left, content right) and stack vertically on mobile, consistent with the overall application design.
6. `- [x] FE Task:` Implement the `AccountSidebar` component (`/src/components/features/account/AccountSidebar.tsx`). It should contain navigation links (`<Link>`) for "My Profile," "Order History," and "My Addresses." Use `lucide-react` icons (`User`, `Package`, `MapPin`) and visually highlight the active link based on the current route.
7. `- [x] FE Task:` Create the main profile page at `src/app/account/page.tsx`, which will utilize the new account layout.
8. `- [x] FE Task:` On the profile page, display the user's information (Name, Email) from `AuthContext`. Use Shadcn `<Card>`, `<Label>`, and `<Input>` components in a disabled/read-only state to present the data consistently with the checkout page form elements.
9. `- [x] Mock Data Task:` Create `src/lib/mocks/orders.ts`. Define a mock data array containing at least 3-4 sample past orders for a mock user. Each order object should match the structure needed for the UI (order ID, date, total amount, status, items, shipping address).
10. `- [x] FE Task:` Create the Order History page at `src/app/account/orders/page.tsx`. Fetch the mock order data from `src/lib/mocks/orders.ts`.
11. `- [x] FE Task:` On the Order History page, if no orders exist in the mock data, display the `EmptyProductList` component with a relevant message. Otherwise, map over the orders and display each one in a separate `<Card>`, showing Order ID, Date, Total, and Status. Include a "View Details" `<Button>` on each card.
12. `- [x] FE Task:` Create the dynamic Order Details page at `src/app/account/orders/[orderId]/page.tsx`. On this page, find the specific order from the mock data array using the `orderId` from the URL. Display all details of that order.
13. `- [x] Mock Data Task:` Create `src/lib/mocks/addresses.ts`. Define a mock data array with 2-3 sample addresses for the mock user.
14. `- [x] FE Task:` Create the "My Addresses" page at `src/app/account/addresses/page.tsx`. Fetch and display the user's saved addresses from the mock data file.
15. `- [x] FE Task:` Implement an "Add New Address" feature on the "My Addresses" page, using a `<Dialog>` to open a form. The form fields must be identical to those in the checkout process. Submitting the form will log the new address to the console, simulating a save action.

## **Epic 2: Full Wishlist Functionality**

- **User Story:** As a shopper, I want to add products to a personal wishlist so I can easily find and purchase them later.

<IMPORTANT_NOTES>

1. Wishlist Context Implementation:

   - Follow the existing pattern used in AuthContext and CartContext
   - Use React's Context API for global state management
   - Include functions for adding/removing items and checking if an item exists in the wishlist
   - Store wishlist data in localStorage for persistence between sessions

2. ProductCard Component Integration:

   - The ProductCard component already has a heart icon with toggle functionality
   - Currently uses local state (isFavorite) that needs to be replaced with WishlistContext state
   - When clicked, the heart icon should trigger the appropriate WishlistContext functions
   - The heart icon should be filled/unfilled based on whether the product's ID is present in the wishlist

3. Mock Data Structure:

   - Create a mock wishlist data structure similar to the existing mock cart data
   - The fetchWishlist function should return an array of product IDs
   - When displaying wishlist items, fetch the full product details using the existing product API

4. UI/UX Considerations:

   - The WishlistButton component in HeaderComponents.tsx already exists and should display the count of wishlist items
   - The "My Wishlist" link already exists in the user dropdown menu
   - The wishlist page should use the account section layout created in Epic 1
   - Empty wishlist state should use the EmptyProductList component with appropriate messaging
   - Use the existing ProductCard component to display wishlist items

5. Data Flow:

   - Initialize wishlist from localStorage on page load
   - Update localStorage whenever the wishlist changes
   - Provide clear visual feedback when adding/removing items from the wishlist
     </IMPORTANT_NOTES>

6. `- [x] Mock Data Task:` Create `src/lib/mocks/wishlist.ts`. This file will export a mock `fetchWishlist` function that returns a promise resolving with an array of product IDs (e.g., `['3', '4']`), and mock `addToWishlist`/`removeFromWishlist` functions that log actions to the console.
7. `- [x] FE Task:` Create a new `WishlistContext` (`/src/contexts/WishlistContext.tsx`). This context will manage the state of the user's wishlist (`productIds`), fetching it using the mock `fetchWishlist` function on initial load.
8. `- [x] FE Task:` Integrate the `WishlistProvider` into the root layout (`/src/app/layout.tsx`) so all components can access it.
9. `- [x] FE Task:` Refactor the `ProductCard` component (`/src/components/common/ProductCard.tsx`). The heart icon's `onClick` handler should now call the `addToWishlist` or `removeFromWishlist` functions from `WishlistContext`. The icon's filled/unfilled state must be derived from checking if the product's ID is present in the `WishlistContext` state.
10. `- [x] FE Task:` Create the Wishlist page at `/src/app/account/wishlist/page.tsx`, ensuring it uses the account section layout.
11. `- [x] Mock Data Task:` Create `src/lib/mocks/products.ts` and export a function `fetchProductsByIds(ids: string[])`. This function should filter the main product list from `db.json` and return the full product objects for the given IDs.
12. `- [x] FE Task:` On the Wishlist page, use the product IDs from `WishlistContext` to call the new mock `fetchProductsByIds` function to get the details of the wishlisted items.
13. `- [x] FE Task:` Display the fetched wishlist products in a grid using the `ProductCard` component. If the wishlist is empty, render the `EmptyProductList` component with an appropriate message.

## **Epic 3: Authentication & Security Enhancements**

- **User Story:** As a user who has forgotten my password, I want a secure way to reset it so I can regain access to my account.

<IMPORTANT_NOTES>

1. Authentication Implementation:

   - The current AuthContext and auth-service.ts already handle login/signup functionality
   - There's currently no password reset implementation in the auth service
   - LocalStorage is used to persist authentication state
   - The link to the forgot password page already exists in the login page

2. Form Implementation:

   - Follow the existing form validation patterns used in login/signup pages:
     - Use useState for form state management
     - Implement validateForm() function to validate inputs before submission
     - Display validation errors beneath each input field
     - Disable the form during submission
   - Use the existing UI components (Card, Button, Input, Label) to maintain design consistency
   - Match the styling of the existing login/signup pages

3. Notification System:

   - Use the notificationService from src/services/notification-service.ts
   - For loading states: notificationService.loading()
   - For success: notificationService.loadingToSuccess()
   - For errors: notificationService.loadingToError()

4. Security Considerations:

   - When a user requests a password reset, do not reveal if an account with that email exists
   - Display a generic confirmation message regardless of whether the email exists
   - For the reset password page, simulate token validation via URL params
   - Enforce password strength requirements in the client-side validation
   - Require password confirmation and validate that both entries match

5. User Flow:

   - Forgot Password page: User enters email → sees confirmation message
   - Reset Password page: User enters new password and confirms → redirected to login page on success
   - Both pages should include links back to the login page
   - Add appropriate loading states to indicate form submission is in progress
     </IMPORTANT_NOTES>

6. `- [x] FE Task:` Create the "Forgot Password" page at `/src/app/auth/forgot-password/page.tsx`. The UI must include an email `<Input>` and a "Send Reset Link" `<Button>`, matching the style of the Login page.
7. `- [x] FE Task:` Implement the `onSubmit` logic for the form. It should simulate an API call (e.g., a `Promise` with a `setTimeout`), then display a confirmation message to the user: "If an account with that email exists, a reset link has been sent."
8. `- [x] FE Task:` Create the "Reset Password" page at `/src/app/auth/reset-password/page.tsx`. The page should be accessible via a URL like `/auth/reset-password?token=mock123` to simulate a link from an email.
9. `- [x] FE Task:` The UI must have two `<Input type="password">` fields ("New Password" and "Confirm New Password") and a "Reset Password" `<Button>`. Include client-side validation to ensure the passwords match and meet minimum length requirements.
10. `- [x] FE Task:` Implement the `onSubmit` logic. On successful validation, it should simulate an API call, then show a success alert and redirect the user to the `/auth/login` page.

## **Epic 4: Static & Informational Pages**

- **User Story:** As a user or potential customer, I want to learn more about the company and find answers to my questions to build trust and get help when needed.

<IMPORTANT_NOTES>

1. Page Structure and Layout:

   - Follow the existing pattern from privacy-policy and terms-and-conditions pages
   - Use the container class with appropriate max-width for content readability
   - Include a main heading (text-3xl) and proper heading hierarchy (h1, h2)
   - Add a "Back to Homepage" button at the bottom of each page

2. Categories Page Implementation:

   - The CategoryGrid component already exists and can be reused
   - HomepageCategoryGrid already includes a "View all categories" link pointing to /categories
   - Create a mock categories data file similar to the existing category structure in db.json
   - The categories page should display all categories without limiting to 8 (as done in HomepageCategoryGrid)

3. Form Implementation for Contact Page:

   - Use the same form validation pattern as seen in login/signup forms
   - Include proper error handling and validation messages
   - Form fields should include: Name, Email, Subject (dropdown), Message (textarea)
   - Form submission should log data to console (simulating an API call)
   - Include a loading state while the form is "submitting"

4. FAQ Page Implementation:

   - Use the Shadcn Accordion component for expandable FAQ items
   - Each FAQ should have a question (title) and answer (content)
   - Create 5-7 realistic FAQs covering common questions (shipping, returns, account issues, etc.)
   - Group FAQs by categories if appropriate

5. Footer Updates:

   - The Footer component (src/components/layout/Footer.tsx) needs to be updated to include links to the new pages
   - Maintain the existing design pattern of the footer
   - Group related links together (e.g., About Us and Contact Us in one group, Terms and Privacy in another)

6. Content Guidelines:

   - Even for placeholder text, maintain a professional and consistent brand voice
   - Ensure content is accessible (proper heading structure, descriptive link text)
   - About Us page should include company mission, values, and brief history
   - Contact page should include additional contact methods besides the form (email, phone)
     </IMPORTANT_NOTES>

7. `- [ ] FE Task:` Create a dedicated page for viewing all categories at `/src/app/categories/page.tsx`. This page should fetch category data from a new mock file (`src/lib/mocks/categories.ts`) and display them using the `CategoryGrid` component.
8. `- [ ] FE Task:` Update the "View all categories" link in `src/components/homepage/HomepageCategoryGrid.tsx` to correctly navigate to the new `/categories` page.
9. `- [ ] FE Task:` Create a basic "About Us" page at `/src/app/about/page.tsx`. Use placeholder text and style it consistently with the `TermsAndConditionsPage` component.
10. `- [ ] FE Task:` Create a basic "Contact Us" page at `/src/app/contact/page.tsx`. Include placeholder contact information and a simple form (Name, Email, Message) that logs the form data to the console on submit.
11. `- [ ] FE Task:` Create an "FAQ" page at `/src/app/faq/page.tsx`. Use the Shadcn `<Accordion>` component to build a list of at least 5-7 frequently asked questions with placeholder answers.
12. `- [ ] FE Task:` Update the `Footer` component in `src/components/layout/Footer.tsx` to include navigation links to the new "About Us," "Contact Us," and "FAQ" pages.
