'use strict';

const Formatter = require('./_formatter');

class HtmlPrettier extends Formatter {
  formatElement(element) {
    let output = null;

    switch (element.type) {
      case 'open':
        output = this.formatOpenTag(element);
        break;
      case 'close':
        output = this.formatCloseTag(element);
        break;
      case 'empty':
        output = this.formatEmptyTag(element);
        break;
      case 'text':
        output = this.formatText(element);
        break;
      case 'comment':
        output = this.formatComment(element);
        break;
    }

    this.newLine();

    return output;
  }

  formatOpenTag(element) {
    this.getTab();
    this.getOpenTag(element, '&gt;');
    this.tab++;
  }

  formatCloseTag(element) {
    this.tab--;
    this.getTab();
    this.push('&lt;/');
    this.addClasses(element.tag, 'tag');
    this.push('&gt;');
  }

  formatEmptyTag(element) {
    this.getTab();
    this.getOpenTag(element, ' /&gt;');
  }

  formatText(element) {
    this.getTab();
    this.addClasses(element.value, 'text');
  }

  formatComment(element) {
    this.getTab();
    this.addClasses(['&lt;!-- ', element.value, ' --&gt;'], 'comment');
  }

  getOpenTag(element, closing) {
    this.push('&lt;');
    this.addClasses(element.tag, 'tag');
    this.getAttributes(element);
    this.push(closing);
  }

  getAttributes(element) {
    const attributes = element.attributes;
    const length = attributes.length;
    let attribute;
    let name;
    let value;
    let i;

    if (length < 1) {
      return;
    }

    for (i = 0; i < length; i++) {
      attribute = attributes[i];
      name = attribute.name;
      value = attribute.value;

      this.push(' ');
      this.addClasses(name, 'attribute ' + name);

      if (value) {
        this.push('=');
        this.addClasses(['"', value, '"'], 'value');
      }
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = new HtmlPrettier();
}
