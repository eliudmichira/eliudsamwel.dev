import React, { useState, useEffect, useRef } from 'react';
import { FAQItemData, ContactInfoCardData, ContactFormData } from '../../types';
import { ContactInfoCard } from './ContactInfoCard'; // Corrected path
import { FAQItem } from './FAQItem'; // Corrected path
import { ContactForm } from './ContactForm'; // Corrected path
import { TestimonialsCarousel } from '../testimonials/TestimonialsCarousel';
import { testimonials } from '../../data/testimonialsData';

const contactInfoCardsData: ContactInfoCardData[] = [
  { id: 'email', icon: '📧', title: 'Email Me', description: 'For project inquiries and collaborations', buttonText: 'eliudmichira7@gmail.com', buttonLink: 'mailto:eliudmichira7@gmail.com' },
  { id: 'phone', icon: '📱', title: 'Call Me', description: 'Quick discussions and urgent matters', buttonText: '+254 705 893 137', buttonLink: 'tel:+254705893137' },
  { id: 'linkedin', icon: '💼', title: 'LinkedIn', description: 'Professional networking and updates', buttonText: 'Connect with me', buttonLink: 'https://www.linkedin.com/in/eliudmichira', isExternalLink: true },
  { id: 'instagram', icon: '📸', title: 'Instagram', description: 'Follow my creative journey', buttonText: '_.michira', buttonLink: 'https://www.instagram.com/_.michira', isExternalLink: true },
];

const faqData: FAQItemData[] = [
  { id: 'faq1', question: 'What types of projects do you work on?', answer: "I specialize in web development, mobile applications, and blockchain systems. My expertise includes working with technologies like JavaScript, Solidity, Python, React.js, Node.js, and Ethereum. I focus on building user-friendly, efficient, and scalable solutions." },
  { id: 'faq2', question: "What's your typical project timeline?", answer: "Project timelines vary based on complexity. Simple web applications typically take 2-4 weeks, while more complex blockchain projects can take 1-3 months. I'll provide a detailed timeline estimate after discussing your specific requirements." },
  { id: 'faq3', question: 'Do you provide ongoing support and maintenance?', answer: "Yes! I offer ongoing support and maintenance packages. This includes bug fixes, security updates, content updates, and feature enhancements. We can discuss a maintenance plan that fits your needs and budget." },
  { id: 'faq4', question: "What's your payment structure?", answer: "I typically work with a 50% upfront deposit and 50% upon completion for smaller projects. For larger projects, we can arrange milestone-based payments. I accept bank transfers, mobile payments, and other secure payment methods." },
  { id: 'faq5', question: 'Do you work with international clients?', answer: "Absolutely! I work with clients globally and am experienced in remote collaboration. I'm flexible with different time zones and use various communication tools to ensure smooth project delivery regardless of location." },
];

const SocialLink: React.FC<{href: string, title: string, children: React.ReactNode, className?: string}> = ({ href, title, children, className }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title}
       className={`w-14 h-14 sm:w-16 sm:h-16 bg-[var(--card-bg)] backdrop-blur-[var(--blur-amount)] border border-[var(--card-border)] rounded-full flex items-center justify-center text-[var(--accent-color)] text-2xl sm:text-3xl no-underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[var(--accent-gradient)] hover:text-black hover:transform hover:-translate-y-1 hover:scale-110 hover:shadow-[var(--card-glow)] ${className}`}>
        {children}
    </a>
);

const FloatingShape: React.FC<{top?: string, left?: string, right?: string, bottom?: string, width: string, height: string, animationDelay?: string}> = 
  ({ top, left, right, bottom, width, height, animationDelay }) => (
  <div 
    className="fixed rounded-full bg-[var(--accent-gradient)] opacity-5 dark:opacity-[0.07] animate-float z-[-1]"
    style={{ top, left, right, bottom, width, height, animationDelay, animationDuration: '8s' }} 
  />
);

const applyAnimationClasses = (el: HTMLElement | null) => {
    if (el) {
        el.classList.add('opacity-0', 'translate-y-[30px]', 'transition-all', 'duration-[0.6s]', 'ease-out');
    }
}
const removeAnimationClasses = (el: HTMLElement | null) => {
    if (el) {
        el.classList.remove('opacity-0', 'translate-y-[30px]');
        el.classList.add('opacity-100', 'translate-y-0');
    }
}


