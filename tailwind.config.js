import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {preflight: false},
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  theme: {
    parallaxSpeed: {10: '10', 20: '20', 30: '30', 50: '50', 100: '100'},
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        handwriting: ['Pacifico', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        parallax: {to: {transform: 'translateY(calc(var(--parallax-speed)*100px))'}},
      },
      animation: {
        parallax: 'parallax linear',
      },
    },
  },
  plugins: [
    plugin(({addVariant, addComponents, matchUtilities, theme}) => {
      matchUtilities(
        {'parallax-speed': (value) => ({'--parallax-speed': value})},
        {values: theme('parallaxSpeed')},
      );
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
        '.card-primary': {
          '@apply rounded-lg border border-gray-200 transition-shadow duration-150 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-800':
            {},
        },
        '.outline-pale': {
          '@apply outline outline-slate-500/20 dark:outline-slate-300/50': '',
        },
        '.parallax': {
          position: 'relative',
          display: 'grid',
          gridTemplateAreas: "'stack'",
          zIndex: 0,

          '& > *': {
            gridArea: 'stack',
            animation: theme('animation.parallax'),
            animationTimeline: 'scroll(root)',
            // animationRange: '0vh 100dvh',
          },
        },
      });
    }),
  ],
  safelist: ['animate-parallax'],
};
