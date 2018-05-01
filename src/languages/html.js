if (typeof window !== 'undefined') {
  require('../sass/html.scss');
}

const Language = require('../utils/language');

const htmlParse = require('../parsers/html');
const htmlPrettier = require('../prettiers/html');

class HtmlLanguage extends Language {
  constructor() {
    super({
      name: 'html',
      parser: htmlParse.parse,
      prettier: htmlPrettier
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = new HtmlLanguage();
}
