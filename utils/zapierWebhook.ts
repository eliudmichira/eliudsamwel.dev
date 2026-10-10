const env = import.meta.env as Record<string, string | undefined>;
const WEBHOOK_URL = env.VITE_ZAPIER_WEBHOOK_URL;

export interface InquiryWebhookPayload {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  message: string;
  timestamp: string;
}

export async function sendInquiryWebhook(payload: InquiryWebhookPayload): Promise<boolean> {
  if (!WEBHOOK_URL) {
    console.warn('VITE_ZAPIER_WEBHOOK_URL missing — skipping webhook send');
    return false;
  }

  // Split full name into first / last for HubSpot-friendly fields
  const trimmed = payload.name.trim();
  const firstSpace = trimmed.indexOf(' ');
  const first_name = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
  const last_name = firstSpace === -1 ? '' : trimmed.slice(firstSpace + 1);

  const body: Record<string, string> = {
    name: payload.name,
    first_name,
    last_name,
    user_name: payload.name,
    email: payload.email,
    company: payload.company || '',
    budget: payload.budget || '',
    timeline: payload.timeline || '',
    services: payload.services && payload.services.length > 0 ? payload.services.join(', ') : '',
    message: payload.message,
    timestamp: payload.timestamp,
    source: 'Portfolio Website',
  };

  // Use URLSearchParams to avoid a CORS preflight (no application/json header).
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    body: new URLSearchParams(body),
  });
  return res.ok;
}
