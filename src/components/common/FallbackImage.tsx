'use client';

import Image from 'next/image';
import { useState } from 'react';

// Base64 encoded placeholder image - a simple gray square with a broken image icon
const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM2NjYiPkltYWdlIGVycm9yPC90ZXh0PjxyZWN0IHg9IjYwIiB5PSI4MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxsaW5lIHgxPSI2MCIgeTE9IjgwIiB4Mj0iMTQwIiB5Mj0iMTQwIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSIxNDAiIHkxPSI4MCIgeDI9IjYwIiB5Mj0iMTQwIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => {
        console.log('Image failed to load:', src);
        setImgSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
