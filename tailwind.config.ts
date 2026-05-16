import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        sm: '1px',
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
      },
      colors: {
        'matte-black': '#0F1113',
        graphite: '#23272B',
        'off-white': '#F3F2EE',
        slate: '#5C6670',
        gunmetal: '#3A4047',
        olive: '#4E5B4C',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      letterSpacing: {
        'label': '0.18em',
        'nav': '0.06em',
        'cta': '0.12em',
        'tight-display': '-0.025em',
        'tight-h1': '-0.02em',
        'tight-h2': '-0.015em',
        'tight-h3': '-0.01em',
      },
      lineHeight: {
        'display': '1.0',
        'heading': '1.05',
        'sub': '1.1',
        'body': '1.65',
      },
    },
  },
  plugins: [],
}
export default config
