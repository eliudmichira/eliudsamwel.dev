import React from 'react';

export type Theme = 'light' | 'dark';

export interface NavLinkItem {
  name: string;
  pageId: string; 
  href: string; 
  current?: boolean;
}

// Projects Page Specific Types
export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Added for gallery support
  category: string;
  type: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  featured?: boolean;
  longDescription?: string;
  details?: ProjectDetails;
}

// Added new interfaces for ProjectDetails
export interface ProjectLink {
  name: string;
  url: string;
  icon: string;
}

export interface ProjectUserTestimonial {
  quote: string;
  author: string;
}

export interface ProjectChallenge {
  challenge: string;
  problem: string;
  solution: string;
  result: string;
}

export interface ProjectTechnicalImplementation {
  title: string;
  description: string;
  /** Optional code sample shown in the project modal when present */
  code?: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectKeyFeature {
  title: string;
  description: string;
}

export interface ProjectDetails {
  overview: string;
  keyFeatures: ProjectKeyFeature[];
  gallery: ProjectGalleryItem[];
  technicalImplementation: ProjectTechnicalImplementation[];
  challengesAndSolutions: ProjectChallenge[];
  resultsAndImpact: {
    keyMetrics: string[];
    performanceAchievements: string[];
    userTestimonials: ProjectUserTestimonial[];
  };
  projectDetails: {
    timeline: string;
    duration: string;
    role: string;
    team: string;
    status: string;
    links: ProjectLink[];
  };
  techStack: {
    frontend: string[];
    backend: string[];
    apisAndServices: string[];
    developmentTools: string[];
  };
  recognitionAndAchievements: string[];
  futureRoadmap: string[];
}

/*
export interface TimelineEvent {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
  achievement?: {
    title: string;
    text: string;
  };
}
*/

export interface StatItemProps {
  icon: string;
  targetCount: number;
  label: string;
  duration?: number;
}

// Resume Page Specific Types
export interface ResumeContactItem {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  text: string;
  href: string;
  ariaLabel: string;
}

export interface ResumeSkill {
  name: string;
  level?: number; // 0-100 scale representing proficiency
}

export interface ResumeExperienceEntry {
  role: string;
  company: string;
  dates: string;
  responsibilities: string[];
}

export interface ResumeEducationEntry {
  degree: string;
  institution: string;
  dates: string;
}

export interface ResumeProfessionalDevelopmentEntry {
  item: string;
  source?: string; 
  date?: string; 
}

export interface ResumeReferenceContact {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  text: string;
  href?: string;
}
export interface ResumeReference {
  name: string;
  title: string;
  contacts: ResumeReferenceContact[];
}

export interface ResumeData {
  fullName: string;
  accentName: string;
  jobTitle: string;
  location: {
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
    text: string;
  };
  contactInfo: ResumeContactItem[];
  professionalSummary: string;
  coreCompetencies: {
    skills: ResumeSkill[];
    detailed: Array<{ category: string; items: string }>;
  };
  experience: ResumeExperienceEntry[];
  education: ResumeEducationEntry[];
  professionalDevelopment: ResumeProfessionalDevelopmentEntry[];
  references: ResumeReference[];
}

// Contact Page Specific Types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  services?: string[];
  timeline?: string;
  message: string;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfoCardData {
    id: string;
    icon: string; // Emoji or SVG path
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    isExternalLink?: boolean;
}

// Blog types
export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string; // Consolidated from coverImage
  author: Author; // Changed from string to Author object
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  featured?: boolean; // Added
  views?: number; // Added
  likes?: number; // Added
  trending?: boolean; // Added
}

// Testimonial types
export interface TestimonialProps {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  testimonial: string;
  rating?: number;
}
