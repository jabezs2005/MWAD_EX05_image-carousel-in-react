export interface CarouselImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}