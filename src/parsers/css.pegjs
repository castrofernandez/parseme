{
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
}

Content =
  Rule*

Rule = w1:WhitespaceOrComment selector:Selector w2:WhitespaceOrComment "{" w3:WhitespaceOrComment declarations:Declaration* w4:WhitespaceOrComment "}" w5:WhitespaceOrComment {
  var comments = compactComments([w1, w2, w3, w4, w5]);
  var result = {
    selector: selector,
    declarations: declarations
  };

  if (comments) {
    result.comments = comments;
  }

  return result;
}

Selector = chars:[^\{/]* { return chars.join('').replace(/\s\s+/g, ' ').trim(); }

Declaration = w1:WhitespaceOrComment property:Property w2:WhitespaceOrComment ":" w3:WhitespaceOrComment value:Value w4:WhitespaceOrComment ";" w5:WhitespaceOrComment {
  var comments = compactComments([w1, w2, w3, w4, w5]);
  var result = {
    property: property,
    value: value
  };

  if (comments) {
    result.comments = comments;
  }

  return result;
}

Property = chars:[a-zA-Z\-]+ { return chars.join(''); }

Value = values:(number / colour / function / word / string / whitespace / Comment)* { return cleanValues(values); }

WhitespaceOrComment = comments:(whitespace / Comment)* {
  var result = [];
  var length = comments.length, i;

  for (i = 0; i < length; i++) {
    if (comments[i]) {
      result.push(comments[i]);
    }
  }

  return result.length > 0 ? result : null;
}

Comment = "/*" comment:[^(?!\*/)]* "*/" {
  return {
    type: 'comment',
    value: comment.join('').trim()
  };
}

whitespace = [ \t\r\n] { return null; }

number = digits:digits unit:unit { 
  return {
    type: 'unit',
    value: digits.join('') + unit
  }
}
/ digits:digits { 
  return {
    type: 'number',
    value: digits.join('')
  }
}

digits = [0-9\.]+

unit = 'em' / 'ex' / '%' / 'px' / 'cm' / 'mm' / 'in' / 'pt' / 'pc' / 'ch' / 'rem' / 'vh' / 'vw' / 'vmin' / 'vmax'

colour = '#' hex:([0-9a-fA-F]*) { 
  return {
    type: 'color',
    value: '#' + hex.join('')
  };
}

function = name:[a-zA-Z_]+ whitespace* '(' params:params? ')' {
  return {
    type: 'function',
    name: name.join(''),
    params: params
  };
}

params = value:Value moreParams:moreParams* {
  return [value].concat(moreParams);
}

moreParams = ',' value:Value { return value; }

word = chars:[a-zA-Z]+ { 
  return {
    type: 'word',
    value: chars.join('')
  };
}

string = '\'' chars:[^\']* '\'' { 
  return {
    type: 'string',
    value: chars.join('')
  };
}
/ '"' chars:[^\"]* '"' { 
  return {
    type: 'string',
    value: chars.join('')
  };
}