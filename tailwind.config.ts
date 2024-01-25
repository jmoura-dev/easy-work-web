import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    container: {},
    extend: {
      gridTemplateColumns: {
        body: 'minmax(15rem, 20rem) 1fr',
      },
      gridTemplateRows: {
        body: 'minmax(5rem, 6rem) 1fr',
      },
    },
  },
  plugins: [],
}

export default config
