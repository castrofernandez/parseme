# parseme
A tiny prettyfier for HTML and CSS

1. Install 

```
npm install parseme
```

2. Usage

You need to include the file(s) of the language(s) to use.

```
import parseme from 'parseme';
import html from 'parseme/languages/html';

parseme.init({
  language: 'html',
  selector: '.parseme'
});

parseme.load();
```

3. Generate parser from grammar

```
pegjs ./src/parsers/html.pegjs
```

4. Run depelopment watch

```
npm run dev
```

Open browser pointing to http://localhost:8383/example/

5. Run tests

```
npm run test
```

6. Build dist

```
npm run build
```

7. Upload build

The build must be generated before (point 6)

```
npm publish
```

8. List of methods

* init: sets initial options.
   * language: 'html', 'css' or 'json'
   * parser: function to parse the code. (only to use custom parser)
   * prettier: prettier to use. (only to use custor prettier)
   * selector: CSS selector to use in *load* method.
   * compilation: if true uses the parser, when false uses the lexer
   * lines: when true show line numbers.
* load: formats every *selector* set in initial options.
* parse(code, options): parses the received code with the optional options.
* format(code, options): formats the received code with the optional options.

9. Create new language

* Create language in src/languages this will need:
   * create grammar in src/parsers and generate parser (point 3)
   * create prettier in src/prettiers
   * create lexer in src/languages
* Adds language config in webpack.config.js to generate the new output file.