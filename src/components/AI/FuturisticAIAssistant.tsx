import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaSpinner, FaTimes, FaPaperPlane, FaCircle, FaProjectDiagram, FaLaptopCode, FaUser, FaBookOpen } from 'react-icons/fa';
import { chatConfig, GEMINI_API_KEY } from '../../../config/chatConfig';
import { getAssistantSystemInstruction } from '../../../config/customContext';
import '../../../styles/futuristic-chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isRead?: boolean;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'concerned';
  metadata?: {
    processingTime?: number;
    confidence?: number;
    category?: string;
  };
}

type GeminiRole = 'user' | 'model';

interface GeminiPart {
  text?: string;
}

interface GeminiResponseBody {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; code?: number };
}

function messagesToGeminiContents(messages: Message[]): { role: GeminiRole; parts: { text: string }[] }[] {
  const rows = messages
    .filter(m => m.id !== 'welcome' && m.text.trim())
    .map(m => ({
      role: (m.sender === 'user' ? 'user' : 'model') as GeminiRole,
      parts: [{ text: m.text.trim() }],
    }));

  if (rows.length === 0) {
    return [];
  }

  if (rows[0].role === 'model') {
    rows.unshift({
      role: 'user',
      parts: [{ text: '[Visitor opened the portfolio chat.]' }],
    });
  }

  return rows;
}

function extractGeminiText(data: GeminiResponseBody): string {
  if (data.error?.message) {
    throw new Error(data.error.message);
  }
  if (data.promptFeedback?.blockReason) {
    throw new Error(`Request blocked: ${data.promptFeedback.blockReason}`);
  }
  const candidate = data.candidates?.[0];
  const finish = candidate?.finishReason;
  if (finish === 'SAFETY' || finish === 'PROHIBITED_CONTENT' || finish === 'RECITATION') {
    throw new Error('MODEL_BLOCKED');
  }
  const parts = candidate?.content?.parts || [];
  const text = parts.map(p => p.text).filter(Boolean).join('\n').trim();
  if (!text) {
    throw new Error('EMPTY_MODEL_REPLY');
  }
  return text;
}

