import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white border-t border-gray-200 py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          {/* Copyright */}
          <div className='text-sm text-gray-500'>
            © SynergyMart {currentYear}. All rights reserved.
          </div>

          {/* Links */}
          <div className='flex gap-6 text-sm'>
            <Link
              href='/terms-and-conditions'
              className='text-gray-500 hover:text-gray-900 transition-colors'
            >
              Terms & Conditions
            </Link>
            <Link
              href='/privacy-policy'
              className='text-gray-500 hover:text-gray-900 transition-colors'
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
