/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ['12px', '16px'],
      base: ['16px', '24px'],
      xl: ['26px', '38px'],
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