export const ContactPage: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const heroRef = useRef<HTMLElement>(null);
  const availabilityRef = useRef<HTMLElement>(null);
  const contactInfoGridRef = useRef<HTMLDivElement>(null);
  const contactFormSectionRef = useRef<HTMLElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const socialSectionRef = useRef<HTMLElement>(null);

  const emailCardData = contactInfoCardsData.find(card => card.id === 'email');
  const phoneCardData = contactInfoCardsData.find(card => card.id === 'phone');
  const linkedinCardData = contactInfoCardsData.find(card => card.id === 'linkedin');
  const instagramCardData = contactInfoCardsData.find(card => card.id === 'instagram');

  useEffect(() => {
    const elementsToObserve = [
      heroRef.current,
      availabilityRef.current,
      contactInfoGridRef.current,
      contactFormSectionRef.current,
      faqSectionRef.current,
      socialSectionRef.current
    ].filter(Boolean) as HTMLElement[];
    
    elementsToObserve.forEach(el => applyAnimationClasses(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            removeAnimationClasses(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsToObserve.forEach((sectionRef) => {
      if (sectionRef) observer.observe(sectionRef);
    });

    return () => observer.disconnect();
  }, []);
  

  const handleFormSubmit = (formData: ContactFormData) => {
    console.log('Form submitted:', formData);
    setNotification({ message: 'Message sent successfully! I will get back to you within 2-4 hours. 🚀', type: 'success' });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 relative z-10">
      <FloatingShape top="10%" left="5%" width="100px" height="100px" animationDelay="-2s" />
      <FloatingShape top="60%" right="8%" width="150px" height="150px" animationDelay="-4s" />
      <FloatingShape bottom="15%" left="12%" width="80px" height="80px" animationDelay="-1s" />
      <FloatingShape top="30%" left="45%" width="60px" height="60px" animationDelay="-3s" />

      <section ref={heroRef} className="min-h-[60vh] sm:min-h-[50vh] flex items-center justify-center text-center py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black mb-6">
            Let's Create Something <span className="gradient-text">Amazing</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--secondary-text)] font-medium leading-relaxed">
            Ready to bring your ideas to life? Let's connect and discuss your next project.
          </p>
        </div>
      </section>

      <section ref={availabilityRef} className="my-12 sm:my-16 p-6 sm:p-8 text-center 
                        bg-[var(--card-bg)] border border-[var(--card-border)] 
                        rounded-[var(--border-radius-lg)] shadow-[var(--card-shadow)]">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
          <span className="font-semibold text-green-400">Available for new projects</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--primary-text)]">Response Time</h3>
        <p className="text-[var(--secondary-text)] mb-2">I typically respond within 2-4 hours during business hours.</p>
        <p className="text-xs sm:text-sm text-[var(--secondary-text)]">🕒 Mon-Fri: 9AM-6PM EAT (UTC+3) | 📍 Based in Nairobi, Kenya</p>
      </section>

      {/* New Contact Hub: Robot with cards around it */}
      <section className="my-12 sm:my-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-color-transparent)] to-transparent opacity-5 dark:opacity-10 rounded-3xl -z-10"></div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        
        <div ref={contactInfoGridRef} className="flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-8 p-4">
          
          {/* Left Column: Email and Phone Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full md:w-[30%] lg:w-1/4 transition-all duration-300 hover:translate-y-[-5px]">
            {emailCardData &&
              <div className="w-full h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-[var(--card-glow)]">
                <ContactInfoCard {...emailCardData} />
              </div>
            }
            {phoneCardData &&
              <div className="w-full h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-[var(--card-glow)]">
                <ContactInfoCard {...phoneCardData} />
              </div>
            }
          </div>

          {/* Middle Column: Robot Animation */}
          <div className="w-full md:w-[40%] lg:w-1/2 flex items-center justify-center z-10 order-first md:order-none">
            <section 
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--border-radius-lg)] shadow-[var(--card-shadow)] overflow-hidden w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto aspect-square relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-500 animate-pulse z-0"></div>
              
              <div className="w-full h-full rounded-lg overflow-hidden relative z-10"> 
                <iframe 
                  src='https://my.spline.design/happyrobotbutton-yeXdZXgG3SM8d4kDXC9ljVae/' 
                  frameBorder='0' 
                  width='100%' 
                  height='100%'
                  title="Happy Robot Spline Animation"
                  className="block"
                ></iframe>
              </div>
            </section>
          </div>

          {/* Right Column: LinkedIn and Instagram Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full md:w-[30%] lg:w-1/4 transition-all duration-300 hover:translate-y-[-5px]">
            {linkedinCardData &&
              <div className="w-full h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-[var(--card-glow)]">
                <ContactInfoCard {...linkedinCardData} />
              </div>
            }
            {instagramCardData &&
              <div className="w-full h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-[var(--card-glow)]">
                <ContactInfoCard {...instagramCardData} />
              </div>
            }
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <div className="h-1 w-16 bg-[var(--accent-gradient)] rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        ref={contactFormSectionRef} 
        className="my-12 sm:my-16 p-6 sm:p-10 
                   bg-[var(--card-bg)] border border-[var(--card-border)] 
                   rounded-[var(--border-radius-lg)] shadow-[var(--card-shadow)] 
                   relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Start Your <span className="gradient-text">Project</span>
        </h2>
        <ContactForm onSubmit={handleFormSubmit} />
      </section>

      <section ref={faqSectionRef} className="my-12 sm:my-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
            {faqData.map(faq => <FAQItem key={faq.id} {...faq} />)}
        </div>
      </section>

      <section ref={socialSectionRef} className="text-center my-12 sm:my-16">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--primary-text)]">
            Connect on <span className="gradient-text">Social Media</span>
        </h3>
        <div className="flex justify-center gap-4 sm:gap-6">
            <SocialLink href="https://github.com/eliudmichira" title="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/eliudmichira" title="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </SocialLink>
        </div>
      </section>
      
      {notification && (
        <div 
          style={{boxShadow: 'var(--card-shadow)'}}
          className={`fixed top-20 sm:top-24 right-4 sm:right-6 p-4 rounded-lg text-sm sm:text-base font-semibold z-[10001]
                     ${notification.type === 'success' ? 'bg-[var(--accent-gradient)] text-black' : 'bg-red-500 text-white'}`}>
          {notification.message}
        </div>
      )}

      {/* Testimonials Section */}
      <section className="mb-16">
        <TestimonialsCarousel testimonials={testimonials} />
      </section>
    </div>
  );
};

