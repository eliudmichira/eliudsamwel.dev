import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div
      className={`eclipse-toggle fixed top-6 right-6 z-[1001] ${theme === 'dark' ? 'dark-theme-active' : 'light-theme-active'}`}
      onClick={handleToggle}
      onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="sun"></div>
      <div className={`moon ${theme === 'dark' ? 'active' : ''}`}></div>
    </div>
  );
}; 