# API Migration: JSON Server to Next.js API Routes

This project has been migrated from using json-server for a mock API to using Next.js API routes.

## Changes Made

1. Removed `json-server` dependency and related scripts from `package.json`
2. Created a database utility (`src/lib/db.ts`) to read/write the `db.json` file
3. Implemented API routes for all resources in `src/app/api/`:
   - `/api/categories`
   - `/api/products`
   - `/api/product-categories`
   - `/api/subcategories`
   - `/api/users`
   - `/api/carts`
   - `/api/me`
   - `/api/offers`

## API Usage

All API endpoints support the standard RESTful operations:

- `GET`: Retrieve data
- `POST`: Create new data
- `PUT`: Update existing data
- `DELETE`: Remove data

### Query Parameters

Most endpoints support query parameters for filtering:

- `id`: Get a specific item by ID
- Resource-specific filters (e.g., `categoryId` for products)

### Example API Requests

#### Get all products

```
GET /api/products
```

#### Get product by ID

```
GET /api/products?id=1
```

#### Get products by category

```
GET /api/products?categoryId=2
```

#### Create a new product

```
POST /api/products
```

With request body containing the product data.

#### Update a product

```
PUT /api/products?id=1
```

With request body containing the updated fields.

#### Delete a product

```
DELETE /api/products?id=1
```

## Database

The same `db.json` file is used as the database, ensuring backward compatibility with the previous implementation.

## Benefits of Migration

- Better integration with Next.js application
- TypeScript support with proper types for all collections
- Centralized data management
- Easier to add server-side validation and business logic
- More realistic API behavior for development
