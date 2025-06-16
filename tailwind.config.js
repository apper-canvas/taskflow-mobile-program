/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE9',
        secondary: '#8B85F0',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#4ECDC4',
        warning: '#FFD93D',
        error: '#FF6B6B',
        info: '#4A90E2',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'slide-right': 'slideRight 0.4s ease-out forwards',
        'checkbox-fill': 'checkboxFill 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'lift': 'lift 0.2s ease-out forwards'
      },
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        checkboxFill: {
          '0%': { backgroundColor: 'transparent', transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { backgroundColor: '#5B4FE9', transform: 'scale(1)' }
        },
        lift: {
          '0%': { transform: 'translateY(0) scale(1)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
          '100%': { transform: 'translateY(-2px) scale(1.02)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
        }
      }
    },
  },
  plugins: [],
}