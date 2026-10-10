import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FaChartLine, FaUsers, FaClock, FaThumbsUp, FaBrain,
  FaComments, FaArrowUp, FaEye, FaHeart, FaStar
} from 'react-icons/fa';

interface AnalyticsData {
  conversationMetrics: {
    totalConversations: number;
    averageLength: number;
    satisfactionScore: number;
    responseTime: number;
    completionRate: number;
  };
  userEngagement: {
    activeUsers: number;
    returningUsers: number;
    averageSessionDuration: number;
    bounceRate: number;
    interactionDepth: number;
  };
  aiPerformance: {
    accuracyScore: number;
    confidenceLevel: number;
    intentRecognition: number;
    errorRate: number;
    learningProgress: number;
  };
  topicAnalysis: {
    mostDiscussedTopics: TopicData[];
    trendingQueries: string[];
    categoryDistribution: CategoryData[];
  };
  temporalData: {
    hourlyActivity: number[];
    dailyActivity: number[];
    weeklyTrends: number[];
  };
}

interface TopicData {
  topic: string;
  count: number;
  sentiment: number;
  growth: number;
}

interface CategoryData {
  category: string;
  percentage: number;
  color: string;
}

export const ChatbotAnalytics: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    conversationMetrics: {
      totalConversations: 1247,
      averageLength: 8.5,
      satisfactionScore: 4.6,
      responseTime: 1.2,
      completionRate: 92.3
    },
    userEngagement: {
      activeUsers: 324,
      returningUsers: 68,
      averageSessionDuration: 12.4,
      bounceRate: 23.1,
      interactionDepth: 5.8
    },
    aiPerformance: {
      accuracyScore: 94.2,
      confidenceLevel: 89.7,
      intentRecognition: 91.5,
      errorRate: 3.2,
      learningProgress: 76.8
    },
    topicAnalysis: {
      mostDiscussedTopics: [
        { topic: 'Portfolio Projects', count: 245, sentiment: 0.8, growth: 15.2 },
        { topic: 'Technical Skills', count: 198, sentiment: 0.7, growth: 8.5 },
        { topic: 'Contact Information', count: 156, sentiment: 0.6, growth: -2.1 },
        { topic: 'Experience Level', count: 134, sentiment: 0.9, growth: 22.3 },
        { topic: 'Collaboration', count: 112, sentiment: 0.8, growth: 11.7 }
      ],
      trendingQueries: [
        "What's your latest project?",
        "Can you show me the tech stack?",
        "How can I hire EliudSamwel?",
        "What's his experience with React?",
        "Any AI projects?"
      ],
      categoryDistribution: [
        { category: 'Portfolio', percentage: 35, color: '#00d4ff' },
        { category: 'Technical', percentage: 28, color: '#7c3aed' },
        { category: 'Business', percentage: 20, color: '#ff00a0' },
        { category: 'Personal', percentage: 12, color: '#00ff88' },
        { category: 'General', percentage: 5, color: '#ffaa00' }
      ]
    },
    temporalData: {
      hourlyActivity: [12, 15, 8, 5, 3, 2, 4, 8, 15, 25, 35, 42, 38, 45, 52, 48, 42, 38, 35, 28, 22, 18, 15, 14],
      dailyActivity: [45, 52, 48, 65, 72, 38, 42],
      weeklyTrends: [245, 268, 312, 298, 356, 389, 425, 445, 467, 489, 512, 534]
    }
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const [selectedMetric, setSelectedMetric] = useState<'engagement' | 'performance' | 'topics'>('engagement');

  // Real-time data simulation
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        conversationMetrics: {
          ...prev.conversationMetrics,
          totalConversations: prev.conversationMetrics.totalConversations + Math.floor(Math.random() * 3),
          responseTime: 1.2 + (Math.random() - 0.5) * 0.2
        },
        userEngagement: {
          ...prev.userEngagement,
          activeUsers: prev.userEngagement.activeUsers + Math.floor(Math.random() * 5 - 2)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: number;
    unit?: string;
    color?: string;
  }> = ({ title, value, icon, trend, unit, color = '#00d4ff' }) => (
    <motion.div
      className="metric-card"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="metric-header">
        <div className="metric-icon" style={{ color }}>
          {icon}
        </div>
        <span className="metric-title">{title}</span>
      </div>
      <div className="metric-value">
        {value}{unit && <span className="metric-unit">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className={`metric-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
          <FaArrowUp size={10} />
          <span>{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}
    </motion.div>
  );

  const ProgressBar: React.FC<{ 
    percentage: number; 
    color?: string; 
    height?: number;
    animated?: boolean;
  }> = ({ percentage, color = '#00d4ff', height = 6, animated = true }) => (
    <div className="progress-bar-container" style={{ height }}>
      <motion.div
        className="progress-bar-fill"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: animated ? 1.5 : 0, ease: "easeOut" }}
      />
    </div>
  );

  const TopicsList: React.FC = () => (
    <div className="topics-list">
      <h4>Most Discussed Topics</h4>
      {analyticsData.topicAnalysis.mostDiscussedTopics.map((topic, index) => (
        <motion.div
          key={topic.topic}
          className="topic-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="topic-info">
            <span className="topic-name">{topic.topic}</span>
            <span className="topic-count">{topic.count} mentions</span>
          </div>
          <div className="topic-metrics">
            <div className="sentiment-indicator">
              <div 
                className="sentiment-dot" 
                style={{ 
                  backgroundColor: topic.sentiment > 0.7 ? '#00ff88' : 
                                 topic.sentiment > 0.4 ? '#ffaa00' : '#ff0055' 
                }}
              />
              <span>{(topic.sentiment * 100).toFixed(0)}%</span>
            </div>
            <div className={`growth-indicator ${topic.growth >= 0 ? 'positive' : 'negative'}`}>
              {topic.growth >= 0 ? '+' : ''}{topic.growth.toFixed(1)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const CategoryChart: React.FC = () => (
    <div className="category-chart">
      <h4>Conversation Categories</h4>
      <div className="category-items">
        {analyticsData.topicAnalysis.categoryDistribution.map((category, index) => (
          <motion.div
            key={category.category}
            className="category-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="category-header">
              <span className="category-name">{category.category}</span>
              <span className="category-percentage">{category.percentage}%</span>
            </div>
            <ProgressBar 
              percentage={category.percentage} 
              color={category.color}
              height={8}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ActivityChart: React.FC = () => {
    const data = selectedTimeframe === '24h' ? analyticsData.temporalData.hourlyActivity :
                 selectedTimeframe === '7d' ? analyticsData.temporalData.dailyActivity :
                 analyticsData.temporalData.weeklyTrends;

    const maxValue = Math.max(...data);

    return (
      <div className="activity-chart">
        <div className="chart-header">
          <h4>Activity Trends</h4>
          <div className="timeframe-selector">
            {(['24h', '7d', '30d'] as const).map(tf => (
              <button
                key={tf}
                className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-container">
          {data.map((value, index) => (
            <motion.div
              key={index}
              className="chart-bar"
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              style={{ backgroundColor: `hsl(${190 + (value / maxValue) * 60}, 100%, 60%)` }}
            />
          ))}
        </div>
      </div>
    );
  };

  const TrendingQueries: React.FC = () => (
    <div className="trending-queries">
      <h4>Trending Queries</h4>
      <div className="queries-list">
        {analyticsData.topicAnalysis.trendingQueries.map((query, index) => (
          <motion.div
            key={index}
            className="query-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="query-rank">#{index + 1}</div>
            <div className="query-text">{query}</div>
            <div className="query-indicator">
              <FaArrowUp size={12} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <motion.div
      className="chatbot-analytics"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overview Metrics */}
      <div className="analytics-section">
        <h3>Conversation Overview</h3>
        <div className="metrics-grid">
          <MetricCard
            title="Total Conversations"
            value={analyticsData.conversationMetrics.totalConversations.toLocaleString()}
            icon={<FaComments />}
            trend={12.5}
            color="#00d4ff"
          />
          <MetricCard
            title="Avg Response Time"
            value={analyticsData.conversationMetrics.responseTime.toFixed(1)}
            unit="s"
            icon={<FaClock />}
            trend={-8.2}
            color="#00ff88"
          />
          <MetricCard
            title="Satisfaction Score"
            value={analyticsData.conversationMetrics.satisfactionScore.toFixed(1)}
            unit="/5"
            icon={<FaStar />}
            trend={5.3}
            color="#ffaa00"
          />
          <MetricCard
            title="Active Users"
            value={analyticsData.userEngagement.activeUsers}
            icon={<FaUsers />}
            trend={15.7}
            color="#ff00a0"
          />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="analytics-section">
        <h3>AI Performance</h3>
        <div className="performance-grid">
          <div className="performance-item">
            <div className="performance-header">
              <FaBrain />
              <span>Accuracy Score</span>
              <span className="performance-value">{analyticsData.aiPerformance.accuracyScore}%</span>
            </div>
          </div>
          <div className="performance-item">
            <div className="performance-header">
              <FaEye />
              <span>Intent Recognition</span>
              <span className="performance-value">{analyticsData.aiPerformance.intentRecognition}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Analysis */}
      <div className="analytics-section">
        <div className="section-tabs">
          {(['engagement', 'performance', 'topics'] as const).map(tab => (
            <button
              key={tab}
              className={`tab-btn ${selectedMetric === tab ? 'active' : ''}`}
              onClick={() => setSelectedMetric(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="analytics-content">
          {selectedMetric === 'engagement' && <ActivityChart />}
          {selectedMetric === 'performance' && <CategoryChart />}
          {selectedMetric === 'topics' && (
            <div className="topics-section">
              <TopicsList />
              <TrendingQueries />
            </div>
          )}
        </div>
      </div>

      {/* Real-time Insights */}
      <div className="analytics-section">
        <h3>Real-time Insights</h3>
        <div className="insights-container">
          <div className="insight-item">
            <div className="insight-icon">💡</div>
            <div className="insight-text">
              <strong>Peak Hours:</strong> Most conversations happen between 2-4 PM
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">📈</div>
            <div className="insight-text">
              <strong>Growth Trend:</strong> 23% increase in portfolio inquiries this week
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">🎯</div>
            <div className="insight-text">
              <strong>Top Intent:</strong> Users are most interested in technical projects
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 
