import { useState, useEffect, useRef } from 'react';
import type { FC, ImgHTMLAttributes, SyntheticEvent } from 'react';

// Global memory cache for loaded images to ensure instant display on return
const imageCache = new Set<string>();

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
}

const OptimizedImage: FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
  onError,
  onLoad,
  ...props 
}) => {
  // Initialize states
  const [isLoaded, setIsLoaded] = useState(imageCache.has(src));
  const [isInView, setIsInView] = useState(imageCache.has(src));
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<string | null>(null);

  // Intersection Observer Effect
  useEffect(() => {
    // If already in cache or in view, no need to observe
    if (imageCache.has(src) || isInView) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src, isInView]);

  // Loading Logic Effect
  useEffect(() => {
    // Always sync currentSrc if it's in cache
    if (imageCache.has(src)) {
      setIsLoaded(true);
      setCurrentSrc(src);
      setError(false);
      return;
    }

    // If not in cache and not in view, keep it unloaded
    if (!isInView) {
      setIsLoaded(false);
      return;
    }

    // Start loading process
    setError(false);
    setIsLoaded(false);
    setCurrentSrc(src);
    loadingRef.current = src;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      // Only update if this is still the current request
      if (loadingRef.current === src) {
        imageCache.add(src);
        setIsLoaded(true);
      }
    };
    img.onerror = () => {
      if (loadingRef.current === src) {
        setError(true);
        setCurrentSrc(fallbackSrc);
        setIsLoaded(true);
      }
    };
  }, [isInView, src, fallbackSrc]);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!error) {
      setError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    imageCache.add(src);
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <div 
      ref={containerRef}
      className={`image-container ${!isLoaded ? 'ghost-loading' : ''} ${containerClassName}`}
    >
      {(isInView || isLoaded) && (
        <img
          src={currentSrc}
          alt={alt}
          className={`optimized-image ${isLoaded ? 'loaded' : ''} ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;

