# Template String Utilities

[![npm version](https://badge.fury.io/js/%40gustavnikolaj%2Fstring-utils.svg)](https://www.npmjs.com/package/@gustavnikolaj/string-utils)
[![Build Status](https://travis-ci.com/gustavnikolaj/string-utils.svg?branch=master)](https://travis-ci.com/gustavnikolaj/string-utils)
[![Coverage Status](https://coveralls.io/repos/github/gustavnikolaj/string-utils/badge.svg?branch=master)](https://coveralls.io/github/gustavnikolaj/string-utils?branch=master)

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

## reflow

Strips indentation as deindent, but will persist paragraphs (separated by double
newlines like in markdown) and reflow the paragraphs so that they fit within a
defined width.

```js
import { reflow } from "@gustavnikolaj/string-utils";

console.log(reflow(8)`
  foo bar qux baz foo bar
`); // => "foo bar\nqux baz\nfoo bar"

console.log(reflow(80)`
  foo bar

  qux baz
`); // => "foo bar\n\nqux baz"

console.log(reflow(30)`
  This is a very long string that is for sure longer than 30 characters.

  This is a very long string that is for sure longer than 30 characters.
`);
/* => This is a very long string
      that is for sure longer than
      30 characters.

      This is a very long string
      that is for sure longer than
      30 characters. */
```

It also supports being called as a regular non-template-string function:

```js
reflow(
  "This is a very long string that is for sure longer than 30 characters.",
  30
);
```

Can also be required directly:

```js
import reflow from "@gustavnikolaj/string-utils/reflow";
```
