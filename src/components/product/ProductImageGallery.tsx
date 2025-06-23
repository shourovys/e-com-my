'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      handleResize();

      // Event listener for window resize
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsZoomed(false);
    }
  };

  return (
    <div>
      <div
        className='aspect-square overflow-hidden bg-white relative'
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='relative w-full h-full'>
          <Image
            src={images[selectedImage]}
            alt={title}
            fill
            className={`object-contain p-4 pt-0 sm:pt-6 sm:p-6 transition-transform duration-200
              ${isZoomed && !isMobile ? 'cursor-zoom-in scale-150' : ''}`}
            priority
            style={
              isZoomed && !isMobile
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : undefined
            }
          />
        </div>

        {!isMobile && !isZoomed && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity'>
            <span className='text-sm text-gray-800 bg-white/90 px-3 py-1 rounded-full shadow-sm'>
              Hover to zoom
            </span>
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      <div className='flex gap-2 sm:justify-center px-4 overflow-x-auto py-2'>
        {images.map((image, index) => (
          <button
            key={index}
            className={`size-12 sm:size-16 bg-white border rounded-md overflow-hidden flex-shrink-0 transition-all ${
              selectedImage === index
                ? 'ring-2 ring-blue-600 scale-110'
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <div className='relative w-full h-full'>
              <Image
                src={image}
                alt={`${title} - view ${index + 1}`}
                fill
                className='object-cover'
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
