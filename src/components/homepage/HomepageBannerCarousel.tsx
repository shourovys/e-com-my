'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FallbackImage from '../common/FallbackImage';
import { Button } from '../ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Banner {
  id: string;
  imageUrl: string;
  link: string;
  title: string;
  subtitle?: string;
}

interface HomepageBannerCarouselProps {
  className?: string;
}

const HomepageBannerCarousel: React.FC<HomepageBannerCarouselProps> = ({
  className = '',
}) => {
  // Define banners

  const banners: Banner[] = [
    {
      id: '3',
      imageUrl:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&h=400&q=80', // Modern laptop and gadgets
      link: '/categories/electronics/gadget-fair',
      title: 'Tech Gadget Fair!',
      subtitle:
        'Latest Smartphones, Laptops & Accessories at Unbeatable Prices. EMI Available!',
    },
    {
      id: '4',
      imageUrl:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=400&q=80', // Fresh groceries, fruits & vegetables
      link: '/categories/groceries/daily-deals',
      title: 'Fresh Groceries, Delivered Fast!',
      subtitle: 'Order Your Daily Essentials & Get Same-Day Delivery in Dhaka.',
    },
    {
      id: '5',
      imageUrl:
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1200&h=400&q=80', // Scenic image for travel/outdoors
      link: '/offers/victory-day-sale',
      title: 'Victory Day Special Offers!',
      subtitle:
        'Celebrate with us! Exclusive deals on a wide range of products.',
    },
  ];

  // To use this:
  // console.log(banners);

  return (
    <div className={`relative rounded-xl ${className}`}>
      <div className='h-36 sm:h-64 md:h-80 relative'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1.25}
          breakpoints={{
            640: { slidesPerView: 1 },
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass:
              'w-2.5 h-2.5 rounded-full transition-all inline-block mx-1 bg-white/50 hover:bg-white/80',
            bulletActiveClass: 'bg-white w-6',
          }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          className='h-full'
        >
          {banners.map((banner) => (
            <SwiperSlide
              key={banner.id}
              className='h-full rounded-sm overflow-hidden'
            >
              <Link
                href={banner.link}
                className='flex-shrink-0 w-full h-full relative block'
              >
                <FallbackImage
                  src={banner.imageUrl}
                  alt={banner.title}
                  width={1200}
                  height={400}
                  className='w-full h-full object-cover'
                />
                <div className='absolute hidden sm:flex inset-0 bg-gradient-to-r from-black/40 to-transparent flex-col justify-center px-6 sm:px-10 md:px-16'>
                  <h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className='text-white/90 max-w-md text-sm sm:text-base'>
                      {banner.subtitle}
                    </p>
                  )}
                  <div className='mt-4 sm:mt-6'>
                    <Button variant='outline'>Explore Now</Button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8 md:px-12 z-10 pointer-events-none'>
          <button
            className='swiper-button-prev size-6 sm:size-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/60 transition-colors after:hidden pointer-events-auto'
            aria-label='Previous slide'
          >
            <ChevronLeft className='size-4 sm:size-5' />
          </button>

          <button
            className='swiper-button-next size-6 sm:size-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/60 transition-colors after:hidden pointer-events-auto'
            aria-label='Next slide'
          >
            <ChevronRight className='size-4 sm:size-5' />
          </button>
        </div>

        {/* Custom pagination */}
        <div className='swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10'></div>
      </div>
    </div>
  );
};

export default HomepageBannerCarousel;
