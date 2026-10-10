/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // for toggling dark mode via class (html.dark)
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-primary)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
      },
      colors: {
        // Keep Tailwind's real white. It used to be remapped to --color-bg-base,
        // which made every `text-white` near-black in dark mode and broke `bg-white/20`
        // opacity utilities. Use `primary-bg` / `surface-base` for theme-aware backgrounds.
        'white': '#ffffff',
        
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
      }
    },
  },
  plugins: [],
} 