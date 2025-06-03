import React from 'react';
import { TestimonialProps } from '../../types';
import { getOptimalImageSources } from '../../src/utils/imageUtils';

interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, position, company, image, testimonial: quote, rating } = testimonial;
  
  // Generate stars based on rating
  const renderStars = (rating: number = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add empty stars to make total of 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-lg border border-[var(--card-border)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Quote marks */}
      <div className="text-[var(--accent-color)] opacity-30 text-5xl font-serif absolute -top-4 -left-2">
        "
      </div>
      
      {/* Testimonial text */}
      <p className="text-[var(--primary-text)] mb-6 relative z-10">
        {quote}
      </p>
      
      {/* Rating */}
      {rating && (
        <div className="flex mb-4">
          {renderStars(rating)}
        </div>
      )}
      
      {/* Author info */}
      <div className="flex items-center">
        <picture>
          <source srcSet={getOptimalImageSources(image).webp} type="image/webp" />
          <source srcSet={getOptimalImageSources(image).fallback} type="image/jpeg" />
          <img 
            src={getOptimalImageSources(image).fallback} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
            loading="lazy"
          />
        </picture>
        <div>
          <h4 className="font-bold text-[var(--primary-text)]">{name}</h4>
          <p className="text-sm text-[var(--secondary-text)]">{position}, {company}</p>
        </div>
      </div>
    </div>
  );
}; 