import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: 'var(--font-nunito)',
        alt: 'var(--font-calistoga)'
      },
      colors: {
        violet: {
          50: '#fdf9ff',
          100: '#fbf6ff',
          200: '#f7edff',
          300: '#e6c6ff',
          400: '#cfb2e6',
          500: '#b89ecc',
          600: '#ad95bf',
          700: '#8a7799',
          800: '#675973',
          900: '#514559',
        },
        orange: {
          50: '#fef9f1',
          100: '#fef6ea',
          200: '#fcebd4',
          300: '#f5c074',
          400: '#ddad68',
          500: '#c49a5d',
          600: '#b89057',
          700: '#937346',
          800: '#6e5634',
          900: '#564329',
        }
      },
      boxShadow: {
        'retro': '4px 4px 0 0 #000'
      }
    },
  },
  plugins: [],
}
export default config
