class Language {
  constructor(options) {
    this.options = options;

    this.init();
  }

  get name() {
    return this.options.name;
  }

  get parser() {
    return this.options.parser;
  }

  get prettier() {
    return this.options.prettier;
  }

  init() {
    const global = Language.getGlobal();

    if (global) {
      global._parsemeLanguages[this.name] = this;
    }
  }

  static getGlobal() {
    if (typeof global !== 'undefined') {
      return Language.setGlobal(global);
    }

    if (typeof window !== 'undefined') {
      return Language.setGlobal(window);
    }

    return null;
  }

  static setGlobal(variable) {
    if (!variable._parsemeLanguages) {
      variable._parsemeLanguages = {};
    }

    return variable;
  }

  static get(name) {
    const global = this.getGlobal();

    return global ? global._parsemeLanguages[name] : null;
  }

  static get languages() {
    return global ? Object.keys(global._parsemeLanguages) : [];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Language;
}
