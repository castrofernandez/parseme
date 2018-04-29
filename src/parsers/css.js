/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { Content: peg$parseContent },
      peg$startRuleFunction  = peg$parseContent,

      peg$c0 = "{",
      peg$c1 = peg$literalExpectation("{", false),
      peg$c2 = "}",
      peg$c3 = peg$literalExpectation("}", false),
      peg$c4 = function(w1, selector, w2, w3, declarations, w4, w5) {
        var comments = compactComments([w1, w2, w3, w4, w5]);
        var result = {
          selector: selector,
          declarations: declarations
        };

        if (comments) {
          result.comments = comments;
        }

        return result;
      },
      peg$c5 = /^[^{\/]/,
      peg$c6 = peg$classExpectation(["{", "/"], true, false),
      peg$c7 = function(chars) { return chars.join('').replace(/\s\s+/g, ' ').trim(); },
      peg$c8 = ":",
      peg$c9 = peg$literalExpectation(":", false),
      peg$c10 = ";",
      peg$c11 = peg$literalExpectation(";", false),
      peg$c12 = function(w1, property, w2, w3, value, w4, w5) {
        var comments = compactComments([w1, w2, w3, w4, w5]);
        var result = {
          property: property,
          value: value
        };

        if (comments) {
          result.comments = comments;
        }

        return result;
      },
      peg$c13 = /^[a-zA-Z\-]/,
      peg$c14 = peg$classExpectation([["a", "z"], ["A", "Z"], "-"], false, false),
      peg$c15 = function(chars) { return chars.join(''); },
      peg$c16 = function(values) { return cleanValues(values); },
      peg$c17 = function(comments) {
        var result = [];
        var length = comments.length, i;

        for (i = 0; i < length; i++) {
          if (comments[i]) {
            result.push(comments[i]);
          }
        }

        return result.length > 0 ? result : null;
      },
      peg$c18 = "/*",
      peg$c19 = peg$literalExpectation("/*", false),
      peg$c20 = /^[^(?!*\/)]/,
      peg$c21 = peg$classExpectation(["(", "?", "!", "*", "/", ")"], true, false),
      peg$c22 = "*/",
      peg$c23 = peg$literalExpectation("*/", false),
      peg$c24 = function(comment) {
        return {
          type: 'comment',
          value: comment.join('').trim()
        };
      },
      peg$c25 = /^[ \t\r\n]/,
      peg$c26 = peg$classExpectation([" ", "\t", "\r", "\n"], false, false),
      peg$c27 = function() { return null; },
      peg$c28 = function(digits, unit) { 
        return {
          type: 'unit',
          value: digits.join('') + unit
        }
      },
      peg$c29 = function(digits) { 
        return {
          type: 'number',
          value: digits.join('')
        }
      },
      peg$c30 = /^[0-9.]/,
      peg$c31 = peg$classExpectation([["0", "9"], "."], false, false),
      peg$c32 = "em",
      peg$c33 = peg$literalExpectation("em", false),
      peg$c34 = "ex",
      peg$c35 = peg$literalExpectation("ex", false),
      peg$c36 = "%",
      peg$c37 = peg$literalExpectation("%", false),
      peg$c38 = "px",
      peg$c39 = peg$literalExpectation("px", false),
      peg$c40 = "cm",
      peg$c41 = peg$literalExpectation("cm", false),
      peg$c42 = "mm",
      peg$c43 = peg$literalExpectation("mm", false),
      peg$c44 = "in",
      peg$c45 = peg$literalExpectation("in", false),
      peg$c46 = "pt",
      peg$c47 = peg$literalExpectation("pt", false),
      peg$c48 = "pc",
      peg$c49 = peg$literalExpectation("pc", false),
      peg$c50 = "ch",
      peg$c51 = peg$literalExpectation("ch", false),
      peg$c52 = "rem",
      peg$c53 = peg$literalExpectation("rem", false),
      peg$c54 = "vh",
      peg$c55 = peg$literalExpectation("vh", false),
      peg$c56 = "vw",
      peg$c57 = peg$literalExpectation("vw", false),
      peg$c58 = "vmin",
      peg$c59 = peg$literalExpectation("vmin", false),
      peg$c60 = "vmax",
      peg$c61 = peg$literalExpectation("vmax", false),
      peg$c62 = "#",
      peg$c63 = peg$literalExpectation("#", false),
      peg$c64 = /^[0-9a-fA-F]/,
      peg$c65 = peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false),
      peg$c66 = function(hex) { 
        return {
          type: 'color',
          value: '#' + hex.join('')
        };
      },
      peg$c67 = /^[a-zA-Z_]/,
      peg$c68 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false),
      peg$c69 = "(",
      peg$c70 = peg$literalExpectation("(", false),
      peg$c71 = ")",
      peg$c72 = peg$literalExpectation(")", false),
      peg$c73 = function(name, params) {
        return {
          type: 'function',
          name: name.join(''),
          params: params
        };
      },
      peg$c74 = function(value, moreParams) {
        return [value].concat(moreParams);
      },
      peg$c75 = ",",
      peg$c76 = peg$literalExpectation(",", false),
      peg$c77 = function(value) { return value; },
      peg$c78 = /^[a-zA-Z]/,
      peg$c79 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
      peg$c80 = function(chars) { 
        return {
          type: 'word',
          value: chars.join('')
        };
      },
      peg$c81 = "'",
      peg$c82 = peg$literalExpectation("'", false),
      peg$c83 = /^[^']/,
      peg$c84 = peg$classExpectation(["'"], true, false),
      peg$c85 = function(chars) { 
        return {
          type: 'string',
          value: chars.join('')
        };
      },
      peg$c86 = "\"",
      peg$c87 = peg$literalExpectation("\"", false),
      peg$c88 = /^[^"]/,
      peg$c89 = peg$classExpectation(["\""], true, false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseContent() {
    var s0, s1;

    s0 = [];
    s1 = peg$parseRule();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseRule();
    }

    return s0;
  }

  function peg$parseRule() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseWhitespaceOrComment();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseSelector();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseWhitespaceOrComment();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 123) {
            s4 = peg$c0;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c1); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseWhitespaceOrComment();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parseDeclaration();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parseDeclaration();
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parseWhitespaceOrComment();
                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s8 = peg$c2;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c3); }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseWhitespaceOrComment();
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c4(s1, s2, s3, s5, s6, s7, s9);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSelector() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c5.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (peg$c5.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c7(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseDeclaration() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseWhitespaceOrComment();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseProperty();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseWhitespaceOrComment();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s4 = peg$c8;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c9); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseWhitespaceOrComment();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseValue();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseWhitespaceOrComment();
                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 59) {
                    s8 = peg$c10;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c11); }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseWhitespaceOrComment();
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c12(s1, s2, s3, s5, s6, s7, s9);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseProperty() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c13.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c14); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c13.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c14); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c15(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseValue() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsenumber();
    if (s2 === peg$FAILED) {
      s2 = peg$parsecolour();
      if (s2 === peg$FAILED) {
        s2 = peg$parsefunction();
        if (s2 === peg$FAILED) {
          s2 = peg$parseword();
          if (s2 === peg$FAILED) {
            s2 = peg$parsestring();
            if (s2 === peg$FAILED) {
              s2 = peg$parsewhitespace();
              if (s2 === peg$FAILED) {
                s2 = peg$parseComment();
              }
            }
          }
        }
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsenumber();
      if (s2 === peg$FAILED) {
        s2 = peg$parsecolour();
        if (s2 === peg$FAILED) {
          s2 = peg$parsefunction();
          if (s2 === peg$FAILED) {
            s2 = peg$parseword();
            if (s2 === peg$FAILED) {
              s2 = peg$parsestring();
              if (s2 === peg$FAILED) {
                s2 = peg$parsewhitespace();
                if (s2 === peg$FAILED) {
                  s2 = peg$parseComment();
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c16(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWhitespaceOrComment() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsewhitespace();
    if (s2 === peg$FAILED) {
      s2 = peg$parseComment();
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsewhitespace();
      if (s2 === peg$FAILED) {
        s2 = peg$parseComment();
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c17(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseComment() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c18) {
      s1 = peg$c18;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c19); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c20.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c20.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c21); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c22) {
          s3 = peg$c22;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c24(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhitespace() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$c25.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c26); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c27();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenumber() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parsedigits();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseunit();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c28(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsedigits();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c29(s1);
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parsedigits() {
    var s0, s1;

    s0 = [];
    if (peg$c30.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c30.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c31); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseunit() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c32) {
      s0 = peg$c32;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c33); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c34) {
        s0 = peg$c34;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 37) {
          s0 = peg$c36;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c37); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c38) {
            s0 = peg$c38;
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c39); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c40) {
              s0 = peg$c40;
              peg$currPos += 2;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c41); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c42) {
                s0 = peg$c42;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c43); }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c44) {
                  s0 = peg$c44;
                  peg$currPos += 2;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c45); }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c46) {
                    s0 = peg$c46;
                    peg$currPos += 2;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c47); }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c48) {
                      s0 = peg$c48;
                      peg$currPos += 2;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c49); }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 2) === peg$c50) {
                        s0 = peg$c50;
                        peg$currPos += 2;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c51); }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c52) {
                          s0 = peg$c52;
                          peg$currPos += 3;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c53); }
                        }
                        if (s0 === peg$FAILED) {
                          if (input.substr(peg$currPos, 2) === peg$c54) {
                            s0 = peg$c54;
                            peg$currPos += 2;
                          } else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c55); }
                          }
                          if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c56) {
                              s0 = peg$c56;
                              peg$currPos += 2;
                            } else {
                              s0 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c57); }
                            }
                            if (s0 === peg$FAILED) {
                              if (input.substr(peg$currPos, 4) === peg$c58) {
                                s0 = peg$c58;
                                peg$currPos += 4;
                              } else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c59); }
                              }
                              if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 4) === peg$c60) {
                                  s0 = peg$c60;
                                  peg$currPos += 4;
                                } else {
                                  s0 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c61); }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsecolour() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c62;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c63); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c64.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c64.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c65); }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c66(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefunction() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c67.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c68); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c67.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c68); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewhitespace();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewhitespace();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c69;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c70); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseparams();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s5 = peg$c71;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c72); }
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c73(s1, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseparams() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseValue();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsemoreParams();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsemoreParams();
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c74(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemoreParams() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 44) {
      s1 = peg$c75;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c76); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseValue();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c77(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseword() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c78.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c79); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c78.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c79); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c80(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsestring() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 39) {
      s1 = peg$c81;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c82); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c83.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c84); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c83.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c84); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s3 = peg$c81;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c82); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c85(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c86;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c87); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c88.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c89); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c88.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c89); }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c86;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c87); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c85(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }


    function compactComments(comments) {
      var result = {};
      var length = comments.length;
      var i, comment, count = 0;

      for (i = 0; i < length; i++) {
        comment = comments[i];

        if (comment) {
          result['p' + (i + 1)] = plainComments(comment);
          count++;
        }
      }

      return count > 0 ? result : null;
    }

    function plainComments(comments) {
      var result = [];
      var length = comments.length, i;

      for (i = 0; i < length; i++) {
        result.push(comments[i].value);
      }

      return result;
    }

    function cleanValues(values) {
      var result = [];
      var length = values.length, i;

      for (i = 0; i < length; i++) {
        if (values[i]) {
          result.push(values[i]);
        }
      }

      return result;
    }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
