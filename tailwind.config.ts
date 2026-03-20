import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        '4tp': {
          yellow: '#FEEB3D',
          black: '#000000',
          white: '#FFFFFF',
          'gray-dark': '#111111',
          'gray-mid': '#1A1A1A',
          'gray-light': '#333333',
},
},
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
},
      fontSize: {
        'display': ['clamp(4rem, 12vw, 14rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'hero': ['clamp(2rem, 6vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'xl-display': ['clamp(1.5rem, 4vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
},
      animation: {
        'square-expand': 'squareExpand 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
},
      keyframes: {
        squareExpand: {
          '0%': { transform: 'scale(0.05)', opacity: '0', borderRadius: '4px' },
          '30%': { opacity: '1', borderRadius: '2px' },
          '100%': { transform: 'scale(1)', opacity: '1', borderRadius: '0px' },
},
        fadeUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
},
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
},
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(254, 235, 61, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(254, 235, 61, 0.6)' },
},
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
},
},
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
},
},
},
  plugins: [],
}

export default config
