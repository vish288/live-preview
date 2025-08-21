/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.vite.html",
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}