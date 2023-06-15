import React from "react";

const ProductImageDisplay: React.FC<{
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setFullscreenImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  setFullscreenImageOpen,
}) => {
  return (
    <div className="flex w-fit shrink-0 flex-col justify-end gap-3 px-[3vw] md:pr-0 lg:flex-row-reverse">
      <img
        src={images[currentImageIndex]}
        alt="product image"
        className="aspect-auto  w-full cursor-zoom-in object-cover md:max-w-[35vw]"
        onClick={() => setFullscreenImageOpen(true)}
      />
      <div className="custom_scrollbar flex max-h-[50vh] gap-2 overflow-x-auto overflow-y-auto lg:flex-col">
        {images.map((imageSrc, index) => (
          <img
            src={imageSrc}
            alt=""
            key={index}
            className={`aspect-auto h-20 w-auto ${
              index === currentImageIndex ? "opacity-100" : "opacity-75"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageDisplay;
