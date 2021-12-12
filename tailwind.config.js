const {guessProductionMode} = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  mode: 'jit',
  content: [
    './apps/**/*.{html,ts,scss}',
    './libs/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  ...(guessProductionMode() ? {cssnano: {}} : {})
};
