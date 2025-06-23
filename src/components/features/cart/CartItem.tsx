import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../../../components/ui/button';
import { useCart } from '../../../contexts/CartContext';

interface CartItemProps {
  item: {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className='flex items-center space-x-4 py-2 border-b'>
      <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border'>
        <Image
          src={item.imageUrl || '/placeholder.jpg'}
          alt={item.name}
          fill
          className='object-cover'
        />
      </div>

      <div className='flex-1 min-w-0'>
        <h4 className='text-sm font-medium truncate'>{item.name}</h4>
        <p className='text-sm text-muted-foreground'>Tk {item.price}</p>
      </div>

      <div className='flex flex-col items-end'>
        <div className='flex items-center border rounded-md'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
          >
            <span className='sr-only'>Decrease quantity</span>
            <span>-</span>
          </Button>

          <span className='w-8 text-center text-sm'>{item.quantity}</span>

          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={handleIncrement}
          >
            <span className='sr-only'>Increase quantity</span>
            <span>+</span>
          </Button>
        </div>

        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 text-destructive mt-1'
          onClick={handleRemove}
        >
          <Trash2 className='h-4 w-4' />
          <span className='sr-only'>Remove item</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
