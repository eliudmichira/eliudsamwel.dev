import React from 'react';
import { ResumeData } from '../types';

const LocationIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })
  )
);

const EmailIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" })
  )
);

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
  )
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" })
  )
);

const PortfolioIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", ...props },
    React.createElement("path", { d: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" })
  )
);

export const resumeData: ResumeData = {
  fullName: "Eliud Michira",
  accentName: "Samwel",
  jobTitle: "Generalist · Data Annotation & AI Content Evaluator",
  location: {
    icon: LocationIcon,
    text: "Nairobi, Kenya · Fully remote"
  },
  contactInfo: [
    { icon: EmailIcon, text: "eliudmichira7@gmail.com", href: "mailto:eliudmichira7@gmail.com", ariaLabel: "Email Eliud Michira Samwel" },
    { icon: PhoneIcon, text: "+254 705 893 137", href: "tel:+254705893137", ariaLabel: "Call Eliud Michira Samwel" },
    { icon: LinkedInIcon, text: "linkedin.com/in/eliudsamwel-72b8622b3", href: "https://www.linkedin.com/in/eliudsamwel-72b8622b3", ariaLabel: "Eliud Michira Samwel on LinkedIn" },
    { icon: PortfolioIcon, text: "eliudsamwel.dev", href: "https://eliudsamwel.dev", ariaLabel: "Eliud Michira Samwel portfolio" },
  ],
  professionalSummary: "Data annotator and AI content evaluator with direct experience at Innodata labeling and scoring AI outputs against detailed rubrics across business, finance, healthcare, legal, and STEM domains. Scored a perfect 35/35 on Innodata's Content Understanding Video Master evaluation and moved into auditing after consistently strong scores — checking other annotators' labels against guidelines and flagging edge cases the rubric didn't yet cover. Comfortable working across varied content types and shifting task types, documenting ambiguities clearly, and communicating with project leads to resolve them. A working full-stack developer background gives me a practical understanding of how the underlying systems and datasets are structured, which sharpens my eye for inconsistency. Manage my own workload independently in fully remote, asynchronous, cross-timezone settings.",
  coreCompetencies: {
    skills: [
      { name: "Multi-domain data labeling", level: 97 },
      { name: "Rubric-based scoring", level: 96 },
      { name: "Audit / QA", level: 95 },
      { name: "Edge-case identification", level: 94 },
      { name: "Structured documentation", level: 93 },
      { name: "Critical thinking", level: 99 },
      { name: "English C2 proficiency", level: 94 },
      { name: "Async remote delivery", level: 95 },
      { name: "React / TypeScript", level: 86 },
      { name: "Node.js / Firebase", level: 85 },
      { name: "REST / webhooks", level: 88 },
      { name: "Dataset & system understanding", level: 87 },
    ],
    detailed: [
      { category: "Annotation & Evaluation", items: "Multi-domain data labeling (business, finance, healthcare, legal, STEM), rubric-based scoring, audit/QA, edge-case identification, structured documentation, calibration testing" },
      { category: "Domains covered", items: "Business & finance, healthcare & clinical, legal, STEM, media & creative content (text, image, video)" },
      { category: "Communication & collaboration", items: "Clear written and verbal English (C2 — 94th percentile), async remote collaboration, cross-timezone coordination, project lead communication, ambiguity resolution" },
      { category: "Quality & process", items: "Checklist-based QA, consistency auditing, rubric gap documentation, structured scoring justifications for engineering teams, high-volume batch processing" },
      { category: "Engineering background", items: "React, TypeScript, Node.js, Firebase, Python (scripting), Git/GitHub — practical understanding of dataset structures and system logic that sharpens annotation accuracy" },
      { category: "Productivity & project management", items: "Notion, Asana, ClickUp, Trello, Airtable, fully remote async workflows" },
      { category: "Languages", items: "English (C2 — 94th percentile, Versant 4-Skills Passed), Swahili (native)" },
    ],
  },
  experience: [
    {
      role: "AI Content & Data Annotator / Evaluator",
      company: "Innodata Inc.",
      dates: "August 2025 – May 2026",
      responsibilities: [
        "Annotated and scored AI-generated text, image, and video outputs against client rubrics across business, finance, healthcare, legal, and STEM domains.",
        "Performed multi-field annotation across activities, topics, locations, and products to improve model reliability on varied content types.",
        "Scored 35/35 (perfect) on the Content Understanding Video Master evaluation — the project's strictest calibration test for accuracy and consistency.",
        "Promoted into auditing on a high-priority project after consistently strong evaluation scores — checked other annotators' labels against guidelines and flagged inconsistent judgments.",
        "Documented edge cases and novel patterns not covered by existing guidelines, contributing to rubric refinement, and wrote structured explanations justifying each scoring decision for engineering.",
        "Handled high-volume batches independently in a fully remote, asynchronous workflow, meeting quality and throughput targets without supervision.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Neverest Ltd (TAWA INNOVATE)",
      dates: "May 2024 – August 2025",
      responsibilities: [
        "Improved TinyPesa's transaction workflows and UzaKitu's dashboard, building direct familiarity with structured data, edge cases, and system logic in live products.",
        "Built UzaKitu reseller dashboards with real-time WebSocket tracking and D3.js reporting.",
        "Integrated Pickup Mtaani logistics with payments and CRM-style order state across a multi-role admin system; coordinated workflows between product, DevOps, and UX teams asynchronously.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Independent / Freelance",
      dates: "January 2021 – Present",
      responsibilities: [
        "Built and shipped multiple products end to end (SoundsSwapp, FlickCollection); 100% client retention and 4.9/5 average project rating.",
        "Designed and delivered workflow automations and API integrations across Spotify, YouTube, Google APIs, and Firebase with production-grade reliability.",
        "Delivered M-Pesa/Daraja and IntaSend payment automations with end-to-end transaction state handling and proactive error recovery.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc, Business Computing",
      institution: "JKUAT — Jomo Kenyatta University of Agriculture and Technology · Graduated December 2025",
      dates: "2025",
    },
  ],
  professionalDevelopment: [
    { item: "Content Understanding Video Master Eval — 35/35 perfect score", source: "Innodata", date: "2026" },
    { item: "Critical Thinking — 100th percentile", source: "Assessment", date: "2026" },
    { item: "English C2 Proficiency — 94th percentile", source: "Assessment", date: "2026" },
    { item: "Versant 4-Skills English Test — Passed", source: "Pearson", date: "2026" },
    { item: "Freelancer Conduct Guidelines — 100%", source: "Testlio", date: "July 2025" },
  ],
  references: [
    {
      name: "Professional references available upon request",
      title: "",
      contacts: [],
    },
  ],
};
