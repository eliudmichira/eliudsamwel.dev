const env = import.meta.env as Record<string, string | undefined>;

/** n8n workflow URL (form POST / no-cors fetch — avoids browser CORS on the response). */
const DEFAULT_NEWSLETTER_WEBHOOK =
  'https://eliudmichira.app.n8n.cloud/webhook/newsletter-signup';

function getNewsletterActionUrl(): string {
  return env.VITE_NEWSLETTER_WEBHOOK_URL?.trim() || DEFAULT_NEWSLETTER_WEBHOOK;
}

export interface NewsletterSignupPayload {
  email: string;
  /** Shown in n8n / HubSpot so you know which surface converted */
  source?: string;
}

export function isValidNewsletterEmail(email: string): boolean {
  const e = email.trim().toLowerCase();
  return e.length > 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/**
 * Sends signup to n8n using `fetch(..., { mode: 'no-cors' })` and a URL-encoded body.
 * The browser will not enforce CORS on the response (opaque response), so this works from
 * `eliudsamwel.dev` even when n8n omits `Access-Control-Allow-Origin` (including on 500s).
 *
 * You cannot read the HTTP status in the client; fix workflow errors in n8n Executions.
 * Optional: upgrade Firebase to Blaze and deploy `functions/newsletterProxy` for full status + JSON.
 */
export async function sendNewsletterSignup(payload: NewsletterSignupPayload): Promise<boolean> {
  const email = payload.email.trim().toLowerCase();
  if (!isValidNewsletterEmail(email)) {
    return false;
  }

  const url = getNewsletterActionUrl();
  const ts = new Date().toISOString();
  const sourceLabel = payload.source ?? 'Portfolio';

  // Mirror `sendInquiryWebhook` / Zapier field names so n8n HubSpot + IF nodes
  // can reuse the same mapping as the contact form.
  const displayName = 'Newsletter subscriber';
  const fields: Record<string, string> = {
    name: displayName,
    first_name: 'Newsletter',
    last_name: 'subscriber',
    user_name: displayName,
    email,
    company: '',
    budget: '',
    timeline: '',
    services: '',
    message: `Newsletter signup via blog (${sourceLabel}).`,
    timestamp: ts,
    source: sourceLabel,
    type: 'newsletter',
    inquiry_type: 'newsletter',
    lifecyclestage: 'subscriber',
  };

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(fields),
    });
    return true;
  } catch (err) {
    console.error('Newsletter webhook failed:', err);
    return false;
  }
}
