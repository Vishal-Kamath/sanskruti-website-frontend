import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const images = {
    desktop: ['temp/desktop1.png', 'temp/desktop2.png'],
    mobile: ['temp/mobile1.png', 'temp/mobile2.png'],
  };
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="px-[5vw]">
      <div
        className="overflow-hidden rounded-md border-2 border-gray-300"
        ref={emblaRef}
      >
        <div className="flex">
          {images.desktop.map((value, index) => {
            return isMobile ? (
              <img
                key={images.mobile[index]}
                src={images.mobile[index]}
                alt={images.mobile[index]}
                className="w-full"
              />
            ) : (
              <img key={value} src={value} alt={value} className="w-full" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
