/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ── COLORS ─────────────────────────────────────────────
      // Dari --variable di globals.css
      colors: {
        sage: {
          DEFAULT: '#DCE7D7',   // --sage
          dark:    '#B8CEAF',   // --sage-dark
          deeper:  '#7FA87A',   // --sage-deeper
        },
        pink: {
          DEFAULT: '#E6B3D3',   // --pink
          dark:    '#C97DB0',   // --pink-dark
          light:   '#F2D5E9',   // --pink-light
        },
        purple: {
          DEFAULT: '#8E4A97',   // --purple
          dark:    '#6B3572',   // --purple-dark
          light:   '#C49BCB',   // --purple-light
        },
        charcoal: {
          DEFAULT: '#2C2C2C',   // --charcoal
          soft:    '#4A4A4A',   // --charcoal-soft
        },
        gray: {
          mid:   '#8A8A8A',     // --gray-mid
          light: '#F7F5F2',     // --gray-light
        },
        white:  '#FEFEFE',      // --white
        cream:  '#FAF8F5',      // --cream
        border: 'rgba(44,44,44,0.1)', // --border
      },

      // ── BOX SHADOWS ────────────────────────────────────────
      // Dari --shadow-* di globals.css
      boxShadow: {
        sm: '0 2px 12px rgba(142,74,151,0.06)',    // --shadow-sm
        md: '0 8px 32px rgba(142,74,151,0.10)',    // --shadow-md
        lg: '0 20px 60px rgba(142,74,151,0.14)',   // --shadow-lg
      },

      // ── BORDER RADIUS ──────────────────────────────────────
      // Dari --radius-* di globals.css
      borderRadius: {
        sm: '10px',   // --radius-sm
        md: '16px',   // --radius-md
        lg: '24px',   // --radius-lg
        xl: '36px',   // --radius-xl
      },

      // ── FONT FAMILIES ──────────────────────────────────────
      // Dari --font-* di globals.css
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],  // --font-display
        serif:   ['"Playfair Display"',  'Georgia', 'serif'],   // --font-serif
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],      // --font-body
      },

      // ── TRANSITION TIMING ──────────────────────────────────
      // Dari --transition di globals.css
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',   // --transition
      },

      // ── KEYFRAMES & ANIMATIONS ─────────────────────────────
      // fadeSlideUp dari globals.css
      // reveal dihandle via class di globals.css (state-based, tidak cocok jadi Tailwind animation)
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.6s cubic-bezier(0.4,0,0.2,1) both',
        'fade-in':       'fadeIn 0.2s ease',
        'slide-up':      'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
