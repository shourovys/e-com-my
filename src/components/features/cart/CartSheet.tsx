'use client';

import React from 'react';
import CartDrawer from '../../cart/CartDrawer';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({ open, onOpenChange }) => {
  return <CartDrawer open={open} setOpen={onOpenChange} />;
};
