"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  isHighlighted: boolean;
}

export default function ProductImageCarousel({
  images,
  productName,
  isHighlighted,
}: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();

      if (e.deltaX > 0) {
        goToNextImage();
      } else if (e.deltaX < 0) {
        goToPreviousImage();
      }
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextImage();
    } else if (isRightSwipe) {
      goToPreviousImage();
    }
  };

  return (
    <div>
      <div
        className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isHighlighted && (
          <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-1 shadow-lg">
            <Star size={16} className="fill-white" />
            Nổi bật
          </div>
        )}
        <img
          src={images[currentImageIndex] || "https://via.placeholder.com/600"}
          alt={productName}
          className="w-full h-96 object-cover select-none"
          draggable="false"
        />
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`border-2 rounded-lg overflow-hidden ${
                currentImageIndex === index
                  ? "border-primary"
                  : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`${productName} ${index + 1}`}
                className="w-full h-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
