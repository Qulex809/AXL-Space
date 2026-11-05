/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        axl: {
          bg: '#0B0B0C',
          panel: '#111113',
          surface: '#18181B',
          border: '#29292E',
          text: '#F5F5F5',
          muted: '#A1A1AA',
          subtle: '#71717A',
          hover: '#202024',
          highlight: '#27272A',
        }
      },
      boxShadow: {
        'btn-glow': '0 0 16px -2px rgba(255, 255, 255, 0.25)',
        'btn-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'btn-active': 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
