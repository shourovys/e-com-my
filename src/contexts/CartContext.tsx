'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  cartItemId: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  quantity: number;
  hasOffer?: boolean;
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  subtotal: number;
  itemCount: number;
  getQuantity: (productId: string) => number;
  addToCart: (
    product: Omit<CartItem, 'quantity' | 'cartItemId'>,
    quantity: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  subtotal: 0,
  itemCount: 0,
  getQuantity: () => 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',

      title: 'Wireless Earbuds',
      discountPrice: 2999,
      regularPrice: 3500,
      hasOffer: true,
      cartItemId: '3_1747475874528',
      quantity: 1,
    },
    {
      id: '4',
      image:
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=300&q=80',
      title: 'Smart Watch',
      discountPrice: 4500,
      regularPrice: 5000,
      hasOffer: true,
      cartItemId: '4_1747475879434',
      quantity: 1,
    },
  ]);

  const getQuantity = (productId: string) => {
    const item = items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (
    product: Omit<CartItem, 'quantity' | 'cartItemId'>,
    quantity: number
  ) => {
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      updateQuantity(existingItem.cartItemId, existingItem.quantity + quantity);
    } else {
      const newItem: CartItem = {
        ...product,
        cartItemId: `${product.id}_${Date.now()}`,
        quantity,
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate total and subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0
  );

  // For now, total is same as subtotal - in a real app, we'd add fees and discounts
  const total = subtotal;

  // Calculate total item count
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        subtotal,
        itemCount,
        getQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
