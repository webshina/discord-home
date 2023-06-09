/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#120D18',
        'dark-light': '#33263E',
        'vivid-pink': '#E42575',
        'discord-purple': '#404FED',
        white: '#F8F7F8',
      },
      fontFamily: {
        NotoSansJP: ['Noto Sans JP', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
        VastShadow: ['Vast Shadow', 'cursive'],
        Kalam: ['Kalam', 'cursive'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0px 2px 3px darkgrey',
        },
        '.text-shadow-md': {
          textShadow: '0px 3px 3px darkgrey',
        },
        '.text-shadow-lg': {
          textShadow: '0px 5px 3px darkgrey',
        },
        '.text-shadow-xl': {
          textShadow: '0px 7px 3px darkgrey',
        },
        '.text-shadow-2xl': {
          textShadow: '0px 10px 3px darkgrey',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
