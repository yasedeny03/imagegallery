import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Image } from '../types';

interface SlideshowProps {
  images: Image[];
  startIndex: number;
  onClose: () => void;
}

export const Slideshow: React.FC<SlideshowProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const getProductCode = (filename: string) => {
    const parts = filename.split('-');
    if (parts.length > 1) {
      return parts.slice(1).join('-').split('.')[0];
    }
    return filename.split('.')[0];
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X size={24} />
      </button>

      <button
        onClick={handlePrevious}
        className="absolute left-4 text-white hover:text-gray-300"
      >
        <ChevronLeft size={32} />
      </button>

      <div className="flex flex-col items-center">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="max-h-[80vh] max-w-[90vw] object-contain"
        />
        <p className="text-white text-lg mt-4 font-medium">
          {getProductCode(images[currentIndex].title)}
        </p>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-4 text-white hover:text-gray-300"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};