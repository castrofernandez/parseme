{
  function escapeArray(value) {
    if (!value) {
      return [];
    }

    if (value instanceof Array) {
      return value;
    }

    return [value];
  }
}

Content = element:(Array / Object) { return [ element ]; }

Array = "[" whitespace* elements:ArrayElement? whitespace* "]" {
    return {
      type: 'array',
      value: escapeArray(elements)
    }; 
  }

ArrayElement = element:ValueElement whitespace* elements:( whitespace* "," whitespace* elements:ValueElement { return elements; })* {
    return escapeArray(element).concat(elements);
  }

Object = "{" whitespace* properties:PropertyList? whitespace* "}" {
    return {
      type: 'object',
      value: escapeArray(properties)
    };
}

PropertyList = property:Property whitespace* properties:(whitespace* "," whitespace* properties:Property { return properties; })* {
    return escapeArray(property).concat(properties);
  }

Property = identifier:string whitespace* ":" whitespace* value:ValueElement {
    return {
      type: 'property',
      name: identifier.value,
      value: value
    };
  }

ValueElement = Array
  / Object
  / number
  / string
  / true
  / false
  / null

number = "-"? integer ("." [0-9]+)? exponent? {
    return {
      type: 'number',
      value: parseFloat(text())
    };
  }

integer = '0' / [1-9][0-9]*

exponent = [Ee] [+-]? integer

string = '"' value:[^"]* '"' {
    return {
      type: 'string',
      value: value.join('')
    }
  }

true = "true" {
    return {
      type: 'boolean',
      value: true
    };
  }

false = "false" {
    return {
      type: 'boolean',
      value: false
    };
  }

null = "null" {
    return {
      type: 'null',
      value: null
    };
  }

whitespace = [ \t\r\n]