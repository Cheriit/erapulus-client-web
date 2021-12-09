const {guessProductionMode} = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  mode: 'jit',
  content: [
    './apps/**/*.{html,component.ts,css,scss,sass,less,styl}',
    './libs/**/*.{html,ts,css,scss,sass,less,styl}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  ...(guessProductionMode() ? {cssnano: {}} : {})
};
