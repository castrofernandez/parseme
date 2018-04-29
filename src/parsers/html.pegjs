{
  function escape(code) {
    var replaced = replaceAll(code, '<', '&lt;');
    return replaceAll(replaced, '>', '&gt;');
  }

  function replaceAll(str, search, replace) {
    return str.split(search).join(replace);
  }
}

Content =
  (Tag / Text / Comment)*

Tag =
  emptyTag:EmptyTag {
    return {
      tag: emptyTag.tag,
      type: 'empty',
      attributes: emptyTag.attributes
    }  
  }
  / startTag:StartTag {
    return {
      tag: startTag.tag,
      type: 'open',
      attributes: startTag.attributes
    }
  }
  / closeTag:CloseTag  {
    return {
      tag: closeTag,
      type: 'close'
    };
  }

EmptyTag = "<" whitespace* name:emptyTagName attributes:Attribute* whitespace* ">" {
    return {
      tag: name,
      attributes: attributes
    }; 
  }
  / "<" whitespace* name:tagName whitespace* attributes:Attribute* whitespace* "/>" { 
    return {
      tag: name,
      attributes: attributes
    }; 
  }

StartTag = "<" whitespace* name:tagName attributes:Attribute* whitespace* ">" {
    return {
      tag: name,
      attributes: attributes
    }; 
 }

Attribute = whitespace* name:tagName value:AttributeValue? { 
    return {
      name: name,
      value: value
    };
}

AttributeValue = whitespace* "=" whitespace* '"' value:quotedText '"' { return value; }
  / whitespace* "=" whitespace* value:tagName { return value; }

CloseTag =
  "</" whitespace* name:tagName whitespace* ">" { return name; }

Text = chars:[^<]+ {
  var value = chars.join('');

  if (value.trim() === '') {
    return null;
  }

  return {
    type: 'text',
    value: value
  };
}

Comment = "<!--" comment:(!"-->" c:. {return c})* "-->" {
  return {
    type: 'comment',
    value: escape(comment.join('').trim())
  };
}

emptyTagName = "area"
  / "base"
  / "br"
  / "col"
  / "embed"
  / "hr"
  / "img"
  / "input"
  / "keygen"
  / "link"
  / "meta"
  / "param"
  / "source"
  / "track"
  / "wbr"

whitespace = [ \t\r\n]

tagName = first:[\:_a-zA-Z] chars:[a-zA-Z\-\:_0-9]* { 
  return first + chars.join(''); 
}

quotedText = chars:[^\"]* { return chars.join(''); }