import React, { useState, useEffect, useRef } from 'react';
import { FAQItemData, ContactInfoCardData, ContactFormData } from '../../types';
import { ContactInfoCard } from './ContactInfoCard'; // Corrected path
import { FAQItem } from './FAQItem'; // Corrected path
import { ContactForm } from './ContactForm'; // Corrected path
import { TestimonialsCarousel } from '../testimonials/TestimonialsCarousel';
import { testimonials } from '../../data/testimonialsData';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sendInquiryWebhook } from '../../utils/zapierWebhook';

const contactInfoCardsData: ContactInfoCardData[] = [
  { id: 'email', icon: '📧', title: 'Email Me', description: 'For project inquiries and collaborations', buttonText: 'eliudmichira7@gmail.com', buttonLink: 'mailto:eliudmichira7@gmail.com' },
  { id: 'phone', icon: '📱', title: 'Call Me', description: 'Quick discussions and urgent matters', buttonText: '+254 705 893 137', buttonLink: 'tel:+254705893137' },
  { id: 'linkedin', icon: '💼', title: 'LinkedIn', description: 'Professional networking and updates', buttonText: 'Connect with me', buttonLink: 'https://www.linkedin.com/in/eliud-samwel-72b8622b3', isExternalLink: true },
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
    ].filter((el): el is HTMLElement => el !== null && el instanceof HTMLElement);
    
    if (elementsToObserve.length === 0) return;
    
    elementsToObserve.forEach(el => applyAnimationClasses(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            removeAnimationClasses(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsToObserve.forEach((sectionRef) => {
      if (sectionRef instanceof HTMLElement && sectionRef.parentElement) {
        observer.observe(sectionRef);
      }
    });

    return () => observer.disconnect();
  }, []);
  

  const handleFormSubmit = async (formData: ContactFormData) => {
    try {
      console.log('Form submitted with data:', formData);
      
      // Set loading state
      setNotification({ message: 'Sending message...', type: 'success' });
      
      // Prepare message data with metadata
      const messageData = {
        ...formData,
        timestamp: new Date().toISOString(),
        createdAt: new Date(),
        source: 'Portfolio Website',
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct',
        status: 'new', // new, read, replied
        read: false
      };

      console.log('Saving to Firestore...');
      console.log('Firestore db:', db ? 'Initialized' : 'Not initialized');
      console.log('Message data:', messageData);
      
      // Save to Firestore
      let docRef;
      let savedToFirestore = false;
      let webhookDelivered = false;
      try {
        console.log('Calling addDoc...');
        docRef = await Promise.race([
          addDoc(collection(db, 'contactMessages'), messageData),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firestore save timeout after 10 seconds')), 10000)
          )
        ]) as any;
        console.log('✅ Message saved to Firestore with ID:', docRef.id);
        savedToFirestore = true;
      } catch (firestoreError: any) {
        console.error('❌ Firestore save error (non-fatal):', firestoreError?.message || firestoreError);
        // Don't throw — let Telegram + EmailJS still fire so the user's message gets through
      }

      // Telegram notifications are now handled by the Zapier Zap (triggered by Gmail inbox).
      // Direct Telegram bot disabled to avoid duplicates.

      // Send raw form data to Zapier webhook — drives Telegram + Gmail auto-reply + HubSpot
      console.log('🪝 Sending to Zapier webhook...');
      try {
        const ok = await sendInquiryWebhook({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          timeline: formData.timeline,
          services: formData.services,
          message: formData.message,
          timestamp: messageData.timestamp,
        });
        console.log(ok ? '✅ Webhook delivered — Zap will fire' : '⚠️ Webhook returned non-2xx');
        webhookDelivered = ok;
      } catch (webhookError: any) {
        console.error('❌ Webhook error:', webhookError?.message || webhookError);
      }

      // Only report success if the message actually landed somewhere
      if (!savedToFirestore && !webhookDelivered) {
        throw new Error('Message was not saved to Firestore or delivered to the webhook');
      }

      console.log('✅ Form submission completed successfully');

      setNotification({ 
        message: 'Message sent successfully! I will get back to you within 2-4 hours. 🚀', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setNotification({ 
        message: 'Failed to send message. Please try the email button above or try again later.', 
        type: 'error' 
      });
      // Re-throw so ContactForm keeps the visitor's text instead of clearing it
      throw error;
    } finally {
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 relative z-10 mt-20 sm:mt-24 w-full">
      <FloatingShape top="10%" left="5%" width="100px" height="100px" animationDelay="-2s" />
      <FloatingShape top="60%" right="8%" width="150px" height="150px" animationDelay="-4s" />
      <FloatingShape bottom="15%" left="12%" width="80px" height="80px" animationDelay="-1s" />
      <FloatingShape top="30%" left="45%" width="60px" height="60px" animationDelay="-3s" />

      <section ref={heroRef} className="min-h-[50vh] sm:min-h-[50vh] flex items-center justify-center text-center py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl px-2 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">
            Let's Create Something <span className="gradient-text">Amazing</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--secondary-text)] font-medium leading-relaxed break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">
            Ready to bring your ideas to life? Let's connect and discuss your next project.
          </p>
        </div>
      </section>

      <section ref={availabilityRef} className="card-embossed my-8 sm:my-12 md:my-16 p-4 sm:p-6 md:p-8 text-center">
        <div className="recessed pill inline-flex items-center gap-2 px-4 py-2 mb-3 sm:mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
          <span className="emboss-meta text-green-600 dark:text-green-400">24/7 · Available for new projects</span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-[var(--primary-text)] break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">Response Time</h3>
        <p className="text-[var(--secondary-text)] mb-2 text-sm sm:text-base break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">I typically respond within 2-4 hours during business hours.</p>
        <p className="text-xs sm:text-sm text-[var(--secondary-text)] break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">🕒 Mon-Fri: 9AM-6PM EAT (UTC+3) | 📍 Based in Nairobi, Kenya</p>
      </section>

      {/* Modern Contact Hub Section - Redesigned */}
      <section className="my-16 sm:my-20 relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            Let's <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-yellow)] bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--secondary-text)] max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's start a conversation.
          </p>
        </div>
        
        {/* Modern Grid Layout */}
        <div ref={contactInfoGridRef} className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Email Card */}
            {emailCardData && (
              <div className="card-embossed group p-6 transition-transform duration-200 ease-out hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[var(--primary-text)] mb-2">Email</h4>
                <p className="text-sm text-[var(--secondary-text)] mb-3">Project inquiries</p>
                <a href="mailto:eliudmichira7@gmail.com" className="text-sm text-[var(--accent-color)] hover:underline">
                  eliudmichira7@gmail.com
                </a>
              </div>
            )}
            
            {/* Phone Card */}
            {phoneCardData && (
              <div className="card-embossed group p-6 transition-transform duration-200 ease-out hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[var(--primary-text)] mb-2">Phone</h4>
                <p className="text-sm text-[var(--secondary-text)] mb-3">Quick calls</p>
                <a href="tel:+254705893137" className="text-sm text-[var(--accent-color)] hover:underline">
                  +254 705 893 137
                </a>
              </div>
            )}
            
            {/* LinkedIn Card */}
            {linkedinCardData && (
              <div className="card-embossed group p-6 transition-transform duration-200 ease-out hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[var(--primary-text)] mb-2">LinkedIn</h4>
                <p className="text-sm text-[var(--secondary-text)] mb-3">Professional network</p>
                <a href="https://www.linkedin.com/in/eliud-samwel-72b8622b3" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-color)] hover:underline">
                  Connect with me
                </a>
              </div>
            )}
            
            {/* Instagram Card */}
            {instagramCardData && (
              <div className="card-embossed group p-6 transition-transform duration-200 ease-out hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                  <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[var(--primary-text)] mb-2">Instagram</h4>
                <p className="text-sm text-[var(--secondary-text)] mb-3">Creative journey</p>
                <a href="https://www.instagram.com/_.michira" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-color)] hover:underline">
                  @_.michira
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced separator with stats */}
        <div className="flex flex-col items-center mt-16 sm:mt-20">
          <div className="h-1 w-24 bg-[var(--accent-gradient)] rounded-full mb-6"></div>
          <div className="text-center">
            <p className="text-sm text-[var(--secondary-text)] mb-2">
              🚀 Ready to start your project?
            </p>
            <p className="text-xs text-[var(--secondary-text)] opacity-75">
              I typically respond within 2-4 hours
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        ref={contactFormSectionRef}
        className="card-embossed my-12 sm:my-16 p-6 sm:p-10 relative overflow-hidden"
      >
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 sm:mb-8 text-center">
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
            <SocialLink href="https://www.linkedin.com/in/eliud-samwel-72b8622b3" title="LinkedIn">
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

