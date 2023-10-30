import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {preflight: false},
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    ({addComponents, addVariant}) => {
      addVariant('sm-only', "@media screen and (max-width: theme('screens.sm'))");
      addComponents({
        '.flex-center-between': {
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        },
        '.flex-center': {
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        },
      });
    },
  ],
};
