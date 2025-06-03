/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./*.html",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // for toggling dark mode via class (html.dark)
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-primary)', 'sans-serif'],
      },
      colors: {
        // Updated white to use the new base background color
        'white': 'var(--color-bg-base)',
        
        // Theme-aligned semantic color names using new CSS variables
        'primary-bg': 'var(--color-bg-base)',       // Maps to --color-bg-base
        'secondary-bg': 'var(--color-bg-surface)',  // Maps to --color-bg-surface
        'card-bg': 'var(--color-bg-card)',        // Maps to --color-bg-card (pure white for cards)
        'input-bg': 'var(--color-input-bg)',     // Maps to --color-input-bg
        'primary-text': 'var(--color-text)',         // Maps to --color-text
        'secondary-text': 'var(--color-text-secondary)', // Maps to --color-text-secondary
        'text-muted': 'var(--color-text-muted)',       // Maps to --color-text-muted
        'card-border': 'var(--color-border)',        // Maps to --color-border
        
        // Surface colors using new variable names
        'surface': {
          DEFAULT: 'var(--color-bg-card)',     // Default surface (pure white for cards)
          base: 'var(--color-bg-base)',        // Main background
          surface: 'var(--color-bg-surface)',  // Section background
          muted: 'var(--color-bg-muted)',      // Muted background
          hover: 'var(--color-hover-bg)',      // Hover background
          border: 'var(--color-border)',
          'border-light': 'var(--color-border-light)'
        },
        
        'accent': {
          DEFAULT: 'var(--accent-primary)',    // Main orange
          'primary': 'var(--accent-primary)',
          'secondary': 'var(--accent-secondary)',
          'light': 'var(--accent-light)',
          'hover': 'var(--accent-hover)',
          'yellow': 'var(--accent-yellow)',    // Kept for compatibility
          'red': 'var(--accent-color-red)'     // Kept for compatibility
        }
      },
      boxShadow: {
        'card': 'var(--card-shadow)',
        'glow': 'var(--glow)',
        'card-glow': 'var(--card-glow)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)'
      },
      backgroundImage: {
        'accent-gradient': 'var(--accent-gradient)',
        'text-gradient': 'var(--text-gradient)'
      },
      borderRadius: {
        'standard': 'var(--border-radius)',
        'large': 'var(--border-radius-lg)'
      },
      transitionProperty: {
        'standard': 'var(--transition)',
        'fast': 'var(--transition-fast)'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--color-text)',
            a: {
              color: 'var(--accent-primary)',
              '&:hover': {
                color: 'var(--accent-hover)',
              },
              textDecoration: 'none',
            },
            h1: {
              color: 'var(--color-text)',
              fontWeight: '800',
            },
            h2: {
              color: 'var(--color-text)',
              fontWeight: '700',
            },
            h3: {
              color: 'var(--color-text)',
              fontWeight: '600',
            },
            h4: {
              color: 'var(--color-text)',
            },
            blockquote: {
              borderLeftColor: 'var(--accent-primary)',
              color: 'var(--color-text-secondary)',
              fontStyle: 'normal',
            },
            code: {
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--color-bg-muted)',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: 'var(--color-bg-muted)',
              code: {
                backgroundColor: 'transparent',
                color: 'inherit',
                padding: '0',
                fontWeight: 'inherit',
              },
            },
            strong: {
              color: 'var(--color-text)',
              fontWeight: '600',
            },
            hr: {
              borderColor: 'var(--color-border)',
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
            },
            ol: {
              li: {
                '&:before': {
                  color: 'var(--accent-primary)',
                  fontWeight: '600',
                },
              },
            },
            ul: {
              li: {
                '&:before': {
                  backgroundColor: 'var(--accent-primary)',
                },
              },
            },
            table: {
              thead: {
                borderBottomColor: 'var(--color-border)',
                th: {
                  color: 'var(--color-text)',
                },
              },
              tbody: {
                tr: {
                  borderBottomColor: 'var(--color-border-light)',
                },
              },
            },
          },
        },
        dark: {
          css: {
            color: 'var(--color-text)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 