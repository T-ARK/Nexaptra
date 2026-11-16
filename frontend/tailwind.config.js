/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        netscope: {
          main: '#05040B',
          secondary: '#0B0915',
          card: '#100D1E',
          'card-hover': '#16122a',
          panel: '#151027',
          purple: '#8B35F5',
          neon: '#B65CFF',
          violet: '#7138E8',
          text: '#F5F1FF',
          muted: '#A49BB8',
          subtle: '#6A627E',
          border: 'rgba(160, 100, 255, 0.18)',
          'border-strong': 'rgba(182, 92, 255, 0.45)',
          success: '#35D39A',
          warning: '#F5B942',
          danger: '#FF5277',
          cyan: '#06B6D4',
        },
      },
      boxShadow: {
        'neon-purple': '0 0 25px rgba(182, 92, 255, 0.35)',
        'neon-glow': '0 0 35px rgba(139, 53, 245, 0.4)',
        'neon-sm': '0 0 12px rgba(182, 92, 255, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
