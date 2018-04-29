class Utils {
  escape(code) {
    const replaced = this.replaceAll(code, '<', '&lt;');
    return this.replaceAll(replaced, '>', '&gt;');
  }

  replaceAll(str, search, replace) {
    return str.split(search).join(replace);
  }

  formatLines(code) {
    return ['<div class="line">', code.split('\n').join('</div><div class="line">'), '</div>'].join('');
  }
}

if (typeof module !== 'undefined') {
  module.exports = new Utils();
}
