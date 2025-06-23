'use client';

import Link from 'next/link';
import React from 'react';
import FallbackImage from '../common/FallbackImage';

interface Offer {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface HomepageOffersProps {
  offers: Offer[];
}

const HomepageOffers: React.FC<HomepageOffersProps> = ({ offers }) => {
  return (
    <section>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {offers.map((offer) => (
          <Link
            href={`/offers/${offer.id}`}
            key={offer.id}
            className='rounded-lg border border-gray-200 p-3 md:p-4 flex items-center gap-3 hover:opacity-95 transition-opacity bg-white hover:bg-primary/5'
          >
            <FallbackImage
              src={offer.icon}
              alt={offer.title}
              width={24}
              height={24}
              className='size-12 md:size-16 rounded-md'
            />
            <div>
              <h3 className='font-semibold text-xs md:text-sm line-clamp-1'>
                {offer.title}
              </h3>
              <p className='text-[10px] md:text-xs text-gray-600 line-clamp-2'>
                {offer.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomepageOffers;
