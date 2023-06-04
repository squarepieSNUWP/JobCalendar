/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#00000',
        'secondary': '#DED4CF',
        'tertiary': '#F5EEEB',
      },
      keyframes : {
        'pop-in' : {
          '0%' : { 
            opacity: '0',
            transform: 'scale(0.8) translate(-40%, -59%)'
          },
          '100%' : {
            opacity: '1',
            transform: 'scale(1) translate(-40%, -59%)'
          }
        }
      },
      animation : {
        'pop-in' : 'pop-in 0.3s ease-in-out'
      },
    },
  },
  plugins: [],
}
