import React, { useState, useEffect } from 'react';
import { TestimonialProps } from '../../types';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialsCarouselProps {
  testimonials: TestimonialProps[];
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };
  
  // Navigate to next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };
  
  // Jump to specific testimonial
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };
  
  // Show multiple testimonials on larger screens
  const visibleTestimonials = () => {
    // For simplicity, we'll just show the current one
    // In a real implementation, you might want to show multiple based on screen size
    return [testimonials[currentIndex]];
  };
  
  return (
    <div className="relative py-10">
      <h2 className="text-2xl font-bold text-center mb-8">
        What <span className="text-[var(--accent-color)]">Clients</span> Say
      </h2>
      
      {/* Carousel container */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {visibleTestimonials().map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="transition-all duration-500 transform animate-fade-in"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={prevTestimonial}
          className="lifted pill absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-11 h-11 flex items-center justify-center z-10"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextTestimonial}
          className="lifted pill absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-11 h-11 flex items-center justify-center z-10"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`pill transition-all duration-200 ${
              index === currentIndex ? 'lifted-primary w-8 h-3' : 'recessed w-3 h-3'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 