async function fetchGeminiReply(
  systemInstruction: string,
  contents: ReturnType<typeof messagesToGeminiContents>
): Promise<string> {
  const { modelName, apiVersion, aiConfig } = chatConfig;
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent`;

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents,
    generationConfig: {
      temperature: aiConfig.temperature,
      maxOutputTokens: aiConfig.maxTokens,
      topP: 0.9,
      topK: 40,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  let lastErr: Error | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data: GeminiResponseBody = {};
    try {
      data = (await response.json()) as GeminiResponseBody;
    } catch {
      data = {};
    }

    if (response.status === 429 || response.status === 503) {
      lastErr = new Error('RATE_LIMIT');
      await new Promise(r => setTimeout(r, 900 * (attempt + 1)));
      continue;
    }

    if (!response.ok) {
      const msg = data.error?.message || `HTTP ${response.status}`;
      throw new Error(msg);
    }

    return extractGeminiText(data);
  }

  throw lastErr || new Error('GEMINI_UNAVAILABLE');
}

function mockAssistantReply(userInput: string): string {
  const lower = userInput.toLowerCase();

  if (/\b(hi|hello|hey)\b/.test(lower)) {
    return `${chatConfig.mockResponses.greeting}\n\n${chatConfig.mockResponses.defaultResponse}`;
  }
  if (/\b(project|portfolio|soundswapp|flick|duet|homeske)\b/i.test(userInput)) {
    return `${chatConfig.mockResponses.projectInquiry}`;
  }
  if (/\b(skill|stack|annotat|evaluat|label|tooling)\w*/.test(lower)) {
    return `${chatConfig.mockResponses.skillsInquiry}`;
  }
  if (/\b(contact|email|reach|hire)\b/.test(lower)) {
    return `${chatConfig.mockResponses.contactInquiry}`;
  }
  if (/\b(thank|thanks)\b/.test(lower)) {
    return `${chatConfig.mockResponses.thankYouResponse}`;
  }

  return chatConfig.mockResponses.defaultResponse;
}

const SPLINE_CHAT_IFRAME_SRC =
  'https://my.spline.design/voiceinteractionanimation-vFILIh8VqmDcswkA0xQyHamS/?transparent=true';

function userFacingAiError(err: unknown): string {
  const code = err instanceof Error ? err.message : '';
  if (code === 'MODEL_BLOCKED') {
    return "I can’t answer that in a safe way. Try rephrasing or ask something else about the portfolio.";
  }
  if (code === 'RATE_LIMIT' || code === 'GEMINI_UNAVAILABLE') {
    return "The AI service is busy. Please try again in a few seconds.";
  }
  if (code === 'EMPTY_MODEL_REPLY') {
    return "I didn’t get a usable reply. Could you ask again with a bit more detail?";
  }
  return "Something went wrong on my side. Please try again in a moment.";
}

// import { EnhancedFuturisticAIAssistant } from './EnhancedFuturisticAIAssistant';

// Temporarily using original until enhanced version is fixed
// export const FuturisticAIAssistant: React.FC = () => {
//   return <EnhancedFuturisticAIAssistant />;
// };

export const FuturisticAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAiActuallyLoading, setIsAiActuallyLoading] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [connectionStatus] = useState<'online' | 'offline' | 'syncing'>('online');
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [rippleActive, setRippleActive] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const AI_NAME = "ARIA";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    try {
      const welcomeText = `Hi — I'm ${AI_NAME}, Eliud's portfolio assistant. Ask about annotation and AI evaluation work, engineering experience, featured projects, or how to get in touch.`;
      
      setMessages([{
        id: 'welcome',
        text: welcomeText,
        sender: 'ai',
        timestamp: new Date(),
        isRead: false,
        emotion: 'neutral',
      }]);
      setHasNewMessages(true);
      setUnreadMessageCount(1);
      
      // Set a timeout to update loading state
      timeoutId = setTimeout(() => {
        setInitialLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error initializing AI assistant:', error);
      setInitialLoading(false); // Ensure loading state is cleared even if there's an error
    }

    // Cleanup function to clear timeout
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const typeMessage = useCallback((text: string, callback: () => void) => {
    let index = 0;
    setTypingText('');
    setIsTyping(true);
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypingText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        callback();
      }
    }, 20);
    
    return () => clearInterval(typeInterval);
  }, []);

  const generateAIResponse = async (conversation: Message[]): Promise<string> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Gemini API key not set; using structured fallback replies.');
        const lastUser = [...conversation].reverse().find(m => m.sender === 'user');
        return mockAssistantReply(lastUser?.text ?? '');
      }

      const contents = messagesToGeminiContents(conversation);
      const last = contents[contents.length - 1];
      if (!last || last.role !== 'user') {
        throw new Error('INVALID_CONVERSATION');
      }

      return await fetchGeminiReply(getAssistantSystemInstruction(), contents);
    } catch (err) {
      console.error('AI reply error:', err);
      return userFacingAiError(err);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isAiActuallyLoading) return;
    const userMessage: Message = { id: `user-${Date.now()}`, text: input.trim(), sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAiState('thinking');
    setIsAiActuallyLoading(true);
    if (inputRef.current) inputRef.current.style.height = 'auto';

    try {
      const responseText = await generateAIResponse([...messages, userMessage]);
      const emotion = responseText.toLowerCase().includes('error') ? 'concerned' : responseText.toLowerCase().includes('great') || responseText.toLowerCase().includes('excellent') ? 'happy' : 'neutral';
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        isRead: false,
        emotion,
      };
      setAiState('speaking');
      typeMessage(responseText, () => {
        setMessages(prev => {
          const updatedMessages = [...prev, aiMessage];
          if (isOpen) {
            return updatedMessages.map(m => ({ ...m, isRead: true }));
          } else {
            setHasNewMessages(true);
            setUnreadMessageCount(c => c + 1);
          }
          return updatedMessages;
        });
        setAiState('idle');
      });
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: Message = { id: `error-${Date.now()}`, text: "Something went wrong. Please try again in a moment.", sender: 'ai', timestamp: new Date(), emotion: 'concerned', isRead: false };
      setMessages(prev => [...prev, errorMessage]);
      if (!isOpen) { setHasNewMessages(true); setUnreadMessageCount(c => c + 1); }
      setAiState('idle');
    } finally {
      setIsAiActuallyLoading(false);
    }
  };
  
  const handleVoiceCommand = () => {
    setAiState('listening');
    setTimeout(() => {
      setInput("What projects has Eliud shipped recently?");
      setAiState('idle');
    }, 2000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, typingText]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasNewMessages(false);
      setUnreadMessageCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 600);
  }, [isOpen]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleChat();
    }
  };

  const buttonVariants = {
    initial: { scale: 0, y: 50 },
    animate: { scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 20, delay: 0.5 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };
  
  const iconContainerVariants = {
    open: { rotate: 0 },
    closed: { rotate: 0 }
  };

  return (
    <AnimatePresence>
      <motion.button
        key="ai-toggle-button"
        className={`ai-toggle ${isOpen ? 'active' : ''} ${initialLoading ? 'loading' : ''} ${rippleActive ? 'ripple-active' : ''} ${hasNewMessages && !isOpen ? 'has-new-messages-pulse' : ''}`}
        onClick={toggleChat}
        onKeyPress={handleKeyPress}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-pressed={isOpen}
        aria-live="polite"
        tabIndex={0}
      >
        <motion.div 
          className="ai-icon-wrapper" 
          variants={iconContainerVariants} 
          animate={isOpen ? "open" : "closed"}
        >
          {initialLoading ? (
            <FaSpinner className="ai-loading-spinner" aria-hidden />
          ) : isOpen ? (
            <div className="ai-icon-close" aria-hidden>
              <span className="close-line"></span>
              <span className="close-line"></span>
            </div>
          ) : (
            <div className="ai-spline-wrapper">
              <iframe
                src={SPLINE_CHAT_IFRAME_SRC}
                frameBorder={0}
                title="AI Voice Animation"
                className="ai-spline-iframe"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '180px',
                  height: '180px',
                  transform: 'translate(calc(-50% + 2px), calc(-50% + 5px)) scale(1.3)',
                  pointerEvents: 'none',
                  border: 'none',
                  zIndex: 3,
                }}
              />
            </div>
          )}
        </motion.div>
        {hasNewMessages && !isOpen && (
          <motion.div 
            className="ai-new-message-indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
          >
            {unreadMessageCount > 0 && <span className="ai-message-count">{unreadMessageCount}</span>}
          </motion.div>
        )}
         <div className="ai-tooltip">Chat with {AI_NAME}</div>
      </motion.button>

      {isOpen && (
        <motion.div 
          key="ai-interface"
          className="ai-interface"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          <div className="ai-header">
            <div className="ai-header-left">
              <div className="ai-header-mark" aria-hidden="true">✦</div>
              <div className="ai-identity">
                <h3 className="ai-header-title">{AI_NAME}</h3>
                <div className="ai-status">
                  <FaCircle size={6} className="ai-status-dot" aria-hidden />
                  <span>
                    {connectionStatus === 'online' ? 'Online · Portfolio knowledge' : connectionStatus === 'syncing' ? 'Connecting…' : 'Offline mode'}
                  </span>
                </div>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="ai-close-button" aria-label="Close chat">
              <FaTimes size={16} />
            </button>
          </div>

          <div className="ai-messages-container" ref={chatContainerRef}>
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div 
                  key={msg.id} 
                  className={`ai-message ${msg.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  {msg.sender === 'ai' && (
                    <div className={`ai-message-avatar ai-mini-avatar ${msg.emotion || 'neutral'}`}>
                       <div className="ai-mini-core"></div>
                    </div>
                  )}
                  <div className="ai-message-bubble">
                    <div className="message-text">
                      {msg.sender === 'ai' && isTyping && index === messages.length -1 && messages.some(m => m.id === msg.id && !m.isRead) ? typingText : msg.text}
                      {msg.sender === 'ai' && isTyping && index === messages.length -1 && messages.some(m => m.id === msg.id && !m.isRead) && <span className="cursor">|</span>}
                    </div>
                    <span className="message-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isAiActuallyLoading && aiState === 'thinking' && (
              <div className="ai-thinking">
                <div className="thinking-indicator">
                  <span className="thinking-text">Processing query</span>
                  <div className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-input-area">
            <div className="input-container">
              <button className="voice-button" onClick={handleVoiceCommand} aria-label="Activate voice command (simulated)">
                <div className={`wave-bars ${aiState === 'listening' ? 'listening' : ''}`}>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                </div>
              </button>
              <textarea 
                ref={inputRef} 
                value={input} 
                onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }} 
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())} 
                placeholder="Message Eliud's assistant…" 
                className="ai-input" 
                rows={1}
                maxLength={chatConfig.maxInputLength}
              />
              <button className="send-button" onClick={handleSendMessage} disabled={isAiActuallyLoading || !input.trim()} aria-label="Send message">
                <FaPaperPlane size={14} />
              </button>
            </div>
            <div className="quick-actions">
              {[
                { icon: <FaProjectDiagram />, label: "Projects", prompt: "What projects should I look at on this portfolio?" },
                { icon: <FaLaptopCode />, label: "Skills", prompt: "Summarize Eliud's annotation, evaluation, and technical skills." },
                { icon: <FaUser />, label: "About", prompt: "Give a short overview of Eliud's background." },
                { icon: <FaBookOpen />, label: "Experience", prompt: "What is Eliud's professional experience?" }
              ].map((action, index) => (
                <motion.button 
                  key={action.label} 
                  onClick={() => setInput(action.prompt)} 
                  title={action.prompt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="icon">{action.icon}</span> {action.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FuturisticAIAssistant; 
