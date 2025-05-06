import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselIndicators from './CarouselIndicators';
import { CarouselProps } from '../../types/carousel';
import useKeyPress from '../../hooks/useKeyPress';

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Set up keyboard navigation
  useKeyPress('ArrowLeft', goToPrevious);
  useKeyPress('ArrowRight', goToNext);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Determine direction based on swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
      setIsTouching(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  // Set up auto-play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(goToNext, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goToNext, interval, isPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true);
  };

  // Ensure there are images to display
  if (!images || images.length === 0) {
    return <div className="carousel-empty">No images to display</div>;
  }

  return (
    <div 
      className="relative overflow-hidden rounded-lg w-full max-w-4xl mx-auto bg-gray-900"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div className="relative h-full aspect-video">
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 z-10' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full z-0' 
                  : 'opacity-0 translate-x-full z-0'
            }`}
            aria-hidden={index !== currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${images.length}`}
          >
            <img 
              src={image.url} 
              alt={image.alt || `Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-lg">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {showIndicators && (
        <CarouselIndicators 
          count={images.length} 
          activeIndex={currentIndex} 
          onClick={goToSlide} 
        />
      )}
    </div>
  );
};

export default Carousel;