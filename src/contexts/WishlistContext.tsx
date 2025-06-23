'use client';

import {
  addToWishlist as addToWishlistApi,
  fetchWishlist as fetchWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
} from '@/lib/mocks/wishlist';
import { notificationService } from '@/services';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

// Interface for the wishlist context
interface WishlistContextType {
  productIds: string[];
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlistItem: (productId: string) => Promise<void>;
}

// Create the context with default values
const WishlistContext = createContext<WishlistContextType>({
  productIds: [],
  isLoading: false,
  isInWishlist: () => false,
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  toggleWishlistItem: async () => {},
});

// Hook to use the wishlist context
export const useWishlist = () => useContext(WishlistContext);

// localStorage key for caching wishlist data
const WISHLIST_STORAGE_KEY = 'wishlist_data';

// Provider component for the wishlist context
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load wishlist data from localStorage on initial render
  useEffect(() => {
    const loadWishlistFromStorage = () => {
      if (typeof window === 'undefined') return;

      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        try {
          setProductIds(JSON.parse(storedWishlist));
        } catch (error) {
          console.error('Error parsing wishlist from localStorage:', error);
        }
      }
    };

    loadWishlistFromStorage();
  }, []);

  // Fetch wishlist data from API when user changes
  useEffect(() => {
    const fetchUserWishlist = async () => {
      if (!isAuthenticated || !user) return;

      setIsLoading(true);
      try {
        const wishlistData = await fetchWishlistApi(user.id);
        setProductIds(wishlistData);

        // Save to localStorage for persistence
        localStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify(wishlistData)
        );
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        notificationService.error('Failed to load your wishlist');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserWishlist();
  }, [user, isAuthenticated]);

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string): boolean => {
    return productIds.includes(productId);
  };

  // Add a product to the wishlist
  const addToWishlist = async (productId: string): Promise<void> => {
    if (!isAuthenticated || !user) {
      notificationService.error('Please login to add items to your wishlist');
      return;
    }

    // Optimistic update
    if (!isInWishlist(productId)) {
      setProductIds((prev) => [...prev, productId]);
    }

    try {
      await addToWishlistApi(user.id, productId);

      // Update localStorage
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify([...productIds, productId])
      );

      notificationService.success('Added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);

      // Revert optimistic update
      setProductIds((prev) => prev.filter((id) => id !== productId));
      notificationService.error('Failed to add to wishlist');
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = async (productId: string): Promise<void> => {
    if (!isAuthenticated || !user) {
      notificationService.error('Please login to manage your wishlist');
      return;
    }

    // Optimistic update
    setProductIds((prev) => prev.filter((id) => id !== productId));

    try {
      await removeFromWishlistApi(user.id, productId);

      // Update localStorage
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(productIds.filter((id) => id !== productId))
      );

      notificationService.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);

      // Revert optimistic update
      setProductIds((prev) => [...prev, productId]);
      notificationService.error('Failed to remove from wishlist');
    }
  };

  // Toggle a product in the wishlist (add if not present, remove if present)
  const toggleWishlistItem = async (productId: string): Promise<void> => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        productIds,
        isLoading,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
