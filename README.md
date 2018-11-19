# Template String Utilities

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
