/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  
  // Enable dark mode support (optional)
  darkMode: 'class',
  
  theme: {
    extend: {
      // Enhanced color palette with better contrast ratios
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      
      // Enhanced typography with better readability
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      
      // Enhanced spacing for better visual hierarchy
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom border radius values
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Enhanced shadows with better performance
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'none': 'none',
      },
      
      // Enhanced animations with hardware acceleration
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'marquee': 'marquee 20s linear infinite',
        'marquee-vertical': 'marqueeVertical 20s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideDown: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideLeft: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        slideRight: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      
      // Enhanced transitions
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      
      // Enhanced screens for better responsive design
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      
      // Custom utilities for better performance
      backdropBlur: {
        'xs': '2px',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  
  plugins: [
    // Add custom utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // GPU acceleration utilities
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        
        // Text rendering optimization
        '.optimize-text': {
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        
        // Hardware acceleration for animations
        '.hw-accelerated': {
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        },
        
        // Improved focus styles
        '.focus-visible': {
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: theme('colors.primary.500'),
            outlineOffset: '2px',
          }
        },
        
        // Container queries support (if needed)
        '.container-normal': {
          containerType: 'normal',
        },
        
        // Scroll snap utilities
        '.scroll-snap-x': {
          scrollSnapType: 'x mandatory',
        },
        '.scroll-snap-y': {
          scrollSnapType: 'y mandatory',
        },
        '.scroll-snap-start': {
          scrollSnapAlign: 'start',
        },
        '.scroll-snap-center': {
          scrollSnapAlign: 'center',
        },
        '.scroll-snap-end': {
          scrollSnapAlign: 'end',
        },
      }
      
      addUtilities(newUtilities)
    },
    
    // Additional plugins for better functionality
    // require('@tailwindcss/forms'), // Uncomment if you need form styling
    // require('@tailwindcss/typography'), // Uncomment if you need typography plugin
    // require('@tailwindcss/aspect-ratio'), // Uncomment if you need aspect ratio utilities
    // require('@tailwindcss/container-queries'), // Uncomment if you need container queries
  ],
  
  // Optimize for production
  corePlugins: {
    // Disable unused features for better performance
    preflight: true, // Keep this true for CSS reset
    container: true,
    accessibility: true,
    
    // You can disable these if not needed
    // backdropOpacity: false,
    // backdropSaturate: false,
    // backdropSepia: false,
  },
  
  // Purge unused styles in production
  future: {
    hoverOnlyWhenSupported: true, // Hover states only on devices that support hover
    respectDefaultRingColorOpacity: true,
  },
  
  // Experimental features
  experimental: {
    optimizeUniversalDefaults: true, // Better performance
  },
}