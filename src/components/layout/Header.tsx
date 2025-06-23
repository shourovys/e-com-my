'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { CartSheet } from '../features/cart/CartSheet';
import {
  CartButton,
  Logo,
  MobileMenuButton,
  SearchBar,
  UserButton,
  WishlistButton,
} from './HeaderComponents';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const router = useRouter();

  // Calculate total items in cart
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Handle search submission
  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setMobileSearchExpanded(false);
    }
  };

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm transition-colors duration-300'>
      <div className='container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between'>
        {/* Logo and menu button */}
        <div
          className={`flex items-center gap-2 ${
            mobileSearchExpanded ? 'md:flex hidden' : 'flex'
          }`}
        >
          {/* Mobile menu trigger - visible only on mobile */}
          <div className='md:hidden'>
            <MobileMenuButton
              open={mobileMenuOpen}
              setOpen={setMobileMenuOpen}
            />
          </div>
          <Logo />
        </div>

        {/* Search Bar - responsive for all screen sizes */}
        <div
          className={`flex-1 max-w-xl mx-2 sm:mx-6 ${
            mobileSearchExpanded ? 'flex' : 'hidden md:flex'
          }`}
        >
          <SearchBar
            onSearch={handleSearch}
            onSearchToggle={setMobileSearchExpanded}
            isExpanded={mobileSearchExpanded}
          />
        </div>

        {/* Actions: User, Wishlist, Cart */}
        <div
          className={`flex items-center gap-1 sm:gap-4 ${
            mobileSearchExpanded ? 'md:flex hidden' : 'flex'
          }`}
        >
          {/* Search Icon - mobile only */}
          {!mobileSearchExpanded && (
            <button
              onClick={() => setMobileSearchExpanded(true)}
              className='md:hidden p-2 text-muted-foreground hover:text-primary transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-search'
              >
                <circle cx='11' cy='11' r='8'></circle>
                <path d='m21 21-4.3-4.3'></path>
              </svg>
            </button>
          )}

          {/* User Button */}
          {!isAuthenticated ? (
            <div className={mobileSearchExpanded ? 'hidden md:block' : 'block'}>
              <UserButton />
            </div>
          ) : (
            <div className='hidden md:block'>
              <UserButton />
            </div>
          )}

          {/* Wishlist Button */}
          <div className='hidden md:block'>
            <WishlistButton />
          </div>

          {/* Cart Button */}
          <div className={mobileSearchExpanded ? 'hidden md:block' : 'block'}>
            <CartButton
              count={cartItemCount}
              onClick={() => setCartOpen(true)}
            />
          </div>

          {/* Cart Sheet */}
          <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
