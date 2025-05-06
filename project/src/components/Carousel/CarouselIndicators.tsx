import React from 'react';

interface CarouselIndicatorsProps {
  count: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({ 
  count, 
  activeIndex, 
  onClick 
}) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
      <div className="flex space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              activeIndex === index 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            onClick={() => onClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselIndicators;