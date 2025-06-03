# Gemini AI Chatbot Integration

This project includes a chatbot powered by Google's Gemini AI. Follow these instructions to set up and customize the chatbot for your portfolio.

## Setup Instructions

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/) and sign up or log in
2. Create a new API key from the API Keys section
3. Copy your API key for the next step

### 2. Configure the API Key

**Option 1: Using Environment Variables (Recommended)**

1. Create or edit the `.env.local` file in the project root
2. Add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Restart your development server

**Option 2: Direct Configuration (For Development Only)**

Open `config/chatConfig.ts` and replace the placeholder API key with your actual Gemini API key:

```typescript
export const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
```

**Important Security Note:** Never commit your API key to version control. The `.env.local` file is already in `.gitignore` and won't be committed.

## Features

- Real-time chat with Gemini AI
- Floating chat button that stays accessible throughout the site
- Mobile-responsive design
- Typing indicators and loading states
- Persistent chat history during the session
- Automatic fallback to mock responses if API key isn't set

## Customization

### Changing the Chat UI

You can customize the appearance of the chatbot by modifying the CSS in `styles/futuristic-chatbot.css`. The main elements are:

- `.ai-toggle` - The floating button that opens/closes the chat
- `.ai-interface` - The main chat window
- `.ai-message` - Individual message bubbles
- `.ai-message-bubble` - The content container for messages

### Modifying Chatbot Behavior

To change the chatbot's behavior, edit the following files:

1. `config/chatConfig.ts` - Main configuration including model settings, personality, and mock responses
2. `config/customContext.ts` - Context information about your portfolio and skills
3. `src/components/AI/FuturisticAIAssistant.tsx` - The chatbot component implementation

## Troubleshooting

If you encounter issues with the chatbot:

- Ensure your API key is correctly set in the `.env.local` file or configuration
- Check browser console for any errors
- Verify your internet connection is stable
- Confirm you're not exceeding API rate limits
- Try using a different browser if you experience issues

If the API key isn't set or is invalid, the chatbot will automatically fall back to using mock responses, so it will still function for basic questions. 