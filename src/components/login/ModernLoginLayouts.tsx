import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Twitter, Chrome } from 'lucide-react';

interface LoginFormProps {
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  submitText: string;
  onSubmit?: (email: string, password: string) => void;
  theme?: 'light' | 'dark' | 'glass' | 'neu' | 'modern' | 'cyber' | 'minimal' | 'gradient' | 'material' | 'retro';
  showSocialLogin?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  subtitle,
  emailPlaceholder,
  passwordPlaceholder,
  submitText,
  onSubmit,
  theme = 'light',
  showSocialLogin = false,
  showRememberMe = false,
  showForgotPassword = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onSubmit) onSubmit(email, password);
    else alert(`Login successful! Email: ${email}`);
    
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login would be handled here!`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password) {
      handleSubmit();
    }
  };

  return (
    <div className={`login-form theme-${theme}`}>
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
      
      {showSocialLogin && (
        <div className="social-login">
          <button type="button" className="social-btn google" onClick={() => handleSocialLogin('Google')}>
            <Chrome className="w-5 h-5" />
            Google
          </button>
          <button type="button" className="social-btn github" onClick={() => handleSocialLogin('GitHub')}>
            <Github className="w-5 h-5" />
            GitHub
          </button>
          <button type="button" className="social-btn twitter" onClick={() => handleSocialLogin('Twitter')}>
            <Twitter className="w-5 h-5" />
            Twitter
          </button>
          <div className="divider">
            <span>or continue with email</span>
          </div>
        </div>
      )}
      
      <div className="form-group">
        <label>
          <Mail className="w-4 h-4 inline mr-2" />
          Email address
        </label>
        <input 
          type="email" 
          placeholder={emailPlaceholder} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      
      <div className="form-group">
        <label>
          <Lock className="w-4 h-4 inline mr-2" />
          Password
        </label>
        <div className="password-input">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder={passwordPlaceholder} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {(showRememberMe || showForgotPassword) && (
        <div className="form-options">
          {showRememberMe && (
            <label className="remember-me">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          )}
          {showForgotPassword && (
            <a href="#" className="forgot-password" onClick={(e) => {e.preventDefault(); alert('Forgot password functionality');}}>
              Forgot password?
            </a>
          )}
        </div>
      )}
      
      <button type="button" className="btn-primary" disabled={isLoading} onClick={handleSubmit}>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            {submitText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

const ModernLoginLayouts: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState<string>('glassmorphism');

  // Add styles to head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const switchLayout = (layoutName: string) => {
    setActiveLayout(layoutName);
  };

  const layouts = [
    { id: 'glassmorphism', name: 'Glassmorphism', description: 'Translucent glass effect' },
    { id: 'split-diagonal', name: 'Split Diagonal', description: 'Dynamic diagonal split' },
    { id: 'side-panel', name: 'Side Panel', description: 'Minimalist side layout' },
    { id: 'video-bg', name: 'Floating Card', description: 'Floating card overlay' },
    { id: 'neumorphic', name: 'Neumorphic', description: 'Soft 3D effect' },
    { id: 'asymmetric', name: 'Asymmetric Modern', description: 'Dynamic morphing shapes' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', description: 'Futuristic neon theme' },
    { id: 'material', name: 'Material Design', description: 'Google Material inspired' },
    { id: 'retro-wave', name: 'Retro Wave', description: '80s synthwave aesthetic' },
    { id: 'minimal-mono', name: 'Minimal Mono', description: 'Ultra-clean monochrome' }
  ];

  return (
    <div className="login-layouts-container">
      <div className="layout-selector">
        <h3 className="selector-title">Login Layouts</h3>
        {layouts.map((layout) => (
          <button 
            key={layout.id}
            className={activeLayout === layout.id ? 'active' : ''} 
            onClick={() => switchLayout(layout.id)}
            title={layout.description}
          >
            <span className="layout-name">{layout.name}</span>
            <span className="layout-desc">{layout.description}</span>
          </button>
        ))}
      </div>

      {/* Layout 1: Glassmorphism */}
      <div className={`layout glassmorphism ${activeLayout === 'glassmorphism' ? 'active' : ''}`}>
        <div className="glass-card">
          <LoginForm 
            title="Welcome back"
            subtitle="Enter your credentials to access your account"
            emailPlaceholder="hello@example.com"
            passwordPlaceholder="••••••••"
            submitText="Sign in"
            theme="glass"
            showRememberMe={true}
            showForgotPassword={true}
          />
        </div>
      </div>

      {/* Layout 2: Split Diagonal */}
      <div className={`layout split-diagonal ${activeLayout === 'split-diagonal' ? 'active' : ''}`}>
        <div className="diagonal-bg"></div>
        <div className="diagonal-form">
          <LoginForm 
            title="Sign In"
            subtitle="Welcome to the future of authentication"
            emailPlaceholder="your@email.com"
            passwordPlaceholder="Enter password"
            submitText="Continue"
            theme="modern"
            showSocialLogin={true}
          />
        </div>
      </div>

      {/* Layout 3: Side Panel */}
      <div className={`layout side-panel ${activeLayout === 'side-panel' ? 'active' : ''}`}>
        <div className="panel-left">
          <div className="panel-content">
            <h1>Hello.</h1>
            <p>Sign in to continue to your account</p>
            <div className="stats">
              <div className="stat">
                <h3>50K+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-right">
          <LoginForm 
            title="Account Login"
            subtitle="Don't have an account? Sign up here"
            emailPlaceholder="Enter email"
            passwordPlaceholder="Password"
            submitText="Login"
            theme="minimal"
            showRememberMe={true}
          />
        </div>
      </div>

      {/* Layout 4: Floating Card */}
      <div className={`layout video-bg ${activeLayout === 'video-bg' ? 'active' : ''}`}>
        <div className="video-overlay"></div>
        <div className="floating-card">
          <LoginForm 
            title="Get Started"
            subtitle="Login to explore endless possibilities"
            emailPlaceholder="name@company.com"
            passwordPlaceholder="Min 8 characters"
            submitText="Sign In"
            theme="light"
            showSocialLogin={true}
            showForgotPassword={true}
          />
        </div>
      </div>

      {/* Layout 5: Neumorphic */}
      <div className={`layout neumorphic ${activeLayout === 'neumorphic' ? 'active' : ''}`}>
        <div className="neu-card">
          <LoginForm 
            title="Welcome"
            subtitle="Please login to your account"
            emailPlaceholder="Username"
            passwordPlaceholder="Password"
            submitText="Login"
            theme="neu"
            showRememberMe={true}
          />
        </div>
      </div>

      {/* Layout 6: Asymmetric Modern */}
      <div className={`layout asymmetric ${activeLayout === 'asymmetric' ? 'active' : ''}`}>
        <div className="asym-bg">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
        <div className="asym-form">
          <LoginForm 
            title="Sign In"
            subtitle="Experience the next generation"
            emailPlaceholder="you@example.com"
            passwordPlaceholder="Secure password"
            submitText="Access Account"
            theme="glass"
          />
        </div>
      </div>

      {/* Layout 7: Cyberpunk Neon */}
      <div className={`layout cyberpunk ${activeLayout === 'cyberpunk' ? 'active' : ''}`}>
        <div className="cyber-grid"></div>
        <div className="cyber-scanlines"></div>
        <div className="cyber-form">
          <div className="cyber-header">
            <h1>SYSTEM ACCESS</h1>
            <div className="cyber-code">MICH_PORTAL_V2.0</div>
          </div>
          <LoginForm 
            title="AUTHENTICATE"
            subtitle="Enter credentials to access the mainframe"
            emailPlaceholder="user@neural.net"
            passwordPlaceholder="access_code"
            submitText="JACK IN"
            theme="cyber"
            showForgotPassword={true}
          />
        </div>
      </div>

      {/* Layout 8: Material Design */}
      <div className={`layout material ${activeLayout === 'material' ? 'active' : ''}`}>
        <div className="material-bg">
          <div className="floating-shapes">
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="shape-3"></div>
          </div>
        </div>
        <div className="material-card">
          <div className="material-header">
            <h1>Welcome</h1>
            <p>Sign in to your account</p>
          </div>
          <LoginForm 
            title=""
            subtitle=""
            emailPlaceholder="Email"
            passwordPlaceholder="Password"
            submitText="Sign In"
            theme="material"
            showSocialLogin={true}
            showRememberMe={true}
            showForgotPassword={true}
          />
        </div>
      </div>

      {/* Layout 9: Retro Wave */}
      <div className={`layout retro-wave ${activeLayout === 'retro-wave' ? 'active' : ''}`}>
        <div className="retro-bg">
          <div className="grid-container">
            <div className="perspective-grid"></div>
          </div>
          <div className="retro-sun"></div>
          <div className="retro-mountains">
            <div className="mountain mountain-1"></div>
            <div className="mountain mountain-2"></div>
            <div className="mountain mountain-3"></div>
          </div>
        </div>
        <div className="retro-form">
          <div className="retro-header">
            <h1>NEURAL LINK</h1>
            <div className="retro-subtitle">ESTABLISHED 1987</div>
          </div>
          <LoginForm 
            title="ACCESS TERMINAL"
            subtitle="Connecting to NEON.NET"
            emailPlaceholder="terminal_id"
            passwordPlaceholder="access_key"
            submitText="CONNECT"
            theme="retro"
          />
        </div>
      </div>

      {/* Layout 10: Minimal Mono */}
      <div className={`layout minimal-mono ${activeLayout === 'minimal-mono' ? 'active' : ''}`}>
        <div className="mono-container">
          <div className="mono-sidebar">
            <div className="mono-brand">
              <h2>MICH</h2>
              <div className="mono-tagline">Minimal Interface</div>
            </div>
            <div className="mono-features">
              <div className="feature">✓ Secure Authentication</div>
              <div className="feature">✓ Fast Performance</div>
              <div className="feature">✓ Clean Design</div>
            </div>
          </div>
          <div className="mono-main">
            <LoginForm 
              title="Sign In"
              subtitle="Access your account"
              emailPlaceholder="Email address"
              passwordPlaceholder="Password"
              submitText="Continue"
              theme="minimal"
              showRememberMe={true}
              showForgotPassword={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  /* Global Styles */
  .login-layouts-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  /* Layout Selector */
  .layout-selector {
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    min-width: 220px;
  }

  .selector-title {
    color: white;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .layout-selector button {
    display: block;
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }

  .layout-selector button:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-4px);
  }

  .layout-selector button.active {
    background: rgba(99, 102, 241, 0.3);
    border-color: rgb(99, 102, 241);
  }

  .layout-name {
    display: block;
    color: white;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .layout-desc {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
  }

          /* Layout Container */
        .layout {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: none;
          transition: opacity 0.5s ease;
        }

        .layout.active {
          display: block !important;
          opacity: 1;
          z-index: 1;
        }

        .layout.active.side-panel {
          display: flex !important;
        }

  /* Login Form Base Styles */
  .login-form {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .login-form h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1a1a1a;
  }

  .login-form > p {
    color: #666;
    margin-bottom: 30px;
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    background: white;
    color: #333;
  }

  .form-group input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .password-input {
    position: relative;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 4px;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: #666;
  }

  .remember-me input {
    width: auto;
  }

  .forgot-password {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .btn-primary {
    width: 100%;
    padding: 12px 24px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary:hover:not(:disabled) {
    background: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Social Login */
  .social-login {
    margin-bottom: 30px;
  }

  .social-btn {
    width: 100%;
    padding: 10px 16px;
    margin-bottom: 12px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    color: #333;
  }

  .social-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .social-btn.google:hover {
    border-color: #ea4335;
    color: #ea4335;
  }

  .social-btn.github:hover {
    border-color: #24292e;
    color: #24292e;
  }

  .social-btn.twitter:hover {
    border-color: #1da1f2;
    color: #1da1f2;
  }

  .divider {
    position: relative;
    text-align: center;
    margin: 24px 0;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
  }

  .divider span {
    position: relative;
    padding: 0 16px;
    background: white;
    color: #666;
    font-size: 13px;
  }

  /* Layout 1: Glassmorphism */
  .glassmorphism.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .glassmorphism::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    top: -200px;
    right: -100px;
    filter: blur(50px);
  }

  .glassmorphism::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    bottom: -150px;
    left: -50px;
    filter: blur(30px);
  }

  .glass-card {
    position: relative;
    z-index: 1;
  }

  .glass-card .login-form {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .theme-glass h2,
  .theme-glass label,
  .theme-glass p {
    color: white !important;
  }

  .theme-glass input {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }

  .theme-glass input::placeholder {
    color: rgba(255, 255, 255, 0.7) !important;
  }

  .theme-glass .btn-primary {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .theme-glass .btn-primary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
  }

  .theme-glass .forgot-password,
  .theme-glass .remember-me {
    color: white !important;
  }

  .theme-glass .password-toggle {
    color: white;
  }

  /* Layout 2: Split Diagonal */
  .split-diagonal {
    position: relative;
    background: #f3f4f6;
  }

  .diagonal-bg {
    position: absolute;
    width: 60%;
    height: 100%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
    animation: diagonalMove 20s ease-in-out infinite;
  }

  @keyframes diagonalMove {
    0%, 100% { clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%); }
    50% { clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%); }
  }

  .diagonal-form {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
  }

  .theme-modern .divider span {
    background: white;
  }

          /* Layout 3: Side Panel */
        .side-panel.active {
          display: flex !important;
          height: 100%;
        }

  .panel-left {
    flex: 1;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .panel-content {
    color: white;
    max-width: 400px;
  }

  .panel-content h1 {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  .panel-content > p {
    font-size: 18px;
    opacity: 0.8;
    margin-bottom: 40px;
  }

  .stats {
    display: flex;
    gap: 40px;
  }

  .stat h3 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stat p {
    font-size: 14px;
    opacity: 0.7;
  }

  .panel-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
    padding: 40px;
  }

  /* Layout 4: Floating Card */
  .video-bg {
    position: relative;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  .floating-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
    50% { transform: translate(-50%, -50%) translateY(-20px); }
  }

  /* Layout 5: Neumorphic */
  .neumorphic.active {
    background: #e0e5ec;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .neu-card .login-form {
    background: #e0e5ec;
    box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
  }

  .theme-neu input {
    background: #e0e5ec !important;
    box-shadow: inset 2px 2px 5px #a3b1c6, inset -3px -3px 7px #ffffff !important;
    border: none !important;
  }

  .theme-neu .btn-primary {
    background: #e0e5ec;
    color: #6366f1;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
  }

  .theme-neu .btn-primary:hover:not(:disabled) {
    box-shadow: 2px 2px 5px #a3b1c6, -2px -2px 5px #ffffff;
    transform: none;
  }

  /* Layout 6: Asymmetric Modern */
  .asymmetric {
    background: #0a0a0a;
    overflow: hidden;
  }

  .asym-bg {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .shape {
    position: absolute;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    opacity: 0.1;
    animation: morph 20s ease-in-out infinite;
  }

  .shape1 {
    width: 600px;
    height: 600px;
    top: -300px;
    right: -200px;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  }

  .shape2 {
    width: 400px;
    height: 400px;
    bottom: -100px;
    left: -100px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    animation-delay: -5s;
  }

  .shape3 {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation-delay: -10s;
  }

  @keyframes morph {
    0%, 100% {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      transform: rotate(0deg) scale(1);
    }
    33% {
      border-radius: 70% 30% 50% 50% / 30% 70% 40% 60%;
      transform: rotate(120deg) scale(1.1);
    }
    66% {
      border-radius: 30% 70% 40% 60% / 70% 30% 60% 40%;
      transform: rotate(240deg) scale(0.9);
    }
  }

  .asym-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  /* Layout 7: Cyberpunk Neon */
  .cyberpunk {
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .cyber-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  .cyber-scanlines {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 50%,
      rgba(0, 255, 255, 0.03) 50%
    );
    background-size: 100% 4px;
    animation: scanlines 8s linear infinite;
    pointer-events: none;
  }

  @keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(10px); }
  }

  .cyber-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .cyber-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .cyber-header h1 {
    font-size: 36px;
    font-weight: 900;
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
    letter-spacing: 4px;
    margin-bottom: 8px;
  }

  .cyber-code {
    color: #ff00ff;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    opacity: 0.8;
  }

  .theme-cyber .login-form {
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  }

  .theme-cyber h2,
  .theme-cyber label,
  .theme-cyber p {
    color: #00ffff !important;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .theme-cyber input {
    background: rgba(0, 255, 255, 0.1) !important;
    border: 1px solid #00ffff !important;
    color: #00ffff !important;
    font-family: 'Courier New', monospace;
  }

  .theme-cyber input::placeholder {
    color: rgba(0, 255, 255, 0.5) !important;
  }

  .theme-cyber .btn-primary {
    background: transparent;
    border: 2px solid #ff00ff;
    color: #ff00ff;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 900;
  }

  .theme-cyber .btn-primary:hover:not(:disabled) {
    background: #ff00ff;
    color: #000;
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.8);
  }

  .theme-cyber .forgot-password {
    color: #ffff00 !important;
  }

  .theme-cyber .password-toggle {
    color: #00ffff;
  }

  /* Layout 8: Material Design */
  .material {
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
  }

  .material-bg {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .floating-shapes {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .floating-shapes > div {
    position: absolute;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    border-radius: 50%;
    opacity: 0.1;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -150px;
    animation: float-1 20s ease-in-out infinite;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    left: -100px;
    animation: float-2 15s ease-in-out infinite;
  }

  .shape-3 {
    width: 150px;
    height: 150px;
    top: 50%;
    left: 10%;
    animation: float-3 25s ease-in-out infinite;
  }

  @keyframes float-1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-30px, 30px) rotate(180deg); }
  }

  @keyframes float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.2); }
  }

  @keyframes float-3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(50px, -50px) rotate(120deg); }
    66% { transform: translate(-50px, 50px) rotate(240deg); }
  }

  .material-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 450px;
    width: 90%;
  }

  .material-header {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    padding: 40px;
    text-align: center;
    color: white;
  }

  .material-header h1 {
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 8px;
  }

  .material-header p {
    opacity: 0.9;
    font-size: 16px;
  }

  .theme-material .login-form {
    border-radius: 0;
    box-shadow: none;
    padding-top: 20px;
  }

  .theme-material .social-btn {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .theme-material .social-btn:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .theme-material .divider span {
    background: white;
  }

  /* Layout 9: Retro Wave */
  .retro-wave {
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .retro-bg {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .grid-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60%;
    perspective: 200px;
  }

  .perspective-grid {
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(255, 0, 255, 0.3) 2px, transparent 2px),
      linear-gradient(90deg, rgba(255, 0, 255, 0.3) 2px, transparent 2px);
    background-size: 50px 50px;
    transform: rotateX(60deg);
    transform-origin: center bottom;
    animation: gridScroll 10s linear infinite;
  }

  @keyframes gridScroll {
    0% { background-position: 0 0; }
    100% { background-position: 0 50px; }
  }

  .retro-sun {
    position: absolute;
    width: 300px;
    height: 300px;
    background: linear-gradient(to bottom, #ff006e 0%, #ffbe0b 50%, #fb5607 100%);
    border-radius: 50%;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 60px rgba(255, 0, 110, 0.5);
    animation: sunPulse 4s ease-in-out infinite;
  }

  @keyframes sunPulse {
    0%, 100% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.05); }
  }

  .retro-mountains {
    position: absolute;
    bottom: 30%;
    width: 100%;
    height: 200px;
  }

  .mountain {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .mountain-1 {
    left: 10%;
    border-left: 200px solid transparent;
    border-right: 200px solid transparent;
    border-bottom: 150px solid #1a1a1a;
  }

  .mountain-2 {
    left: 35%;
    border-left: 150px solid transparent;
    border-right: 150px solid transparent;
    border-bottom: 180px solid #0f0f0f;
  }

  .mountain-3 {
    right: 15%;
    border-left: 180px solid transparent;
    border-right: 180px solid transparent;
    border-bottom: 160px solid #151515;
  }

  .retro-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .retro-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .retro-header h1 {
    font-size: 48px;
    font-weight: 900;
    background: linear-gradient(45deg, #ff006e, #ffbe0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(255, 0, 110, 0.5);
    letter-spacing: 4px;
    margin-bottom: 8px;
  }

  .retro-subtitle {
    color: #ff00ff;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .theme-retro .login-form {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #ff00ff;
    box-shadow: 0 0 40px rgba(255, 0, 255, 0.4);
  }

  .theme-retro h2,
  .theme-retro label {
    color: #ff00ff !important;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 900;
  }

  .theme-retro p {
    color: #00ffff !important;
    font-family: 'Courier New', monospace;
  }

  .theme-retro input {
    background: rgba(255, 0, 255, 0.1) !important;
    border: 1px solid #ff00ff !important;
    color: #ff00ff !important;
    font-family: 'Courier New', monospace;
  }

  .theme-retro .btn-primary {
    background: linear-gradient(45deg, #ff006e, #ffbe0b);
    border: none;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 900;
  }

  .theme-retro .btn-primary:hover:not(:disabled) {
    box-shadow: 0 0 30px rgba(255, 0, 110, 0.6);
  }

  .theme-retro .password-toggle {
    color: #ff00ff;
  }

          /* Layout 10: Minimal Mono */
        .minimal-mono {
          background: #ffffff;
        }

        .minimal-mono.active .mono-container {
          display: flex !important;
          height: 100%;
        }

  .mono-sidebar {
    width: 400px;
    background: #000000;
    color: white;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mono-brand h2 {
    font-size: 48px;
    font-weight: 900;
    margin-bottom: 8px;
    letter-spacing: -2px;
  }

  .mono-tagline {
    font-size: 16px;
    opacity: 0.7;
    font-weight: 300;
  }

  .mono-features {
    margin-bottom: 60px;
  }

  .feature {
    font-size: 16px;
    margin-bottom: 16px;
    opacity: 0.8;
    font-weight: 300;
  }

  .mono-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .theme-minimal .login-form {
    box-shadow: none;
    border: 2px solid #000;
  }

  .theme-minimal h2 {
    font-weight: 900;
    letter-spacing: -1px;
  }

  .theme-minimal input {
    border: 2px solid #000 !important;
    font-weight: 500;
  }

  .theme-minimal input:focus {
    box-shadow: none !important;
  }

  .theme-minimal .btn-primary {
    background: #000;
    font-weight: 700;
  }

  .theme-minimal .btn-primary:hover:not(:disabled) {
    background: #222;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .layout-selector {
      right: 10px;
      top: 10px;
      max-width: 200px;
      padding: 15px;
    }

    .login-form {
      padding: 30px;
      max-width: 90%;
    }

    .side-panel,
    .mono-container {
      flex-direction: column;
    }

    .panel-left,
    .mono-sidebar {
      width: 100%;
      padding: 40px 20px;
    }

    .diagonal-form,
    .asym-form,
    .cyber-form,
    .retro-form,
    .material-card {
      width: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .retro-header h1 {
      font-size: 36px;
    }

    .cyber-header h1 {
      font-size: 28px;
    }
  }
`;

export default ModernLoginLayouts;
