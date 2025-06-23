# Services Documentation

This document describes the enhanced API service architecture for the application.

## Service Architecture

### 1. API Service (`src/services/api.ts`)

A comprehensive axios-based API service that handles:

- Authentication token management
- Error handling
- Type-safe requests (GET, POST, PUT, DELETE)
- Form data submissions
- Request/response interceptors

#### Usage Examples:

```typescript
// Import
import { apiService } from '@/services';

// GET request with type safety
const products = await apiService.get<Product[]>('/products');

// POST request with type safety
const response = await apiService.post<CreateOrderData, OrderResponse>(
  '/orders',
  orderData
);

// PUT request
await apiService.put<UpdateUserData>('/users/profile', userData);

// DELETE request
await apiService.delete(`/cart/items/${itemId}`);

// Form data upload
const formData = new FormData();
formData.append('image', imageFile);
await apiService.postFormData<UploadResponse>('/upload', formData);
```

### 2. Auth Service (`src/services/auth-service.ts`)

Manages authentication related functionality:

- Login/Signup
- Token validity checks and automatic refresh
- User session persistence
- Authentication state

#### Usage Examples:

```typescript
// Import
import { authService } from '@/services';

// Login
const user = await authService.login({ email, password });

// Signup
const user = await authService.signup({ name, email, password });

// Logout
authService.logout();

// Check auth status
const isLoggedIn = authService.isAuthenticated();

// Get current user
const currentUser = authService.getCurrentUser();
```

### 3. Notification Service (`src/services/notification-service.ts`)

Provides a unified API for displaying toast notifications:

- Success/error/info/warning/loading notifications
- Consistent styling
- Loading state management
- Duration control

#### Usage Examples:

```typescript
// Import
import { notificationService } from '@/services';

// Show success notification
notificationService.success('Item added to cart successfully');

// Show error notification
notificationService.error('Failed to process payment');

// Show loading notification
const toastId = notificationService.loading('Processing payment...');

// Convert loading to success
notificationService.loadingToSuccess(toastId, 'Payment processed successfully');

// Convert loading to error
notificationService.loadingToError(toastId, 'Payment processing failed');
```

## Implementation Details

### API Service

- Uses axios for HTTP requests
- Implements request/response interceptors for token management
- Handles token refreshing when expired
- Provides type-safe methods for different HTTP verbs

### Auth Service

- Manages JWT tokens
- Handles token storage and retrieval
- Validates token expiration
- Provides methods for login/signup/logout
- Refreshes tokens automatically when needed

### Notification Service

- Built on react-hot-toast
- Provides a consistent API for different notification types
- Handles loading state transitions
- Allows customization of notification appearance and duration

## Dependencies

- axios: HTTP client
- jwt-decode: JWT token parsing
- react-hot-toast: Toast notification library
