/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin' // 1. Import the plugin function

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // 2. Add the custom variant here
    plugin(function({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    })
  ],
}
