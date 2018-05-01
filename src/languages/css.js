if (typeof window !== 'undefined') {
  require('../sass/css.scss');
}

const Language = require('../utils/language');

const cssParse = require('../parsers/css');
const cssPrettier = require('../prettiers/css');

class CssLanguage extends Language {
  constructor() {
    super({
      name: 'css',
      parser: cssParse.parse,
      prettier: cssPrettier
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = new CssLanguage();
}
