import Image from "next/image";
import React, { FC, useRef, useState } from "react";

const ImageZoom: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>();
  const imageRef = useRef<HTMLDivElement>();

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    if (!imageRef.current) return;
    imageRef.current.style.transform = `scale(1) translate(0%, 0%)`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const { left, top } = container.getBoundingClientRect();
    const mouseX = left + container.clientWidth / 2 - e.clientX;
    const mouseY = top + container.clientHeight / 2 - e.clientY;

    const zoomScale = "150%";
    const translateX = (mouseX / 3) * 1.2;
    const translateY = (mouseY / 3) * 1.2;

    image.style.transform = `scale(${zoomScale}) translate(${translateX}px, ${translateY}px)`;
  };

  return (
    <div
      className={`relative h-full w-fit cursor-zoom-in overflow-hidden max-md:hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={(ref) => {
        if (ref) containerRef.current = ref;
      }}
    >
      <Image
        width={1440}
        height={1080}
        src={src}
        alt={alt}
        className="h-full object-contain"
        ref={(ref) => {
          if (ref) imageRef.current = ref;
        }}
      />
    </div>
  );
};

export default ImageZoom;
