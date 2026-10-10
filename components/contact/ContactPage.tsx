import React, { useState, useEffect, useRef } from 'react';
import { FAQItemData, ContactFormData } from '../../types';
import { FAQItem } from './FAQItem';
import { ContactForm } from './ContactForm';
import { TestimonialsCarousel } from '../testimonials/TestimonialsCarousel';
import { testimonials } from '../../data/testimonialsData';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sendInquiryWebhook } from '../../utils/zapierWebhook';
import { FaEnvelope, FaPhoneAlt, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';

const contactMethods = [
  { id: 'email', label: 'Email', value: 'eliudmichira7@gmail.com', href: 'mailto:eliudmichira7@gmail.com', icon: <FaEnvelope /> },
  { id: 'phone', label: 'Phone', value: '+254 705 893 137', href: 'tel:+254705893137', icon: <FaPhoneAlt /> },
  { id: 'linkedin', label: 'LinkedIn', value: 'Connect with me', href: 'https://www.linkedin.com/in/eliud-samwel-72b8622b3', icon: <FaLinkedinIn />, external: true },
  { id: 'github', label: 'GitHub', value: 'eliudmichira', href: 'https://github.com/eliudmichira', icon: <FaGithub />, external: true },
  { id: 'instagram', label: 'Instagram', value: '@_.michira', href: 'https://www.instagram.com/_.michira', icon: <FaInstagram />, external: true },
];

const faqData: FAQItemData[] = [
  { id: 'faq1', question: 'What kind of work are you open to?', answer: "Data annotation, AI content evaluation, and QA/audit roles — fully remote and async. I also take on engineering projects (React, TypeScript, Node.js, Firebase) when they're a good fit." },
  { id: 'faq2', question: 'Which domains can you label and evaluate?', answer: "Business and finance, healthcare and clinical, legal, STEM, and media and creative content — across text, image, and video outputs." },
  { id: 'faq3', question: 'How do you handle ambiguous guidelines?', answer: "I document the edge case, flag it to the project lead with a proposed interpretation, and keep notes so the rubric can be refined. It's the same process I used as an auditor at Innodata, checking other annotators' labels against the guidelines." },
  { id: 'faq4', question: 'Do you work across time zones?', answer: "Yes. I'm based in Nairobi (EAT, UTC+3) and have worked fully remote with global teams, so async handoffs and overlapping hours with Europe and the US are routine." },
  { id: 'faq5', question: 'Do you still take on development projects?', answer: "Yes. Simple web apps typically take 2–4 weeks and larger builds 1–3 months; I'll give a detailed estimate once I know the requirements. Smaller projects are 50% upfront and 50% on completion, and larger ones can be milestone-based." },
];

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
  const contactInfoGridRef = useRef<HTMLElement>(null);
  const contactFormSectionRef = useRef<HTMLElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elementsToObserve = [
      heroRef.current,
      contactInfoGridRef.current,
      contactFormSectionRef.current,
      faqSectionRef.current
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
        message: 'Message sent! I usually reply within 2–4 hours during business hours.', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setNotification({ 
        message: 'Failed to send message. Please email me directly or try again later.', 
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

      <section ref={heroRef} className="text-center pt-4 sm:pt-8 pb-10 sm:pb-12">
        <div className="recessed pill inline-flex items-center gap-2 px-4 py-2 mb-5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></span>
          <span className="emboss-meta text-green-700 dark:text-green-400">Available for new work</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
          Let's <span className="gradient-text">Talk</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--secondary-text)] leading-relaxed">
          Hiring for annotation, AI evaluation, or QA work — or need an engineer who understands your data?
          Send a note and I'll usually reply within 2–4 hours during business hours.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Contact Form */}
        <section
          ref={contactFormSectionRef}
          className="card-embossed lg:col-span-2 p-6 sm:p-10 relative overflow-hidden"
        >
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 sm:mb-8">
            Send a <span className="gradient-text">Message</span>
          </h2>
          <ContactForm onSubmit={handleFormSubmit} />
        </section>

        {/* Direct contact details */}
        <aside ref={contactInfoGridRef} className="card-embossed p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-5 text-[var(--primary-text)]">Or reach me directly</h2>
          <ul className="space-y-2">
            {contactMethods.map(method => (
              <li key={method.id}>
                <a
                  href={method.href}
                  {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 min-h-[48px] p-2 -mx-2 rounded-xl no-underline transition-colors hover:bg-[var(--color-bg-surface)]"
                >
                  <span className="recessed w-11 h-11 rounded-xl flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                    {method.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block emboss-meta">{method.label}</span>
                    <span className="block text-sm font-medium text-[var(--primary-text)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
                      {method.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 pt-5 border-t border-[var(--color-border)] text-sm text-[var(--secondary-text)] leading-relaxed">
            Mon–Fri, 9AM–6PM EAT (UTC+3)<br />Based in Nairobi, Kenya · Fully remote
          </p>
        </aside>
      </div>

      <section ref={faqSectionRef} className="my-16 sm:my-20 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
            {faqData.map(faq => <FAQItem key={faq.id} {...faq} />)}
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

