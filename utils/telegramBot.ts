/**
 * Telegram Bot Utility for Contact Form Notifications
 * 
 * This utility sends contact form submissions to Telegram.
 * Completely FREE and unlimited!
 * 
 * Setup Instructions:
 * 1. Message @BotFather on Telegram
 * 2. Send /newbot command
 * 3. Follow instructions to create your bot
 * 4. Copy the bot token
 * 5. Get your chat ID by messaging your bot, then visit:
 *    https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
 * 6. Add bot token and chat ID to environment variables or config
 */

interface TelegramMessage {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  message: string;
  timestamp: string;
}

// Configuration - Replace these with your bot credentials
// For security, use environment variables in production
const getEnvVar = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[key] || '';
  }
  return '';
};

// Never hardcode credentials here: this repo is public. Note that VITE_* values are
// also bundled into the client JS, so a token set this way is visible to visitors.
const TELEGRAM_BOT_TOKEN = getEnvVar('VITE_TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_ID = getEnvVar('VITE_TELEGRAM_CHAT_ID');

/**
 * Format contact form data into a Telegram message
 */
const formatTelegramMessage = (data: TelegramMessage): string => {
  const emoji = '🎯';
  const header = `${emoji} *New Contact Form Submission*\n\n`;
  
  let message = header;
  message += `*Name:* ${data.name}\n`;
  message += `*Email:* ${data.email}\n`;
  
  if (data.company) {
    message += `*Company:* ${data.company}\n`;
  }
  
  if (data.budget) {
    message += `*Budget:* ${data.budget}\n`;
  }
  
  if (data.timeline) {
    message += `*Timeline:* ${data.timeline}\n`;
  }
  
  if (data.services && data.services.length > 0) {
    message += `*Services:* ${data.services.join(', ')}\n`;
  }
  
  message += `\n*Message:*\n${data.message}\n\n`;
  message += `📅 ${new Date(data.timestamp).toLocaleString()}`;
  
  return message;
};

/**
 * Send message to Telegram
 * @param data Contact form data
 * @returns Promise<boolean> Success status
 */
export const sendTelegramNotification = async (data: TelegramMessage): Promise<boolean> => {
  console.log('🔍 Checking Telegram configuration...');
  console.log('Bot token exists:', !!TELEGRAM_BOT_TOKEN, 'Length:', TELEGRAM_BOT_TOKEN?.length || 0);
  console.log('Chat ID exists:', !!TELEGRAM_CHAT_ID, 'Value:', TELEGRAM_CHAT_ID || 'none');
  
  // Check if credentials are configured
  const botToken = TELEGRAM_BOT_TOKEN || '';
  const chatId = TELEGRAM_CHAT_ID || '';
  
  if (!botToken || !chatId) {
    console.error('❌ Telegram bot credentials are missing!');
    return false;
  }
  
  if (botToken === 'YOUR_BOT_TOKEN_HERE' || chatId === 'YOUR_CHAT_ID_HERE') {
    console.error('❌ Telegram bot credentials are using placeholder values!');
    return false;
  }

  try {
    const message = formatTelegramMessage(data);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    console.log('📤 Sending Telegram notification to chat:', chatId);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown', // Allows formatting with *bold*, _italic_, etc.
      }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.ok) {
        console.log('✅ Telegram notification sent successfully');
        return true;
      } else {
        console.error('❌ Telegram API returned error:', result);
        return false;
      }
    } else {
      const errorData = await response.json().catch(() => ({ description: 'Unknown error' }));
      console.error('❌ Telegram API error:', response.status, errorData);
      return false;
    }
  } catch (error: any) {
    console.error('❌ Error sending Telegram notification:', error.message || error);
    return false;
  }
};

/**
 * Test Telegram bot connection
 * @returns Promise<boolean> Connection status
 */
export const testTelegramConnection = async (): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Telegram bot connected:', data.result.username);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Telegram connection test failed:', error);
    return false;
  }
};

