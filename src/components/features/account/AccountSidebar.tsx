'use client';

import { MapPin, Package, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink = ({ href, icon, label, isActive }: NavLinkProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground font-medium'
        : 'text-muted-foreground hover:bg-muted'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default function AccountSidebar() {
  const pathname = usePathname();

  const navLinks = [
    {
      href: '/account',
      icon: <User size={18} />,
      label: 'My Profile',
    },
    {
      href: '/account/orders',
      icon: <Package size={18} />,
      label: 'Order History',
    },
    {
      href: '/account/addresses',
      icon: <MapPin size={18} />,
      label: 'My Addresses',
    },
    // Optional: can add wishlist here when implemented
  ];

  return (
    <div className='bg-white shadow rounded-lg p-4'>
      <h2 className='font-medium text-lg mb-4 px-4'>Account Navigation</h2>

      <nav className='flex flex-col gap-1'>
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={
              pathname === link.href ||
              (link.href !== '/account' && pathname?.startsWith(link.href))
            }
          />
        ))}
      </nav>
    </div>
  );
}
