import React from 'react';
import { NO_IMAGE_PLACEHOLDER } from '../utils/projectImages';
import OptimizedImage from './OptimizedImage';

interface NoImageCoverProps {
  alt?: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable luxury No-Image background cover component for Sangrilla Group.
 * Fits brand identity with black-and-gold aesthetic and standard dimensions.
 */
const NoImageCover: React.FC<NoImageCoverProps> = ({
  alt = 'Sangrilla Group - Visuals Updating',
  className = 'no-image-cover-img',
  containerClassName = 'no-image-cover-container',
  style,
}) => {
  return (
    <div className={containerClassName} style={style}>
      <OptimizedImage
        src={NO_IMAGE_PLACEHOLDER}
        fallbackSrc={NO_IMAGE_PLACEHOLDER}
        alt={alt}
        className={className}
        containerClassName="no-image-inner-container"
      />
    </div>
  );
};

export default NoImageCover;
