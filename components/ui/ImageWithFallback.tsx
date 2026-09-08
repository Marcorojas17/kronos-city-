// components/ui/ImageWithFallback.tsx
import { useState } from 'react';
import Image from 'next/image';

export const ImageWithFallback = ({ src, fallbackSrc, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc || '/images/placeholder.png')}
    />
  );
};
