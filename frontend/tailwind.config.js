/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Define shades of green
        primaryGreen: '#00A86B',
        secondaryGreen: '#007B4F',
        accentGreen: '#45cc4e',

        // Define shades of white
        backgroundWhite: '#FFFFFF',
        cardWhite: '#F9F9F9',
        textBlack: '#333333',
        primaryBorderGrey: '#F2F2F2',
        borderGrey: '#DDDDDD',
        primaryGray: '#72736f',
        secondaryGray:'#373530',
        // Additional colors
        successGreen: '#4CAF50',
        errorRed: '#FF5252',
        accentHover: '#c0392b', // Darker Red
      },
    },
  },
  plugins: [],
}

