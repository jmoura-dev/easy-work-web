import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    container: {},
    extend: {
      gridTemplateColumns: {
        body: 'minmax(15rem, 20rem) 1fr',
        developer: '70% 30%',
        jobCard: '70% 30%',
        client: '30% 70%',
        signIn: '40% 60%',
      },
      gridTemplateRows: {
        body: 'minmax(5rem, 6rem) 1fr',
      },
      fontFamily: {
        mirza: ['var(--font-mirza)'],
      },
      width: {
        tabletScreen: 'minmax(30rem, 40rem)',
      },
      maxWidth: {
        jobCard: '22.6rem',
      },
      fontSize: {
        minimum: '0.70rem',
      },
      screens: {
        '3xl': '1700px',
        minimum: '404px',
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 0.3s linear',
      },
    },
  },
  plugins: [],
}

export default config
