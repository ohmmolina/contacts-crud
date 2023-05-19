/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mi: ['Material Icons', 'serif'],
        'mi-outlined': ['Material Icons Outlined', 'serif'],
        'mi-round': ['Material Icons Round', 'serif'],
        'mi-sharp': ['Material Icons Sharp', 'serif'],
        'mi-two-tone': ['Material Icons Two Tone', 'serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /text-(red|green|blue|purple|xs|sm|md|lg|xl|([2-9]xl))/,
      variants: ['hover', 'focus', 'lg:hover']
    },
    {
      pattern: /bg-(red|green|blue|purple)/,
      variants: ['hover', 'focus', 'lg:hover']
    },
    {
      pattern: /border-(red|green|blue|purple)/,
      variants: ['hover', 'focus', 'lg:hover']
    },
    {
      pattern: /font-mi(-(outlined|sharp|two-tone))?/
    }
  ]
}
