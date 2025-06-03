import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaSpinner, FaArrowDown, FaPaperPlane, FaCircle, FaProjectDiagram, FaLaptopCode, FaUser, FaBookOpen } from 'react-icons/fa';
import { chatConfig } from '../../../config/chatConfig';
import { GEMINI_API_KEY } from '../../../config/chatConfig';
import { getFormattedContext } from '../../../config/customContext';
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

interface AIMemory {
  userPreferences: string[];
  conversationContext: string[];
  learnedFacts: Map<string, string>;
}

export const FuturisticAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAiActuallyLoading, setIsAiActuallyLoading] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [connectionStatus] = useState<'online' | 'offline' | 'syncing'>('online');
  const [aiMemory] = useState<AIMemory>({
    userPreferences: [],
    conversationContext: [],
    learnedFacts: new Map()
  });

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
    const personalizedWelcome = `Neural network initialized. Hello, I'm ${AI_NAME}, Mich's advanced AI assistant. How may I assist you today?`;
    setMessages([{
      id: 'welcome',
      text: personalizedWelcome,
      sender: 'ai',
      timestamp: new Date(),
      isRead: false,
      emotion: 'neutral',
      metadata: { confidence: 100, category: 'greeting' }
    }]);
    setHasNewMessages(true);
    setUnreadMessageCount(1);
    setTimeout(() => setInitialLoading(false), 1500);
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

  const generateAIResponse = async (userInput: string): Promise<string> => {
    // Add a slight delay to make the AI response feel more natural
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    try {
      // Use mock responses as fallback if API key is not set
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        console.warn("No API key found, using mock responses instead");
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
            return chatConfig.mockResponses.greeting;
        }
        if (lowerInput.includes("project")) {
            return chatConfig.mockResponses.projectInquiry;
        }
        if (lowerInput.includes("skills") || lowerInput.includes("tech")) {
            return chatConfig.mockResponses.skillsInquiry;
        }
        if (lowerInput.includes("contact")) {
            return chatConfig.mockResponses.contactInquiry;
        }
        if (lowerInput.includes("thank")) {
            return chatConfig.mockResponses.thankYouResponse;
        }
        return chatConfig.mockResponses.defaultResponse;
      }

      // Real API call to Gemini
      const apiUrl = `https://generativelanguage.googleapis.com/${chatConfig.apiVersion}/models/${chatConfig.aiConfig.modelName}:generateContent`;
      const customContext = getFormattedContext();
      
      // Create a conversational context from previous messages (last 5 messages)
      const conversationHistory = messages.slice(-5).map(msg => {
        return `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`;
      }).join('\n');
      
      // Build the prompt with context and conversation history
      const enhancedPrompt = `
${customContext}

CONVERSATION HISTORY:
${conversationHistory}

USER: ${userInput}

ASSISTANT (as ${chatConfig.aiConfig.name}):
`;

      // Build the API request payload
      const payload = {
        contents: [{ 
          parts: [{ text: enhancedPrompt }] 
        }],
        generationConfig: {
          temperature: chatConfig.aiConfig.temperature,
          maxOutputTokens: chatConfig.aiConfig.maxTokens,
          topP: 0.9,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      // Make the API call
      const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract and return the response text
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I encountered an issue processing your request. Please try again or ask something else.";
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
      const startTime = Date.now();
      const responseText = await generateAIResponse(userMessage.text);
      const processingTime = Date.now() - startTime;
      const emotion = responseText.toLowerCase().includes('error') ? 'concerned' : responseText.toLowerCase().includes('great') || responseText.toLowerCase().includes('excellent') ? 'happy' : 'neutral';
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        isRead: false,
        emotion,
        metadata: { processingTime, confidence: 95 + Math.random() * 5, category: detectCategory(userMessage.text) }
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
      const errorMessage: Message = { id: `error-${Date.now()}`, text: "Neural network synchronization error.", sender: 'ai', timestamp: new Date(), emotion: 'concerned', isRead: false };
      setMessages(prev => [...prev, errorMessage]);
      if (!isOpen) { setHasNewMessages(true); setUnreadMessageCount(c => c + 1); }
      setAiState('idle');
    } finally {
      setIsAiActuallyLoading(false);
    }
  };
  
  const detectCategory = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('project') || lower.includes('work')) return 'projects';
    if (lower.includes('skill') || lower.includes('tech')) return 'technical';
    if (lower.includes('contact') || lower.includes('hire')) return 'business';
    if (lower.includes('who') || lower.includes('about')) return 'personal';
    return 'general';
  };

  const handleVoiceCommand = () => {
    setAiState('listening');
    setTimeout(() => {
      setInput("Tell me about Mich's latest project");
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
    animate: { scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };
  
  const iconContainerVariants = {
    open: { rotate: -45 },
    closed: { rotate: 0 }
  };

  // For animated data particles
  const sparkPositions = [
    { x: 1, y: 0 },    // Right
    { x: -1, y: 0 },   // Left
    { x: 0, y: 1 },    // Bottom
    { x: 0, y: -1 },   // Top
    { x: 0.707, y: 0.707 },  // Diagonal
    { x: -0.707, y: 0.707 }, // Diagonal
  ];

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
            <FaSpinner className="ai-loading-spinner" />
          ) : isOpen ? (
            <div className="ai-icon-close">
              <span className="close-line"></span>
              <span className="close-line"></span>
            </div>
          ) : (
            <div className="ai-spline-wrapper">
              <iframe 
                src='https://my.spline.design/voiceinteractionanimation-vFILIh8VqmDcswkA0xQyHamS/?transparent=true' 
                frameBorder='0' 
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
                  zIndex: 3
                }}
              ></iframe>
            </div>
          )}
        </motion.div>
        {hasNewMessages && !isOpen && (
          <motion.div 
            className="ai-new-message-indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadMessageCount > 0 && <span className="ai-message-count">{unreadMessageCount}</span>}
          </motion.div>
        )}
         <div className="ai-tooltip">Chat with ARIA</div>
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
              <div className="ai-avatar">
                <div className="ai-avatar-hex">
                  <div className="ai-avatar-ring"></div>
                  <div className="ai-avatar-core">
                    <div className={`ai-eye ${aiState}`}></div>
                  </div>
                </div>
              </div>
              <div className="ai-identity">
                <h3>{AI_NAME}</h3>
                <div className="ai-status">
                  <FaCircle size={6} style={{ color: connectionStatus === 'online' ? 'var(--ai-success)' : 'var(--ai-text-secondary)' }} />
                  <span>{connectionStatus === 'online' ? 'Neural network connected' : connectionStatus === 'syncing' ? 'Synchronizing' : 'Local mode'}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="ai-close-button" aria-label="Close chat window">
              <FaArrowDown />
            </button>
          </div>

          <div className="ai-system-status">
            <div className="status-item">
              <span className="status-dot" data-status={connectionStatus === 'online' ? 'active' : undefined}></span>
              Core Logic
              <div className="metric-bar"></div>
            </div>
            <div className="status-item">
              <span className="status-dot" data-status={aiMemory.learnedFacts.size > 0 ? 'active' : undefined}></span>
              Memory Index
              <div className="metric-bar"></div>
            </div>
            <div className="status-item">
              <span className="status-dot" data-status={!isAiActuallyLoading ? 'active' : undefined}></span>
              Response Module
              <div className="metric-bar"></div>
            </div>
            {/* Data flow particles */}
            <div className="data-particle"></div>
            <div className="data-particle"></div>
            <div className="data-particle"></div>
            <div className="data-particle"></div>
            <div className="data-particle"></div>
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
                    {msg.sender === 'ai' && msg.metadata && (
                        <div className="message-metadata">
                            <span className="category">{msg.metadata.category}</span>
                            {msg.metadata.confidence && <span className="confidence">{msg.metadata.confidence.toFixed(0)}%</span>}
                        </div>
                    )}
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
                placeholder="Type your query for ARIA..." 
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
                { icon: <FaProjectDiagram />, label: "Projects", prompt: "Tell me about Mich's projects" },
                { icon: <FaLaptopCode />, label: "Skills", prompt: "What are Mich's technical skills?" },
                { icon: <FaUser />, label: "About", prompt: "Tell me about Mich's background" },
                { icon: <FaBookOpen />, label: "Experience", prompt: "What experience does Mich have?" }
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