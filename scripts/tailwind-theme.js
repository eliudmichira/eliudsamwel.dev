// Configure Tailwind with our theme colors
(function() {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Dark theme colors
          'primary-bg': 'var(--primary-bg)',
          'secondary-bg': 'var(--secondary-bg)',
          'card-bg': 'var(--card-bg)',
          'input-bg': 'var(--input-bg)',
          'primary-text': 'var(--primary-text)',
          'secondary-text': 'var(--secondary-text)',
          'card-border': 'var(--card-border)',
          'accent': {
            DEFAULT: 'var(--accent-color)',
            'amber': 'var(--accent-color-amber)',
            'red': 'var(--accent-color-red)',
            'purple': 'var(--accent-color-purple)'
          }
        },
        boxShadow: {
          'card': 'var(--card-shadow)',
          'glow': 'var(--glow)',
          'card-glow': 'var(--card-glow)'
        },
        backgroundImage: {
          'accent-gradient': 'var(--accent-gradient)',
          'text-gradient': 'var(--text-gradient)',
          'glow-bg': 'var(--glow-bg)'
        },
        borderRadius: {
          'standard': 'var(--border-radius)',
          'large': 'var(--border-radius-lg)'
        }
      }
    }
  };
})(); 