import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Enhanced AI Context and State Management
interface ConversationContext {
  userId: string;
  sessionId: string;
  conversationHistory: EnhancedMessage[];
  userProfile: UserProfile;
  topicStack: string[];
  currentEmotion: EmotionalState;
  preferences: UserPreferences;
  analytics: ConversationAnalytics;
}

interface EnhancedMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  metadata: MessageMetadata;
  sentiment?: SentimentScore;
  entities?: EntitySet;
  intents?: IntentMatch[];
  confidence?: number;
  processingTime?: number;
}

interface MessageMetadata {
  category: string;
  subCategory?: string;
  topics: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  userSatisfaction?: number;
  helpfulness?: number;
  accuracy?: number;
}

interface SentimentScore {
  overall: number; // -1 to 1
  emotions: {
    joy: number;
    trust: number;
    anticipation: number;
    surprise: number;
    fear: number;
    sadness: number;
    disgust: number;
    anger: number;
  };
}

interface EntitySet {
  technologies: string[];
  projects: string[];
  skills: string[];
  timeframes: string[];
  locations: string[];
  organizations: string[];
}

interface IntentMatch {
  intent: string;
  confidence: number;
  entities: string[];
  clarificationNeeded?: boolean;
}

interface UserProfile {
  communicationStyle: 'formal' | 'casual' | 'technical' | 'creative';
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  preferredResponseLength: 'brief' | 'detailed' | 'comprehensive';
  technicalBackground: boolean;
  previousInteractions: number;
  satisfactionScore: number;
}

interface UserPreferences {
  language: string;
  timezone: string;
  accessibility: {
    screenReader: boolean;
    highContrast: boolean;
    reducedMotion: boolean;
  };
  notifications: {
    feedback: boolean;
    suggestions: boolean;
    updates: boolean;
  };
}

interface EmotionalState {
  primary: 'neutral' | 'happy' | 'concerned' | 'excited' | 'thoughtful';
  intensity: number; // 0-10
  context: string;
  triggers: string[];
}

interface ConversationAnalytics {
  sessionStartTime: Date;
  totalMessages: number;
  averageResponseTime: number;
  topicChanges: number;
  satisfactionRatings: number[];
  engagementScore: number;
  dropOffPoints: string[];
  successfulResolutions: number;
}

// Enhanced NLP Processing Functions
export class EnhancedNLPProcessor {
  static analyzeIntent(text: string): IntentMatch[] {
    const intents: IntentMatch[] = [];
    const lowerText = text.toLowerCase();
    
    // Portfolio-related intents
    if (this.containsKeywords(lowerText, ['project', 'work', 'portfolio', 'built', 'created'])) {
      intents.push({
        intent: 'portfolio_inquiry',
        confidence: 0.9,
        entities: this.extractProjectEntities(text)
      });
    }
    
    // Technical skill intents
    if (this.containsKeywords(lowerText, ['skill', 'technology', 'tech', 'programming', 'development'])) {
      intents.push({
        intent: 'skills_inquiry',
        confidence: 0.85,
        entities: this.extractTechnicalEntities(text)
      });
    }
    
    // Contact/business intents
    if (this.containsKeywords(lowerText, ['hire', 'contact', 'available', 'collaborate', 'work together'])) {
      intents.push({
        intent: 'business_inquiry',
        confidence: 0.8,
        entities: this.extractBusinessEntities(text)
      });
    }
    
    // Multi-intent detection
    if (intents.length > 1) {
      intents.forEach(intent => {
        intent.clarificationNeeded = true;
      });
    }
    
    return intents.sort((a, b) => b.confidence - a.confidence);
  }
  
  static analyzeSentiment(text: string): SentimentScore {
    const positiveWords = ['great', 'excellent', 'amazing', 'love', 'perfect', 'awesome', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'worst', 'horrible', 'disappointed'];
    const excitementWords = ['excited', 'thrilled', 'enthusiastic', 'eager', 'passionate'];
    const concernWords = ['worried', 'concerned', 'confused', 'uncertain', 'doubtful'];
    
    const words = text.toLowerCase().split(/\s+/);
    let overall = 0;
    const emotions = {
      joy: 0, trust: 0, anticipation: 0, surprise: 0,
      fear: 0, sadness: 0, disgust: 0, anger: 0
    };
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        overall += 0.1;
        emotions.joy += 0.2;
      }
      if (negativeWords.includes(word)) {
        overall -= 0.1;
        emotions.sadness += 0.2;
      }
      if (excitementWords.includes(word)) {
        emotions.anticipation += 0.3;
      }
      if (concernWords.includes(word)) {
        emotions.fear += 0.2;
      }
    });
    
    // Question marks often indicate uncertainty
    if (text.includes('?')) {
      emotions.anticipation += 0.1;
    }
    
    return {
      overall: Math.max(-1, Math.min(1, overall)),
      emotions
    };
  }
  
  static extractEntities(text: string): EntitySet {
    const technologies = ['react', 'typescript', 'javascript', 'python', 'node', 'css', 'html'];
    const skills = ['frontend', 'backend', 'fullstack', 'database', 'api', 'ui', 'ux'];
    
    const foundTech = technologies.filter(tech => 
      text.toLowerCase().includes(tech)
    );
    
    const foundSkills = skills.filter(skill => 
      text.toLowerCase().includes(skill)
    );
    
    return {
      technologies: foundTech,
      projects: this.extractProjectEntities(text),
      skills: foundSkills,
      timeframes: this.extractTimeframes(text),
      locations: [],
      organizations: []
    };
  }
  
  private static containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
  
  private static extractProjectEntities(text: string): string[] {
    const projectKeywords = ['website', 'app', 'application', 'system', 'platform'];
    return projectKeywords.filter(keyword => text.toLowerCase().includes(keyword));
  }
  
  private static extractTechnicalEntities(text: string): string[] {
    const techStack = ['react', 'vue', 'angular', 'nodejs', 'python', 'java', 'typescript'];
    return techStack.filter(tech => text.toLowerCase().includes(tech));
  }
  
  private static extractBusinessEntities(text: string): string[] {
    const businessTerms = ['freelance', 'contract', 'full-time', 'part-time', 'remote'];
    return businessTerms.filter(term => text.toLowerCase().includes(term));
  }
  
  private static extractTimeframes(text: string): string[] {
    const timeRegex = /\b(\d+)\s*(year|month|week|day)s?\b/gi;
    const matches = text.match(timeRegex) || [];
    return matches;
  }
}

