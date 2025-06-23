'use client';

import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import styles from './ProductImageGallery.module.css';

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

  // Always use fixed dimensions to ensure proper display
  const containerStyle: CSSProperties = {
    maxWidth: '100%',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div>
      <div className='aspect-square overflow-hidden bg-white'>
        <div className='w-full h-full'>
          {isMobile ? (
            // Mobile view - standard Image component
            <div className='relative w-full h-full'>
              <Image
                src={images[selectedImage]}
                alt={title}
                fill
                className='object-contain p-4 pt-0 sm:pt-6 sm:p-6'
                priority
              />
            </div>
          ) : (
            // Desktop view - ReactImageMagnify
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: title,
                  src: images[selectedImage],
                  width: 500,
                  height: 500,
                  isFluidWidth: true,
                },
                largeImage: {
                  src: images[selectedImage],
                  width: 1200,
                  height: 1200,
                },
                style: containerStyle,
                imageClassName: 'small-img p-4 pt-0 sm:pt-6 sm:p-6',
                enlargedImageContainerClassName: styles.enlargedImageContainer,
                enlargedImageContainerDimensions: {
                  width: '100%',
                  height: '100%',
                },
                isHintEnabled: true,
                hintTextMouse: 'Hover to zoom',
                hintTextTouch: 'Long-touch to zoom',
                shouldHideHintAfterFirstActivation: true,
                enlargedImagePosition: 'beside',
                fadeDurationInMs: 300,
                hoverDelayInMs: 100,
              }}
            />
          )}
        </div>
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
