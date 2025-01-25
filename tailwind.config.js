/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#ffccb3",
        "dark-brown": "#662200", 
        "main-white": "#FFFBF4",
        "beige": "#EBD2BC",
        "peach": "#BC6755",
        "green": "#BEB8A0" 
        
      },
      fontFamily: {
        serif: ["Anaheim", "serif"],
        heading: ["Quicksand", "sans-serif"],
      },
      screens: {
        tablet: "600px", 
        laptop: "1025px", 
        desktop: "1300px", 
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
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        zoomInOut: {
       '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        fadeOut: 'fadeOut 3s ease-out',
        fadeInOut: 'fadeInOut 3s ease-in-out infinite',
        slideUp: "slideUp 1.5s ease-out forwards",
        slideInRight:"slideInRight 1.5s ease-out forwards",
        slideInLeft:"slideInLeft 1.5s ease-out forwards",
        zoomInOut: 'zoomInOut 40s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
