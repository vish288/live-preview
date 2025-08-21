/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        mono: [
          'Monaco',
          'Menlo',
          'Ubuntu Mono',
          'monospace',
        ],
      },
      colors: {
        // Sandal Light Theme Palette
        'sandal': {
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f5efdc',
          300: '#eee0c1',
          400: '#e4ca96',
          500: '#d4af6e',
          600: '#c59955',
          700: '#b08143',
          800: '#8f6c3a',
          900: '#755932',
          950: '#3e2e18',
        },
        
        // Midnight Blue Dark Theme Palette
        'midnight': {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d6fe',
          300: '#a5bbfc',
          400: '#8094f8',
          500: '#5c6ef2',
          600: '#4147e8',
          700: '#3538d4',
          800: '#2e30ab',
          900: '#2a2c87',
          950: '#0f1023',
        },
        
        // Legacy GitHub colors (keeping for compatibility)
        'github-canvas': '#ffffff',
        'github-canvas-default': '#f6f8fa',
        'github-canvas-subtle': '#f6f8fa',
        'github-border-default': '#d0d7de',
        'github-border-muted': '#d8dee4',
        'github-fg-default': '#1f2328',
        'github-fg-muted': '#656d76',
        'github-fg-subtle': '#6e7781',
        'github-accent-fg': '#0969da',
        'github-accent-emphasis': '#0969da',
        'github-success-fg': '#1a7f37',
        'github-danger-fg': '#d1242f',
        'github-btn-bg': '#f6f8fa',
        'github-btn-border': '#d0d7de',
        'github-btn-hover-bg': '#f3f4f6',
        'github-btn-hover-border': '#d0d7de',
      },
    },
  },
  plugins: [],
}