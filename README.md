This repo reproduces a bug where webpack is confused by esbuild/SWC's
transformation logic for complex constructor expressions.

Input:
```javascript
const a = new (require('url').URL)('file:' + __filename).href
const b = new (require('url')).URL('file:' + __filename).href
console.log(a, b);
```

Babel output:
```javascript
const a = new (require('url').URL)('file:' + __filename).href;
const b = new (require('url').URL)('file:' + __filename).href;
console.log(a, b);
```

esbuild/SWC output:
```javascript
const a = new (require("url")).URL("file:" + __filename).href;
const b = new (require("url")).URL("file:" + __filename).href;
console.log(a, b);
```

On its own, the esbuild/SWC transformation is correct. However, webpack
incorrectly assumes however that the parentheses that close before the accessor
(`.`) can be dropped here, which causes the output to be invalid:

```javascript
var __filename = "/index.js";
const a = new (__webpack_require__(/*! url */ "url").URL)('file:' + __filename).href
const b = new __webpack_require__(/*! url */ "url").URL('file:' + __filename).href
console.log(a, b);
```

Running this code results in a runtime error:
> TypeError: Class constructor URL cannot be invoked without 'new'