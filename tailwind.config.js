/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      primary: {
        container: '#EADDFF',
        DEFAULT: '#6750A4',
        on: '#FFFFFF',
        'on-container': '#21005D',
        dark: {
          DEFAULT: '#D0BCFF',
          on: '#381E72',
          container: '#4F378B',
          'on-container': '#EADDFF'
        }
      },
      secondary: {
        container: '#E8DEF8',
        DEFAULT: '#625B71',
        on: '#FFFFFF',
        'on-container': '#1D192B',
        dark: {
          DEFAULT: '#CCC2DC',
          on: '#332D41',
          container: '#4A4458',
          'on-container': '#E8DEF8'
        }
      },
      tertiary: {
        container: '#FFD8E4',
        DEFAULT: '#7D5260',
        on: '#FFFFFF',
        'on-container': '#31111D',
        dark: {
          DEFAULT: '#EFB8C8',
          on: '#492532',
          container: '#633B48',
          'on-container': '#FFD8E4'
        }
      },
      error: {
        container: '#F9DEDC',
        DEFAULT: '#B3261E',
        on: '#FFFFFF',
        'on-container': '#410E0B',
        dark: {
          DEFAULT: '#F2B8B5',
          on: '#601410',
          container: '#8C1D18',
          'on-container': '#F9DEDC'
        }
      },
      background: {
        on: '#1C1B1F',
        DEFAULT: '#FFFBFE',
        dark: {
          DEFAULT: '#1C1B1F',
          on: '#E6E1E5'
        }
      },
      surface: {
        on: '#1C1B1F',
        DEFAULT: '#FFFBFE',
        variant: '#E7E0EC',
        'on-variant': '#49454F',
        dark: {
          DEFAULT: '#1C1B1F',
          on: '#E6E1E5',
          variant: '#49454F',
          'on-variant': '#CAC4D0'
        }
      },
      outline: {
        DEFAULT: '#79747E',
        dark: '#938F99'
      },
      neutral: {
        100: '#FFFFFF',
        50: '#787579',
        0: '#000000'
      }
    },
    opacity: {
      100: '1',
      92: '.92', //hover
      88: '.88', //focus
      84: '.84', //drag
      46: '.46', //backdrop
      38: '.38', //disable
      16: '.16',
      12: '.12',
      8: '.08',
      0: '0'
    },
    extend: {
      fontFamily: {
        mi: ['Material Icons', 'serif'],
        'mi-outlined': ['Material Icons Outlined', 'serif'],
        'mi-round': ['Material Icons Round', 'serif'],
        'mi-sharp': ['Material Icons Sharp', 'serif'],
        'mi-two-tone': ['Material Icons Two Tone', 'serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px'
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /font-mi(-(outlined|sharp|two-tone))?/
    }
  ]
}
