import emailjs from '@emailjs/browser';

const env = import.meta.env as Record<string, string | undefined>;
const SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = env.VITE_EMAILJS_PUBLIC_KEY;

export interface InquiryEmailPayload {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  message: string;
}

export async function sendInquiryEmail(payload: InquiryEmailPayload): Promise<boolean> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS env vars missing — skipping email send');
    return false;
  }

  const templateParams = {
    // Primary names matching the EmailJS template (`{{name}}`, `{{email}}`, etc.)
    name: payload.name,
    email: payload.email,
    title: payload.name, // for subject lines that use {{title}}
    company: payload.company || '',
    budget: payload.budget || '',
    timeline: payload.timeline || '',
    services: (payload.services && payload.services.length > 0) ? payload.services.join(', ') : '',
    message: payload.message,
    timestamp: new Date().toLocaleString(),
    // Aliases — keep both naming conventions so older templates still work
    from_name: payload.name,
    from_email: payload.email,
  };

  const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
  return result.status === 200;
}
