'use strict';

const Formatter = require('./_formatter');

class CssPrettier extends Formatter {
  formatElement(rule) {
    rule.comments = rule.comments || {};

    if (rule.comments.p1) {
      this.getTab(false);
      this.formatComments(rule.comments.p1);
    }

    this.formatSelector(rule);
    this.formatDeclarations(rule);
    this.formatClosing();

    if (rule.comments.p5) {
      this.getTab(false);
      this.formatComments(rule.comments.p5);
    }
  }

  formatSelector(rule) {
    this.getTab(false);
    this.addClasses(rule.selector, 'selector');
    this.formatComments(rule.comments.p2);
    this.push('{');
    this.formatComments(rule.comments.p3);
    this.newLine();
  }

  formatDeclarations(rule) {
    const declarations = rule.declarations;
    const length = declarations.length;
    let declaration;
    let i;
    let property;
    let value;
    let comments;

    for (i = 0; i < length; i++) {
      declaration = declarations[i];
      property = declaration.property;
      value = declaration.value;
      comments = declaration.comments || {};
      this.getTab(true);

      this.formatComments(comments.p1);
      this.addClasses(property, 'property');
      this.formatComments(comments.p2);
      this.push(':');
      this.formatComments(comments.p3);

      this.formatValue(value, [], true);

      this.formatComments(comments.p4);
      this.push(';');
      this.formatComments(comments.p5);
      this.newLine();
    }
  }

  formatValue(values, classes, addPositionClasses) {
    const length = values.length;
    let i;

    for (i = 0; i < length; i++) {
      this.getValue(values[i], addPositionClasses ? this.getParamClass(classes, i, length) : classes);
    }
  }

  getValue(value, classes) {
    classes = classes || '';

    switch (value.type) {
      case 'function':
        this.getFunctionValue(value, classes);
        break;
      case 'comment':
        this.addClasses(['/* ', value.value, ' */'], this.mergeClasses(['value comment'], classes));
        break;
      case 'string':
        this.addClasses(['\'', value.value, '\''], this.mergeClasses(['value string'], classes));
        break;
      default:
        this.addClasses(value.value, this.mergeClasses(['value', value.type], classes));
    }

    this.addColourPreview(value);
  }

  getFunctionValue(value, classes) {
    this.addClasses(value.name, this.mergeClasses(['value function'], classes));
    this.push('(');
    this.getFunctionParams(value.params);
    this.push(')');
  }

  addColourPreview(value) {
    const colour = this.getColour(value);

    if (colour) {
      this.push(['<span class="color-preview" style="background-color:', colour, ';"></span>'].join(''));
    }
  }

  getColour(value) {
    const type = value.type;

    if (type === 'color') {
      return value.value;
    }

    if (type !== 'function' || ['rgb', 'rgba', 'hsl', 'hsla'].indexOf(value.name) === -1) {
      return null;
    }

    return this.getColourFunction(value);
  }

  getColourFunction(value) {
    const result = [value.name, '('];
    const processedParams = [];
    const params = value.params;
    let param;
    const length = params.length;
    let i;
    let j;

    for (i = 0; i < length; i++) {
      param = params[i];

      for (j = 0; j < param.length; j++) {
        if (param[j].type === 'comment') {
          continue;
        }

        processedParams.push(param[j].value);
      }
    }

    result.push(processedParams.join(','), ')');

    return result.join('');
  }

  mergeClasses(a, b) {
    return a.concat(b).join(' ').replace(/ +(?= )/g, '');
  }

  getFunctionParams(params) {
    const length = params.length;
    let i;
    let param;

    for (i = 0; i < length; i++) {
      param = params[i];
      this.formatValue(param, this.getParamClass(['param'], i, length), false);

      if (i < length - 1) {
        this.push(',');
      }
    }
  }

  getParamClass(classes, pos, length) {
    const result = new Array(classes) || [];

    result.push('p' + pos);

    if (pos === 0) {
      result.push('first');
    }

    if (pos === length - 1) {
      result.push('last');
    }

    return result;
  }

  formatClosing() {
    this.getTab(false);
    this.push('}');
    this.newLine();
  }

  formatComments(comments) {
    if (!comments) {
      return;
    }

    const length = comments.length;
    let i;

    for (i = 0; i < length; i++) {
      this.addClasses(['/* ', comments[i], ' */'], 'comment');
    }
  }

  getTab(tab) {
    this.outputLines[this.line].tab = tab ? 1 : 0;
  }
};

if (typeof module !== 'undefined') {
  module.exports = new CssPrettier();
}