// Context Management
const initialContext: ConversationContext = {
  userId: 'anonymous',
  sessionId: `session_${Date.now()}`,
  conversationHistory: [],
  userProfile: {
    communicationStyle: 'casual',
    expertiseLevel: 'intermediate',
    interests: [],
    preferredResponseLength: 'detailed',
    technicalBackground: false,
    previousInteractions: 0,
    satisfactionScore: 0
  },
  topicStack: [],
  currentEmotion: {
    primary: 'neutral',
    intensity: 5,
    context: 'initial',
    triggers: []
  },
  preferences: {
    language: 'en',
    timezone: 'UTC',
    accessibility: {
      screenReader: false,
      highContrast: false,
      reducedMotion: false
    },
    notifications: {
      feedback: true,
      suggestions: true,
      updates: false
    }
  },
  analytics: {
    sessionStartTime: new Date(),
    totalMessages: 0,
    averageResponseTime: 0,
    topicChanges: 0,
    satisfactionRatings: [],
    engagementScore: 0,
    dropOffPoints: [],
    successfulResolutions: 0
  }
};

// Context Provider
const EnhancedAIContext = createContext<{
  context: ConversationContext;
  updateContext: (updates: Partial<ConversationContext>) => void;
  addMessage: (message: Omit<EnhancedMessage, 'id' | 'timestamp'>) => void;
  analyzeUserInput: (input: string) => Promise<IntentMatch[]>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  getPersonalizedResponse: (baseResponse: string, intents: IntentMatch[]) => string;
}>({
  context: initialContext,
  updateContext: () => {},
  addMessage: () => {},
  analyzeUserInput: async () => [],
  updateUserProfile: () => {},
  getPersonalizedResponse: () => ''
});

export const useEnhancedAI = () => useContext(EnhancedAIContext);

export const EnhancedAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [context, setContext] = React.useState<ConversationContext>(initialContext);
  
  const updateContext = (updates: Partial<ConversationContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  };
  
  const addMessage = (message: Omit<EnhancedMessage, 'id' | 'timestamp'>) => {
    const enhancedMessage: EnhancedMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      sentiment: EnhancedNLPProcessor.analyzeSentiment(message.text),
      entities: EnhancedNLPProcessor.extractEntities(message.text)
    };
    
    setContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, enhancedMessage],
      analytics: {
        ...prev.analytics,
        totalMessages: prev.analytics.totalMessages + 1
      }
    }));
  };
  
  const analyzeUserInput = async (input: string): Promise<IntentMatch[]> => {
    const intents = EnhancedNLPProcessor.analyzeIntent(input);
    
    // Update topic stack
    const newTopics = intents.map(intent => intent.intent);
    setContext(prev => ({
      ...prev,
      topicStack: [...new Set([...prev.topicStack.slice(-5), ...newTopics])]
    }));
    
    return intents;
  };
  
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setContext(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...updates }
    }));
  };
  
  const getPersonalizedResponse = (baseResponse: string, intents: IntentMatch[]): string => {
    const { userProfile } = context;
    
    // Adjust response based on user's communication style
    switch (userProfile.communicationStyle) {
      case 'formal':
        return baseResponse.replace(/\b(hi|hey)\b/gi, 'Hello')
                          .replace(/\b(cool|awesome)\b/gi, 'excellent');
      
      case 'technical':
        // Add more technical details for technical users
        if (intents.some(i => i.intent === 'skills_inquiry')) {
          return baseResponse + '\n\nWould you like me to elaborate on any specific technical aspects?';
        }
        break;
      
      case 'casual':
        return baseResponse.replace(/\b(Hello)\b/gi, 'Hey')
                          .replace(/\b(excellent)\b/gi, 'awesome');
    }
    
    return baseResponse;
  };
  
  // Automatic context cleanup
  useEffect(() => {
    const cleanup = setInterval(() => {
      setContext(prev => ({
        ...prev,
        conversationHistory: prev.conversationHistory.slice(-50) // Keep last 50 messages
      }));
    }, 300000); // Every 5 minutes
    
    return () => clearInterval(cleanup);
  }, []);
  
  return (
    <EnhancedAIContext.Provider value={{
      context,
      updateContext,
      addMessage,
      analyzeUserInput,
      updateUserProfile,
      getPersonalizedResponse
    }}>
      {children}
    </EnhancedAIContext.Provider>
  );
}; 
