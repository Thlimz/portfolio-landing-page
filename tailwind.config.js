/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D12',
        accent: '#C9A84C',
        background: '#FAF8F5',
        slate: '#2A2A35',
        'accent-dim': '#A88B3D',
        'accent-glow': '#D4B85C',
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        drama: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl-custom': '2rem',
        '3xl-custom': '3rem',
        '4xl-custom': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
