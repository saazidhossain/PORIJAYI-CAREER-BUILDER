/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['Hind Siliguri', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        violet: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        surface: {
          50:  'rgba(255,255,255,0.08)',
          100: 'rgba(255,255,255,0.05)',
          200: 'rgba(255,255,255,0.03)',
          300: 'rgba(255,255,255,0.02)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue':  '0 0 20px rgba(59,130,246,0.35), 0 0 60px rgba(59,130,246,0.1)',
        'glow-violet':'0 0 20px rgba(139,92,246,0.35), 0 0 60px rgba(139,92,246,0.1)',
        'glow-cyan':  '0 0 20px rgba(6,182,212,0.35)',
        'glow-green': '0 0 20px rgba(16,185,129,0.35)',
        'glow-amber': '0 0 20px rgba(245,158,11,0.35)',
        'card':       '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)',
        'nav-active': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: 0, transform: 'translateX(-16px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to:   { opacity: 1, transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        pulse_glow: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
        spin_slow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeIn:     'fadeIn 0.4s ease-out both',
        slideIn:    'slideInLeft 0.35s ease-out both',
        scaleIn:    'scaleIn 0.3s ease-out both',
        shimmer:    'shimmer 2.4s linear infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
        float:      'float 3s ease-in-out infinite',
        spin_slow:  'spin_slow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
