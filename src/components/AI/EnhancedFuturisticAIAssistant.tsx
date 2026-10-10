import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FaCommentDots, FaSpinner, FaArrowDown, FaPaperPlane, FaCircle, 
  FaHeart, FaThumbsUp, FaThumbsDown, FaCopy, FaShare, FaBookmark,
  FaMicrophone, FaStop, FaVolumeUp, FaCog, FaChartBar,
  FaLightbulb, FaQuestion, FaRedo, FaFilter
} from 'react-icons/fa';
import { chatConfig } from '../../../config/chatConfig';
import { GEMINI_API_KEY } from '../../../config/chatConfig';
import { getFormattedContext } from '../../../config/customContext';
import { useEnhancedAI, EnhancedNLPProcessor } from './EnhancedAIContext';
import { ChatbotAnalytics } from './ChatbotAnalytics';
import '../../../styles/futuristic-chatbot.css';

interface EnhancedMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isRead?: boolean;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'concerned' | 'excited';
  metadata?: {
    processingTime?: number;
    confidence?: number;
    category?: string;
    intents?: string[];
    entities?: string[];
    sentiment?: number;
    helpfulness?: number;
    bookmarked?: boolean;
  };
}

interface QuickReply {
  id: string;
  text: string;
  category: string;
  icon: string;
}

interface ConversationSuggestion {
  text: string;
  reason: string;
  priority: number;
}

