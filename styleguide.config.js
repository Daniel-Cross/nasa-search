const path = require('path');

module.exports = {
  components: 'src/components/**/*.js',
  styles: {
    StyleGuide: {
      '@global html': {
        fontSize: '62.5%',
      },
      '@global body': {
        fontSize: '1.6rem',
        fontFamily: 'Roboto, Helvetica Neue, sans-serif',
        backgroundColor: 'black',
        color: 'white',
      },
    },
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/styleguide/ThemeWrapper'),
  },
};
