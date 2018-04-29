'use strict';

const Formatter = require('./_formatter');

class JsonPrettier extends Formatter {
  formatElement(element) {
    const type = element.type.charAt(0).toUpperCase() + element.type.slice(1);
    const callback = `format${type}`;

    if (this[callback]) {
      this[callback](element);
    }
  }

  formatArray(array) {
    this.formatCollection({
      value: array.value,
      delimiter: {
        start: '[',
        end: ']'
      }
    });
  }

  formatObject(obj) {
    this.formatCollection({
      value: obj.value,
      delimiter: {
        start: '{',
        end: '}'
      }
    });
  }

  formatCollection(options) {
    this.getTab();
    this.push(options.delimiter.start);
    this.tab++;

    this.formatList(options.value);

    this.tab--;

    if (options.value.length > 0) {
      this.newLine();
      this.getTab();
    }

    this.push(options.delimiter.end);
  }

  formatProperty(property) {
    this.formatString({
      value: property.name,
      classes: ['string', 'property']
    });
    this.push(': ');
    this.formatElement(property.value);
  }

  formatString(str) {
    this.addClasses(`"${str.value}"`, str.classes || 'string');
  }

  formatNumber(num) {
    this.addClasses(num.value, 'number');
  }

  formatNull(n) {
    this.addClasses('null', 'null');
  }

  formatBoolean(boolean) {
    const value = boolean.value ? 'true' : 'false';
    this.addClasses(value, value);
  }

  formatList(list) {
    const length = list.length - 1;
    let count = 0;

    list.forEach(element => {
      this.newLine();
      this.getTab();
      this.formatElement(element);
      count < length && this.push(', ');
      count++;
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = new JsonPrettier();
}
