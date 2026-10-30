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
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
