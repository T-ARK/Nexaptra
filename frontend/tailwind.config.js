/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080911',
          surface: '#0d0f1b',
          card: '#121526',
          'card-hover': '#171b30',
          border: '#1f2642',
          'border-subtle': '#181e33',
          purple: '#8b5cf6',
          'purple-light': '#a78bfa',
          cyan: '#06b6d4',
          'cyan-light': '#38bdf8',
          teal: '#14b8a6',
          danger: '#ef4444',
          warning: '#f59e0b',
          clean: '#10b981',
          text: '#f8fafc',
          muted: '#94a3b8',
          subtle: '#64748b',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 25px -3px rgba(139, 92, 246, 0.45)',
        'glow-cyan': '0 0 25px -3px rgba(6, 182, 212, 0.45)',
        'glow-sm': '0 0 12px rgba(139, 92, 246, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
