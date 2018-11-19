# Template String Utilities

[![npm version](https://badge.fury.io/js/%40gustavnikolaj%2Fasync-main-wrap.svg)](https://www.npmjs.com/package/@gustavnikolaj/async-main-wrap)

## deindent

Strips indentation based on the indentation found on the first line. Will leave
extra newlines and extra indentation intact. It will however remove leading and
trailing line breaks.

```js
import { deindent } from "@gustavnikolaj/string-utils";

console.log(deindent`
  foo bar
  qux baz
`); // => "foo bar\nqux baz"

console.log(deindent`
  foo bar
    qux baz
`); // => "foo bar\n  qux baz"

console.log(deindent`
  foo bar

    qux baz
`); // => "foo bar\n\n  qux baz"
```

Can also be required directly:

```js
import deindent from "@gustavnikolaj/string-utils/deindent";
```

## collapse

Collapses whitespace in a line wrapped over multiple lines.

```js
import { collapse } from "@gustavnikolaj/string-utils";

console.log(collapse`
  foo bar
  qux baz
`); // => "foo bar qux baz"

console.log(collapse`
  foo bar
    qux baz
`); // => "foo bar qux baz"

console.log(collapse`
  This is a very long string that I rather not have to put in a single line
  because then it would make my code spill over and take more than the 80
  characters per line that I prefer.
`);
// => "This is a very long string that I rather not have to put in a single " +
//    "line because then it would make my code spill over and take more " +
//    "than the 80 characters per line that I prefer."
```

Can also be required directly:

```js
import collapse from "@gustavnikolaj/string-utils/collapse";
```
