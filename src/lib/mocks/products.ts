'use client';

// Import from client-db.ts for accessing the mock data
import clientDb from '@/lib/client-db';
import { Product } from '@/lib/db';

// Cache the DB data to avoid repeated operations
let dbCache: { products: Product[] } | null = null;

/**
 * Get products data with caching
 */
const getProducts = async (): Promise<Product[]> => {
  if (dbCache?.products) {
    return dbCache.products;
  }

  try {
    // Use the client-side DB
    const products = clientDb.products;
    dbCache = { products };
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

/**
 * Fetch products by their IDs
 * @param ids Array of product IDs to fetch
 * @returns Promise resolving to an array of products
 */
export const fetchProductsByIds = async (ids: string[]): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      // Get all products from db
      const allProducts = await getProducts();

      // Filter products by the provided IDs
      const filteredProducts = allProducts.filter((product: Product) =>
        ids.includes(product.id)
      );

      resolve(filteredProducts);
    }, 500);
  });
};

/**
 * Fetch all products
 * @returns Promise resolving to an array of all products
 */
export const fetchAllProducts = async (): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const products = await getProducts();
      resolve(products);
    }, 500);
  });
};

/**
 * Fetch featured products
 * @param limit Maximum number of products to return
 * @returns Promise resolving to an array of featured products
 */
export const fetchFeaturedProducts = async (
  limit?: number
): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const allProducts = await getProducts();
      const featuredProducts = allProducts.filter(
        (product: Product) => product.isFeatured
      );

      // Apply limit if provided
      const limitedProducts = limit
        ? featuredProducts.slice(0, limit)
        : featuredProducts;

      resolve(limitedProducts);
    }, 500);
  });
};

/**
 * Fetch products by category
 * @param categoryId Category ID to filter by
 * @param limit Maximum number of products to return
 * @returns Promise resolving to an array of products in the category
 */
export const fetchProductsByCategory = async (
  categoryId: string,
  limit?: number
): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const allProducts = await getProducts();
      const categoryProducts = allProducts.filter(
        (product: Product) => product.categoryId === categoryId
      );

      // Apply limit if provided
      const limitedProducts = limit
        ? categoryProducts.slice(0, limit)
        : categoryProducts;

      resolve(limitedProducts);
    }, 500);
  });
};
