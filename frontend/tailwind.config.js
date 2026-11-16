/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // LogTech // Gaming Zone [TACTICAL_ARSENAL_REFINED] Theme Tokens
        tactical: {
          black: '#010101',
          dark: '#080808',
          card: '#0d0d0d',
          panel: '#121212',
          hover: '#181818',
          border: 'rgba(0, 255, 136, 0.16)',
          'border-strong': 'rgba(0, 255, 136, 0.45)',
          'border-dim': 'rgba(255, 255, 255, 0.08)',
          text: '#ffffff',
          muted: '#8e8e8e',
          subtle: '#484848',
        },
        brand: {
          green: '#00ff88',
          'green-bright': '#26ff9d',
          'green-dim': 'rgba(0, 255, 136, 0.10)',
          'green-subtle': 'rgba(0, 255, 136, 0.22)',
          'green-glow': 'rgba(0, 255, 136, 0.6)',
        },
        accent: {
          crimson: '#ff003c',
          'crimson-dim': 'rgba(255, 0, 60, 0.12)',
          'crimson-glow': 'rgba(255, 0, 60, 0.55)',
        },
        // Semantic aliases pointing to the tactical gaming zone palette
        netscope: {
          main: '#010101',
          secondary: '#080808',
          card: '#0d0d0d',
          'card-hover': '#141414',
          panel: '#121212',
          purple: '#00ff88', // Replaced purple with LogTech toxic green
          neon: '#00ff88',   // Replaced purple neon with LogTech toxic green
          violet: '#00cc6a',
          text: '#ffffff',
          muted: '#8e8e8e',
          subtle: '#4a4a4a',
          border: 'rgba(0, 255, 136, 0.16)',
          'border-strong': 'rgba(0, 255, 136, 0.45)',
          success: '#00ff88',
          warning: '#ffb700',
          danger: '#ff003c',
          cyan: '#00e5ff',
        },
      },
      boxShadow: {
        'glow-green': '0 0 25px rgba(0, 255, 136, 0.45)',
        'glow-green-sm': '0 0 12px rgba(0, 255, 136, 0.28)',
        'glow-green-lg': '0 0 45px rgba(0, 255, 136, 0.65)',
        'glow-crimson': '0 0 25px rgba(255, 0, 60, 0.45)',
        'glow-crimson-sm': '0 0 12px rgba(255, 0, 60, 0.3)',
        'neon-purple': '0 0 25px rgba(0, 255, 136, 0.45)',
        'neon-glow': '0 0 35px rgba(0, 255, 136, 0.55)',
        'neon-sm': '0 0 12px rgba(0, 255, 136, 0.25)',
      },
      fontFamily: {
        display: ['Syncopate', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
