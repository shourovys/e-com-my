'use client';

import {
  Bell,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

// Extend the existing User type
interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Logo Component
export const Logo = () => {
  return (
    <Link href='/' className='flex items-center'>
      <div className='relative w-40 md:w-44 h-14 '>
        <Image
          src='/logo.jpg'
          alt='Logo'
          fill
          priority
          className='object-contain'
        />
      </div>
    </Link>
  );
};

// Enhanced Search Component
export const SearchBar = ({
  onSearch,
  onSearchToggle,
  isExpanded = false,
}: {
  onSearch: (query: string) => void;
  onSearchToggle?: (expanded: boolean) => void;
  isExpanded?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sample suggestions - in a real app, this would come from an API
  const sampleSuggestions = [
    'Smartphones',
    'Laptops',
    'Headphones',
    'Smart watches',
    'Wireless earbuds',
    'Gaming consoles',
    'Tablets',
    'Cameras',
    'Speakers',
    'Smart home devices',
    'Drones',
    'Fitness trackers',
  ];

  // Filter suggestions based on input
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = sampleSuggestions.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // Limit to 6 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle clicks outside of suggestions to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    searchInputRef.current?.blur();
    // Force immediate closure of suggestions to prevent it from showing on the next page
    setTimeout(() => {
      setShowSuggestions(false);
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // No auto-search functionality here - only update query and show suggestions
  };

  // Focus the input field when expanded in mobile view
  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
    }
  }, [isExpanded]);

  // Close mobile search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded && onSearchToggle) {
        onSearchToggle(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded, onSearchToggle]);

  return (
    <form onSubmit={handleSearch} className='w-full relative'>
      <div className='relative w-full group'>
        <div className='relative overflow-hidden transition-all duration-300'>
          <Input
            ref={searchInputRef}
            type='text'
            placeholder='Search products...'
            className='w-full pl-10 md:pl-12 pr-10 h-10 md:h-12 rounded-full border-none bg-gray-100 border-gray-200 focus:bg-white transition-all text-gray-700'
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchQuery.trim()) setShowSuggestions(true);
            }}
          />
          <div className='absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-200'>
            <Search className='h-4 md:h-5 w-4 md:w-5 text-gray-400' />
          </div>

          {/* Clear button */}
          {!isExpanded && searchQuery.length > 0 && (
            <button
              type='button'
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              className='absolute right-10 top-1/2 transform -translate-y-1/2 rounded-full h-6 w-6 p-0 
                bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground 
                transition-colors flex items-center justify-center cursor-pointer'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          )}

          {/* Close button on mobile expanded view */}
          {isExpanded && onSearchToggle && (
            <button
              type='button'
              onClick={() => {
                setSearchQuery('');
                onSearchToggle(false);
              }}
              className='md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-1.5 
                text-muted-foreground hover:text-primary transition-colors cursor-pointer'
            >
              <X className='size-4' />
            </button>
          )}
        </div>

        {/* Search suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className='absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm shadow-lg 
              rounded-lg overflow-hidden z-50 border border-border/20 animate-in fade-in-50 slide-in-from-top-2 
              duration-200'
          >
            <div className='max-h-[90vh] overflow-y-auto'>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='px-4 py-2.5 hover:bg-primary/5 group-suggestions cursor-pointer transition-colors flex items-center gap-2.5 group'
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className='bg-muted/40 rounded-full p-1.5 group-suggestions:group-hover:bg-primary/10 transition-colors'>
                    <Search className='h-3 w-3 text-muted-foreground group-suggestions:group-hover:text-primary transition-colors' />
                  </div>
                  <span className='group-suggestions:group-hover:text-primary transition-colors'>
                    {suggestion}
                  </span>
                </div>
              ))}
              {searchQuery.trim().length > 0 && (
                <div
                  className='px-4 py-3 hover:bg-primary/5 cursor-pointer transition-colors border-t border-border/20 
                    text-primary font-medium flex items-center justify-center gap-2 group'
                  onClick={() => handleSearch()}
                >
                  <span>Search for &quot;{searchQuery}&quot;</span>
                  <div className='bg-primary/10 rounded-full p-1 group-hover:bg-primary/20 transition-colors'>
                    <Search className='h-3 w-3 text-primary' />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

// Mobile Menu Button
export const MobileMenuButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden relative overflow-hidden group'
        >
          <span className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md'></span>
          <Menu className='h-5 w-5 transition-transform duration-200 ease-in-out group-hover:scale-110' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-[250px] sm:w-[300px] backdrop-blur-xl bg-background/95'
      >
        <MobileMenuContent setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

// Mobile Menu Content
export const MobileMenuContent = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const { isAuthenticated, user: authUser, logout } = useAuth();
  const user = authUser as ExtendedUser | null;

  return (
    <>
      <SheetHeader>
        <SheetTitle className='text-left'>Menu</SheetTitle>
      </SheetHeader>
      <div className='py-4 flex flex-col gap-4'>
        {!isAuthenticated ? (
          <Link
            href='/auth/login'
            className='flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-md hover:bg-primary/5 active:bg-primary/10'
            onClick={() => setOpen(false)}
          >
            <User className='h-4 w-4' />
            Login
          </Link>
        ) : (
          <>
            <div className='px-2 mb-2 flex flex-col items-center md:items-start'>
              <Avatar className='h-16 w-16 mb-3 ring-2 ring-primary/10 ring-offset-2 ring-offset-background'>
                {user?.image ? (
                  <AvatarImage src={user.image} alt={user.name || 'User'} />
                ) : (
                  <AvatarFallback className='bg-gradient-to-br from-primary/80 to-primary text-primary-foreground'>
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className='font-semibold text-lg'>
                {user?.name || 'User'}
              </div>
              <div className='text-xs text-muted-foreground truncate max-w-full'>
                {user?.email}
              </div>
            </div>
            <div className='space-y-1.5'>
              <Link
                href='/account'
                className='flex items-center gap-2.5 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5 active:bg-primary/10'
                onClick={() => setOpen(false)}
              >
                <User className='h-4 w-4' />
                <span className='font-medium'>My Profile</span>
              </Link>
              <Link
                href='/account/orders'
                className='flex items-center gap-2.5 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5 active:bg-primary/10'
                onClick={() => setOpen(false)}
              >
                <Package className='h-4 w-4' />
                <span className='font-medium'>Orders</span>
              </Link>
              <Link
                href='/account/wishlist'
                className='flex items-center gap-2.5 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5 active:bg-primary/10'
                onClick={() => setOpen(false)}
              >
                <Heart className='h-4 w-4' />
                <span className='font-medium'>Wishlist</span>
              </Link>
              <Link
                href='/account/settings'
                className='flex items-center gap-2.5 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5 active:bg-primary/10'
                onClick={() => setOpen(false)}
              >
                <Settings className='h-4 w-4' />
                <span className='font-medium'>Settings</span>
              </Link>
            </div>
            <div className='h-px bg-border/50 my-2'></div>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className='flex items-center gap-2.5 text-destructive hover:text-destructive/80 transition-colors px-3 py-2 rounded-md hover:bg-destructive/5 active:bg-destructive/10'
            >
              <LogOut className='h-4 w-4' />
              <span className='font-medium'>Logout</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

// User Button Component
export const UserButton = () => {
  return (
    <Link href='/auth/login' className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='relative overflow-hidden group rounded-full size-10'
      >
        <span className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md'></span>
        <User className='size-5 transition-all duration-200 ease-in-out group-hover:text-primary group-hover:scale-110 group-active:scale-95' />
      </Button>
    </Link>
  );
};

// Wishlist Button Component
export const WishlistButton = ({ count = 0 }) => {
  return (
    <Link href='/account/wishlist' className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='relative overflow-hidden group rounded-full size-10'
      >
        <span className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md'></span>
        <Heart className='size-5 transition-all duration-200 ease-in-out group-hover:text-primary group-hover:scale-110 group-active:scale-95' />
      </Button>
      {count > 0 && (
        <Badge
          variant='default'
          className='absolute -top-2 -right-1 h-5 min-w-5 flex items-center justify-center p-0.5 text-xs animate-in zoom-in-50 duration-300 shadow-sm'
        >
          {count}
        </Badge>
      )}
    </Link>
  );
};

// Cart Button Component
export const CartButton = ({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) => {
  return (
    <div className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='relative overflow-hidden group rounded-full size-10'
        onClick={onClick}
      >
        <span className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md'></span>
        <ShoppingCart className='size-5 transition-all duration-200 ease-in-out group-hover:text-primary group-hover:scale-110 group-active:scale-95' />
      </Button>
      {count > 0 && (
        <Badge
          variant='default'
          className='absolute rounded-full -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0.5 text-xs animate-in zoom-in-50 duration-300 shadow-sm'
        >
          {count}
        </Badge>
      )}
    </div>
  );
};

// Notifications Button
export const NotificationsButton = ({ count = 0 }) => {
  return (
    <Link
      href='/account/notifications'
      className='hidden md:block relative mr-3'
    >
      <Button variant='ghost' size='icon' className='overflow-hidden group'>
        <span className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md'></span>
        <Bell className='h-5 w-5 transition-all duration-200 ease-in-out group-hover:text-primary group-hover:scale-110 group-active:scale-95' />
      </Button>
      {count > 0 && (
        <Badge
          variant='destructive'
          className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground shadow-sm'
        >
          {count}
        </Badge>
      )}
    </Link>
  );
};

// User Menu Component
export const UserMenu = () => {
  const { user: authUser, logout } = useAuth();
  const user = authUser as ExtendedUser | null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='rounded-full p-0 h-9 w-9 ring-offset-background hover:ring-2 hover:ring-primary/20 transition-all duration-200'
        >
          <Avatar className='h-9 w-9 border border-border/40 shadow-sm'>
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name || 'User'} />
            ) : (
              <AvatarFallback className='bg-gradient-to-br from-primary/80 to-primary text-primary-foreground'>
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            )}
          </Avatar>
          <span className='sr-only'>User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-64 p-2 shadow-lg border-border/50 backdrop-blur-sm bg-background/95 animate-in fade-in-50 zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1'
      >
        <div className='flex items-center gap-3 p-3 rounded-md bg-muted/40'>
          <Avatar className='h-12 w-12 ring-2 ring-primary/10 ring-offset-1 ring-offset-background'>
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name || 'User'} />
            ) : (
              <AvatarFallback className='bg-gradient-to-br from-primary/80 to-primary text-primary-foreground'>
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className='flex flex-col'>
            <span className='font-medium text-sm'>{user?.name || 'User'}</span>
            <span className='text-xs text-muted-foreground truncate max-w-[170px]'>
              {user?.email}
            </span>
          </div>
        </div>
        <div className='p-1.5'>
          <DropdownMenuItem
            asChild
            className='flex items-center gap-2 cursor-pointer py-2 my-0.5 focus:bg-primary/5 focus:text-foreground'
          >
            <Link href='/account' className='flex items-center gap-2 w-full'>
              <User className='h-4 w-4 text-muted-foreground' />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className='flex items-center gap-2 cursor-pointer py-2 my-0.5 focus:bg-primary/5 focus:text-foreground'
          >
            <Link
              href='/account/orders'
              className='flex items-center gap-2 w-full'
            >
              <Package className='h-4 w-4 text-muted-foreground' />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className='flex items-center gap-2 cursor-pointer py-2 my-0.5 focus:bg-primary/5 focus:text-foreground'
          >
            <Link
              href='/account/wishlist'
              className='flex items-center gap-2 w-full'
            >
              <Heart className='h-4 w-4 text-muted-foreground' />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className='flex items-center gap-2 cursor-pointer py-2 my-0.5 focus:bg-primary/5 focus:text-foreground md:hidden'
          >
            <Link
              href='/account/notifications'
              className='flex items-center gap-2 w-full'
            >
              <Bell className='h-4 w-4 text-muted-foreground' />
              <span>Notifications</span>
              <Badge
                variant='destructive'
                className='ml-auto text-xs px-1.5 h-5 min-w-[1.25rem] bg-primary text-primary-foreground'
              >
                3
              </Badge>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className='flex items-center gap-2 cursor-pointer py-2 my-0.5 focus:bg-primary/5 focus:text-foreground'
          >
            <Link
              href='/account/settings'
              className='flex items-center gap-2 w-full'
            >
              <Settings className='h-4 w-4 text-muted-foreground' />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className='my-1.5 bg-border/50' />
        <div className='p-1.5'>
          <DropdownMenuItem
            onClick={logout}
            className='flex items-center gap-2 cursor-pointer py-2 my-0.5 text-destructive focus:text-destructive focus:bg-destructive/5'
          >
            <LogOut className='h-4 w-4' />
            <span>Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