export const EnhancedFuturisticAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<EnhancedMessage[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [connectionStatus] = useState<'online' | 'offline' | 'syncing'>('online');
  
  // Enhanced UI States
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { context, addMessage, analyzeUserInput, updateUserProfile, getPersonalizedResponse } = useEnhancedAI();
  
  const AI_NAME = "ARIA Enhanced";
  
  // Quick reply suggestions based on context
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    { id: '1', text: "Tell me about EliudSamwel's projects", category: 'portfolio', icon: '📁' },
    { id: '2', text: "What are his technical skills?", category: 'technical', icon: '💻' },
    { id: '3', text: "How can I contact him?", category: 'business', icon: '📧' },
    { id: '4', text: "What's his experience level?", category: 'experience', icon: '🎯' }
  ]);
  
  const [conversationSuggestions, setConversationSuggestions] = useState<ConversationSuggestion[]>([]);

  // Initialize with enhanced welcome message
  useEffect(() => {
    const welcomeMessage: EnhancedMessage = {
      id: 'enhanced-welcome',
      text: `🧠 Neural networks synchronized. Hello, I'm ${AI_NAME}!

I'm EliudSamwel's advanced AI assistant with enhanced capabilities:
• 🎯 Multi-intent understanding
• 🧠 Contextual memory across conversations  
• 📊 Real-time analytics and insights
• 🎨 Personalized communication styles

How may I assist you today?`,
      sender: 'ai',
      timestamp: new Date(),
      isRead: false,
      emotion: 'excited',
      metadata: { 
        confidence: 100, 
        category: 'greeting',
        processingTime: 0,
        sentiment: 0.8
      }
    };
    
    setMessages([welcomeMessage]);
    setHasNewMessages(true);
    setUnreadCount(1);
    
    // Generate initial conversation suggestions
    generateConversationSuggestions([]);
  }, []);

  // Enhanced response generation with NLP analysis
  const generateEnhancedAIResponse = async (userInput: string): Promise<string> => {
    const startTime = Date.now();
    
    try {
      // Analyze user input with enhanced NLP
      const intents = await analyzeUserInput(userInput);
      const sentiment = EnhancedNLPProcessor.analyzeSentiment(userInput);
      
      // Update user profile based on interaction
      updateUserProfile({
        previousInteractions: context.userProfile.previousInteractions + 1,
        technicalBackground: intents.some(i => i.intent === 'skills_inquiry')
      });
      
      let baseResponse: string;
      
      // Use mock responses as fallback if API key is not set
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        console.warn("No API key found, using enhanced mock responses");
        baseResponse = await generateEnhancedMockResponse(userInput, intents, sentiment);
      } else {
        baseResponse = await callGeminiAPI(userInput, intents);
      }
      
      // Personalize response based on user profile and intents
      const personalizedResponse = getPersonalizedResponse(baseResponse, intents);
      
      // Add processing metadata
      const processingTime = Date.now() - startTime;
      const confidence = calculateResponseConfidence(intents, sentiment);
      
      return personalizedResponse;
      
    } catch (error) {
      console.error('Enhanced AI Error:', error);
      return "I encountered an issue processing your request. My enhanced systems are working to resolve this. Please try again.";
    }
  };
  
  const generateEnhancedMockResponse = async (input: string, intents: any[], sentiment: any): Promise<string> => {
    const lowerInput = input.toLowerCase();
    
    // Enhanced contextual responses based on intents
    if (intents.some(i => i.intent === 'portfolio_inquiry')) {
      return `
📁 **Portfolio Analysis Complete**

EliudSamwel has developed several impressive projects showcasing his expertise:

🚀 **Featured Projects:**
• **Decentralized Voting System** - Blockchain-based secure voting platform
• **Real-time Analytics Dashboard** - Data visualization with interactive charts  
• **E-commerce Platform** - Full-stack solution with payment integration
• **AI-Powered Chat Assistant** - This very system you're interacting with!

Each project demonstrates his proficiency in modern web technologies, clean architecture, and user-centric design.

*Would you like detailed information about any specific project?*
      `.trim();
    }
    
    if (intents.some(i => i.intent === 'skills_inquiry')) {
      return `
💻 **Technical Skills Assessment**

**Core Technologies:**
• Frontend: React, TypeScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Python, Express.js, RESTful APIs
• Database: MongoDB, PostgreSQL, Firebase
• DevOps: Docker, Git, CI/CD, AWS, Vercel

**Expertise Levels:**
🟢 **Expert:** React, JavaScript, TypeScript, CSS
🟡 **Advanced:** Node.js, Python, Database Design  
🔵 **Proficient:** Cloud Platforms, DevOps, AI Integration

**Recent Focus:** AI integration, performance optimization, and modern web architecture.

*Interested in learning about specific technologies or project implementations?*
      `.trim();
    }
    
    if (intents.some(i => i.intent === 'business_inquiry')) {
      return `
📧 **Contact & Collaboration Information**

EliudSamwel is available for various collaboration opportunities:

**Available For:**
• Full-time positions
• Freelance projects  
• Technical consulting
• Code reviews and mentoring

**Preferred Communication:**
• Email: Via contact form on this portfolio
• LinkedIn: Professional networking
• GitHub: Technical discussions

**Response Time:** Typically within 24 hours for professional inquiries.

*Would you like me to help you draft a specific inquiry or provide more details about his availability?*
      `.trim();
    }
    
    // Sentiment-based response adjustments
    if (sentiment.overall > 0.5) {
      return `That's fantastic! I'm excited to help you learn more about EliudSamwel's work. ${chatConfig.mockResponses.defaultResponse}`;
    } else if (sentiment.overall < -0.3) {
      return `I understand your concerns. Let me provide clearer information to help address your questions. ${chatConfig.mockResponses.defaultResponse}`;
    }
    
    return `I'm analyzing your request using my enhanced language processing capabilities. ${chatConfig.mockResponses.defaultResponse}`;
  };
  
  const callGeminiAPI = async (userInput: string, intents: any[]): Promise<string> => {
    const apiUrl = `https://generativelanguage.googleapis.com/${chatConfig.apiVersion}/models/${chatConfig.aiConfig.modelName}:generateContent`;
    const customContext = getFormattedContext();
    
    // Enhanced prompt with intent context
    const intentContext = intents.length > 0 
      ? `\nDetected user intents: ${intents.map(i => i.intent).join(', ')}`
      : '';
    
    const conversationHistory = messages.slice(-5).map(msg => 
      `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
    ).join('\n');
    
    const enhancedPrompt = `
${customContext}

CONVERSATION HISTORY:
${conversationHistory}

${intentContext}

USER: ${userInput}

ASSISTANT (as ${AI_NAME} v4.0 with enhanced capabilities):
`;

    const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: enhancedPrompt }] }],
        generationConfig: {
          temperature: chatConfig.aiConfig.temperature,
          maxOutputTokens: 4096,
          topP: 0.9,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Response generation failed.";
  };
  
  const calculateResponseConfidence = (intents: any[], sentiment: any): number => {
    let confidence = 0.7; // Base confidence
    
    if (intents.length > 0) {
      confidence += Math.max(...intents.map(i => i.confidence)) * 0.3;
    }
    
    if (Math.abs(sentiment.overall) > 0.3) {
      confidence += 0.1; // Clear sentiment adds confidence
    }
    
    return Math.min(confidence, 0.98) * 100;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isAiLoading) return;
    
    const userMessage: EnhancedMessage = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAiState('thinking');
    setIsAiLoading(true);
    
    // Add message to enhanced context
    addMessage({
      text: userMessage.text,
      sender: 'user',
      metadata: {
        category: 'user_input',
        topics: [detectCategory(userMessage.text)],
        difficulty: 'basic'
      }
    });
    
    try {
      const startTime = Date.now();
      const responseText = await generateEnhancedAIResponse(userMessage.text);
      const processingTime = Date.now() - startTime;
      
      const intents = await analyzeUserInput(userMessage.text);
      const sentiment = EnhancedNLPProcessor.analyzeSentiment(userMessage.text);
      const confidence = calculateResponseConfidence(intents, sentiment);
      
      const aiMessage: EnhancedMessage = {
        id: `ai-${Date.now()}`,
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        isRead: false,
        emotion: confidence > 85 ? 'happy' : confidence < 60 ? 'concerned' : 'neutral',
        metadata: {
          processingTime,
          confidence,
          category: detectCategory(userMessage.text),
          intents: intents.map(i => i.intent),
          entities: intents.flatMap(i => i.entities),
          sentiment: sentiment.overall
        }
      };
      
      setAiState('speaking');
      await typeMessage(responseText, () => {
        setMessages(prev => {
          const updatedMessages = [...prev, aiMessage];
          if (!isOpen) {
            setHasNewMessages(true);
            setUnreadCount(c => c + 1);
          }
          return updatedMessages;
        });
        setAiState('idle');
        
        // Generate new conversation suggestions
        generateConversationSuggestions([...messages, userMessage, aiMessage]);
      });
      
    } catch (error) {
      console.error('Enhanced AI Error:', error);
      const errorMessage: EnhancedMessage = {
        id: `error-${Date.now()}`,
        text: "My enhanced neural network encountered an unexpected issue. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        emotion: 'concerned',
        isRead: false
      };
      setMessages(prev => [...prev, errorMessage]);
      setAiState('idle');
    } finally {
      setIsAiLoading(false);
    }
  };

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
    }, 15); // Faster typing for better UX
    
    return () => clearInterval(typeInterval);
  }, []);

  const detectCategory = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('project') || lower.includes('work')) return 'projects';
    if (lower.includes('skill') || lower.includes('tech')) return 'technical';
    if (lower.includes('contact') || lower.includes('hire')) return 'business';
    if (lower.includes('who') || lower.includes('about')) return 'personal';
    return 'general';
  };

  const generateConversationSuggestions = (messageHistory: EnhancedMessage[]) => {
    const suggestions: ConversationSuggestion[] = [];
    
    if (messageHistory.length === 1) {
      suggestions.push(
        { text: "What makes EliudSamwel's projects unique?", reason: "Explore differentiators", priority: 1 },
        { text: "Can you show me his latest work?", reason: "Recent developments", priority: 2 }
      );
    } else {
      const lastMessages = messageHistory.slice(-3);
      const hasProjectDiscussion = lastMessages.some(m => m.text.toLowerCase().includes('project'));
      const hasTechDiscussion = lastMessages.some(m => m.text.toLowerCase().includes('tech'));
      
      if (hasProjectDiscussion && !hasTechDiscussion) {
        suggestions.push({ text: "What technologies were used in this project?", reason: "Technical details", priority: 1 });
      }
      if (hasTechDiscussion && !hasProjectDiscussion) {
        suggestions.push({ text: "Can you show me projects using these technologies?", reason: "Practical examples", priority: 1 });
      }
    }
    
    setConversationSuggestions(suggestions.sort((a, b) => a.priority - b.priority).slice(0, 3));
  };

  const handleQuickReply = (reply: QuickReply) => {
    setInput(reply.text);
    inputRef.current?.focus();
  };

  const handleMessageAction = (messageId: string, action: 'like' | 'dislike' | 'copy' | 'bookmark') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const updatedMetadata = { ...msg.metadata };
        
        switch (action) {
          case 'like':
            updatedMetadata.helpfulness = (updatedMetadata.helpfulness || 0) + 1;
            break;
          case 'dislike':
            updatedMetadata.helpfulness = (updatedMetadata.helpfulness || 0) - 1;
            break;
          case 'copy':
            navigator.clipboard.writeText(msg.text);
            break;
          case 'bookmark':
            updatedMetadata.bookmarked = !updatedMetadata.bookmarked;
            break;
        }
        
        return { ...msg, metadata: updatedMetadata };
      }
      return msg;
    }));
  };

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasNewMessages(false);
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, typingText]);

  return (
    <AnimatePresence>
      <motion.button
        className={`enhanced-ai-toggle ${isOpen ? 'active' : ''} ${hasNewMessages && !isOpen ? 'has-new-messages' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close enhanced chat" : "Open enhanced chat"}
      >
        <div className="enhanced-ai-icon">
          <div className="enhanced-ai-core">
            <div className={`enhanced-ai-eye ${aiState}`}></div>
          </div>
          <div className="enhanced-ai-orbit"></div>
          {hasNewMessages && !isOpen && (
            <div className="notification-badge">{unreadCount}</div>
          )}
        </div>
      </motion.button>

      {isOpen && (
        <motion.div
          className="enhanced-ai-interface"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          {/* Enhanced Header */}
          <div className="enhanced-ai-header">
            <div className="enhanced-ai-header-left">
              <div className="enhanced-ai-avatar">
                <div className="enhanced-ai-avatar-hex">
                  <div className="enhanced-ai-avatar-ring"></div>
                  <div className="enhanced-ai-avatar-core">
                    <div className={`enhanced-ai-eye ${aiState}`}></div>
                  </div>
                </div>
              </div>
              <div className="enhanced-ai-identity">
                <h3>{AI_NAME}</h3>
                <div className="enhanced-ai-status">
                  <FaCircle size={6} style={{ color: connectionStatus === 'online' ? '#00ff88' : '#888' }} />
                  <span>Enhanced neural network active</span>
                </div>
              </div>
            </div>
            
            <div className="enhanced-ai-header-controls">
              <button 
                className="header-control-btn"
                onClick={() => setShowAnalytics(!showAnalytics)}
                aria-label="Toggle analytics"
              >
                <FaChartBar />
              </button>
              <button 
                className="header-control-btn"
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Settings"
              >
                <FaCog />
              </button>
              <button 
                className="header-control-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaArrowDown />
              </button>
            </div>
          </div>

          {/* Analytics Panel */}
          <ChatbotAnalytics isVisible={showAnalytics} />

          {/* Quick Filters */}
          <div className="quick-filters">
            {['all', 'portfolio', 'technical', 'business'].map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Enhanced Messages Container */}
          <div className="enhanced-ai-messages-container" ref={chatContainerRef}>
            <AnimatePresence initial={false}>
              {messages
                .filter(msg => selectedCategory === 'all' || msg.metadata?.category === selectedCategory)
                .map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className={`enhanced-ai-message ${msg.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  layout
                >
                  {msg.sender === 'ai' && (
                    <div className={`enhanced-ai-message-avatar ${msg.emotion || 'neutral'}`}>
                      <div className="enhanced-ai-mini-core"></div>
                    </div>
                  )}
                  
                  <div className="enhanced-ai-message-bubble">
                    {msg.sender === 'ai' && msg.metadata && (
                      <div className="enhanced-message-metadata">
                        <div className="metadata-row">
                          <span className="category-tag">{msg.metadata.category}</span>
                          {msg.metadata.confidence && (
                            <span className="confidence-badge">
                              {msg.metadata.confidence.toFixed(0)}% confidence
                            </span>
                          )}
                        </div>
                        {msg.metadata.intents && msg.metadata.intents.length > 0 && (
                          <div className="intents-row">
                            <span className="intents-label">Detected: </span>
                            {msg.metadata.intents.map(intent => (
                              <span key={intent} className="intent-tag">{intent}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="enhanced-message-text">
                      {msg.sender === 'ai' && isTyping && index === messages.length - 1 
                        ? typingText + (typingText && <span className="typing-cursor">|</span>)
                        : msg.text
                      }
                    </div>
                    
                    <div className="message-footer">
                      <span className="message-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {msg.sender === 'ai' && (
                        <div className="message-actions">
                          <button 
                            onClick={() => handleMessageAction(msg.id, 'like')}
                            className="action-btn"
                            aria-label="Helpful"
                          >
                            <FaThumbsUp />
                          </button>
                          <button 
                            onClick={() => handleMessageAction(msg.id, 'dislike')}
                            className="action-btn"
                            aria-label="Not helpful"
                          >
                            <FaThumbsDown />
                          </button>
                          <button 
                            onClick={() => handleMessageAction(msg.id, 'copy')}
                            className="action-btn"
                            aria-label="Copy message"
                          >
                            <FaCopy />
                          </button>
                          <button 
                            onClick={() => handleMessageAction(msg.id, 'bookmark')}
                            className={`action-btn ${msg.metadata?.bookmarked ? 'active' : ''}`}
                            aria-label="Bookmark"
                          >
                            <FaBookmark />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Thinking Indicator */}
            {isAiLoading && aiState === 'thinking' && (
              <div className="enhanced-ai-thinking">
                <div className="thinking-indicator">
                  <span className="thinking-text">Analyzing with enhanced neural networks</span>
                  <div className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Conversation Suggestions */}
          {showSuggestions && conversationSuggestions.length > 0 && (
            <div className="conversation-suggestions">
              <div className="suggestions-header">
                <FaLightbulb />
                <span>Suggested questions:</span>
              </div>
              <div className="suggestions-list">
                {conversationSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-btn"
                    onClick={() => setInput(suggestion.text)}
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Replies */}
          <div className="quick-replies">
            {quickReplies.map(reply => (
              <button
                key={reply.id}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                <span className="quick-reply-icon">{reply.icon}</span>
                <span className="quick-reply-text">{reply.text}</span>
              </button>
            ))}
          </div>

          {/* Enhanced Input Area */}
          <div className="enhanced-ai-input-area">
            <div className="enhanced-input-container">
              <button 
                className={`voice-button ${isRecording ? 'recording' : ''}`}
                onClick={() => setIsRecording(!isRecording)}
                aria-label={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
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
                placeholder="Ask me anything about EliudSamwel's work, skills, or experience..."
                className="enhanced-ai-input"
                rows={1}
                maxLength={1000}
              />
              
              <button
                className="enhanced-send-button"
                onClick={handleSendMessage}
                disabled={isAiLoading || !input.trim()}
                aria-label="Send enhanced message"
              >
                <FaPaperPlane />
              </button>
            </div>
            
            <div className="input-footer">
              <span className="character-count">{input.length}/1000</span>
              <span className="ai-status">
                {aiState === 'thinking' ? 'Processing...' : 
                 aiState === 'listening' ? 'Listening...' : 
                 'Ready'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 
