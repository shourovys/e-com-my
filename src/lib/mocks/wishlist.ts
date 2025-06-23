// Mock wishlist data - an array of product IDs
const mockWishlist: Record<string, string[]> = {
  '1': ['3', '4'], // User ID 1 has products 3 and 4 in their wishlist
};

/**
 * Fetch the wishlist for a user
 * @param userId The user ID to fetch the wishlist for
 * @returns A promise that resolves with an array of product IDs
 */
export const fetchWishlist = (userId: string): Promise<string[]> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return the user's wishlist or an empty array if not found
      resolve(mockWishlist[userId] || []);
    }, 500);
  });
};

/**
 * Add a product to the user's wishlist
 * @param userId The user ID
 * @param productId The product ID to add
 * @returns A promise that resolves when the operation is complete
 */
export const addToWishlist = (
  userId: string,
  productId: string
): Promise<void> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create user entry if it doesn't exist
      if (!mockWishlist[userId]) {
        mockWishlist[userId] = [];
      }

      // Add to wishlist if not already in it
      if (!mockWishlist[userId].includes(productId)) {
        mockWishlist[userId].push(productId);
      }

      console.log(`Added product ${productId} to user ${userId}'s wishlist`);
      console.log('Current wishlist:', mockWishlist[userId]);

      resolve();
    }, 300);
  });
};

/**
 * Remove a product from the user's wishlist
 * @param userId The user ID
 * @param productId The product ID to remove
 * @returns A promise that resolves when the operation is complete
 */
export const removeFromWishlist = (
  userId: string,
  productId: string
): Promise<void> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // If user has a wishlist, filter out the product
      if (mockWishlist[userId]) {
        mockWishlist[userId] = mockWishlist[userId].filter(
          (id) => id !== productId
        );
      }

      console.log(
        `Removed product ${productId} from user ${userId}'s wishlist`
      );
      console.log('Current wishlist:', mockWishlist[userId]);

      resolve();
    }, 300);
  });
};

/**
 * Check if a product is in the user's wishlist
 * @param userId The user ID
 * @param productId The product ID to check
 * @returns A promise that resolves with a boolean indicating if the product is in the wishlist
 */
export const isInWishlist = (
  userId: string,
  productId: string
): Promise<boolean> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if the product is in the user's wishlist
      resolve(mockWishlist[userId]?.includes(productId) || false);
    }, 100);
  });
};
